import { Test, TestingModule } from '@nestjs/testing';
import { MushroomsController } from './mushrooms.controller';
import { MushroomsService } from './mushrooms.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('MushroomsController', () => {
  let controller: MushroomsController;
  let service: MushroomsService;

  const mockService = {
    create: jest.fn(),
    findByUser: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUserRequest = { user: { sub: 1, role: 'USER' } };
  const mockAdminRequest = { user: { sub: 2, role: 'ADMIN' } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MushroomsController],
      providers: [{ provide: MushroomsService, useValue: mockService }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MushroomsController>(MushroomsController);
    service = module.get<MushroomsService>(MushroomsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create a mushroom', async () => {
      const dto = {
        scientificName: 'Amanita',
        imageUrl: '',
        hint: '',
        description: '',
      };
      mockService.create.mockResolvedValue(dto);

      const result = await controller.create(dto, mockUserRequest);

      expect(result).toEqual(dto);
      expect(service.create).toHaveBeenCalledWith(
        dto,
        mockUserRequest.user.sub,
      );
    });

    it('should throw UnauthorizedException if no user', async () => {
      const dto = {
        scientificName: 'Amanita',
        imageUrl: '',
        hint: '',
        description: '',
      };

      await expect(controller.create(dto, {})).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('findByUser', () => {
    it('should retrieve mushrooms by user', async () => {
      const mushrooms = [{ id: 1 }];
      mockService.findByUser.mockResolvedValue(mushrooms);

      const result = await controller.findByUser(mockUserRequest);

      expect(result).toEqual(mushrooms);
      expect(service.findByUser).toHaveBeenCalledWith(mockUserRequest.user.sub);
    });
  });

  describe('findAll', () => {
    it('should retrieve all mushrooms', async () => {
      const query = { scientific_name: 'amanita' };
      const mushrooms = [{ id: 1 }];
      mockService.findAll.mockResolvedValue(mushrooms);

      const result = await controller.findAll(query);

      expect(result).toEqual(mushrooms);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should retrieve one mushroom', async () => {
      const mushroom = { id: 1 };
      mockService.findOne.mockResolvedValue(mushroom);

      const result = await controller.findOne(1);

      expect(result).toEqual(mushroom);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a mushroom', async () => {
      const updateData = { hint: 'updated hint' };
      const updatedMushroom = { id: 1, hint: 'updated hint' };
      mockService.update.mockResolvedValue(updatedMushroom);

      const result = await controller.update(1, updateData);

      expect(result).toEqual(updatedMushroom);
      expect(service.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('remove', () => {
    it('should remove mushroom (admin only)', async () => {
      mockService.remove.mockResolvedValue(undefined);

      await expect(controller.remove(1)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
