import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from the root .env file
dotenv.config({ path: "../../.env" });

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
	dialect: "postgresql",
	schema: "./src/schema.ts",
	out: "./migrations",
	casing: "snake_case",
	migrations: {
		prefix: "unix",
	},
	dbCredentials: {
		url: process.env.DATABASE_URL || "postgresql://postgres:ldppKjLAb246wT8V@db.nnptkditrtbqmkpngprc.supabase.co:5432/postgres",
	},
});
