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

class FFmpeg {
  static dropCountRegex = /drop_count:(-?\d+)/;

  static createVideoFilters(input: ExtractInput) {
    const filters: string[] = [];

    if (input.videoFilters) filters.push(input.videoFilters);
    if (input.framerate) filters.push("fps=fps=" + input.framerate);

    filters.push("mpdecimate");
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

  static convert(input: ExtractInput): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      const args: string[] = [];

      // The Video input
      args.push("-i", input.video.path);

      // Set a loglevel of debug to allow SVideo to
      // detect skipped frames
      args.push("-loglevel", "debug");

      /**
       * Video Section
       */
      if (input.startPosition) args.push("-ss", input.startPosition);
      if (input.endPosition) args.push("-to", input.endPosition);

      args.push("-vsync", "0");
      args.push("-frame_pts", "true");
      args.push("-vf", FFmpeg.createVideoFiltersString(input));
      args.push("-map", "0:v");

      // Add format dependant arguments
      switch (input.format) {
        case ImageFileFormats.JPEG:
          args.push("-c:v", "mjpeg");
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

      let reverseTime = 0;
      const frameReverse: number[] = [];

      const ffmpeg = spawn(PlatformInformation.getEncoderBinaryPath(), args, {
        cwd: input.tempFolder,
      });

      ffmpeg.stderr.on("data", (chunk) => {
        const textChunk = chunk.toString("utf-8");
        const mcdecimateLine = this.dropCountRegex.exec(textChunk);

        if (mcdecimateLine) {
          // ffmpeg has just processed a frame - See if we've dropped a frame or not.
          const dropCount = parseInt(mcdecimateLine[1], 10);

          // Every time we drop a frame, we must increase the number of frames
          // that we are "looking back" over time.
          if (dropCount > 0) reverseTime--;

          // Record the current number of frames to "look back"
          frameReverse.push(reverseTime);
        }
      });

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
          resolve(frameReverse);
        }
      });
    });
  }
}

export { FFmpeg };
