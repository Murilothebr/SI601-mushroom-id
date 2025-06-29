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
  UseGuards,
} from '@nestjs/common';
import { MushroomsService } from './mushrooms.service';
import { Mushroom } from './interfaces/mushroom.interface';
import { QueryFilterDto } from './dto/query-filter.dto';
import { CreateMushroomDto } from './dto/create-mushroom.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CustomExceptionFilter } from 'src/custom-exception/custom-exception.filter';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('mushrooms')
@UseInterceptors(ResponseInterceptor)
@UseFilters(CustomExceptionFilter)
export class MushroomsController {
  constructor(private readonly featureService: MushroomsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateMushroomDto): Promise<any> {
    return this.featureService.create(body);
  }

  @Get()
  async findAll(@Query() query: QueryFilterDto): Promise<any[]> {
    return this.featureService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.featureService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Mushroom>,
  ): Promise<any> {
    return this.featureService.update(id, updateData);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdateData: Partial<Mushroom>,
  ): Promise<any> {
    return this.featureService.update(id, partialUpdateData);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.featureService.remove(id);
  }
}
