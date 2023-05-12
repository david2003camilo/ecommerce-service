import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Categories } from "./Categories";

// A product can have categories
@Entity()
export class Products extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column()
  discount: number;

  @Column({ default: false, nullable: false })
  isDiscount: boolean;

  @Column()
  @OneToOne(() => Categories, (categories) => categories.id)
  categoryId: number;

  @Column({ default: true, nullable: false })
  active: boolean;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  updated: Date;
}
