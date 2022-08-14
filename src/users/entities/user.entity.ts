import { Cart } from 'src/carts/entities/cart.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Gender } from '../types/gender.type';
// import { UserStatus } from '../types/user-status.type';

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

  // @RelationId((user: User) => user.cart)
  // cartId: number;
}
