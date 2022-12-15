import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateHash } from 'src/utils/hash-utils';
import { AppConfigService } from './../../shared/services/app-config-service';
import { TOKEN_TYPE } from './../../utils/constants';
import { User } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { TokenDataDto } from './dto/token-data.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
  ) {}

  async validateUser(userDto: UserLoginDto): Promise<User> {
    const user = await this.usersService.findByEmail(userDto.email);
    const isPasswordValid = await validateHash(
      userDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

  async createToken(user: User) {
    const token = new TokenDataDto({
      expiresIn: this.appConfigService.authConfig.tokenExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: user.id,
        type: TOKEN_TYPE,
        role: user.role,
      }),
    });

    return token;
  }
}
