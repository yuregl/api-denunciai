import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("users")
class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string

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
