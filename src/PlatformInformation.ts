class PlatformInformation {
  static getPlatformBinaryExtension() {
    switch (process.platform) {
      case "win32":
        return ".exe";
      default:
        return "";
    }
  }
}

export { PlatformInformation };
