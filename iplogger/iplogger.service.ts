import { Injectable } from '@nestjs/common';
import { CreateIploggerDto } from './dto/create-iplogger.dto';
import { UpdateIploggerDto } from './dto/update-iplogger.dto';

@Injectable()
export class IploggerService {

  private loggerMap=new Map<string,Date>();

  create(createIploggerDto: CreateIploggerDto) {
    return this.loggerMap.set(createIploggerDto.ip,createIploggerDto.visitedAt)
  }

  findAll() {
    return Array.from(this.loggerMap.entries()).map(([ip, visitedAt]) => ({
      ip,
      visitedAt: visitedAt.toISOString(), // ensures it's a readable string
    }));
  }
  

  findOne(id: string) {
    return {
      id:id,
      visitedAt:this.loggerMap.get(id)
    };
  }

  update(ip: string, updateIploggerDto: UpdateIploggerDto) {
    if (!this.loggerMap.has(ip)) {
      return { message: 'IP not found, cannot update', ip };
    }

    const { visitedAt } = updateIploggerDto;
    if(visitedAt){
      this.loggerMap.set(ip, visitedAt);
    }
    
    return { message: 'IP updated', ip, visitedAt };
  }

  remove(id: number) {
    return `This action removes a #${id} iplogger`;
  }
}
