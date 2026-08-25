import { Module } from '@nestjs/common';
import { EngagementEventsService } from './engagement-events.service';
import { EngagementEventsController } from './engagement-events.controller';

@Module({
  controllers: [EngagementEventsController],
  providers: [EngagementEventsService],
})
export class EngagementEventsModule {}
