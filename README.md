# SVideo for Scratch

Convert your videos into an animated Scratch project!

- Uses FFmpeg to convert into frames
    - Hardcode subtitles
    - Adjustable resolution
- Ability to split audio into chunks

## Examples
[이달의소녀탐구 #1 (LOONA TV #1)](https://scratch.mit.edu/projects/472096033/)  
![A gif of the above video](.github/RNzkFJm9r4.gif)

## Installation

```bash
npm i -g svideo
```

### Command Line Interface

```bash
svideo -i input.mp4 -o output.sb3
```

#### Advanced Options

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

### API

- yarn: `yarn add 7coil/svideo`
- npm: `npm i --save 7coil/svideo`

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

## Help

For support, try [my discord server ✨](https://discordapp.com/invite/wHgdmf4).

## Licence

This project is licenced under the MIT licence. Because it's MIT Scratch. Haha.
