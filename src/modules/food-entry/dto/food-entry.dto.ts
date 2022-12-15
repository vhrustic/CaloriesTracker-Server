import { FoodEntry } from '../food-entry.entity';

export class FoodEntryDto {
  id: number;
  name: string;
  calories: number;
  takenAt: Date;
  createdAt: Date;

  constructor(foodEntry: FoodEntry) {
    this.id = foodEntry.id;
    this.name = foodEntry.name;
    this.calories = foodEntry.calories;
    this.takenAt = foodEntry.takenAt;
    this.createdAt = foodEntry.createdAt;
  }
}
