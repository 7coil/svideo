import { RenamedFile } from './files';

enum DataFormat {
  SVG = 'svg',
  PNG = 'png',
  MP3 = 'mp3',
}

interface Costume {
  assetId: string,
  name: string,
  bitmapResolution: number,
  md5ext: string,
  dataFormat: DataFormat,
  rotationCenterX: number,
  rotationCenterY: number,
}

interface Audio {
  assetId: string;
  name: string;
  dataFormat: DataFormat,
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
  name: file.number.toString() + '.' + DataFormat.PNG,
  bitmapResolution: 2,
  md5ext: file.hash + '.' + DataFormat.PNG,
  dataFormat: DataFormat.PNG,
  rotationCenterX: 7920,
  rotationCenterY: 135,
}))

const convertToAudioSnippets = (files: RenamedFile[]): Audio[] => files.map(file => ({
  assetId: file.hash,
  name: file.number.toString() + '.' + DataFormat.MP3,
  md5ext: file.hash + '.' + DataFormat.MP3,
  dataFormat: DataFormat.MP3,
  rate: 48000,
  sampleCount: 1,
}))

export {
  DataFormat, Costume, convertToCostumes, convertToAudioSnippets
}