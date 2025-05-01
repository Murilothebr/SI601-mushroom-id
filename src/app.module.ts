import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MushroomsModule } from './mushrooms/mushrooms.module';
import { MushroomService } from './mushroom/mushroom.service';

@Module({
  imports: [MushroomsModule],
  controllers: [AppController],
  providers: [AppService, MushroomService],
})
export class AppModule {}
