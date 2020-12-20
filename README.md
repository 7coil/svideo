# scratch-player
Convert video into MIT Scratch!

## Help
For support, try [my discord server](https://discordapp.com/invite/wHgdmf4).

## Usage
1. Install dependencies with `yarn`
2. Build project with `yarn build`
3. Run `node dist/ -i [video file] -o [output file].sb3`

When uploading to Scratch, you may wish to use a Chromium based web browser, such as NAVER Whale or Microsoft Edge.

### System Requirements
Make sure your project can be built and ran on people's computers!

Format | Project Size    | Upload RAM         | Playback RAM
------ | --------------- | ------------------ | ------------------
.jpg   | 78.6 Megabytes  | 8 Gigabytes        | 3.6 Gigabytes

### Options

```
    --help                  Show help                                                                                              [boolean]
    --version               Show version number                                                                                    [boolean]
-n, --framesPerStrip        The number of frames in a strip                                                           [number] [default: 30]
-i, --input                 Path to the video file                                                                       [string] [required]
-o, --output                Filename and path to the output file. End in `.sb3`                                          [string] [required]
-w, --horizontalResolution  The width of each frame                                         [number] [choices: 480, 240, 120] [default: 480]
-t, --temporaryFolder       Path to a temporary folder for use while building the project                        [string] [default: "temp/"]
-f, --imageFileFormat       The file format of frames in the output                                 [choices: "png", "jpg"] [default: "png"]
-r, --frameRate             The framerate of the output                                                                             [number]
-s, --audioInterval         The number of seconds between cuts in the audio                                      [number] [default: No cuts]
```

## Preview
### The Computer Chronicles - Mainframes to Minis to Micros (1983)
- https://www.youtube.com/watch?v=wpXnqBfgvPM
- https://scratch.mit.edu/projects/443025331/

[![Mainframes to Mini to Micros by The Computer Chronicles](.github/QoNCoHieuU.gif)](https://scratch.mit.edu/projects/443025331/)

### LOONA - Hi High
- https://scratch.mit.edu/projects/443000433/  
- https://www.youtube.com/watch?v=846cjX0ZTrk

[![Hi High by LOONA](.github/kyOWaRye4g.gif)](https://scratch.mit.edu/projects/443000433/)

### LOONA - Why Not?
- https://scratch.mit.edu/projects/443018391/
- https://www.youtube.com/watch?v=b6li05zh3Kg

[![Why Not? by LOONA](.github/6ogFn8GBAR.gif)](https://scratch.mit.edu/projects/443018391/)

## Licence
This project is licenced under the MIT licence. Because it's MIT Scratch. Haha.
