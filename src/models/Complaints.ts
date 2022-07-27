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

enum Status {
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

  @Column()
  user_id: string;

  @JoinColumn({name: "user_id"})
  @ManyToOne(() => Users)
  user: Users

  @JoinColumn({name: "id"})
  @OneToMany(() => Files, files => files.url)
  files: Files

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({
    type: "enum",
    enum: Status,
    default: Status.SENT
  })
  status: Status

  
}

export { Complaints }