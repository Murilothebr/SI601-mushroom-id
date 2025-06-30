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
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { MushroomsService } from './mushrooms.service';
import { Mushroom } from './interfaces/mushroom.interface';
import { QueryFilterDto } from './dto/query-filter.dto';
import { CreateMushroomDto } from './dto/create-mushroom.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CustomExceptionFilter } from 'src/custom-exception/custom-exception.filter';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: 'mushrooms', version: '1' })
@UseInterceptors(ResponseInterceptor)
@UseFilters(CustomExceptionFilter)
export class MushroomsController {
  constructor(private readonly featureService: MushroomsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateMushroomDto, @Req() req): Promise<any> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Missing user ID in request.');
    }

    return this.featureService.create(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  async findByUser(@Req() req): Promise<any[]> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Missing user ID in request.');
    }

    return this.featureService.findByUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() query: QueryFilterDto): Promise<any[]> {
    return this.featureService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.featureService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Mushroom>,
  ): Promise<any> {
    return this.featureService.update(id, updateData);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.featureService.remove(id);
  }
}
