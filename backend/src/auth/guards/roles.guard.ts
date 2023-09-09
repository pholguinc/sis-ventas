import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  IS_PUBLIC_KEY,
  IS_ROLES_KEY,
  IS_SUPERADMIN_KEY,
} from 'src/constants/key-decorator';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      IS_ROLES_KEY,
      context.getHandler(),
    );

    const superadmin = this.reflector.get<string>(
      IS_SUPERADMIN_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser } = req;

    if (roles === undefined) {
      if (superadmin) {
        return true;
      } else if (superadmin && roleUser === superadmin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'No tienes permisos para realizar esta operación',
        );
      }
    }

    if (roleUser === ROLES.SUPERADMIN) {
      return true;
    }

    const isAuth = roles.some((role) => role === roleUser);

    if (isAuth) {
      throw new UnauthorizedException('No tienes permisos para esta operacion');
    }

    return true;
  }
}
