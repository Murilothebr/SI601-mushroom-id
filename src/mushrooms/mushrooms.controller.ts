import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { MushroomsService } from './mushrooms.service';
import { Mushroom } from './interfaces/mushroom.interface';
import { QueryFilterDto } from './dto/query-filter.dto';
import { CreateMushroomDto } from './dto/create-mushroom.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CustomExceptionFilter } from 'src/custom-exception/custom-exception.filter';

@Controller('mushrooms')
@UseInterceptors(ResponseInterceptor)
@UseFilters(CustomExceptionFilter)
export class MushroomsController {
  constructor(private readonly featureService: MushroomsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateMushroomDto): Mushroom {
    return this.featureService.create(body);
  }

  @Get()
  findAll(@Query() query: QueryFilterDto): Mushroom[] {
    return this.featureService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Mushroom {
    return this.featureService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Mushroom>,
  ): Mushroom {
    return this.featureService.update(id, updateData);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdateData: Partial<Mushroom>,
  ): Mushroom {
    return this.featureService.update(id, partialUpdateData);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.featureService.remove(id);
  }
}
