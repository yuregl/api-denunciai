import dotenv from "dotenv";
import { createConnection, getConnection, getCustomRepository } from "typeorm";
import { Users } from '../../src/models/Users';
import { Complaints, Status } from '../../src/models/Complaints';
import { Files } from '../../src/models/Files';

import { IUser } from '../../src/interfaces/users';

import { UsersRepository } from "../../src/repositories/Users";
import { ComplaintsRepository } from "../../src/repositories/Complaints";

import { ComplaintsService } from "../../src/services/ComplaintsServices";
import { ICreateComplaints } from "../../src/interfaces/complaints";

dotenv.config({
  path:"../.env.test"
})

describe("Complaints Services", () => {

  const userMock = <IUser>{
    id: '99b0fe0b-703f-4409-9360-ca5f6c7e3f9f',
    name: "lopes",
    full_name:"Yure Galdino Lopes",
    email: "lopes@hotmail.com",
    password: "123456",
    admin: false,
    created_at: '2022-08-05T17:58:30.000Z',
    updated_at: '2022-08-05T17:58:30.000Z',
    active: true
  }

  const complaintMock = <ICreateComplaints> {
    userId: "99b0fe0b-703f-4409-9360-ca5f6c7e3f9f",
    title: "teste",
    description: "description teste",
    address: "address",
    id: "",
    status: Status.SENT
  }

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

    const sut =  new ComplaintsService(complaintsRepository, userRepository);
    return { sut, userRepository, complaintsRepository }
  }

  it('This test should create a complaint', async () => {
    const { sut, userRepository } = createSut();

    const createUser = userRepository.create(userMock);
    await userRepository.save(createUser);

    const createComplaint = await sut.executeCreateComplaints(complaintMock);

    expect(createComplaint.userId).toBe(userMock.id)
  });

  it('This check fails when trying to create a complaint for not having a user.', async () => {
    const { sut } = createSut();

    try {
      await sut.executeCreateComplaints(complaintMock);
    } catch(err){
      expect((<Error>err).message).toBe('Users not exist')
    }
  });

  it('This test must search for a complaint by id', async () => {
    const { sut, userRepository } = createSut();

    const createUser = userRepository.create(userMock);
    await userRepository.save(createUser);

    const { id } = await sut.executeCreateComplaints(complaintMock);
    const getComplaintById = await sut.executeGetComplaintById(id);
    expect(getComplaintById.id).toBe(id)
  });

  it('This test must search for a complaint by id', async () => {
    const { sut, userRepository } = createSut();

    const createUser = userRepository.create(userMock);
    await userRepository.save(createUser);

    const { id } = await sut.executeCreateComplaints(complaintMock);
    const getComplaintById = await sut.executeGetComplaintById(id);
    expect(getComplaintById.id).toBe(id)
  });

  it('AAAA', async () => {
    const { sut } = createSut();

    try{
      await sut.executeGetComplaintById('123445');
    }catch(err){
      expect((<Error>err).message).toBe('Not found')
    }
  });
});