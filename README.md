# scratch-player
Convert video into MIT Scratch!

## Help
For support, try [my discord server](https://discordapp.com/invite/wHgdmf4).

## Usage
You may need to edit the FFMPEG commands to fit your use case.
This is found in `ffmpeg.ts`.

1. Install dependencies with `yarn`
2. Build project with `yarn build`
3. Run `node dist/ [video file] [output file].sb3`

### Terrible Changes
#### Frame Rate
```ts
const ffmpeg = spawn(ffmpegExecutable, [
  '-i', inputFile,
  '-vf', `fps=fps=10,scale=240:-1,tile=${stripFrameCount}x1`,
  path.resolve(tempFolder, '%03d.png')
], {
  stdio: 'inherit'
})
```

Remove `fps=fps=10,` for the original framerate.
Change the number for a different framerate.
This makes FFMPEG run much faster.

Please edit the framerate within the Scratch file after importing.

#### Audio Splitting
```ts
const ffmpeg = spawn(ffmpegExecutable, [
  '-i', inputFile,
  '-f', 'segment',
  '-segment_time', '60',
  path.resolve(tempFolder, '%03d.mp3')
], {
  stdio: 'inherit'
})
```
You need to reimplement the audio playing functionality in Scratch to accept multiple files.

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

[![Why Not? by LOONA](.github/FrbZCOUwBt.gif)](https://scratch.mit.edu/projects/443018391/)

## Licence
This project is licenced under the MIT licence. Because it's MIT Scratch. Haha.
