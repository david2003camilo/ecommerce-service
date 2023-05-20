import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,

  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Photos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  photo: string;

  @Column({ nullable: false, default: true })
  active: Boolean;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  updated: Date;
}
