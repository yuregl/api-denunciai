import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Complaints } from "./Complaints";


@Entity("Files")
class Files { 

  @Column()
  complaints_id: string;

  @JoinColumn({name: "complaints_id"})
  @ManyToOne(() => Complaints)
  complaints: Complaints

  @Column()
  url: string;
}

export { Files }