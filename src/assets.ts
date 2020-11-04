import { RenamedFile } from './files';

interface Costume {
  assetId: string,
  name: string,
  bitmapResolution: number,
  md5ext: string,
  dataFormat: string,
  rotationCenterX: number,
  rotationCenterY: number,
}

interface Audio {
  assetId: string;
  name: string;
  dataFormat: string,
  rate: number;
  sampleCount: number;
  md5ext: string;
}

// {
//   "assetId": "6c5fae0eacd0969d518c46573029266b",
//   "name": "chuu",
//   "dataFormat": "mp3",
//   "rate": 48000,
//   "sampleCount": 11734896,
//   "md5ext": "6c5fae0eacd0969d518c46573029266b.mp3"
// }

const convertToCostumes = (files: RenamedFile[]): Costume[] => files.map(file => ({
  assetId: file.hash,
  name: file.number.toString() + '.' + file.extension,
  bitmapResolution: 2,
  md5ext: file.hash + '.' + file.extension,
  dataFormat: file.extension,
  rotationCenterX: 7920,
  rotationCenterY: 135,
}))

const convertToAudioSnippets = (files: RenamedFile[]): Audio[] => files.map(file => ({
  assetId: file.hash,
  name: file.number.toString() + '.' + file.extension,
  md5ext: file.hash + '.' + file.extension,
  dataFormat: file.extension,
  rate: 48000,
  sampleCount: 1,
}))

export {
  Costume, convertToCostumes, convertToAudioSnippets
}