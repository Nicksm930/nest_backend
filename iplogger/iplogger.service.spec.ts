import { Test, TestingModule } from '@nestjs/testing';
import { IploggerService } from './iplogger.service';

describe('IploggerService', () => {
  let service: IploggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IploggerService],
    }).compile();

    service = module.get<IploggerService>(IploggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
