import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { UsersController } from "../controllers/UserController";
import { UsersService } from "../services/UsersServices";
import { UsersRepository } from "../repositories/Users";
import authMiddleware from "../middlewares/authMiddlewares";

import { 
  createUser,
  login,
  deleteAccount,
  getUSer,
  updateUser
} from "../validators/User" 
import { ComplaintsRepository } from "../repositories/Complaints";
import { FilesRepository } from "../repositories/Files";

const userRoutes = Router();

function createUsersRoutes() {
  const userRepository = getCustomRepository(UsersRepository);
  const complaintRepository = getCustomRepository(ComplaintsRepository);
  const filesRepository = getCustomRepository(FilesRepository);
  
  const userService = new UsersService(userRepository, complaintRepository, filesRepository);
  const userController = new UsersController(userService);

  userRoutes.post("/user/new", createUser, userController.handleCreateUser);

  userRoutes.get("/user/login", login, userController.handleLogin)

  userRoutes.delete('/user/delete/:uuid', authMiddleware, deleteAccount, userController.handleDeleteAccount)

  userRoutes.get("/user/:uuid", authMiddleware, getUSer, userController.handleGetUser)

  userRoutes.put("/user/update/:uuid", authMiddleware, updateUser ,userController.handleUpdateAccount)

  return userRoutes;
}

export { createUsersRoutes }