import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt/jwt.guard';
import { RoleGuard } from './auth/role/role.guard';
import { Roles } from './role/role.decorator';
import { UserRole } from './users/entities/user.entity';

@Controller()
@UseGuards(JwtGuard,RoleGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(UserRole.PASSANGER)
  getHello(): string {
    return this.appService.getHello();
  }
}
