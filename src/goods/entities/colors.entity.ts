import { GoodsItem } from 'src/goods-items/entities/goods-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  colorCode: string;

  @OneToMany(() => GoodsItem, (goodsItem) => goodsItem.color)
  goodsItems: GoodsItem[];

  // @OneToMany((type) => Goods, (goods) => goods.color)
  // goods: Goods[];
}
