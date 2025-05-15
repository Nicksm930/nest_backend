import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { User } from 'src/users/entities/user.entity';
import { Driver } from './entities/driver.entity';
import { Ride } from 'src/rides/entities/ride.entity';


@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(user:User) : Driver{
    return this.driversService.create(user);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }

  @Post('accept')
  acceptRide(@Query('rideId') rideId:string , @Query('passengerId') passengerId:string , @Query('driverId') driverId:string ):Promise<Ride | null>{
    return this.driversService.accept(rideId,passengerId,driverId);
  }
}
