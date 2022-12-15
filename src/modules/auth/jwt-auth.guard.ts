import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_STRATEGY } from './../../utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_STRATEGY) {
  handleRequest(err: Error, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
