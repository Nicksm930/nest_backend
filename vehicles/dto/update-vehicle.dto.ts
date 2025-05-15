import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { VEHICLE_STATUS } from '../entities/vehicle.entity';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
    vehicleStatus?:VEHICLE_STATUS
}
