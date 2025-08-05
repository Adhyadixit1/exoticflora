import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Parse the database URL
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Create a single pool instance to be reused
const pool = new Pool({
  connectionString: dbUrl,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the database connection
async function testConnection() {
  let client;
  try {
    client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('✅ Database connection successful:', res.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Helper function to run queries with better error handling
async function query(text: string, params: any[] = []) {
  const start = Date.now();
  let client;
  
  try {
    client = await pool.connect();
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log(`✅ Query executed in ${duration}ms`, { 
      query: text.split(' ').slice(0, 3).join(' ') + '...',
      duration: `${duration}ms`,
      rows: res.rowCount 
    });
    return res;
  } catch (error) {
    console.error('❌ Query error:', { 
      query: text,
      params,
      error: error instanceof Error ? error.message : error
    });
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Graceful shutdown
process.on('exit', () => {
  console.log('Closing database connection pool...');
  pool.end().catch(console.error);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit immediately, allow the application to handle the error
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit immediately, allow the application to handle the error
});

export { pool, query, testConnection };
