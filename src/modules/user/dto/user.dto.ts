import {
  IsEmail,
  isEmail,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRole } from '../../../utils/constants';
import { User } from '../user.entity';
import { UserSettingsDto } from './user-settings.dto';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(200)
  @IsEmail()
  email: string;

  @IsString()
  role: UserRole;
  settings: UserSettingsDto;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.settings = new UserSettingsDto(user.settings);
  }
}
