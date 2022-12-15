import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './../../utils/constants';
import { FoodEntry } from './../food-entry/food-entry.entity';
import { UserSettings } from './user-settings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => FoodEntry, (foodEntry) => foodEntry.user)
  foodEntries: FoodEntry[];

  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings: UserSettings;
}
