import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

console.log('🔌 Connecting to database...');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runQueryFromFile(filePath: string) {
  console.log(`📄 Executing SQL file: ${path.basename(filePath)}`);
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
    console.log(`✅ Successfully executed ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error executing ${filePath}:`, error);
    throw error;
  }
}

async function setupDatabase() {
  const client = await pool.connect().catch(err => {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  });
  
  try {
    console.log('🚀 Starting database setup...');
    await client.query('BEGIN');
    
    console.log('📊 Setting up database schema...');
    await runQueryFromFile(path.join(__dirname, 'schema.sql'));
    
    await client.query('COMMIT');
    console.log('✅ Database schema created successfully!');
    
    // Now import the plants
    console.log('\n🌱 Starting plant data import...');
    const { importPlants } = await import('./import-plants.js');
    await importPlants();
    
  } catch (error) {
    console.error('❌ Error during database setup:', error);
    await client.query('ROLLBACK').catch(e => console.error('Rollback error:', e));
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
    console.log('🔌 Database connection closed');
  }
}

// Run the setup
setupDatabase().catch(error => {
  console.error('❌ Unhandled error in setup:', error);
  process.exit(1);
});
