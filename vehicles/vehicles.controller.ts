import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post(':id')
  create(@Query('id') id:string ,@Body() createVehicleDto: CreateVehicleDto) {
    console.log(id);
    console.log(createVehicleDto);
    return this.vehiclesService.create(id,createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) : Promise<Vehicle> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
