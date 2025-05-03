import { Module } from '@nestjs/common';
import { MushroomsService } from './mushrooms.service';
import { MushroomsController } from './mushrooms.controller';

@Module({
  providers: [MushroomsService],
  controllers: [MushroomsController]
})
export class MushroomsModule {}
