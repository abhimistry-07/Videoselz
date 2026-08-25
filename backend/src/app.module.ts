import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { VideosModule } from './videos/videos.module';
import { EngagementEventsModule } from './engagement-events/engagement-events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'better-sqlite3',
        database: configService.get<string>('DATABASE_PATH') || './data/db.sqlite',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ProductsModule,
    VideosModule,
    EngagementEventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
