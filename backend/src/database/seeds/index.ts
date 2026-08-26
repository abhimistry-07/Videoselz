import { AppDataSource } from '../data-source';
import { seedProducts } from './product.seed';
import { seedVideos } from './video.seed';
import { seedEvents } from './event.seed';

async function runSeeds() {
    await AppDataSource.initialize();

    await AppDataSource.query('DELETE FROM engagement_events');
    await AppDataSource.query('DELETE FROM videos');
    await AppDataSource.query('DELETE FROM products');

    // Order matters: products -> videos -> events, due to FK dependencies
    const products = await seedProducts(AppDataSource);
    const videos = await seedVideos(AppDataSource, products);
    await seedEvents(AppDataSource, videos);

    console.log('Seeding complete.');
    await AppDataSource.destroy();
}

runSeeds().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});