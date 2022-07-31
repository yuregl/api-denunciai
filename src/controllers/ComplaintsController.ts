import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { ComplaintsService } from '../services/ComplaintsServices';
import { FilesService } from '../services/FilesServices';

class ComplaintsController {
  constructor(
    private complaintsService: ComplaintsService,
    private filesService: FilesService
  ){}

  handleCreateComplaints = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
      return response.status(400).json({errors: errors.array()});
    }
    
    const { id } = await this.complaintsService.executeCreateComplaints(request.body);
    await this.filesService.executeCreateFiles(request.files, id, request.body.userId);
    return response.status(201).json({message: "Complaint created successfully"});
  }

  handleGetComplaintById = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
      return response.status(400).json({errors: errors.array()});
    }
    
    const complaintId = request.params.complaint_id;
    const result = await this.complaintsService.executeGetComplaintById(complaintId);
    return response.json(result);
  }

}

export { ComplaintsController }