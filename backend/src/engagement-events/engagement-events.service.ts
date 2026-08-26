import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EngagementEvent } from './entities/engagement-event.entity';
import { Video } from '../videos/entities/video.entity';
import { Repository } from 'typeorm';
import { CreateEngagementEventDto } from './dto/create-engagement-event.dto';

@Injectable()
export class EngagementEventsService {

  constructor(
    @InjectRepository(EngagementEvent)
    private readonly eventRepo: Repository<EngagementEvent>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
  ) { }

  async create(dto: CreateEngagementEventDto): Promise<EngagementEvent> {
    const video = await this.videoRepo.findOne({ where: { id: dto.videoId } });

    if (!video) {
      throw new NotFoundException(`Video with id ${dto.videoId} not found`);
    }

    const event = this.eventRepo.create({
      videoId: dto.videoId,
      eventType: dto.eventType,
    });

    return this.eventRepo.save(event);
  }
}
