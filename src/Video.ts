import ffprobe from "ffprobe";
import path from "path";
import { PlatformInformation } from "./PlatformInformation";

interface Framerate {
  value: number;
  numerator: number;
  denominator: number;
}

class Video {
  filename: string;
  path: string;
  framerate: Framerate;
  x: number;
  y: number;
  audio: boolean = false;

  constructor(filename: string) {
    this.path = path.resolve(process.cwd(), filename);
    this.filename = filename;
  }

  async init(): Promise<void> {
    const data = await ffprobe(this.path, {
      path: "ffprobe" + PlatformInformation.getPlatformBinaryExtension(),
    });

    const videoStream = data.streams.find(
      (stream) => stream.codec_type === "video"
    );

    const audioStream = data.streams.find(
      (stream) => stream.codec_type === "audio"
    );

    if (!videoStream)
      throw new Error("Cannot find the video stream from the video file");

    this.framerate = Video.parseFrameRate(videoStream.r_frame_rate);
    this.x = videoStream.width;
    this.y = videoStream.height;
    this.audio = !!audioStream;
  }

  getAspectRatio() {
    return this.x / this.y;
  }

  static parseFrameRate(rate: string) {
    // Split the fraction into the numerator and denominator.
    const [numerator, denominator] = rate
      .split("/")
      .map((number) => parseInt(number, 10));

    return {
      value: numerator / denominator,
      numerator,
      denominator,
    };
  }
}

export { Video };
