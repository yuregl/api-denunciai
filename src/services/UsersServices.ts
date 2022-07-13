import { v4 as uuid } from "uuid"
import { UsersRepository } from "repositories/Users";
import { hashPassword } from "../utils/EncryptPassword"

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  active?: boolean 
}

class UsersService {
  
  constructor(private usersRepository: UsersRepository){}
  
  async executeCreateUser(user: IUser) {
    const { email } = user;
    const userAlreadyExist = await this.usersRepository.findOne({email});

    if(userAlreadyExist){
      throw new Error("Users already exist")
    }

    user.id = uuid();
    user.password = await hashPassword( user.password );

    const saveUser = this.usersRepository.create({
      ...user
    });

    return await this.usersRepository.save(saveUser)
  }
}

export { UsersService }