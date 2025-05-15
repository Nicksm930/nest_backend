import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { Ride } from './entities/ride.entity';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post(':id')
  create(@Param('id') id:string ,@Body() createRideDto: CreateRideDto) : Promise<Ride> {
    return this.ridesService.create(id,createRideDto);
  }

  @Get()
  findAll() {
    return this.ridesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Ride | null>{
    return this.ridesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.ridesService.update(+id, updateRideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridesService.remove(+id);
  }
}
