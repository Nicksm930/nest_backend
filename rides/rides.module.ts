import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Passanger } from 'src/passangers/entities/passanger.entity';
import { RidesGateway } from './rides/rides.gateway';
import { DriversService } from 'src/drivers/drivers.service';
import { Driver } from 'src/drivers/entities/driver.entity';
import { PassangersService } from 'src/passangers/passangers.service';

@Module({
  imports:[TypeOrmModule.forFeature([Ride,Passanger,Driver])],
  controllers: [RidesController],
  providers: [RidesService, RidesGateway,DriversService,PassangersService],
  exports:[RidesService,RidesGateway]
})
export class RidesModule {}
