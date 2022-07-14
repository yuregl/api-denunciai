import { v4 as uuid } from "uuid"
import jwt from "jsonwebtoken"
import { UsersRepository } from "repositories/Users";
import { hashPassword,comparePassword } from "../utils/EncryptPassword"

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  active?: boolean 
}

interface ILogin {
  email: string;
  password: string;
}

interface IResponseToken {
  token: string;
  userId: string
}

interface ICredentials {
  id: string;
  uuid: string;
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

    const user = await this.usersRepository.findOne(id)
    user.active = false;
    return await this.usersRepository.save(user);
  }

  async executeGetUser(id: string){
    const user = await this.usersRepository.findOne(id);

    console.log(user)

    if(!user) {
      throw new Error("User does not exists")
    }
    delete user.password;
    return user;
  }
}

export { UsersService }