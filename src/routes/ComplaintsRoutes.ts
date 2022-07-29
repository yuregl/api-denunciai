import { Router } from "express";
import multer from 'multer';
import { getCustomRepository } from "typeorm";

import { ComplaintsController } from "../controllers/ComplaintsController";
import { ComplaintsRepository } from "../repositories/Complaints";
import { ComplaintsService } from "../services/ComplaintsServices";
import { parseRequestComplaintsCreate } from '../middlewares/parseRequest';
import { FilesRepository } from "../repositories/Files";
import { FilesService } from "../services/FilesServices";
import { UsersRepository } from "../repositories/Users";
import authMiddleware from "../middlewares/authMiddlewares";

import { createComplaints } from "../validators/Complaints"

const upload = multer({ dest: 'tmp/' });

const complaintsRoutes = Router();

function createComplaintsRoutes() {
  const complaintsRepository = getCustomRepository(ComplaintsRepository);
  const usersRepositorie = getCustomRepository(UsersRepository)

  const complaintsService = new ComplaintsService(complaintsRepository, usersRepositorie);
  
  const filesRepositories = getCustomRepository(FilesRepository)
  const filesServices = new FilesService(filesRepositories)
  
  const complaintsController = new ComplaintsController(complaintsService, filesServices)

  complaintsRoutes.post(
    "/complaints/new",
    authMiddleware,
    upload.array('files'),
    parseRequestComplaintsCreate,
    createComplaints,
    complaintsController.handleCreateComplaints
  );

  return complaintsRoutes;
}

export { createComplaintsRoutes }