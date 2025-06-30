import { Test, TestingModule } from '@nestjs/testing';
import { MushroomsService } from './mushrooms.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const mockPrismaService = {
  mushroom: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('MushroomsService', () => {
  let service: MushroomsService;
  const mockMushroom = {
    id: 1,
    scientific_name: 'Amanita muscaria',
    image_url: 'https://example.com/image.jpg',
    hint: 'Some hint',
    description: 'Some description',
    created_at: new Date(),
    user_id: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MushroomsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<MushroomsService>(MushroomsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const createDto = {
      scientificName: 'Amanita muscaria',
      imageUrl: 'https://example.com/image.jpg',
      hint: 'Some hint',
      description: 'Some description',
    };

    it('should create a mushroom successfully', async () => {
      mockPrismaService.mushroom.create.mockResolvedValue(mockMushroom);

      const result = await service.create(createDto, 1);

      expect(result).toEqual(mockMushroom);
      expect(mockPrismaService.mushroom.create).toHaveBeenCalledWith({
        data: {
          scientific_name: createDto.scientificName,
          image_url: createDto.imageUrl,
          hint: createDto.hint,
          description: createDto.description,
          created_by: { connect: { id: 1 } },
        },
      });
    });

    it('should throw ConflictException if mushroom already exists', async () => {
      mockPrismaService.mushroom.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Conflict', {
          code: 'P2002',
          clientVersion: '6.10.1',
        }),
      );

      await expect(service.create(createDto, 1)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findByUser', () => {
    it('should return mushrooms by user id', async () => {
      mockPrismaService.mushroom.findMany.mockResolvedValue([mockMushroom]);

      const result = await service.findByUser(1);

      expect(result).toEqual([mockMushroom]);
      expect(mockPrismaService.mushroom.findMany).toHaveBeenCalledWith({
        where: { created_by: { id: 1 } },
      });
    });
  });

  describe('findAll', () => {
    it('should return all mushrooms', async () => {
      mockPrismaService.mushroom.findMany.mockResolvedValue([mockMushroom]);

      const result = await service.findAll({ scientific_name: 'Amanita' });

      expect(result).toEqual([mockMushroom]);
      expect(mockPrismaService.mushroom.findMany).toHaveBeenCalledWith({
        where: {
          scientific_name: { contains: 'Amanita', mode: 'insensitive' },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return one mushroom by id', async () => {
      mockPrismaService.mushroom.findUnique.mockResolvedValue(mockMushroom);

      const result = await service.findOne(1);

      expect(result).toEqual(mockMushroom);
      expect(mockPrismaService.mushroom.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if mushroom does not exist', async () => {
      mockPrismaService.mushroom.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateData = { hint: 'Updated hint' };

    it('should update a mushroom successfully', async () => {
      mockPrismaService.mushroom.findUnique.mockResolvedValue(mockMushroom);
      mockPrismaService.mushroom.update.mockResolvedValue({
        ...mockMushroom,
        ...updateData,
      });

      const result = await service.update(1, updateData);

      expect(result.hint).toEqual(updateData.hint);
      expect(mockPrismaService.mushroom.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });

    it('should throw NotFoundException if mushroom not found on update', async () => {
      mockPrismaService.mushroom.findUnique.mockResolvedValue(null);

      await expect(service.update(999, updateData)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if unique constraint violation occurs', async () => {
      mockPrismaService.mushroom.findUnique.mockResolvedValue(mockMushroom);
      mockPrismaService.mushroom.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Conflict', {
          code: 'P2002',
          clientVersion: '6.10.1',
        }),
      );

      await expect(service.update(1, updateData)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('should delete mushroom successfully', async () => {
      mockPrismaService.mushroom.findUnique.mockResolvedValue(mockMushroom);
      mockPrismaService.mushroom.delete.mockResolvedValue(mockMushroom);

      await expect(service.remove(1)).resolves.not.toThrow();
      expect(mockPrismaService.mushroom.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if mushroom not found on delete', async () => {
      mockPrismaService.mushroom.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
