import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  updated: Date;
}
