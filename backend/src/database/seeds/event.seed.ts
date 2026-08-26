import { DataSource } from 'typeorm';
import { EngagementEvent, EventType } from '../../engagement-events/entities/engagement-event.entity';
import { Video } from '../../videos/entities/video.entity';

export async function seedEvents(dataSource: DataSource, videos: Video[]): Promise<void> {
    const eventRepo = dataSource.getRepository(EngagementEvent);

    const events: Partial<EngagementEvent>[] = [];

    for (const video of videos) {
        // Simulate a realistic funnel: views > clicks > add-to-carts
        const viewCount = Math.floor(Math.random() * 50) + 20;
        const clickCount = Math.floor(viewCount * 0.3);
        const cartCount = Math.floor(clickCount * 0.2);

        for (let i = 0; i < viewCount; i++) events.push({ videoId: video.id, eventType: EventType.VIEW });
        for (let i = 0; i < clickCount; i++) events.push({ videoId: video.id, eventType: EventType.CLICK });
        for (let i = 0; i < cartCount; i++) events.push({ videoId: video.id, eventType: EventType.ADD_TO_CART });
    }

    await eventRepo.save(events);
    console.log(`Seeded ${events.length} engagement events.`);
}