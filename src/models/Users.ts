import { 
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn
} from "typeorm";
import { Complaints } from "./Complaints";

@Entity("users")
class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string

  @JoinColumn({name: "id"})
  @OneToMany(() => Complaints, complaints => complaints.user)
  complaints: Complaints[]

  @Column()
  full_name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  admin: Boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  active: Boolean
}

export { Users };
