import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Goods } from './goods.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  colorCode: string;

  // @OneToMany((type) => Goods, (goods) => goods.color)
  // goods: Goods[];
}
