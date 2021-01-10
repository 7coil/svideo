import { Container, ImageFileFormats } from "./enum";
import { Video } from "./Video";
import path from "path";
import { spawn } from "child_process";

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
}

interface ExtractAudioInput {
  video: Video;
  tempFolder: string;
}

class FFmpeg {
  static convertToFrames(input: ExtractVideoInput) {
    return new Promise<void>((resolve, reject) => {
      const args: string[] = [];
      const filters: string[] = [];

      args.push("-i", input.video.filename);

      // Check if the framerate has been changed
      if (input.framerate) {
        // If so, set the output framerate
        filters.push("fps=fps=" + input.framerate);
      }
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

      const ffmpeg = spawn("ffmpeg.exe", args, { stdio: "inherit" });

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
      const args = [];

      args.push("-i", input.video.filename);
      args.push(path.resolve(input.tempFolder, "0.mp3"));

      const ffmpeg = spawn("ffmpeg.exe", args, { stdio: "inherit" });

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
