import { PartialType } from '@nestjs/mapped-types';
import { CreateEngagementEventDto } from './create-engagement-event.dto';

export class UpdateEngagementEventDto extends PartialType(CreateEngagementEventDto) {}
