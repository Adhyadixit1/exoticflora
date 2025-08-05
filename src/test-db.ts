import { testConnection, query } from './lib/db';

async function runTest() {
  console.log('Testing database connection...');
  
  // Test connection
  const isConnected = await testConnection();
  console.log('Connection test:', isConnected ? '✅ Success' : '❌ Failed');
  
  if (isConnected) {
    // Test a simple query
    try {
      console.log('\nTesting query...');
      const result = await query('SELECT NOW() as now');
      console.log('Query test:', '✅ Success');
      console.log('Current database time:', result.rows[0].now);
    } catch (error) {
      console.error('Query test:', '❌ Failed');
      console.error('Error:', error);
    }
  }
  
  process.exit(0);
}

runTest().catch(console.error);
