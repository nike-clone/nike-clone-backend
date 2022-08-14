import { CartItems } from '../../cart-items/entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ default: 0 })
  // totalPrice: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItems, (cartItem) => cartItem.cart)
  cartItems: CartItems[];
}
