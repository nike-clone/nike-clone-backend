import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Size {
  @PrimaryColumn()
  id: number;
}
