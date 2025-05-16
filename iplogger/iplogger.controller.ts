import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IploggerService } from './iplogger.service';
import { CreateIploggerDto } from './dto/create-iplogger.dto';
import { UpdateIploggerDto } from './dto/update-iplogger.dto';

@Controller('iplogger')
export class IploggerController {
  constructor(private readonly iploggerService: IploggerService) {}

  @Post()
  create(@Body() createIploggerDto: CreateIploggerDto) {
    return this.iploggerService.create(createIploggerDto);
  }

  @Get()
  findAll() {
    return this.iploggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iploggerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIploggerDto: UpdateIploggerDto) {
    return this.iploggerService.update(id, updateIploggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iploggerService.remove(+id);
  }
}
