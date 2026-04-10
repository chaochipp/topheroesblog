import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_categories\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_categories_order_idx\` ON \`posts_categories\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_categories_parent_idx\` ON \`posts_categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_categories_value_idx\` ON \`posts_categories\` (\`value\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_categories\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_categories_order_idx\` ON \`_posts_v_version_categories\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_categories_parent_idx\` ON \`_posts_v_version_categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_categories_value_idx\` ON \`_posts_v_version_categories\` (\`value\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_categories\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_categories\`;`)
}
