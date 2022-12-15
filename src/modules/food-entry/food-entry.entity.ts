import {
Column,
CreateDateColumn,
DeleteDateColumn,
Entity,
ManyToOne,
PrimaryGeneratedColumn,
UpdateDateColumn
} from 'typeorm';
import { User } from './../user/user.entity';

@Entity()
export class FoodEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  takenAt: Date;

  @Column()
  name: string;

  @Column()
  calories: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.foodEntries)
  user: User;
}
