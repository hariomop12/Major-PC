import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from the root .env file
dotenv.config({ path: "../../.env" });

// Get the database URL from environment variables or use the default
const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:ldppKjLAb246wT8V@db.nnptkditrtbqmkpngprc.supabase.co:5432/postgres";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: databaseUrl,
  },
});
