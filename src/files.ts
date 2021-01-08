import { createReadStream, readdirSync, renameSync } from 'fs';
import crypto from 'crypto';
import path from 'path';

// https://stackoverflow.com/a/47951271
const computeMD5Checksum = ({ file }: { file: string }): Promise<string> => new Promise((resolve, reject) => {
  const stream = createReadStream(file)
  const hasher = crypto.createHash('md5').setEncoding('hex')

  stream.on('error', reject)
  stream.pipe(hasher)
    .once('finish', () => {
      const hash = hasher.read();
      if (typeof hash === 'string') {
        resolve(hash);
      } else {
        reject()
      }
    })
})

interface RenamedFile {
  file: string;
  hash: string;
  number: string;
  extension: string;
}

const hashFilesInFolder = async ({ folder }: { folder: string }): Promise<RenamedFile[]> => {
  const renamedFiles: RenamedFile[] = [];

  const files = readdirSync(folder)

  for (const file of files) {
    const extension = path.extname(file).replace('.', '');
    const number = file.replace(extension, '').replace('.', '');

    const hash = await computeMD5Checksum({
      file: path.resolve(folder, file)
    })

    renameSync(
      path.resolve(folder, file),
      path.resolve(folder, hash + '.' + extension)
    )

    renamedFiles.push({
      file, hash, number, extension
    })
  }

  return renamedFiles
}

export {
  hashFilesInFolder,
  RenamedFile
};
