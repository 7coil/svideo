# scratch-player
Convert video into MIT Scratch!

## Help
For support, try [my discord server](https://discordapp.com/invite/wHgdmf4).

## Usage
1. Install dependencies with `yarn`
2. Build project with `yarn build`
3. Run `node dist/ -i [video file] -o [output file].sb3`

When uploading to Scratch, you may wish to use a Chromium based web browser, such as NAVER Whale or Microsoft Edge.

### Recommended Options
1. Use the JPEG file format with `-f jpg`
2. Use high quality JPEG with `-q 4`. A lower number like `3` or `2` will increase quality further.

### System Requirements
Make sure your project can be built and ran on people's computers!

Link to Example                                                                                              | Format | Resolution      | Quality         | Project Size       | Upload RAM         | Playback RAM
------------------------------------------------------------------------------------------------------------ | ------ | --------------- | --------------- | ------------------ | ------------------ | -------------------
[The Computer Chronicles - Year 2000 (Y2K) (1999)](https://scratch.mit.edu/projects/466382087/)              | .jpg   | 240x160         | 2 (Best)        | 327 Megabytes      | 8 Gigabytes        | 8.7 Gigabytes
[[MV] 이달의 소녀 yyxy (LOONA/yyxy) "love4eva (feat. Grimes)"](https://scratch.mit.edu/projects/466370021/)   | .jpg   | 480x360         | 4 (Good)        | 61 Megabytes       | 5.1 Gigabytes      | 6.3 Gigabytes

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
-q, --quality               The quality of JPEG output, from 2 (best) to 31 (worst)                                                 [number]
-s, --audioInterval         The number of seconds between cuts in the audio                                      [number] [default: No cuts]
```

## Licence
This project is licenced under the MIT licence. Because it's MIT Scratch. Haha.
