import ffmpeg from "ffmpeg-static";
import ffprobe from "ffprobe-static";

class PlatformInformation {
  static getEncoderBinaryPath(): string {
    return ffmpeg;
  }

  static getFfprobeBinaryPath(): string {
    return ffprobe.path;
  }
}

export { PlatformInformation };
