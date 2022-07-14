import { json, Request, Response } from 'express';
import { UsersService } from '../services/UsersServices';

class UsersController {
  constructor(private userService: UsersService) {}

  handleCreateUser = async (request: Request, response: Response) => {
    const user = request.body;
    await this.userService.executeCreateUser(user)
    return response.status(201).json({message: "User created successfully"})
  }

  handleLogin = async (request: Request, response: Response) => {
    const { email, password} = request.body;
    const token = await this.userService.executeLogin({email, password});
    return response.status(200).json(token)
  }

  handleDeleteAccount = async(request: Request, response: Response) => {
    const { id } = request;
    const { uuid } = request.params;
    await this.userService.executeDeleteAccount({ id, uuid})
    return response.status(200).json({message: "User deleted"});
  }
  
}

export { UsersController }