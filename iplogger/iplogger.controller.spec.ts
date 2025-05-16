import { Test, TestingModule } from '@nestjs/testing';
import { IploggerController } from './iplogger.controller';
import { IploggerService } from './iplogger.service';

describe('IploggerController', () => {
  let controller: IploggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IploggerController],
      providers: [IploggerService],
    }).compile();

    controller = module.get<IploggerController>(IploggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
