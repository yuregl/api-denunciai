import { UsersRepository } from "repositories/Users";
import {v4 as uuid} from "uuid"
import { ComplaintsRepository } from "../repositories/Complaints";

import { Status } from "../models/Complaints";

interface ICreateComplaints {
  userId: string,
  title: string,
  description: string,
  address: string
  id: string,
  status: Status;
}

class ComplaintsService {
  constructor(
    private complaintsRepositories: ComplaintsRepository,
    private usersRepositorie: UsersRepository
  ) {}

  async executeCreateComplaints(complaints: ICreateComplaints) {
    const userAlreadyExist = await this.usersRepositorie.findOne(complaints.id)
    if(!userAlreadyExist) {
      throw new Error("Users not exist")
    }
    complaints.id = uuid();
    complaints.status = Status.SENT;
    const saveComplaint = this.complaintsRepositories.create({
      ...complaints
    })
    return await this.complaintsRepositories.save(saveComplaint);
  }

  async executeGetComplaintById(complaintId: string) {
    const complaint = await this.complaintsRepositories.findOne({ 
      where: {
        id: complaintId
      },
      relations: ["files"]
    })

    if(!complaint) {
      throw new Error("Not found")
    }

    return complaint;
  }
}

export { ComplaintsService }