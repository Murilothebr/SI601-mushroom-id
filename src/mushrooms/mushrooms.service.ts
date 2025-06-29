import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMushroomDto } from './dto/create-mushroom.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { Mushroom, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MushroomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMushroomDto): Promise<Mushroom> {
    return this.prisma.mushroom.create({
      data: {
        scientific_name: data.scientificName,
        image_url: data.imageUrl,
        hint: data.hint,
        description: data.description,
      },
    });
  }

  async findAll(query: QueryFilterDto): Promise<Mushroom[]> {
    return this.prisma.mushroom.findMany({
      where: {
        scientific_name: query.scientific_name
          ? ({
              contains: query.scientific_name,
              mode: 'insensitive',
            } as Prisma.StringFilter)
          : undefined,
      },
    });
  }

  async findOne(id: number): Promise<Mushroom> {
    const mushroom = await this.prisma.mushroom.findUnique({ where: { id } });
    if (!mushroom) throw new NotFoundException('Mushroom not found');
    return mushroom;
  }

  async update(id: number, data: Partial<Mushroom>): Promise<Mushroom> {
    await this.findOne(id);
    return this.prisma.mushroom.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.mushroom.delete({ where: { id } });
  }
}
