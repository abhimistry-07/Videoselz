import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EngagementEventsService } from './engagement-events.service';
import { CreateEngagementEventDto } from './dto/create-engagement-event.dto';
import { UpdateEngagementEventDto } from './dto/update-engagement-event.dto';

@Controller('engagement-events')
export class EngagementEventsController {
  constructor(private readonly engagementEventsService: EngagementEventsService) {}

  @Post()
  create(@Body() createEngagementEventDto: CreateEngagementEventDto) {
    return this.engagementEventsService.create(createEngagementEventDto);
  }

  @Get()
  findAll() {
    return this.engagementEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engagementEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEngagementEventDto: UpdateEngagementEventDto) {
    return this.engagementEventsService.update(+id, updateEngagementEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engagementEventsService.remove(+id);
  }
}
