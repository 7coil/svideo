import { copyFileSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { RenamedFile } from "./FileRenamer";

enum ProjectBuilderReplacement {
  FPS = 1,
  WIDTH = 2,
  SIZE = 3,
  ROWS = 4,
  COLUMNS = 5,
  TOTAL = 6,
  PICTURES = 7,
  AUDIO = 8,
  AUDIO_COUNT = 9,
  FRAME_REVERSE = 10,
}

class ProjectBuilder {
  private projectString: string = readFileSync(
    resolve(__dirname, "template.json"),
    { encoding: "utf-8" }
  );

  injectField(field: ProjectBuilderReplacement, value: any): ProjectBuilder {
    const newValue = String(value);
    const replacementField = `[false, 21, ${field}]`;

    this.projectString = this.projectString.replace(replacementField, newValue);

    return this;
  }

  injectFiles(files: RenamedFile[], framesPerSheet: number) {
    const costumes = files
      .filter((file) => file.extension !== "mp3")
      .map((file) => ({
        assetId: file.hash,
        name: file.number,
        bitmapResolution: 2,
        md5ext: file.hash + "." + file.extension,
        dataFormat: file.extension,
        rotationCenterX: 0,
        rotationCenterY: 0,
      }));

    const audio = files
      .filter((file) => file.extension === "mp3")
      .map((file) => ({
        assetId: file.hash,
        name: file.number,
        md5ext: file.hash + "." + file.extension,
        dataFormat: file.extension,
        rate: 48000,
        sampleCount: 1,
      }));

    this.injectField(ProjectBuilderReplacement.AUDIO, JSON.stringify(audio))
      .injectField(ProjectBuilderReplacement.PICTURES, JSON.stringify(costumes))
      .injectField(
        ProjectBuilderReplacement.TOTAL,
        costumes.length * framesPerSheet
      )
      .injectField(ProjectBuilderReplacement.AUDIO_COUNT, audio.length - 1);

    return this;
  }

  write(folder: string) {
    writeFileSync(resolve(folder, "project.json"), this.projectString);
    copyFileSync(
      resolve(__dirname, "background.svg"),
      resolve(folder, "cd21514d0531fdffb22204e0ec5ed84a.svg")
    );
  }
}

export { ProjectBuilder, ProjectBuilderReplacement };
