import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Complaints } from "./Complaints";


@Entity("files")
class Files { 

  @PrimaryColumn("uuid")
  id: string;

  @Column({name: "complaints_id"})
  complaintsId: string;

  @JoinColumn({name: "complaints_id"})
  @ManyToOne(() => Complaints)
  complaints: Complaints

  @Column()
  url: string;

  @Column()
  key: string
}

export { Files }