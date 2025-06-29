import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MushroomsModule } from './mushrooms/mushrooms.module';
import { MushroomsService } from './mushrooms/mushrooms.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [MushroomsModule],
  controllers: [AppController],
  providers: [AppService, MushroomsService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
