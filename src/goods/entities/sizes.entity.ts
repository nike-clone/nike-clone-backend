import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Goods } from './goods.entity';

@Entity()
export class Size {
  @PrimaryColumn()
  id: number;

  // @OneToMany((type) => Goods, (goods) => goods.size)
  // goods: Goods[];
}
