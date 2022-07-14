import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
