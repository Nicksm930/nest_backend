import { Test, TestingModule } from '@nestjs/testing';
import { PassangersController } from './passangers.controller';
import { PassangersService } from './passangers.service';

describe('PassangersController', () => {
  let controller: PassangersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassangersController],
      providers: [PassangersService],
    }).compile();

    controller = module.get<PassangersController>(PassangersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
