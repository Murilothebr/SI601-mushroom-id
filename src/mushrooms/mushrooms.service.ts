import { Injectable, NotFoundException } from '@nestjs/common';
import { Mushroom } from './interfaces/mushroom.interface';
import { QueryFilterDto } from './dto/query-filter.dto';

@Injectable()
export class MushroomsService {
  private items: Mushroom[] = [];
  private nextId = 1;

  create(data: Omit<Mushroom, 'id' | 'createdAt'>): Mushroom {
    const newItem: Mushroom = {
      id: this.nextId++,
      ...data,
      createdAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  findAll(query: QueryFilterDto): Mushroom[] {
    let result = [...this.items];

    if (query.filter) {
      const filter = query.filter.toLowerCase();
      result = result.filter(
        (mushroom) =>
          mushroom.scientificName.toLowerCase().includes(filter) ||
          mushroom.hint.toLowerCase().includes(filter),
      );
    }

    if (query.page) {
      const itemsPerPage = 10;
      const startIndex = (query.page - 1) * itemsPerPage;
      result = result.slice(startIndex, startIndex + itemsPerPage);
    }

    return result;
  }

  findOne(id: number): Mushroom {
    const item = this.items.find((item) => item.id === id);
    if (!item) throw new NotFoundException('Item não encontrado');
    return item;
  }

  update(
    id: number,
    updateData: Partial<Omit<Mushroom, 'id' | 'createdAt'>>,
  ): Mushroom {
    const item = this.findOne(id);
    Object.assign(item, updateData);
    return item;
  }

  remove(id: number): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Item não encontrado');
    this.items.splice(index, 1);
  }
}
