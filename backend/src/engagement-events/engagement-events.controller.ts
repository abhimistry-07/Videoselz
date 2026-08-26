import { Controller, Post, Body } from '@nestjs/common';
import { EngagementEventsService } from './engagement-events.service';
import { CreateEngagementEventDto } from './dto/create-engagement-event.dto';

@Controller('events')
export class EngagementEventsController {
  constructor(private readonly engagementEventsService: EngagementEventsService) { }

  @Post()
  async create(@Body() createEngagementEventDto: CreateEngagementEventDto) {
    return await this.engagementEventsService.create(createEngagementEventDto);
  }
}
