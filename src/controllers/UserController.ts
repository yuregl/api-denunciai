import { Request, Response } from 'express';
import { UsersService } from '../services/UsersServices';

class UsersController {
  constructor(private userService: UsersService) {}

  handleCreateUser = async (request: Request, response: Response) => {
    const user = request.body;
    console.log("USER: ",user)

    await this.userService.executeCreateUser(user)

    return response.status(201).json({message: "User created successfully"})
  }
}

export { UsersController }