import { Request, Response } from 'express';
import { ComplaintsService } from '../services/ComplaintsServices';
import { FilesService } from '../services/FilesServices';

class ComplaintsController {
  constructor(
    private complaintsService: ComplaintsService,
    private filesService: FilesService
  ){}

  handleCreateComplaints = async (request: Request, response: Response) => {
    const { id } = await this.complaintsService.executeCreateComplaints(request.body)
    await this.filesService.executeCreateFiles(request.files, id, request.body.userId);
    return response.status(201).json({message: "Complaint created successfully"})
  }

}

export { ComplaintsController }