import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DEFAULT_CALORIES_LIMIT } from '../../utils/constants';

@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ default: DEFAULT_CALORIES_LIMIT })
  caloriesLimit: number;
}
