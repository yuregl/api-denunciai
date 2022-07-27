
import { EntityRepository, Repository } from "typeorm";
import { Files } from "../models/Files";

@EntityRepository(Files)
class FilesRepository extends Repository<Files> {}

export { FilesRepository };
