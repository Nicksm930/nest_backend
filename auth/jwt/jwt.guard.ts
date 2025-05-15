import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/users/entities/user.entity';
import { NOTFOUND } from 'dns';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/role/role.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Token Was Not Provided');

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = jwt.verify(
        token,
        this.configService.get('JWT_SECRET_KEY')!,
      ) as {
        email: string;
        role: UserRole;
      };

      request['user'] = payload;
    } catch (error) {
      throw new NotFoundException('Payload Not Found');
    }
    return true;
  }
}
