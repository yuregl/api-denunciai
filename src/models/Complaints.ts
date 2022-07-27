import { 
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn, 
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Files } from "./Files";
import { Users } from "./Users";

export enum Status {
  PROCESSING = "processing",
  RESOLVED = "resolved",
  SENT = "sent"
}

@Entity("complaints")
class Complaints {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({name: "user_id"})
  userId: string;

  @JoinColumn({name: "user_id"})
  @ManyToOne(() => Users)
  user: Users

  @JoinColumn({name: "id"})
  @OneToMany(() => Files, files => files.complaints)
  files: Files

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({
    type: "simple-enum",
    enum: Status,
    default: Status.SENT
  })
  status: Status

  
}

export { Complaints }