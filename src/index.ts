import archiver from "archiver";
import "core-js/features/string/replace-all";
import fs, { existsSync } from "fs";
import path from "path";
import "regenerator-runtime";
import "regenerator-runtime/runtime";
import templateBackground from "url:./template/8f403c1439e63a0e3049e8ac4442b451.svg";
import templateProject from "./template/project";
import yargs from "yargs";
import { convertToAudioSnippets, convertToCostumes } from "./assets";
import {
  convertInputToAudio,
  convertInputToPictures,
  obtainMediaInfo,
  parseFrameRate,
} from "./ffmpeg";
import { hashFilesInFolder } from "./files";
import { Width } from "./widthData";

const SCRATCH_WIDTH = 480;

const { argv } = yargs(process.argv.slice(2))
  .options({
    framesPerStrip: {
      type: "number",
      alias: "n",
      default: 30,
      description: "The number of frames in a strip",
    },
    input: {
      type: "string",
      alias: "i",
      demandOption: true,
      description: "Path to the video file",
    },
    output: {
      type: "string",
      alias: "o",
      demandOption: true,
      description: "Filename and path to the output file. End in `.sb3`",
    },
    horizontalResolution: {
      type: "number",
      choices: [480, 240, 120],
      alias: "w",
      default: 480,
      description: "The width of each frame",
    },
    temporaryFolder: {
      type: "string",
      alias: "t",
      default: "temp/",
      coerce: (opt) => {
        let loc = path.join(__dirname, opt);
        if (existsSync(loc)) {
          // Clear existing temporary folder
          fs.readdirSync(loc).forEach((file) =>
            fs.unlinkSync(path.resolve(loc, file))
          );
        } else {
          // Create the folder
          fs.mkdirSync(loc);
        }
        return loc;
      },
      normalize: true,
      description:
        "Path to a temporary folder for use while building the project",
    },
    imageFileFormat: {
      choices: ["png", "jpg"],
      alias: "f",
      default: "png",
      description: "The file format of frames in the output",
    },
    frameRate: {
      type: "number",
      alias: "r",
      description: "The framerate of the output",
    },
    audioInterval: {
      type: "number",
      alias: "s",
      default: 0,
      description: "The number of seconds between cuts in the audio",
      defaultDescription: "No cuts",
    },
  })
  .wrap(yargs.terminalWidth());

enum ProjectReplacementString {
  VIDEO = "[false,1,1]",
  AUDIO = "[false,1,2]",
  FRAMERATE = "[false,1,3]",
  FRAMES = "[false,1,4]",
  SCALE = "[false,1,5]",
  STRIP = "[false,1,6]",
  AUDIO_INTERVAL = "[false,1,7]",
  WIDTH = "[false,1,8]",
  DISPLACEMENT = "[false,1,9]",
  Y_VALUE = "[false,1,10]",
}

if (!existsSync(argv.input)) throw new Error("Input file not found!");
if (existsSync(argv.output)) console.error("Overwriting output file!");

(async () => {
  const inputFileDetails = await obtainMediaInfo({ inputFile: argv.input });
  console.log(inputFileDetails);
  const videoStreamDetails = inputFileDetails.streams.find(
    (stream) => stream.codec_type === "video"
  );
  if (!videoStreamDetails) {
    throw new Error("Video stream not found!");
  }

  const videoStreamFrameRate = parseFrameRate({
    frameRate: videoStreamDetails.r_frame_rate,
  });
  let outputFrameRate = 0;
  if (argv.frameRate && argv.frameRate < videoStreamFrameRate.value) {
    outputFrameRate = argv.frameRate;
  } else {
    outputFrameRate = videoStreamFrameRate.value;
  }

  await convertInputToAudio({
    inputFile: argv.input,
    tempFolder: argv.temporaryFolder,
    audioInterval: argv.audioInterval,
  });

  await convertInputToPictures({
    inputFile: argv.input,
    tempFolder: argv.temporaryFolder,
    framesPerStrip: argv.framesPerStrip,
    selectedFrameRate: argv.frameRate,
    realFrameRate: videoStreamFrameRate.value,
    fileFormat: argv.imageFileFormat,
    horizontalResolution: argv.horizontalResolution,
  });

  const hashFiles = await hashFilesInFolder({ folder: argv.temporaryFolder });
  const costumes = convertToCostumes(
    hashFiles.filter((file) => file.extension.endsWith(argv.imageFileFormat))
  );
  const audioClips = convertToAudioSnippets(
    hashFiles.filter((file) => file.extension.endsWith("mp3"))
  );
  const frames = argv.framesPerStrip * costumes.length;
  const soundInterval = argv.audioInterval * outputFrameRate;

  const widthData = Width.getWidth(argv.horizontalResolution);

  let output = JSON.stringify(templateProject)
    .replaceAll(ProjectReplacementString.VIDEO, JSON.stringify(costumes))
    .replaceAll(ProjectReplacementString.AUDIO, JSON.stringify(audioClips))
    .replaceAll(ProjectReplacementString.FRAMES, frames.toString())
    .replaceAll(
      ProjectReplacementString.SCALE,
      ((SCRATCH_WIDTH / argv.horizontalResolution) * 200).toString()
    )
    .replaceAll(ProjectReplacementString.STRIP, argv.framesPerStrip.toString())
    .replaceAll(
      ProjectReplacementString.AUDIO_INTERVAL,
      soundInterval.toString()
    )
    .replaceAll(
      ProjectReplacementString.WIDTH,
      argv.horizontalResolution.toString()
    )
    .replaceAll(
      ProjectReplacementString.DISPLACEMENT,
      widthData.displacement.toString()
    )
    .replaceAll(ProjectReplacementString.Y_VALUE, widthData.y.toString());

  output = output.replaceAll(
    ProjectReplacementString.FRAMERATE,
    outputFrameRate.toString()
  );

  const outputStream = fs.createWriteStream(argv.output);
  const zip = archiver('zip', {
    store: true
  });
  zip.pipe(outputStream);

  fs.readdirSync(argv.temporaryFolder).forEach((file) =>
    zip.file(path.resolve(argv.temporaryFolder, file), {
      name: file
    })
  );

  zip.file(
    path.join(__dirname, templateBackground),
    {
      name: "8f403c1439e63a0e3049e8ac4442b451.svg"
    }
  );
  zip.append(Buffer.from(output), { name: "project.json" });

  zip.finalize();
})();
