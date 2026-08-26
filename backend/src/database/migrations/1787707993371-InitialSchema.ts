import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1787707993371 implements MigrationInterface {
    name = 'InitialSchema1787707993371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" decimal(10,2) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_id" integer NOT NULL, "video_url" varchar NOT NULL, "title" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "engagement_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "video_id" integer NOT NULL, "event_type" varchar NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_videos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_id" integer NOT NULL, "video_url" varchar NOT NULL, "title" varchar NOT NULL, CONSTRAINT "FK_4b29772a70110690c94560d9efb" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_videos"("id", "product_id", "video_url", "title") SELECT "id", "product_id", "video_url", "title" FROM "videos"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`ALTER TABLE "temporary_videos" RENAME TO "videos"`);
        await queryRunner.query(`CREATE TABLE "temporary_engagement_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "video_id" integer NOT NULL, "event_type" varchar NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_528e27edbbac6936aaf4adf9430" FOREIGN KEY ("video_id") REFERENCES "videos" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_engagement_events"("id", "video_id", "event_type", "timestamp") SELECT "id", "video_id", "event_type", "timestamp" FROM "engagement_events"`);
        await queryRunner.query(`DROP TABLE "engagement_events"`);
        await queryRunner.query(`ALTER TABLE "temporary_engagement_events" RENAME TO "engagement_events"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "engagement_events" RENAME TO "temporary_engagement_events"`);
        await queryRunner.query(`CREATE TABLE "engagement_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "video_id" integer NOT NULL, "event_type" varchar NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "engagement_events"("id", "video_id", "event_type", "timestamp") SELECT "id", "video_id", "event_type", "timestamp" FROM "temporary_engagement_events"`);
        await queryRunner.query(`DROP TABLE "temporary_engagement_events"`);
        await queryRunner.query(`ALTER TABLE "videos" RENAME TO "temporary_videos"`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_id" integer NOT NULL, "video_url" varchar NOT NULL, "title" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "videos"("id", "product_id", "video_url", "title") SELECT "id", "product_id", "video_url", "title" FROM "temporary_videos"`);
        await queryRunner.query(`DROP TABLE "temporary_videos"`);
        await queryRunner.query(`DROP TABLE "engagement_events"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
