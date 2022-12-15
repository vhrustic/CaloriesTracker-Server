import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './../../utils/constants';
import { User } from './../user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = <User>request.user;

    return roles.includes(user.role);
  }
}
