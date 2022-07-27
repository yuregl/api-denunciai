import { ComplaintsRepository } from "../repositories/Complaints";

class ComplaintsService {
  constructor(private complaintsRepositories: ComplaintsRepository) {}

  async executeCreateComplaints(complaints: any) {
    console.log(complaints)
    return;
  }
}

export { ComplaintsService }