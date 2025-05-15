import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { Ride } from './entities/ride.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Passanger } from 'src/passangers/entities/passanger.entity';
import { Repository } from 'typeorm';
import { RidesGateway } from './rides/rides.gateway';

export interface RidePayload{
  passengerId:string,
  ride:Ride
}


@Injectable()
export class RidesService {

  constructor(
    @InjectRepository(Passanger)
    private readonly passangerRepository:Repository<Passanger>,

    @InjectRepository(Ride)
    private readonly rideRepository:Repository<Ride>,

    private readonly rideGateway:RidesGateway
  ){}

  async create(userId:string , createRideDto: CreateRideDto) : Promise<Ride>{

    try {
      
      const passagnerFound=await this.passangerRepository.findOne({
        where:{id : userId},
      })
      
      if(!passagnerFound){
        throw new NotFoundException("Passenger Not Created ... You Need to SignUp")
      }

      const newRide=this.rideRepository.create({
        passanger:passagnerFound,
        ...createRideDto
      })

      if(!newRide){
        throw new ConflictException("Ride Not Created")
      }

      
      await this.passangerRepository.save(passagnerFound);
      const savedRide=await this.rideRepository.save(newRide);
      
      if(savedRide){
        const RidePayload: RidePayload={
          passengerId:passagnerFound.id,
          ride:savedRide
        }

        this.rideGateway.broadcastRide(RidePayload);
      }

      return savedRide
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all rides`;
  }

  async findOne(id: string):Promise<Ride | null> {
    return await this.rideRepository.findOne({
      where:{id:id}
    });
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
