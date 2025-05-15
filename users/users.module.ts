import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { DriversModule } from 'src/drivers/drivers.module';
import { Passanger } from 'src/passangers/entities/passanger.entity';
import { PassangersModule } from 'src/passangers/passangers.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Driver,Passanger]),PassangersModule,DriversModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
