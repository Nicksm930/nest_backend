import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Passanger } from 'src/passangers/entities/passanger.entity';
import { PassangersService } from 'src/passangers/passangers.service';
import { DriversService } from 'src/drivers/drivers.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    @InjectRepository(Driver)
    private readonly driverRepository:Repository<Driver>,
    @InjectRepository(Passanger)
    private readonly passangerRepository:Repository<Passanger>,
    private readonly passangerService:PassangersService,
    private readonly driverService:DriversService,
  ){    
  }


  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser =this.userRepository.create(createUserDto);
       const newUser=await this.userRepository.save(createdUser)
      if (newUser.role === UserRole.DRIVER) {
        const savedDriver=this.driverService.create(newUser);
        newUser.driver = savedDriver;
      }
      if (newUser.role === UserRole.PASSANGER) {
        const savedPassanger : Passanger = await this.passangerService.create(newUser)
        newUser.passanger=savedPassanger;
      }
  
      return await this.userRepository.save(newUser); // cascades and saves both user + driver
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error?.detail || 'User creation failed');
    }
  }
  

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where:{id:id}
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user=await this.findOne(id);
    if(!user){
      throw new NotFoundException('User Not Found');
    }
    Object.assign(user,updateUserDto);
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
