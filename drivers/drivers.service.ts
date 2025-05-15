import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { RidesService } from 'src/rides/rides.service';
import { PassangersService } from 'src/passangers/passangers.service';
import { Ride, RIDE_STATUS } from 'src/rides/entities/ride.entity';

@Injectable()
export class DriversService {

  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository:Repository<Driver>,
    @InjectRepository(Ride)
    private readonly rideRepository:Repository<Ride>,
    private readonly rideService:RidesService,
    private readonly passengerService:PassangersService
  ){}

  create(user:User):Driver {
    const driver = this.driverRepository.create({    
      user: user                // associate driver with the user
    });
    if(!driver){
      throw new ConflictException("Driver Not Created")
    }
    return driver;
  }

  async findAll() {
    return await this.driverRepository.find();
  }

  async findOne(id: string) : Promise<Driver | null>{

    return await this.driverRepository.
    createQueryBuilder('driver').
    leftJoinAndSelect('driver.user','user').
    select([
      'driver.id',
      'driver.isActive',
      'driver.status',
      'user.username',
      'user.email'
    ]).where(
      'driver.id = :id ',{id:id}
    ).getOne();

  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }

  async accept(rideId:string,passengerId:string,driverId :string):Promise<Ride | null>{

    const rideDetails=await this.rideService.findOne(rideId)
    if(!rideDetails){
      throw new NotFoundException("Ride details not found at driver")
    }
    console.log("rideDetails",rideDetails);

    const passangerDetails=await this.passengerService.findOne(passengerId)
    if(!passangerDetails){
      throw new NotFoundException("Passenger details not found at driver")
    }
    
    console.log("passangerDetails",passangerDetails)

    const driverDetails= await this.findOne(driverId)
    
    if(!driverDetails){
      throw new NotFoundException("Driver Not Found")
    }
    if(rideDetails.status != RIDE_STATUS.COMPLETED && rideDetails.status != RIDE_STATUS.CANCELLED && rideDetails.status == RIDE_STATUS.REQUESTED){
      rideDetails.status = RIDE_STATUS.ONGOING
    }
    rideDetails.passanger=passangerDetails;
    rideDetails.driver=driverDetails;

    const acceptRide=await this.rideRepository.save(rideDetails);

    return acceptRide 
  }
}
