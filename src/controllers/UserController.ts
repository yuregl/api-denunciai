import { Request, Response } from 'express';
import { UsersService } from '../services/UsersServices';
import { validationResult } from 'express-validator';

interface IUserUpdate {
  name?: string;
  full_name?: string;
  password?: string;
  admin?: boolean;
}

class UsersController {
  constructor(private userService: UsersService) {}

  handleCreateUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
      return response.status(400).json({errors: errors.array()});
    }

    const user = request.body;
    await this.userService.executeCreateUser(user);
    return response.status(201).json({message: "User created successfully"});
  }

  handleLogin = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
      return response.status(400).json({errors: errors.array()});
    }
    
    const { email, password} = request.body;
    const token = await this.userService.executeLogin({email, password});
    return response.status(200).json(token);
  }

  handleGetUser = async(request: Request, response: Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
      return response.status(400).json({errors: errors.array()});
    }

    const { uuid } = request.headers;

    const user = await this.userService.executeGetUser(uuid as string);
    return response.status(200).json(user);
  }

  handleDeleteAccount = async(request: Request, response: Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
      return response.status(400).json({errors: errors.array()});
    }
    
    const { id } = request;
    const { uuid } = request.params;
    await this.userService.executeDeleteAccount({ id, uuid});
    return response.status(200).json({message: "Deleted User"});
  }

  handleUpdateAccount = async(request: Request, response: Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
      return response.status(400).json({errors: errors.array()});
    }

    const user = request.body as IUserUpdate;
    const { uuid } = request.params;

    await this.userService.executeUpdateUser(user, uuid as string);

    return response.status(200).json({message: "Update user"});
  }
  
}

export { UsersController }