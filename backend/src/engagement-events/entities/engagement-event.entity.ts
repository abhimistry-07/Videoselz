import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Video } from '../../videos/entities/video.entity';

export enum EventType {
    VIEW = 'view',
    CLICK = 'click',
    ADD_TO_CART = 'add_to_cart',
}

@Entity('engagement_events')
export class EngagementEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'video_id' })
    videoId: number;

    @ManyToOne(() => Video, (video) => video.events, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'video_id' })
    video: Video;

    @Column({
        type: 'varchar',
        name: 'event_type',
    })
    eventType: EventType;

    @CreateDateColumn({ name: 'timestamp' })
    timestamp: Date;
}