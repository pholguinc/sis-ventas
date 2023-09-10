import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  IS_ADMIN_KEY,
  IS_PUBLIC_KEY,
  IS_ROLES_KEY,
} from 'src/constants/key-decorator';
import { ROLES } from 'src/constants/roles';
import config from '../../config/config';
import { Request } from 'express';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      IS_ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(
      IS_ADMIN_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser } = req;

    console.log(roleUser);

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'No tienes permisos para esta operación',
        );
      }
    }

    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    
    const isAuth = roles.some((role) => role === roleUser);
    if (!isAuth) {
      throw new UnauthorizedException('No tienes permisos para esta operación');
    }
  }
}
