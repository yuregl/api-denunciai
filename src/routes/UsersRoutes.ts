import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { UsersController } from "../controllers/UserController";
import { UsersService } from "../services/UsersServices";
import { UsersRepository } from "../repositories/Users";
import authMiddleware from "../middlewares/authMiddlewares";

import { createUser, login, deleteAccount } from "../validators/User"

const userRoutes = Router();

function createUsersRoutes() {
  const userRepository = getCustomRepository(UsersRepository);
  const userService = new UsersService(userRepository);
  const userController = new UsersController(userService);

  userRoutes.post("/user/new", createUser ,userController.handleCreateUser);

  userRoutes.get("/user/login", login ,userController.handleLogin)

  userRoutes.delete('/user/delete/:uuid', authMiddleware, deleteAccount ,userController.handleDeleteAccount)

  return userRoutes;
}

export { createUsersRoutes }