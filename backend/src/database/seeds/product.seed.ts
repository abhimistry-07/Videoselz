import { DataSource } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

export async function seedProducts(dataSource: DataSource): Promise<Product[]> {
    const productRepo = dataSource.getRepository(Product);

    const products = await productRepo.save([
        { name: 'Wireless Earbuds', price: 59.99 },
        { name: 'Smart Water Bottle', price: 24.99 },
        { name: 'Yoga Mat Pro', price: 39.99 },
    ]);

    console.log(`Seeded ${products.length} products.`);
    return products;
}