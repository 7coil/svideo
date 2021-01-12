# SVideo for Scratch

Convert your videos into an animated Scratch project!

- [leondrolio.com](https://leondrolio.com)
- [technical support on my discord server ✨](https://discordapp.com/invite/wHgdmf4).

Features:

- Uses FFmpeg to convert into frames
  - Hardcode subtitles
  - Adjustable resolution
- Ability to split audio into chunks

## Examples

<details>
  <summary>이달의소녀탐구 #1 (LOONA TV #1)</summary>

- [YouTube](https://www.youtube.com/watch?v=MfqGn-2pW8E)
- [Scratch Project](https://scratch.mit.edu/projects/472096033/)

![A gif of the above video](.github/RNzkFJm9r4.gif)

</details>

## Installation

```bash
npm i -g svideo
```

### Command Line Interface

```bash
svideo -i input.mp4 -o output.sb3
```

<details>
  <summary>Command Line Arguments</summary>

```
Options:
    --help              Show help                                                                                       [boolean]
    --version           Show version number                                                                             [boolean]
    --rows, --row       The number of rows to place in the grid                                            [number] [default: 30]
    --columns, --col    The number of columns to place in the grid                                         [number] [default: 20]
-i, --input             Input file to convert                                                                 [string] [required]
-o, --output            Destination file for the Scratch `.sb3` archive                                       [string] [required]
-w, --width             The width of each frame                                                           [number] [default: 480]
-t, --temporaryFolder   Path to a temporary folder for use while building the project                 [string] [default: "temp/"]
-f, --imageFileFormat   The file format of frames in the output                          [choices: "jpg", "png"] [default: "jpg"]
-r, --frameRate         The framerate of the output                                                                      [number]
-q, --compressionLevel  The compression level of the image. 1-100 for PNG and 1-32 for JPEG                              [number]
-a, --audioInterval     The number of seconds between cuts in the audio                               [number] [default: No cuts]
-s, --subtitles         Hardcode (burn) subtitles onto the video                                                         [string]
```

</details>

### API

You can interface with svideo with the application programming interface instead if you wish.
Comments for each method will be included at a later date. (or if someone does it before I do)

- yarn: `yarn add svideo`
- npm: `npm i --save svideo`

```js
// ES6 Import Statements
import svideo from "svideo";

// Not ES6 Require Statement
// const svideo = require("svideo");

// Create a new SVideo Application
const app = new svideo.App();

(async () => {
  // Set the input file
  await app.setFile("wooper.mp4");

  // Set the subtitles file
  app.setSubtitlesFile("wooper.en.vtt");

  // Set the output file
  app.setOutputFile("wooper.sb3");

  // Print information
  console.log(app.toString());

  // Convert and commit changes
  await app.convert();
})();
```

#### Examples

<details>
<summary>Convert correctly numbered LOONA TV episodes in the <strong>tv/</strong> folder, while hardcoding subtitles if available</summary>

```mjs
import { existsSync, readdirSync, renameSync } from "fs";
import { resolve, parse } from "path";
import SVideo from "../dist/index.js";

const videos = readdirSync("tv")
  .map((file) => parse(file))
  .filter((video) => [".mp4", ".webm", ".mkv"].includes(video.ext))
  .sort((a, b) => parseInt(a.name, 10) - parseInt(b.name, 10))
  .map((video) => {
    const videoPath = resolve("tv", video.base);
    const subtitlePath = resolve("tv", video.name + ".vtt");
    let subtitle;

    if (!existsSync(videoPath)) throw new Error("Cannot find " + videoPath);
    if (!existsSync(subtitlePath)) {
      console.log("Cannot find " + subtitlePath);
    } else {
      subtitle = "tv/" + video.name + ".vtt";
    }

    return {
      name: video.name,
      folder: resolve("tv"),
      video: videoPath,
      subtitle,
    };
  });

console.log(videos);

for (const video of videos) {
  const converter = new SVideo.App();

  console.log(video);

  converter.setTempFolder();
  await converter.setFile(video.video);
  if (video.subtitle) converter.setSubtitlesFile(video.subtitle);
  converter.setWidth(480);
  converter.setColumns(20);
  converter.setRows(10);
  converter.setOutputFile(
    resolve(
      video.folder,
      `이달의소녀탐구 #${video.name} (LOONA TV #${video.name}).sb3`
    )
  );

  console.log(converter.toString());

  await converter.convert();
}
```

</details>

## Licence

This project is licenced under the MIT licence. Because it's MIT Scratch. Haha.
