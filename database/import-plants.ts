import { pool } from '../src/lib/db.js';
import { plantCategories } from '../src/data/plants.js';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to extract price as a number
function extractPrice(priceStr: string): number {
  // Remove currency symbols and commas, then parse as float
  const numericValue = parseFloat(priceStr.replace(/[^0-9.-]+/g, ''));
  return isNaN(numericValue) ? 0 : numericValue;
}

// Generate a simple SKU from product name
function generateSku(name: string, category: string): string {
  const prefix = (category || 'PLA').substring(0, 3).toUpperCase();
  const namePart = (name || 'PLANT')
    .substring(0, 5)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${namePart}-${random}`;
}

export async function importPlants() {
  const client = await pool.connect().catch(err => {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  });

  try {
    console.log('🚀 Starting plant data import...');
    await client.query('BEGIN');
    
    // Create categories and get their IDs
    const categoryMap = new Map<string, number>();
    
    // Process each category
    for (const categoryData of plantCategories) {
      // Extract emoji and name
      const emojiMatch = categoryData.category.match(/^([^\w\s]+)\s*(.*)$/);
      const emoji = emojiMatch ? emojiMatch[1] : '';
      const categoryName = emojiMatch ? emojiMatch[2].trim() : categoryData.category;
      
      try {
        // Insert category if it doesn't exist
        const categoryResult = await client.query(
          `INSERT INTO categories (name, emoji, is_active, description)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (name) DO UPDATE 
           SET emoji = EXCLUDED.emoji, 
               updated_at = CURRENT_TIMESTAMP
           RETURNING id`,
          [categoryName, emoji || null, true, `Collection of ${categoryName} plants`]
        );
        
        const categoryId = categoryResult.rows[0].id;
        categoryMap.set(categoryName, categoryId);
        
        console.log(`✅ Processed category: ${categoryName}`);
        
        // Insert plants for this category
        for (const plant of categoryData.plants) {
          try {
            const price = extractPrice(plant.price);
            const sku = generateSku(plant.name, categoryName);
            
            await client.query(
              `INSERT INTO products (
                name, 
                description, 
                price, 
                category_id, 
                stock_quantity, 
                sku, 
                is_active
              ) VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (name, category_id) DO UPDATE
              SET price = EXCLUDED.price,
                  updated_at = CURRENT_TIMESTAMP`,
              [
                plant.name,
                `High quality ${plant.name} plant`,
                price,
                categoryId,
                10, // Default stock quantity
                sku,
                true
              ]
            );
            
            console.log(`  ✅ Added product: ${plant.name} (${price} INR)`);
          } catch (error) {
            console.error(`❌ Error adding product ${plant.name}:`, error);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing category ${categoryName}:`, error);
        throw error; // Re-throw to trigger rollback
      }
    }
    
    await client.query('COMMIT');
    console.log('🎉 Plant data import completed successfully!');
    return { success: true, message: 'Plant data imported successfully' };
  } catch (error) {
    console.error('❌ Error during plant data import:', error);
    await client.query('ROLLBACK').catch(e => console.error('Rollback error:', e));
    throw error;
  } finally {
    client.release();
  }
}

// Run the import if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  import('../src/lib/db.js')
    .then(({ testConnection }) => testConnection())
    .then(() => importPlants())
    .catch(error => {
      console.error('❌ Import failed:', error);
      process.exit(1);
    })
    .finally(() => {
      pool.end().then(() => process.exit(0));
    });
}
