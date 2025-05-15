import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePassangerDto } from './dto/create-passanger.dto';
import { UpdatePassangerDto } from './dto/update-passanger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Passanger } from './entities/passanger.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PassangersService {

  constructor(
    @InjectRepository(Passanger)
    private readonly passangerRepository:Repository<Passanger>
  ){}

  async create(user: User) : Promise<Passanger> {
    const passagner = this.passangerRepository.create({    
      user: user                // associate driver with the user
    });

    if(!passagner){
      throw new ConflictException('Passanger Not created')
    }

    return await this.passangerRepository.save(passagner);
  }

  async findAll() : Promise<Passanger[] | null>{
    return await this.passangerRepository.find();
  }

  async findOne(id: string) : Promise<Passanger | null> {
    return await this.passangerRepository.findOne({
      where:{id : id},  
    });
  }

  update(id: number, updatePassangerDto: UpdatePassangerDto) {
    return `This action updates a #${id} passanger`;
  }

  remove(id: number) {
    return `This action removes a #${id} passanger`;
  }
}
