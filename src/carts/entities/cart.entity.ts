import { User } from 'src/users/entities/user.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  user: User;
}
