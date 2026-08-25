import { Injectable } from '@nestjs/common';
import { CreateEngagementEventDto } from './dto/create-engagement-event.dto';
import { UpdateEngagementEventDto } from './dto/update-engagement-event.dto';

@Injectable()
export class EngagementEventsService {
  create(createEngagementEventDto: CreateEngagementEventDto) {
    return 'This action adds a new engagementEvent';
  }

  findAll() {
    return `This action returns all engagementEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engagementEvent`;
  }

  update(id: number, updateEngagementEventDto: UpdateEngagementEventDto) {
    return `This action updates a #${id} engagementEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} engagementEvent`;
  }
}
