import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import * as dotenv from "dotenv";
import { resolve, dirname } from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: resolve(__dirname, "../../.env") });

// Get the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:ldppKjLAb246wT8V@db.nnptkditrtbqmkpngprc.supabase.co:5432/postgres";

console.log("Starting migration process...");
console.log(`Using database: ${databaseUrl.replace(/:([^:@]+)@/, ':****@')}`); // Hide password in logs

// Database connection
const client = new Client({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false // Required for Supabase connections
  }
});

async function listMigrationsInOrder() {
  try {
    const migrationsDir = resolve(__dirname, "./migrations");
    const files = await fs.readdir(migrationsDir);
    
    // Filter out non-SQL files and sort numerically by timestamp prefix
    const sqlFiles = files
      .filter(file => file.endsWith('.sql') && /^\d+_/.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.split('_')[0]);
        const numB = parseInt(b.split('_')[0]);
        return numA - numB;
      });
      
    console.log("Migrations will be applied in the following order:");
    sqlFiles.forEach((file, index) => console.log(`${index + 1}. ${file}`));
    
    return sqlFiles;
  } catch (err) {
    console.error("Error listing migrations:", err);
    throw err;
  }
}

async function main() {
  try {
    // List migrations that will be applied
    await listMigrationsInOrder();
    
    console.log("Connecting to database...");
    await client.connect();
    
    const db = drizzle(client);
    
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./migrations" });
    
    console.log("Migrations completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
