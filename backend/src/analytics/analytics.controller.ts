import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
import { VideoAnalytics } from './interfaces/video-analytics.interface';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('videos')
    async getVideoAnalytics(@Query() query: GetAnalyticsDto): Promise<{
        data: VideoAnalytics[];
        total: number;
        page: number;
        limit: number;
    }> {
        return this.analyticsService.getVideoAnalytics(query);
    }
}