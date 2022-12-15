import { IsEmail,IsString,MaxLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @MaxLength(200)
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
