import { PartialType } from '@nestjs/mapped-types';
import { CreateIploggerDto } from './create-iplogger.dto';

export class UpdateIploggerDto extends PartialType(CreateIploggerDto) {
    visitedAt?: Date | undefined;
}
