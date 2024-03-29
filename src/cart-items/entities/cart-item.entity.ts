import { Cart } from '../../carts/entities/cart.entity';
import { GoodsItem } from '../../goods-items/entities/goods-item.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnonymousCart } from '../../anonymous-cart/entities/anonymous-cart.entity';

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => GoodsItem, (goodsItem) => goodsItem.cartItems)
  goodsItem: GoodsItem;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => AnonymousCart, (anonymousCart) => anonymousCart.cartItems)
  anonymousCart: AnonymousCart;
}
