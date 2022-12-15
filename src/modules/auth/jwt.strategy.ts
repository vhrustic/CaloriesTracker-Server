import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from './../../shared/services/app-config-service';
import { TOKEN_TYPE, UserRole } from './../../utils/constants';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private appConfigService: AppConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.authConfig.secretKey,
    });
  }

  async validate(payload: {
    userId: number;
    role: UserRole;
    type: string;
  }): Promise<User> {
    if (payload.type !== TOKEN_TYPE) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.find({
      id: payload.userId,
      role: payload.role,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
