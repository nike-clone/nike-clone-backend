import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Goods } from './goods.entity';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  name: string;

  @OneToMany(() => Goods, (goods) => goods.gender)
  goods: Goods[];
}
