import { Client } from 'pg';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import * as dotenv from 'dotenv';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: resolve(__dirname, "../../.env") });

// Get the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:ldppKjLAb246wT8V@db.nnptkditrtbqmkpngprc.supabase.co:5432/postgres";

async function listTables() {
  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false // Required for Supabase connections
    }
  });

  try {
    await client.connect();
    
    console.log('Connected to database successfully');
    
    // List all tables
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('\nDatabase tables:');
    if (result.rows.length === 0) {
      console.log('No tables found.');
    } else {
      result.rows.forEach((row, index) => {
        console.log(`${index + 1}. ${row.table_name}`);
      });
    }
    
    // Get count of records in each table
    console.log('\nRecord counts:');
    for (const row of result.rows) {
      const tableName = row.table_name;
      const countResult = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
      console.log(`- ${tableName}: ${countResult.rows[0].count} records`);
    }
    
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await client.end();
  }
}

listTables().catch(console.error);
