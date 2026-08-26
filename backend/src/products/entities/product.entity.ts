import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Video } from '../../videos/entities/video.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => Video, (video: Video) => video.product)
    videos: Video[];
}
