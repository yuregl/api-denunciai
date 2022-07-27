import { Router } from "express";
import multer from 'multer';
import { ComplaintsController } from "../controllers/ComplaintsController";
import { ComplaintsRepository } from "../repositories/Complaints";
import { ComplaintsService } from "../services/ComplaintsServices";
import { getCustomRepository } from "typeorm";
import { parseRequestComplaintsCreate } from '../middlewares/parseRequest';
import { FilesRepository } from "../repositories/Files";
import { FilesService } from "../services/FilesServices";

const upload = multer({ dest: 'tmp/' });

const complaintsRoutes = Router();

function createComplaintsRoutes() {
  const complaintsRepository = getCustomRepository(ComplaintsRepository);
  const complaintsService = new ComplaintsService(complaintsRepository);
  
  const filesRepositories = getCustomRepository(FilesRepository)
  const filesServices = new FilesService(filesRepositories)
  
  const complaintsController = new ComplaintsController(complaintsService, filesServices)

  complaintsRoutes.get(
    "/complaints/new",
    upload.array('files'),
    parseRequestComplaintsCreate,
    complaintsController.handleCreateComplaints
  );

  return complaintsRoutes;
}

export { createComplaintsRoutes }