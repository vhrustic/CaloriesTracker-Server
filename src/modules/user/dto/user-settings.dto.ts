import { IsNumber } from 'class-validator';
import { UserSettings } from '../user-settings.entity';

export class UserSettingsDto {
  @IsNumber()
  caloriesLimit: number;

  constructor(settings: UserSettings) {
    this.caloriesLimit = settings.caloriesLimit;
  }
}
