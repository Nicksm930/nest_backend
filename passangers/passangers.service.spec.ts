import { Test, TestingModule } from '@nestjs/testing';
import { PassangersService } from './passangers.service';

describe('PassangersService', () => {
  let service: PassangersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassangersService],
    }).compile();

    service = module.get<PassangersService>(PassangersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
