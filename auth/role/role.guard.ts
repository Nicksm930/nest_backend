import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/role/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector:Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles=this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
    ])

    const request=context.switchToHttp().getRequest();
    const user=request.user;

    if(!user){
      throw new ForbiddenException("User Not Found - Forbidden")
    }

    if(!requiredRoles) return true

    if(!requiredRoles.includes(user.role)){
      throw new ForbiddenException("User Not Allowed to Access - Forbidden/Access Denied")
    }
    
    return requiredRoles.includes(user.role);
  }
}
