import { Module } from '@nestjs/common';
import { PassangersService } from './passangers.service';
import { PassangersController } from './passangers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passanger } from './entities/passanger.entity';
import { Ride } from 'src/rides/entities/ride.entity';
import { RidesModule } from 'src/rides/rides.module';

@Module({
  imports:[TypeOrmModule.forFeature([Passanger,Ride]),RidesModule],
  controllers: [PassangersController],
  providers: [PassangersService],
  exports:[PassangersService]
})
export class PassangersModule {}
