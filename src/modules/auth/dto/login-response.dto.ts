import { UserDto } from '../../user/dto/user.dto';
import { TokenDataDto } from './token-data.dto';

export class LoginResponseDto {
  user: UserDto;
  token: TokenDataDto;

  constructor(user: UserDto, token: TokenDataDto) {
    this.user = user;
    this.token = token;
  }
}
