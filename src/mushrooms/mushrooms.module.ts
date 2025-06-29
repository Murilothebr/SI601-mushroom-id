import { Module } from '@nestjs/common';
import { MushroomsService } from './mushrooms.service';
import { MushroomsController } from './mushrooms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MushroomsService],
  controllers: [MushroomsController],
})
export class MushroomsModule {}
