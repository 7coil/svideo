import archiver from "archiver";
import fs, { createWriteStream } from "fs";
import path from "path";
import yargs from "yargs/yargs";
import { terminalWidth } from "yargs";
import { AppState, Container, ImageFileFormats } from "./enum";
import { FFmpeg } from "./FFmpeg";
import { FileRenamer } from "./FileRenamer";
import { ProjectBuilder, ProjectBuilderReplacement } from "./ProjectBuilder";
import { Video } from "./Video";

const SCRATCH_WIDTH = 480;
const MAGIC_SCRATCH_NUMBER = 2;
const ASPECT_RATIO = 4 / 3;

class App {
  state: AppState = AppState.READY;
  private video: Video;
  private width: number = 240;
  private framerate: number = null;
  private format: ImageFileFormats = ImageFileFormats.JPEG;
  private container: Container = Container.NONE;
  private compressionLevel: number = 4;
  private rows: number = 10;
  private columns: number = 10;
  private tempFolder: string;
  private outputFile: string;
  private subtitles: string;
  private audioInterval: number = 0;
  private videoFilters: string;
  private backgroundColour: string = "black";
  private startPosition: string | undefined;
  private endPosition: string | undefined;

  private get height(): number {
    return Math.round(this.width / ASPECT_RATIO);
  }

  toString() {
    return `Converting ${this.video?.filename} to ${this.outputFile}:
    width     : ${this.width}
    height    : ${this.height}
    framerate : ${
      this.framerate
        ? this.framerate
        : `None - Using video framerate of ${this.video?.framerate.value}`
    }
    format            : ${this.format}
    grid size         : ${this.rows} x ${this.columns}
    compression level : ${this.compressionLevel}
    input video       : ${this.video?.path}
    output project    : ${this.outputFile}
    temp folder       : ${this.tempFolder}
    subtitles         : ${this.subtitles || "None"}
    audio interval    : ${this.audioInterval || "None"}
    `;
  }

  setBackgroundColour(colour: string) {
    this.backgroundColour = colour;
  }

  setVideoFilters(vf: string) {
    this.videoFilters = vf;
  }

  setAudioInterval(interval: number) {
    this.audioInterval = interval;
  }

  setOutputFile(file: string) {
    this.outputFile = file;
  }

  setSubtitlesFile(file: string) {
    this.subtitles = file;
  }

  async setFile(file: string) {
    const video = new Video(file);
    await video.init();
    this.video = video;
  }

  setTempFolder(folder: string = "temp/") {
    let loc = path.resolve(folder);
    if (fs.existsSync(loc)) {
      fs.readdirSync(loc).forEach((file) =>
        fs.unlinkSync(path.resolve(loc, file))
      );
    } else {
      fs.mkdirSync(loc);
    }
    this.tempFolder = loc;
  }

  setRows(rows: number) {
    this.rows = rows;
  }

  setColumns(columns: number) {
    this.columns = columns;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.width = Math.round(height * ASPECT_RATIO);
  }

  setFormat(format: string) {
    switch (format) {
      case ImageFileFormats.JPEG:
        this.format = format;
        this.compressionLevel = 4;
        break;
      case ImageFileFormats.PNG:
        this.format = format;
        this.compressionLevel = 100;
        break;
      default:
        throw new Error("Could not find selected format");
    }
  }

  setCompressionLevel(compressionLevel: number) {
    if (!Number.isInteger(compressionLevel))
      throw new Error("Compression level must be an integer");

    switch (this.format) {
      case ImageFileFormats.JPEG:
        if (compressionLevel < 1 && compressionLevel > 32)
          throw new Error(
            "JPEG quality level must be an integer between 1 and 32 inclusive"
          );
        break;
      case ImageFileFormats.PNG:
        if (compressionLevel < 0 && compressionLevel > 100)
          throw new Error(
            "PNG compression level must be an integer between 1 and 100"
          );
        break;
      default:
        throw new Error("Could not find selected format");
    }
  }

  setFrameRate(framerate?: number) {
    if (!this.video)
      throw new Error("You must load a video before setting a frame rate");
    if (typeof framerate !== "number") {
      // Reset the frame rate!
      this.framerate = null;
    }
    if (framerate < 0)
      throw new Error("The frame rate must not be less than 0");
    if (framerate > this.video.framerate.value) {
      // Reset the frame rate if the selected is too big
      this.framerate = null;
    }

    this.framerate = framerate;
  }

  setStartPosition(start?: string) {
    this.startPosition = start;
  }

  setEndPosition(end?: string) {
    this.endPosition = end;
  }

  reset() {
    if (this.state !== AppState.FINISHED)
      throw new Error("You may not reset until the application is finished");
    this.state = AppState.READY;
  }

