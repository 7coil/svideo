import { AppState, ImageFileFormats, Container } from "./enum";
import { FFmpeg } from "./FFmpeg";
import { Video } from "./Video";
import path from "path";
import fs from "fs";
import { FileRenamer } from "./FileRenamer";
import { ProjectBuilder, ProjectBuilderReplacement } from "./ProjectBuilder";

const SCRATCH_WIDTH = 480;
const MAGIC_SCRATCH_NUMBER = 2;
const ASPECT_RATIO = 4 / 3;

class App {
  state: AppState = AppState.READY;
  private video: Video;
  private width: number = 240;
  private framerate: number | null = null;
  private format: ImageFileFormats = ImageFileFormats.JPEG;
  private container: Container = Container.NONE;
  private compressionLevel: number = 4;
  private rows: number = 20;
  private columns: number = 30;
  private tempFolder: string;
  private get height(): number {
    return Math.round(this.width / ASPECT_RATIO);
  }

  async setFile(file: string) {
    const video = new Video(file);
    await video.init();
    this.video = video;
    this.setFrameRate();
  }

  setTempFolder(folder: string = "temp/") {
    let loc = path.join(__dirname, folder);
    if (fs.existsSync(loc)) {
      fs.readdirSync(loc).forEach((file) =>
        fs.unlinkSync(path.resolve(loc, file))
      );
    } else {
      fs.mkdirSync(loc);
    }
    this.tempFolder = loc;
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

    await FFmpeg.convertToFrames({
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
    });

    await FFmpeg.convertToAudio({
      tempFolder: this.tempFolder,
      video: this.video,
    });

    const renamedFiles = await FileRenamer.hashFilesInFolder({
      folder: this.tempFolder
    })
    const scratchSize = (SCRATCH_WIDTH / this.width) * MAGIC_SCRATCH_NUMBER * 100

    const builder = new ProjectBuilder();

    builder.injectField(ProjectBuilderReplacement.WIDTH, this.width)
      .injectField(ProjectBuilderReplacement.FPS, this.framerate || this.video.framerate.value)
      .injectField(ProjectBuilderReplacement.ROWS, this.rows)
      .injectField(ProjectBuilderReplacement.COLUMNS, this.columns)
      .injectField(ProjectBuilderReplacement.SIZE, scratchSize)
      .injectFiles(renamedFiles, this.rows * this.columns)
      .write(this.tempFolder)

    console.log(renamedFiles);
  }

  static main(args: string[]) {
    const app = new App();
    Promise.resolve()
      .then(() => app.setTempFolder())
      .then(() => app.setFile("test.mkv"))
      .then(() => app.setFormat(ImageFileFormats.JPEG))
      .then(() => app.setCompressionLevel(4))
      .then(() => app.setWidth(480))
      .then(() => app.convert());
  }
}

export { App };
