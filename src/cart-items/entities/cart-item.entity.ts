import { Cart } from 'src/carts/entities/cart.entity';
import { GoodsItem } from 'src/goods-items/entities/goods-item.entity';
import { Goods } from 'src/goods/entities/goods.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

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
}
