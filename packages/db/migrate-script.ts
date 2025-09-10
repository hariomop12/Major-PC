import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

console.log("Starting migration process...");

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:pw@localhost:5432/db"
});

async function main() {
  console.log("Connecting to database...");
  await client.connect();
  
  const db = drizzle(client);
  
  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "./migrations" });
  
  console.log("Migrations completed successfully!");
  await client.end();
}

main()
  .catch(err => {
    console.error("Migration failed:", err);
    client.end();
    process.exit(1);
  });
