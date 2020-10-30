import ffmpegExecutable from 'ffmpeg-static'
import { spawn } from 'child_process'
import path from 'path';

const convertInputToPictures = ({
  inputFile,
  tempFolder,
  stripFrameCount,
}: {
  inputFile: string,
  tempFolder: string,
  stripFrameCount: number,
}) => new Promise((resolve, reject) => {
  const ffmpeg = spawn(ffmpegExecutable, [
    '-i', inputFile,
    '-vf', `fps=fps=10,scale=240:-1,tile=${stripFrameCount}x1`,
    path.resolve(tempFolder, '%03d.png')
  ], {
    stdio: 'inherit'
  })
  
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

const convertInputToAudio = ({
  inputFile,
  tempFolder,
}: {
  inputFile: string,
  tempFolder: string,
}) => new Promise((resolve, reject) => {
  const ffmpeg = spawn(ffmpegExecutable, [
    '-i', inputFile,
    '-f', 'segment',
    '-segment_time', '60',
    path.resolve(tempFolder, '%03d.mp3')
  ], {
    stdio: 'inherit'
  })
  
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
  convertInputToAudio
}
