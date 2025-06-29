import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMushroomDto } from './dto/create-mushroom.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { Mushroom, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MushroomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMushroomDto, userId: number): Promise<Mushroom> {
    try {
      return await this.prisma.mushroom.create({
        data: {
          scientific_name: data.scientificName,
          image_url: data.imageUrl,
          hint: data.hint,
          description: data.description,
          created_by: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Mushroom with name "${data.scientificName}" already exists.`,
        );
      }

      console.log(error);
      throw new InternalServerErrorException('Failed to create mushroom.');
    }
  }

  async findByUser(userId: number): Promise<Mushroom[]> {
    try {
      return await this.prisma.mushroom.findMany({
        where: {
          created_by: {
            id: userId,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve user mushrooms.',
      );
    }
  }

  async findAll(query: QueryFilterDto): Promise<Mushroom[]> {
    try {
      return await this.prisma.mushroom.findMany({
        where: {
          scientific_name: query.scientific_name
            ? ({
                contains: query.scientific_name,
                mode: 'insensitive',
              } as Prisma.StringFilter)
            : undefined,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve mushrooms.');
    }
  }

  async findOne(id: number): Promise<Mushroom> {
    try {
      const mushroom = await this.prisma.mushroom.findUnique({ where: { id } });
      if (!mushroom)
        throw new NotFoundException(`Mushroom with id ${id} not found.`);
      return mushroom;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve mushroom.');
    }
  }

  async update(id: number, data: Partial<Mushroom>): Promise<Mushroom> {
    try {
      await this.findOne(id);
      return await this.prisma.mushroom.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Mushroom name already in use by another mushroom.',
          );
        }
      }
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update mushroom.');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.prisma.mushroom.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete mushroom.');
    }
  }
}
