import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassangersService } from './passangers.service';
import { CreatePassangerDto } from './dto/create-passanger.dto';
import { UpdatePassangerDto } from './dto/update-passanger.dto';
import { User } from 'src/users/entities/user.entity';
import { Passanger } from './entities/passanger.entity';

@Controller('passangers')
export class PassangersController {
  constructor(private readonly passangersService: PassangersService) {}

  @Post()
  create(user:User) : Promise<Passanger | null>{
    return this.passangersService.create(user);
  }

  @Get()
  findAll() : Promise<Passanger[] | null>{
    return this.passangersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Passanger | null>{
    return this.passangersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassangerDto: UpdatePassangerDto) {
    return this.passangersService.update(+id, updatePassangerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passangersService.remove(+id);
  }
}
