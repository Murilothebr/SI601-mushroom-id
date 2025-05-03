import { Test, TestingModule } from '@nestjs/testing';
import { MushroomsService } from './mushrooms.service';

describe('MushroomsService', () => {
  let service: MushroomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MushroomsService],
    }).compile();

    service = module.get<MushroomsService>(MushroomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
