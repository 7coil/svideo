import ffmpeg from "ffmpeg-static";

class PlatformInformation {
  static getPlatformBinaryExtension() {
    switch (process.platform) {
      case "win32":
        return ".exe";
      default:
        return "";
    }
  }

  static getEncoderBinaryPath(): string {
    return ffmpeg;
  }
}

export { PlatformInformation };
