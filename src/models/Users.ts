import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("users")
class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  name: String

  @Column()
  full_name: String

  @Column()
  email: String

  @Column()
  password: String

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
