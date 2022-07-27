import { FilesRepository } from "../repositories/Files";

class FilesService {
  constructor(private filesRepositories: FilesRepository) {}

  async executeCreateFiles(files: any) {
    console.log(files)
    return;
  }
}

export { FilesService }