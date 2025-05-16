import { Module } from '@nestjs/common';
import { IploggerService } from './iplogger.service';
import { IploggerController } from './iplogger.controller';

@Module({
  controllers: [IploggerController],
  providers: [IploggerService],
  exports:[IploggerService]
})
export class IploggerModule {}
