import { VEHICLE_TYPE } from "../entities/vehicle.entity";

export class CreateVehicleDto {
    vehicleType:VEHICLE_TYPE;
    vehicleNumber:string;
    vehicleChasisNumber:string;
    vehiclePhoto?:string
}
