import { Test, TestingModule } from '@nestjs/testing';
import { MushroomsController } from './mushrooms.controller';

describe('MushroomsController', () => {
  let controller: MushroomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MushroomsController],
    }).compile();

    controller = module.get<MushroomsController>(MushroomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
