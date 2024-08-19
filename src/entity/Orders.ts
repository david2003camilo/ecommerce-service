import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne (() => Users, {
    eager: false,
    cascade: false,
  })
  @JoinColumn({ name: "user_id" })
  user: Users;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  updated: Date;
}
