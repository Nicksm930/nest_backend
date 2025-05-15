import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Repository } from 'typeorm';
import { Driver, STATUS } from 'src/drivers/entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle, VEHICLE_STATUS } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {

  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository:Repository<Driver>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository:Repository<Vehicle>
  ){}
  
  async create(driverId:string,createVehicleDto: CreateVehicleDto) {

    try {
      const driverfound= await this.driverRepository.findOne({
        where:{id:driverId},
        relations: ['vehicle'],
      })

      if(!driverfound){
        throw new NotFoundException("Driver Does Not exists.")
      }
      if (driverfound.vehicle) {
        throw new ConflictException('Driver already has a vehicle');
      }

      const newVehilce=this.vehicleRepository.create({
        driver:driverfound,
        ...createVehicleDto
      })

      if(!newVehilce){
        throw new NotFoundException('Vehicle Not Created')
      }

      const savedVehicle=await this.vehicleRepository.save(newVehilce)
      driverfound.vehicle=savedVehicle
      await this.driverRepository.save(driverfound)
      const result = await this.vehicleRepository.findOne({
        where: { id: savedVehicle.id },
        relations: ['driver', 'driver.user', 'driver.vehicle'],
      });
      
      return result;
    } catch (error) {
      console.error(error);
    throw new InternalServerErrorException(error.message || 'Something went wrong');
    }

   
  }

  async findAll() {
    return await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.driver', 'driver')
      .leftJoinAndSelect('driver.user', 'user') // if you want user info
      .select([
        'vehicle.id',
        'vehicle.vehicleNumber',
        'driver.id',
        'user.username',
        'user.email',
      ])
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) : Promise<Vehicle>{

    const vehicleFound=await this.vehicleRepository.findOne({
      where:{id:id}
    })
    if(!vehicleFound){
      throw new NotFoundException("Vehicle Not Found")
    }
    Object.assign(vehicleFound,updateVehicleDto);
    if(updateVehicleDto.vehicleStatus === VEHICLE_STATUS.VERIFIED){
      vehicleFound.driver.status = STATUS.APPROVED
    }
    const savedVehicle= await this.vehicleRepository.save(vehicleFound);
   
    return savedVehicle;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
