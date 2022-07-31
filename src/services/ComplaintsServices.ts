import { UsersRepository } from "repositories/Users";
import {v4 as uuid} from "uuid"
import { ComplaintsRepository } from "../repositories/Complaints";
import { Status } from "../models/Complaints";

import { ICreateComplaints, IUpdateComplaints } from "../interfaces/complaints"
 
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
    });

    if(!complaint) {
      throw new Error("Not found");
    }

    return complaint;
  }

  async executeUpdateComplaints(update: IUpdateComplaints, complaint_id: string) {
    const complaint = await this.complaintsRepositories.findOne(complaint_id)
  
    if(!complaint){
      throw new Error("Not found");
    }
    update.updated_at = new Date()
    Object.assign(complaint, update);

    return await this.complaintsRepositories.save(complaint);
  }

  async executeGetAllComplaints(userId: string) {
    const user = await this.usersRepositorie.findOne(userId);

    if(!user) {
      throw new Error("Users not exist")
    }

    const complaints = await this.complaintsRepositories.find({
      where: {
        userId
      },
      relations: ["files"]
    });

    return complaints;
  }
}

export { ComplaintsService }