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

import { 
  createComplaints,
  getComplaintsByComplaintId,
  updateComplaint,
  getAllComplaint,
  deleteComplaint
} from "../validators/Complaints"

const upload = multer({ dest: 'tmp/' });

const complaintsRoutes = Router();

function createComplaintsRoutes() {
  
  const complaintsRepository = getCustomRepository(ComplaintsRepository);
  const usersRepositorie = getCustomRepository(UsersRepository);

  const complaintsService = new ComplaintsService(complaintsRepository, usersRepositorie);
  
  const filesRepositories = getCustomRepository(FilesRepository);
  const filesServices = new FilesService(filesRepositories);
  
  const complaintsController = new ComplaintsController(complaintsService, filesServices);

  complaintsRoutes.post(
    "/complaints/new",
    authMiddleware,
    upload.array('files'),
    parseRequestComplaintsCreate,
    createComplaints,
    complaintsController.handleCreateComplaints
  );

  complaintsRoutes.get(
    "/complaints/:complaint_id",
    authMiddleware,
    getComplaintsByComplaintId,
    complaintsController.handleGetComplaintById
  );

  complaintsRoutes.put(
    "/complaints/update/:complaint_id", 
    authMiddleware,
    updateComplaint,
    complaintsController.handleUpdateComplaint
  );

  complaintsRoutes.get(
    "/complaints/user_id/:user_id",
    authMiddleware,
    getAllComplaint,
    complaintsController.handleGetAllComplaintsByUser
  );

  complaintsRoutes.delete(
    "/complaints/user_id/:user_id/complaint_id/:complaint_id",
    authMiddleware,
    deleteComplaint,
    complaintsController.handleDeleteComplaint
  )

  return complaintsRoutes;
}

export { createComplaintsRoutes }