import { Cart } from '../../carts/entities/cart.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Gender } from '../types/gender.type';
import { Orders } from '../../orders/entities/orders.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ length: 60 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  birthOfDate: Date;

  @Column()
  gender: Gender;

  // @Column()
  // signupVerifyToken: string;

  // @Column({ default: 'Proceeding' })
  // status: UserStatus;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
