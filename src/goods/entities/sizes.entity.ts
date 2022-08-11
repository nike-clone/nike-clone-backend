import { GoodsItem } from '../../goods-items/entities/goods-item.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Size {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => GoodsItem, (goodsItem) => goodsItem.size)
  goodsItems: GoodsItem[];

  // @OneToMany((type) => Goods, (goods) => goods.size)
  // goods: Goods[];
}
