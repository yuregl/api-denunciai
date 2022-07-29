import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

import { saveFile } from "../api/awsS3";
import { FilesRepository } from "../repositories/Files";

interface IReadFile {
  fileBuffer: Buffer,
  fileName: string
}

interface ISaveFile {
  id?: string;
  url: string,
  complaintsId: string,
}

class FilesService {
  constructor(private filesRepositories: FilesRepository) {}

  private readFiles(files: any): Array<IReadFile> {
    const result = files.map((file: any) => {
      const filePath = path.join(__dirname, '..','..', 'tmp', file.filename);
      const read = {
        fileBuffer: fs.readFileSync(filePath),
        fileName: file.originalname
      }
      return read;
    });
    return result;
  }

  async executeCreateFiles(files: any, id: string, userId: string) {
    const images = this.readFiles(files);
    const responseS3 = images.map(value => {
      const send = {
        buffer: value.fileBuffer,
        userId,
        complaintId: id,
        fileName: value.fileName
      }
      return saveFile(send)
    });
    const urls = await Promise.all(responseS3);
    const saveUrls = urls.map(file => {
      return this.saveFiles({
        url: file,
        complaintsId: id
      })
    });

    const saves = await Promise.all(saveUrls)
    return saves;
  }

  private async saveFiles(saveUrl: ISaveFile){
    saveUrl.id = uuid();
    console.log(saveUrl)
    const createFiles = this.filesRepositories.create(saveUrl);
    return await this.filesRepositories.save(createFiles)
  }
}

export { FilesService }