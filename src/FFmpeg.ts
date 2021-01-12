import { spawn } from "child_process";
import path from "path";
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

      args.push("-i", input.video.filename);

      if (input.framerate) filters.push("fps=fps=" + input.framerate);

      if (input.subtitles)
        filters.push(`subtitles=${input.subtitles.replace(/\.[/\\]/g, "")}`);

      filters.push(
        `scale=${input.width}:${input.height}:force_original_aspect_ratio=decrease`
      );
      filters.push(`pad=${input.width}:${input.height}:-1:-1`);
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
        { stdio: "inherit" }
      );

      ffmpeg.on("exit", (code) => {
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
        args.push("-f", "segment", "-segment_time", input.audioInterval.toString());
        args.push("-q:a", "0", "-map", "a");
        args.push(path.resolve(input.tempFolder, "%03d.mp3"));
      } else {
        args.push(path.resolve(input.tempFolder, "0.mp3"));
      }

      const ffmpeg = spawn(
        "ffmpeg" + PlatformInformation.getPlatformBinaryExtension(),
        args,
        { stdio: "inherit" }
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
