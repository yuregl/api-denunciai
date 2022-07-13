import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { UsersController } from "../controllers/UserController";
import { UsersService } from "../services/UsersServices";
import { UsersRepository } from "../repositories/Users";

const userRoutes = Router();

function createUsersRoutes() {
  const userRepository = getCustomRepository(UsersRepository);
  const userService = new UsersService(userRepository);
  const userController = new UsersController(userService);

  userRoutes.post("/user/new", userController.handleCreateUser)

  return userRoutes;
}

export { createUsersRoutes }