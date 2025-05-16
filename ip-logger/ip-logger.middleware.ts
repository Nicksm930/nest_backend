import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateIploggerDto } from 'src/iplogger/dto/create-iplogger.dto';
import { IploggerService } from 'src/iplogger/iplogger.service';

@Injectable()
export class IpLoggerMiddleware implements NestMiddleware {

  constructor(
    private readonly ipLoggerService: IploggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    let ip = req.ip || req.connection.remoteAddress || '';
    console.log("Ip Address",ip);
    if (req.headers['x-forwarded-for']) {
      const forwardedIps = (req.headers['x-forwarded-for'] as string).split(',');
      ip = forwardedIps[0].trim();  // The first IP in the list is the original client IP
    }
    
    const visitedAt = new Date(); // Create a Date object

    const existingVisit = this.ipLoggerService.findOne(ip);

    if (existingVisit) {
      this.ipLoggerService.update(ip, { visitedAt }); // using UpdateIploggerDto
    } else {
      const payload: CreateIploggerDto = { ip, visitedAt };
      this.ipLoggerService.create(payload);
    }
    console.log(this.ipLoggerService.findAll());
    next();
  }
}
