import { IsEnum, IsInt, Min } from 'class-validator';
import { EventType } from '../entities/engagement-event.entity';

export class CreateEngagementEventDto {
    @IsInt()
    @Min(1)
    videoId: number;

    @IsEnum(EventType)
    eventType: EventType;
}