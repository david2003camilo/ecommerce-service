import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Categories } from "./Categories";
import { Photos } from "./Photos";

// A product can have categories
@Entity()
export class Products extends BaseEntity {
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

  @ManyToOne((type) => Categories, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name : "category_id"})
  category: Categories;

  @OneToOne((type) => Photos, {
    eager: true, /// Get the join of other table
    cascade: true,
  })
  @JoinColumn({ name: "photo_id" })
  photo: Photos;

  @Column({ default: true, nullable: false })
  active: boolean;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  updated: Date;
}
