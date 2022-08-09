import { Cart } from 'src/carts/entities/cart.entity';
import { Goods } from 'src/goods/entities/goods.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Goods)
  @JoinColumn()
  goods: Goods;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  cart: Cart;

  @RelationId((cartItem: CartItems) => cartItem.cart)
  cartId: number;

  @RelationId((cartItem: CartItems) => cartItem.goods)
  goodsId: number;
}
