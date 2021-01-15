import { spawn } from "child_process";
import { copyFileSync, unlinkSync } from "fs";
import path, { parse } from "path";
import { Container, ImageFileFormats } from "./enum";
import { PlatformInformation } from "./PlatformInformation";
import { Video } from "./Video";

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
}

interface ExtractAudioInput {
  video: Video;
  tempFolder: string;
  audioInterval: number;
}

class FFmpeg {
  static convertToFrames(input: ExtractVideoInput) {
    return new Promise<void>((resolve, reject) => {
      const args: string[] = [];
      const filters: string[] = [];
      let tempSubtitlesFileName: string;

      args.push("-i", input.video.filename);

      if (input.videoFilters) filters.push(input.videoFilters);
      if (input.framerate) filters.push("fps=fps=" + input.framerate);

      filters.push(
        `scale=${input.width}:${input.height}:force_original_aspect_ratio=decrease`
      );
      filters.push(`pad=${input.width}:${input.height}:-1:-1`);
      if (input.subtitles) {
        const parsedSubtitlesFile = parse(input.subtitles)
        tempSubtitlesFileName = 'subtitles' + parsedSubtitlesFile.ext
        copyFileSync(input.subtitles, path.resolve(input.tempFolder, tempSubtitlesFileName))
        filters.push(`subtitles=${tempSubtitlesFileName}`);
      }
      filters.push(`tile=${input.rows}x${input.columns}`);

      args.push("-vf", filters.join(","));

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

      const ffmpeg = spawn(
        "ffmpeg" + PlatformInformation.getPlatformBinaryExtension(),
        args,
        { stdio: "inherit", cwd: input.tempFolder }
      );

      ffmpeg.on("exit", (code) => {
        if (tempSubtitlesFileName) unlinkSync(path.resolve(input.tempFolder, tempSubtitlesFileName));

        if (code) {
          reject(new Error(`FFmpeg exited with exit code ${code}`));
        } else {
          resolve();
        }
      });
    });
  }

  static convertToAudio = (input: ExtractAudioInput) => {
    return new Promise<void>((resolve, reject) => {
      const args: string[] = [];

      args.push("-i", input.video.filename);

      if (input.audioInterval) {
        args.push(
          "-f",
          "segment",
          "-segment_time",
          input.audioInterval.toString()
        );
        args.push("-q:a", "0", "-map", "a");
        args.push(path.resolve(input.tempFolder, "%03d.mp3"));
      } else {
        args.push(path.resolve(input.tempFolder, "0.mp3"));
      }

      const ffmpeg = spawn(
        "ffmpeg" + PlatformInformation.getPlatformBinaryExtension(),
        args,
        { stdio: "inherit", cwd: input.tempFolder }
      );

      ffmpeg.on("exit", (code) => {
        if (code) {
          reject(new Error(`FFmpeg exited with exit code ${code}`));
        } else {
          resolve();
        }
      });
    });
  };
}

export { FFmpeg };
