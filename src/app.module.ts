import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MushroomsModule } from './mushrooms/mushrooms.module';
import { MushroomsService } from './mushrooms/mushrooms.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { JwtAuthMiddleware } from './middlewares/jwt-auth.middleware';
import { MushroomsController } from './mushrooms/mushrooms.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MushroomsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, MushroomsService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(JwtAuthMiddleware).forRoutes(MushroomsController);
  }
}
