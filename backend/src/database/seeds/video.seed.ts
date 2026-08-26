import { DataSource } from 'typeorm';
import { Video } from '../../videos/entities/video.entity';
import { Product } from '../../products/entities/product.entity';

export async function seedVideos(dataSource: DataSource, products: Product[]): Promise<Video[]> {
    const videoRepo = dataSource.getRepository(Video);

    const videos = await videoRepo.save([
        { productId: products[0].id, videoUrl: 'https://example.com/v1.mp4', title: 'Earbuds Unboxing' },
        { productId: products[0].id, videoUrl: 'https://example.com/v2.mp4', title: 'Earbuds Sound Test' },
        { productId: products[1].id, videoUrl: 'https://example.com/v3.mp4', title: 'Bottle Demo' },
        { productId: products[2].id, videoUrl: 'https://example.com/v4.mp4', title: 'Yoga Mat Review' },
        { productId: products[0].id, videoUrl: 'https://example.com/v5.mp4', title: 'Earbuds Battery Life Test' },
    ]);

    console.log(`Seeded ${videos.length} videos.`);
    return videos;
}