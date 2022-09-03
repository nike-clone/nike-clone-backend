import { CartItems } from '../../cart-items/entities/cart-item.entity';
import { CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class AnonymousCart {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CartItems, (cartItem) => cartItem.anonymousCart)
  cartItems: CartItems[];
}
