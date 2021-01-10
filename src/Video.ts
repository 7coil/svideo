import ffprobe from "ffprobe";

const DURATION_REGEX = /(\d+):(\d+):(\d+\.\d+)/;

interface Framerate {
  value: number;
  numerator: number;
  denominator: number;
}

class Video {
  filename: string;
  framerate: Framerate;
  x: number;
  y: number;
  length: number;
  audio: boolean = false;

  constructor(filename: string) {
    this.filename = filename;
  }

  async init(): Promise<void> {
    const data = await ffprobe(this.filename, {
      path: "ffprobe.exe",
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
    this.length = videoStream.duration || Video.parseDuration((videoStream.tags as any).DURATION);
    this.audio = !!audioStream;
  }

  getAspectRatio() {
    return this.x / this.y;
  }

  static parseDuration(duration: string): number {
    const parsed = DURATION_REGEX.exec(duration);

    if (parsed) {
      let seconds = 0;
      const hours = parseInt(parsed[3], 10);
      const minutes = parseInt(parsed[2], 10);
      seconds += parseFloat(parsed[1]);
      seconds += minutes * 60;
      seconds += hours * 60 * 60;

      return seconds;
    } else {
      throw new Error("Could not parse the value");
    }
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
