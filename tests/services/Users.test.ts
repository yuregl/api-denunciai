import { createConnection, getConnection, getCustomRepository } from "typeorm";
import { Users } from '../../src/models/Users';
import { Complaints } from '../../src/models/Complaints';

import { UsersRepository } from "../../src/repositories/Users";
import { ComplaintsRepository } from "../../src/repositories/Complaints";
import { FilesRepository } from "../../src/repositories/Files";

import { UsersService } from '../../src/services/UsersServices';
import { IUser, ILogin, IUserUpdate, ICredentials } from '../../src/interfaces/users';
import { Files } from '../../src/models/Files';

import { hashPassword } from '../../src/utils/EncryptPassword';

import dotenv from "dotenv";

dotenv.config({
  path:"../.env.test"
})

describe("Users Service", () => {
  
  const userMock = <IUser>{
    id: '99b0fe0b-703f-4409-9360-ca5f6c7e3f9f',
    email: "lopes@hotmail.com",
    name: "lopes",
    full_name:"Yure Galdino Lopes",
    password: "123456",
    admin: false,
    created_at: "2022-08-05T17:58:30.000Z",
    updated_at: "2022-08-05T17:58:30.000Z",
    active: true
  };

  beforeAll(() => {
    return createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Users, Complaints, Files],
      synchronize: true,
      logging: false,
    })
  })

  afterAll(() => {
    const connection = getConnection();
    return connection.close();
  });

  const createSut = () => {
    const userRepository = getCustomRepository(UsersRepository);
    const complaintsRepository = getCustomRepository(ComplaintsRepository);
    const filesRepository = getCustomRepository(FilesRepository);

    const sut = new UsersService(userRepository, complaintsRepository, filesRepository);
    return { sut, userRepository, complaintsRepository, filesRepository}
  }

  it('This test must create a user', async () => {
    const { sut } = createSut()

    const req = <IUser> {
      email: "lopes@hotmail.com",
      name: "lopes",
      full_name:"Yure Galdino Lopes",
      password: "123456"
    };

    const createUser = await sut.executeCreateUser(req)
    expect(createUser.full_name).toBe("Yure Galdino Lopes")
  });

  it('This test should fail when trying to create a user', async () => {
    const { sut, userRepository } = createSut();

    userRepository.findOne = jest.fn().mockResolvedValueOnce(userMock)

    const req = <IUser> {
      email: "lopes@hotmail.com",
      name: "lopes",
      full_name:"Yure Galdino Lopes",
      password: "123456"
    };

    try{
      await sut.executeCreateUser(req);
    }catch(err){
      expect((<Error>err).message).toBe('Users already exist');
    }
  });

  it("This test must log in", async() => {
    const { sut, userRepository } = createSut();

    const userMockPassword = {...userMock};
    userMockPassword.password = await hashPassword(userMock.password)
    userRepository.findOne = jest.fn().mockResolvedValueOnce(userMockPassword);
    
    const req = <ILogin> {
      email: "lopes@hotmail.com",
      password: "123456"
    };

    const userLogin = await sut.executeLogin(req);

    expect(userLogin).toHaveProperty('token')
  });

  it("This test must fail when passing invalid beliefs", async() => {
    const { sut, userRepository } = createSut();

    const userMockPassword = {...userMock};
    userMockPassword.password = await hashPassword('teste')

    userRepository.findOne = jest.fn().mockResolvedValueOnce(userMockPassword);
    
    const req = <ILogin> {
      email: "lopes@hotmail.com",
      password: "123456"
    };

    try{
      await sut.executeLogin(req);
    }catch(err){
      expect((<Error>err).message).toBe('Invalid credentials');
    }
  });

  it("This test should fail when passing invalid user", async() => {
    const { sut, userRepository } = createSut();
    const userMockPassword = {...userMock};
    userMockPassword.password = await hashPassword(userMock.password)
    userRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);
    
    const req = <ILogin> {
      email: "lopes@hotmail.com",
      password: "123456"
    };

    try{
      await sut.executeLogin(req);
    }catch(err){
      expect((<Error>err).message).toBe('Invalid credentials');
    }
  });

  it("This test should get a user by id", async() => {
    const { sut, userRepository } = createSut();
  
    userRepository.findOne = jest.fn().mockResolvedValueOnce(userMock);

    const getUser = await sut.executeGetUser('99b0fe0b-703f-4409-9360-ca5f6c7e3f9f');

    expect(getUser.id).toBe('99b0fe0b-703f-4409-9360-ca5f6c7e3f9f')
  });

  it("This test should fail when trying to catch a user", async() => {
    const { sut, userRepository } = createSut();
  
    userRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);

    try{
      await sut.executeGetUser('99b0fe0b-703f-4409-9360-ca5f6c7e3f9f');
    }catch(err){
      expect(<Error>err.message).toBe('User does not exists')
    }
  });

  it('This test should do a user update', async() => {
    const { sut } = createSut();
    const req = <IUser> {
      email: "yure@hotmail.com",
      name: "yure",
      full_name:"Yure Galdino Lopes",
      password: "123456"
    };

    const createUser = await sut.executeCreateUser(req);
    expect(createUser.full_name).toBe("Yure Galdino Lopes");

    const reqUpdate = <IUserUpdate>{
      full_name: "Lopes Galdino"
    };

    const updateUser = await sut.executeUpdateUser(reqUpdate, createUser.id);

    expect(updateUser.full_name).toBe("Lopes Galdino");
  });

  it('This test should fail when trying to do user update', async() => {
    const { sut, userRepository } = createSut();
   
    userRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);

    const reqUpdate = <IUserUpdate>{
      full_name: "Lopes Galdino"
    };
    try{
      await sut.executeUpdateUser(reqUpdate, 'createUser.id');
    }catch(err){
      expect(<Error>err.message).toBe('User does not exists')
    }
  });

  it('This test should fail when trying to delete a user', async() => {
    const { sut } = createSut();
   
    const ids = <ICredentials> {
      id: 'teste',
      uuid: 'teste1'
    };
    try{
      await sut.executeDeleteAccount(ids);
    }catch(err){
      expect(<Error>err.message).toBe('Invalid Credentials');
    }
  });

  it('This test should remove a user', async() =>{
    const { sut , filesRepository} = createSut();

    const req = <IUser> {
      email: "galdino@hotmail.com",
      name: "galdino",
      full_name:"Yure Galdino galdino",
      password: "123456",
    };

    const { id } = await sut.executeCreateUser(req)
    const uuid = id;
    
    const responseDelete = await sut.executeDeleteAccount({id, uuid});
    expect(responseDelete.active).toBe(false)
  })
});