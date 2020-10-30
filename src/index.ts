import fs, { existsSync, mkdirSync } from 'fs';
import path from 'path';
import 'regenerator-runtime';
import { convertToAudioSnippets, convertToCostumes } from './assets';
import { convertInputToAudio, convertInputToPictures } from './ffmpeg';
import { hashFilesInFolder } from './files';
import AdmZip from 'adm-zip';

const templateVideoReplacementString = '["// SCRATCHVIDEO //"]';
const templateAudioReplacementString = '["// SCRATCHAUDIO //"]';
const templateFramesReplacementRegex = /0e5318008/g
const stripFrameCount = 30;

const template = fs.readFileSync(path.join(__dirname, '..', 'template', 'project.json'), 'utf8')

if (!process.argv[3]) throw new Error('Second argument must be an output folder.')

const inputFile = process.argv[2];
const outputFile = process.argv[3];
if (!existsSync(inputFile)) throw new Error('Input file not found!')
if (existsSync(outputFile)) console.error('Overwriting output file!')
if (!existsSync('temp')) mkdirSync('temp')

const templateFolder = path.resolve('template/');
const tempFolder = path.resolve('temp/');

(async () => {
  fs.readdirSync(tempFolder)
    .forEach(file => fs.unlinkSync(path.resolve(tempFolder, file)))

  await convertInputToPictures({ inputFile, tempFolder, stripFrameCount })
  await convertInputToAudio({ inputFile, tempFolder })
  const hashFiles = await hashFilesInFolder({ folder: tempFolder })
  const costumes = convertToCostumes(hashFiles.filter(file => file.extension === '.png'));
  const audioClips = convertToAudioSnippets(hashFiles.filter(file => file.extension === '.mp3'));
  const frames = stripFrameCount * costumes.length

  const output = template
    .replace(templateVideoReplacementString, JSON.stringify(costumes))
    .replace(templateAudioReplacementString, JSON.stringify(audioClips))
    .replace(templateFramesReplacementRegex, frames.toString())

  const filesToCopy = fs.readdirSync(templateFolder);
  filesToCopy
    .filter(file => file !== 'project.json')
    .forEach(file => fs.copyFileSync(
      path.resolve(templateFolder, file),
      path.resolve(tempFolder, file)
    ))

  fs.writeFileSync(
    path.resolve(tempFolder, 'project.json'),
    JSON.stringify(JSON.parse(output), null, 2)
  )

  const zip = new AdmZip();
  fs.readdirSync(tempFolder)
    .forEach(file => zip.addLocalFile(path.resolve(tempFolder, file)))
  
  zip.writeZip(outputFile);
})()
