import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
