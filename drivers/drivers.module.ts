import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Driver } from './entities/driver.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Ride } from 'src/rides/entities/ride.entity';
import { RidesService } from 'src/rides/rides.service';
import { Passanger } from 'src/passangers/entities/passanger.entity';
import { PassangersService } from 'src/passangers/passangers.service';
import { RidesModule } from 'src/rides/rides.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Driver,Vehicle,Ride,Passanger]),RidesModule],
  controllers: [DriversController],
  providers: [DriversService,RidesService,PassangersService],
  exports:[DriversService]
})
export class DriversModule {}