  async convert() {
    if (!this.video)
      throw new Error("You must load a video before starting the conversion");
    if (this.state !== AppState.READY)
      throw new Error("Cannot convert until the application is reset");

    const frameReverse = await FFmpeg.convert({
      compressionLevel: this.compressionLevel,
      container: this.container,
      format: this.format,
      video: this.video,
      width: this.width,
      height: this.height,
      framerate: this.framerate,
      rows: this.rows,
      columns: this.columns,
      tempFolder: this.tempFolder,
      subtitles: this.subtitles,
      videoFilters: this.videoFilters,
      backgroundColour: this.backgroundColour,
      startPosition: this.startPosition,
      endPosition: this.endPosition,
      audioInterval: this.audioInterval,
    });

    const renamedFiles = await FileRenamer.hashFilesInFolder({
      folder: this.tempFolder,
    });
    const scratchSize =
      (SCRATCH_WIDTH / this.width) * MAGIC_SCRATCH_NUMBER * 100;

    const builder = new ProjectBuilder();

    builder
      .injectField(ProjectBuilderReplacement.WIDTH, this.width)
      .injectField(
        ProjectBuilderReplacement.FPS,
        this.framerate || this.video.framerate.value
      )
      .injectField(ProjectBuilderReplacement.ROWS, this.rows)
      .injectField(ProjectBuilderReplacement.COLUMNS, this.columns)
      .injectField(ProjectBuilderReplacement.SIZE, scratchSize)
      .injectField(
        ProjectBuilderReplacement.FRAME_REVERSE,
        JSON.stringify(frameReverse)
      )
      .injectFiles(renamedFiles, this.rows * this.columns)
      .write(this.tempFolder);

    const outputStream = createWriteStream(this.outputFile);
    const zip = archiver("zip", {
      store: true,
    });

    zip.directory(this.tempFolder, false);
    zip.pipe(outputStream);
    await zip.finalize();

    await new Promise<void>((resolve) => {
      outputStream.on("close", () => {
        resolve();
      });
    });
  }

  static async main(args: string[]) {
    const argv = await yargs(args.slice(2))
      .options({
        rows: {
          type: "number",
          alias: "row",
          default: 10,
          description: "The number of rows to place in the grid",
        },
        columns: {
          type: "number",
          alias: "col",
          default: 10,
          description: "The number of columns to place in the grid",
        },
        input: {
          type: "string",
          alias: "i",
          demandOption: true,
          normalize: true,
          description: "Input file to convert",
        },
        output: {
          type: "string",
          alias: "o",
          demandOption: true,
          normalize: true,
          description: "Destination file for the Scratch `.sb3` archive",
        },
        width: {
          type: "number",
          alias: "w",
          default: 480,
          description: "The width of each frame",
        },
        temporaryFolder: {
          type: "string",
          alias: "t",
          default: "temp/",
          normalize: true,
          description:
            "Path to a temporary folder for use while building the project",
        },
        imageFileFormat: {
          choices: Object.values(ImageFileFormats),
          alias: "f",
          default: "jpg",
          description: "The file format of frames in the output",
        },
        frameRate: {
          type: "number",
          alias: "r",
          description: "The framerate of the output",
        },
        compressionLevel: {
          type: "number",
          alias: "q",
          description:
            "The compression level of the image. 1-100 for PNG and 1-32 for JPEG",
        },
        audioInterval: {
          type: "number",
          alias: "a",
          default: 0,
          description: "The number of seconds between cuts in the audio",
          defaultDescription: "No cuts",
        },
        subtitles: {
          type: "string",
          alias: "s",
          normalise: true,
          description: "Hardcode (burn) subtitles onto the video",
        },
        videoFilters: {
          type: "string",
          alias: "vf",
          description:
            "Additional video filters to pass to FFMPEG, such as crop",
        },
        backgroundColour: {
          type: "string",
          alias: "colour",
          default: "black",
          description: "Set the colour of the padded region around the video",
        },
        startPosition: {
          type: "string",
          alias: "ss",
          description: "Seek to a start position",
        },
        endPosition: {
          type: "string",
          alias: "to",
          description: "Stop at an end position",
        },
      })
      .wrap(terminalWidth())
      .parseAsync();

    const app = new App();

    if (argv.rows) app.setRows(argv.rows);
    if (argv.columns) app.setColumns(argv.columns);
    if (argv.input) await app.setFile(argv.input);
    if (argv.output) app.setOutputFile(argv.output);
    if (argv.width) app.setWidth(argv.width);
    if (argv.temporaryFolder) app.setTempFolder(argv.temporaryFolder);
    if (argv.imageFileFormat) app.setFormat(argv.imageFileFormat);
    if (argv.frameRate) app.setFrameRate(argv.frameRate);
    if (argv.compressionLevel) app.setCompressionLevel(argv.compressionLevel);
    if (argv.subtitles) app.setSubtitlesFile(argv.subtitles);
    if (argv.audioInterval) app.setAudioInterval(argv.audioInterval);
    if (argv.videoFilters) app.setVideoFilters(argv.videoFilters);
    if (argv.backgroundColour) app.setBackgroundColour(argv.backgroundColour);
    if (argv.startPosition) app.setStartPosition(argv.startPosition);
    if (argv.endPosition) app.setEndPosition(argv.endPosition);

    console.log(app.toString());
    await app.convert();
  }
}

export { App };
