import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Color } from './colors.entity';
import { Gender } from './genders.eitity';
import { Size } from './sizes.entity';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Gender)
  @JoinColumn()
  gender: Gender;

  @RelationId((goods: Goods) => goods.gender)
  genderId: number;

  @OneToOne(() => Color)
  @JoinColumn()
  color: string;

  @RelationId((goods: Goods) => goods.color)
  colorId: number;

  @OneToOne(() => Size)
  @JoinColumn()
  size: number;

  @RelationId((goods: Goods) => goods.size)
  sizeId: number;

  @Column()
  prices: number;

  @Column()
  imagePath: string;
}
