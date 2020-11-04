import ffmpegExecutable from 'ffmpeg-static'
import ffprobeExecutable from 'ffprobe-static';

import ffprobe from 'ffprobe';
import { spawn } from 'child_process'
import path from 'path';

const obtainMediaInfo = ({
  inputFile
}: {
  inputFile: string,
}) => ffprobe(inputFile, { path: ffprobeExecutable.path })

const convertInputToPictures = ({
  inputFile,
  fileFormat,
  tempFolder,
  framesPerStrip,
  selectedFrameRate,
  realFrameRate,
  horizontalResolution = 480,
}: {
  inputFile: string,
  fileFormat: string,
  tempFolder: string,
  framesPerStrip: number,
  selectedFrameRate?: number,
  realFrameRate: number,
  horizontalResolution: number,
}) => new Promise((resolve, reject) => {
  const args = [];
  let filters = [];

  // Give FFMPEG the input file
  args.push('-i', inputFile)

  // Set output rate if selected framerate is less than the real one
  if (selectedFrameRate && selectedFrameRate < realFrameRate) {
    filters.push(`fps=fps=${selectedFrameRate}`)
  }
  filters.push(`scale=${horizontalResolution}:-1`)
  filters.push(`tile=${framesPerStrip}x1`)
  args.push('-vf', filters.join(','))

  // Add output file
  args.push(path.resolve(tempFolder, '%03d.' + fileFormat))
  
  const ffmpeg = spawn(ffmpegExecutable, args, { stdio: 'inherit' })
  
  ffmpeg.on('error', () => {
    reject(new Error('Failed to convert video to picture strip.'))
  })
  
  ffmpeg.on('exit', (exitCode) => {
    if (exitCode) {
      reject(new Error('FFMPEG exited... in a bad way!'))
    } else {
      resolve()
    }
  })
})

const parseFrameRate = ({
  frameRate,
}: {
  frameRate: string
}) => {
  const [numerator, denominator] = frameRate.split('/').map(num => parseInt(num, 10))

  return {
    numerator, denominator,
    value: numerator / denominator
  }
}

const convertInputToAudio = ({
  inputFile,
  tempFolder,
  audioInterval,
}: {
  inputFile: string,
  tempFolder: string,
  audioInterval: number,
}) => new Promise((resolve, reject) => {
  const args = [];

  args.push('-i', inputFile)
  
  if (audioInterval) {
    args.push('-f', 'segment', '-segment_time', audioInterval)
    args.push('-q:a', '0', '-map', 'a')
    args.push(path.resolve(tempFolder, '%03d.mp3'))
  } else {
    args.push(path.resolve(tempFolder, '0.mp3'))
  }

  const ffmpeg = spawn(ffmpegExecutable, args, { stdio: 'inherit' })
  
  ffmpeg.on('error', () => {
    reject(new Error('Failed to convert video to picture strip.'))
  })
  
  ffmpeg.on('exit', (exitCode) => {
    if (exitCode) {
      reject(new Error('FFMPEG exited... in a bad way!'))
    } else {
      resolve()
    }
  })
})

export {
  convertInputToPictures,
  convertInputToAudio,
  obtainMediaInfo,
  parseFrameRate
}
