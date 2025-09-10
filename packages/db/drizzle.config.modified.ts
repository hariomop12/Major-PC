import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  driver: "pg",
  schema: "./src/schema.ts",
  out: "./migrations",
  casing: "snake_case",
  migrations: {
    prefix: "unix",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://postgres:pw@localhost:5432/db",
  },
});
