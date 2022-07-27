import { Request, Response } from 'express';
import { ComplaintsService } from 'services/ComplaintsServices';
import { FilesService } from '../services/FilesServices';

class ComplaintsController {
  constructor(
    private complaintsService: ComplaintsService,
    private filesService: FilesService
    ){}
  handleCreateComplaints = async (request: Request, response: Response) => {
    await this.filesService.executeCreateFiles(request.files)
    await this.complaintsService.executeCreateComplaints(request.body)
    return response.status(201).json({message: "Complaint created successfully"})
  }
}

export { ComplaintsController }