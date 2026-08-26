import { Module } from '@nestjs/common';
import { EngagementEventsService } from './engagement-events.service';
import { EngagementEventsController } from './engagement-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementEvent } from './entities/engagement-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EngagementEvent])],
  controllers: [EngagementEventsController],
  providers: [EngagementEventsService],
  exports: [TypeOrmModule],
})
export class EngagementEventsModule { }
