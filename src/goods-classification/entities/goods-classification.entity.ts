import { Goods } from '../../goods/entities/goods.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GoodsClassification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => Goods, (goods) => goods.classification)
  goods: Goods[];
}
