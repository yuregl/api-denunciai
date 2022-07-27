import { EntityRepository, Repository } from "typeorm";
import { Complaints } from "../models/Complaints";

@EntityRepository(Complaints)
class ComplaintsRepository extends Repository<Complaints> {}

export { ComplaintsRepository };
