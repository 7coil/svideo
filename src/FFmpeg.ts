import { spawn } from "child_process";
import { copyFileSync, unlinkSync } from "fs";
import path, { parse } from "path";
import { Container, ImageFileFormats } from "./enum";
import { PlatformInformation } from "./PlatformInformation";
import { Video } from "./Video";

interface ExtractInput {
  width: number;
  height: number;
  format: ImageFileFormats;
  container: Container;
  compressionLevel: number;
  video: Video;
  framerate: number | null;
  rows: number;
  columns: number;
  tempFolder: string;
  subtitles: string;
  videoFilters: string;
  backgroundColour: string;
  startPosition: string | undefined;
  endPosition: string | undefined;
  audioInterval: number;
}

interface ExtractVideoInput {
  width: number;
  height: number;
  format: ImageFileFormats;
  container: Container;
  compressionLevel: number;
  video: Video;
  framerate: number | null;
  rows: number;
  columns: number;
  tempFolder: string;
  subtitles: string;
  videoFilters: string;
  backgroundColour: string;
  startPosition: string | undefined;
  endPosition: string | undefined;
}

interface ExtractAudioInput {
  video: Video;
  tempFolder: string;
  audioInterval: number;
  startPosition: string | undefined;
  endPosition: string | undefined;
}

class FFmpeg {
  static createVideoFilters(input: ExtractInput) {
    const filters: string[] = [];

    if (input.videoFilters) filters.push(input.videoFilters);
    if (input.framerate) filters.push("fps=fps=" + input.framerate);

    filters.push(
      `scale=${input.width}:${input.height}:force_original_aspect_ratio=decrease`
    );
    filters.push(
      `pad=${input.width}:${input.height}:-1:-1:color=${input.backgroundColour}`
    );
    if (input.subtitles) {
      const parsedSubtitlesFile = parse(input.subtitles);
      copyFileSync(
        input.subtitles,
        path.resolve(input.tempFolder, "subtitles" + parsedSubtitlesFile.ext)
      );
      filters.push(`subtitles=subtitles${parsedSubtitlesFile.ext}`);
    }
    filters.push(`tile=${input.rows}x${input.columns}`);

    return filters;
  }

  static createVideoFiltersString(input: ExtractInput) {
    return FFmpeg.createVideoFilters(input).join(",");
  }

  static convert(input: ExtractInput) {
    return new Promise<void>((resolve, reject) => {
      const args: string[] = [];

      args.push("-i", input.video.path);

      /**
       * Video Section
       */
      if (input.startPosition) args.push("-ss", input.startPosition);
      if (input.endPosition) args.push("-to", input.endPosition);
      args.push("-vf", FFmpeg.createVideoFiltersString(input));

      args.push("-map", "0:v");
      args.push("-c:v", "mjpeg");

      // Add format dependant arguments
      switch (input.format) {
        case ImageFileFormats.JPEG:
          args.push("-q:v", input.compressionLevel.toString());
          break;
        case ImageFileFormats.PNG:
          args.push("-compression_level", input.compressionLevel.toString());
          break;
      }

      args.push(path.resolve(input.tempFolder, "%05d." + input.format));

      /**
       * Audio Section
       */
      args.push("-map", "0:a");
      args.push("-c:a", "libmp3lame");

      if (input.audioInterval) {
        args.push(
          "-f",
          "segment",
          "-segment_time",
          input.audioInterval.toString()
        );
        args.push("-q:a", "0");
        args.push(path.resolve(input.tempFolder, "%03d.mp3"));
      } else {
        args.push(path.resolve(input.tempFolder, "000.mp3"));
      }

      const ffmpeg = spawn(
        "ffmpeg" + PlatformInformation.getPlatformBinaryExtension(),
        args,
        { stdio: "inherit", cwd: input.tempFolder }
      );

      ffmpeg.on("exit", (code) => {
        if (input.subtitles) {
          const parsedSubtitlesFile = parse(input.subtitles);
          unlinkSync(
            path.resolve(
              input.tempFolder,
              "subtitles" + parsedSubtitlesFile.ext
            )
          );
        }

        if (code) {
          console.error("Failed Arguments: ", args);
          reject(new Error(`FFmpeg exited with exit code ${code}`));
        } else {
          resolve();
        }
      });
    });
  }
}

export { FFmpeg };
