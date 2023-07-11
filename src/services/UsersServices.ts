import { v4 as uuid } from "uuid"
import jwt from "jsonwebtoken"
import { UsersRepository } from "repositories/Users";
import { hashPassword,comparePassword } from "../utils/EncryptPassword"
import { ComplaintsRepository } from "../repositories/Complaints";
import { FilesRepository } from "../repositories/Files";

import { deleteComplaints } from "../api/awsS3";
import { 
  ICredentials,
  ILogin,
  IResponseToken,
  IUser,
  IUserUpdate
} from "../interfaces/users";

class UsersService {
  
  constructor(
    private usersRepository: UsersRepository,
    private complaintsRepository: ComplaintsRepository,
    private filesRepository: FilesRepository
  ){}
  
  async executeCreateUser(user: IUser) {
    const { email } = user;
    const userAlreadyExist = await this.usersRepository.findOne({email});
    if(userAlreadyExist){
      throw new Error("Users already exist")
    }

    user.id = uuid();
    user.password = await hashPassword(user.password);
    user.admin = user.admin ? true: false;
    user.active = true;

    const saveUser = this.usersRepository.create({
      ...user
    });

    return await this.usersRepository.save(saveUser)
  }

  async executeLogin(login: ILogin): Promise<IResponseToken> {
    const { email, password } = login;

    const user = await this.usersRepository.findOne({email});

    if(!user) {
      throw new Error("Invalid credentials")
    }

    const valueComparePassword = await comparePassword(password, user.password)

    if(!valueComparePassword){
      throw new Error("Invalid credentials");
    }

    const token = `Bearer ${jwt.sign({
      id: user.id
    },<string> process.env.SECRET, {expiresIn: '1d'})}`;

    return { token, userId: user.id }
  }

  async executeDeleteAccount ({id, uuid}: ICredentials) {

    if(!(id ===uuid)){
      throw new Error("Invalid Credentials")
    }

    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ["complaints"]
    });

    const complaints = await Promise.all(user.complaints.map(value => {
      return this.filesRepository.getComplaintsByIdAndUserId(value.userId, value.id)
    }));
    
    await Promise.all(complaints.map(array  => {
      return deleteComplaints(array)
    }));

    await this.complaintsRepository.delete({
      userId: id
    });

    user.active = false;
    return await this.usersRepository.save(user);
  }

  async executeGetUser(id: string){
    const user = await this.usersRepository.findOne(id);

    if(!user) {
      throw new Error("User does not exists")
    }
    delete user.password;
    return user;
  }

  async executeUpdateUser(updateUser: IUserUpdate, id: string){
    const user = await this.usersRepository.findOne(id);
    
    if(!user) {
      throw new Error("User does not exists")
    }

    Object.assign(user, updateUser);

    return await this.usersRepository.save(user);
  }
}

export { UsersService }