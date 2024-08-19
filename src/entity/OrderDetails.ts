import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Products } from "./Products";

@Entity()
export class OrderDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "orders_id" })
  order: Orders;

  @ManyToOne(() => Products, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "product_id" })
  product: Products;

  @Column()
  amount: number;

  @Column()
  value: number;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  updated: Date;
}
