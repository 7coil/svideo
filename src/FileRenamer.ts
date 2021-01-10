import { createReadStream, readdirSync, renameSync } from "fs";
import path from "path";
import crypto from "crypto";

interface RenamedFile {
  file: string;
  hash: string;
  number: string;
  extension: string;
}

interface FileRenamerInput {
  folder: string;
}

class FileRenamer {
  static computeHash(file: string) {
    return new Promise<string>((resolve, reject) => {
      const stream = createReadStream(file);
      const hasher = crypto.createHash("md5").setEncoding("hex");

      stream.on("error", reject);
      stream.pipe(hasher).once("finish", () => {
        const hash = hasher.read();
        if (typeof hash === "string") {
          resolve(hash);
        } else {
          reject();
        }
      });
    });
  }

  static async hashFilesInFolder(input: FileRenamerInput) {
    const renamedFiles: RenamedFile[] = [];
    const files = readdirSync(input.folder);

    for (const file of files) {
      const parsed = path.parse(file);
      const hash = await this.computeHash(
        path.resolve(input.folder, parsed.base)
      );

      renameSync(
        path.resolve(input.folder, parsed.base),
        path.resolve(input.folder, hash + parsed.ext)
      );

      renamedFiles.push({
        file,
        hash,
        number: parsed.name,
        extension: parsed.ext.replace(".", ""),
      });
    }

    return renamedFiles;
  }
}

export { FileRenamer, RenamedFile };
