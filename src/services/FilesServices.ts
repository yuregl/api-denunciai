import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

import { saveFile, deleteComplaints } from "../api/awsS3";
import { FilesRepository } from "../repositories/Files";

interface IReadFile {
  fileBuffer: Buffer;
  fileName: string;
}

interface ISaveFile {
  id?: string;
  url: string;
  key: string;
  complaintsId: string;
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
    const savesS3 = await Promise.all(responseS3);
    const saveUrls = savesS3.map(file => {
      return this.saveFiles({
        url: file.url,
        key: file.key,
        complaintsId: id
      })
    });

    const saves = await Promise.all(saveUrls)
    return saves;
  }

  private async saveFiles(saveUrl: ISaveFile){
    saveUrl.id = uuid();
    const createFiles = this.filesRepositories.create(saveUrl);
    return await this.filesRepositories.save(createFiles)
  }

  async executeDeleteFiles(userId: string, complaintId: string) {
    const getComplaints = await this.filesRepositories.getComplaintsByIdAndUserId(userId, complaintId);

    if(getComplaints.length === 0){
      throw new Error("Complaint not found");
    }

    await deleteComplaints(getComplaints);

    return true;
  }
}

export { FilesService }