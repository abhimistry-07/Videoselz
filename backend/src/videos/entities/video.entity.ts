import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { EngagementEvent } from '../../engagement-events/entities/engagement-event.entity';

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    productId: number;

    @ManyToOne(() => Product, (product: Product) => product.videos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ name: 'video_url' })
    videoUrl: string;

    @Column()
    title: string;

    @OneToMany(() => EngagementEvent, (event: EngagementEvent) => event.video)
    events: EngagementEvent[];
}