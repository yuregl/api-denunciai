
import { EntityRepository, Repository } from "typeorm";
import { Files } from "../models/Files";
import { IListSave } from "../interfaces/saveS3"

@EntityRepository(Files)
class FilesRepository extends Repository<Files> {
  async getComplaintsByIdAndUserId(userId: string, complaintId: string): Promise<Array<IListSave>> {
    return await this.query(`
    SELECT url, key FROM files
    INNER JOIN complaints ON files.complaints_id  = complaints.id 
    INNER JOIN users ON complaints.user_id  = users.id
    AND users.id = '${userId}'
    WHERE complaints_id = '${complaintId}'
  `) as Array<IListSave>;
  }
}

export { FilesRepository };
