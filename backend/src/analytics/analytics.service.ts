import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../videos/entities/video.entity';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
import { VideoAnalytics } from './interfaces/video-analytics.interface';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepo: Repository<Video>,
    ) { }

    async getVideoAnalytics(query: GetAnalyticsDto): Promise<{
        data: VideoAnalytics[];
        total: number;
        page: number;
        limit: number;
    }> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [rows, total] = await Promise.all([
            this.videoRepo
                .createQueryBuilder('video')
                .leftJoin('video.events', 'event')
                .select('video.id', 'id')
                .addSelect('video.title', 'title')
                .addSelect('video.videoUrl', 'videoUrl')
                .addSelect('video.productId', 'productId')
                .addSelect(
                    `SUM(CASE WHEN event.eventType = 'view' THEN 1 ELSE 0 END)`,
                    'views',
                )
                .addSelect(
                    `SUM(CASE WHEN event.eventType = 'click' THEN 1 ELSE 0 END)`,
                    'clicks',
                )
                .addSelect(
                    `SUM(CASE WHEN event.eventType = 'add_to_cart' THEN 1 ELSE 0 END)`,
                    'addToCarts',
                )
                .groupBy('video.id')
                .orderBy('video.id', 'ASC')
                .offset(skip)
                .limit(limit)
                .getRawMany(),
            this.videoRepo.count(),
        ]);

        const data: VideoAnalytics[] = rows.map((row) => ({
            id: Number(row.id),
            title: row.title,
            videoUrl: row.videoUrl,
            productId: Number(row.productId),
            views: Number(row.views) || 0,
            clicks: Number(row.clicks) || 0,
            addToCarts: Number(row.addToCarts) || 0,
        }));

        return { data, total, page, limit };
    }
}