import { Files } from "../../src/models/Files";
import { Complaints } from '../../src/models/Complaints';
import { Users } from '../../src/models/Users';
import { createConnection, getConnection, getCustomRepository } from "typeorm";
import { FilesRepository } from "../../src/repositories/Files"


describe("Files Repositories", () => {
  beforeAll(() => {
    return createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Files, Complaints, Users],
      synchronize: true,
      logging: false,
    })
  })

  afterAll(() => {
    const connection = getConnection();
    return connection.close();
  });

  it('This test should check if there is any complaint given the userId and complaintId', async () => {
    const filesRepository = getCustomRepository(FilesRepository);
    const result = await filesRepository.getComplaintsByIdAndUserId('','')
    expect(result).toEqual([])
  });
})