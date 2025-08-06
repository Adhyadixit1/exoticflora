import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Leaf, Flower, TreePine, Sparkles, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "./Cart";

// Single source of truth for plant categories and their plants
const plantCategories = [
  {
    category: "🥭 Mango",
    plants: [
      { name: "Himsagar mango", price: "₹250" },
      { name: "Amrapali mango", price: "₹250" },
      { name: "Langda mango", price: "₹250" },
      { name: "Vastara mango", price: "₹300" },
      { name: "Alphanso mango", price: "₹350" },
      { name: "Hari vanga mango", price: "₹350" },
      { name: "Gourmoti mango", price: "₹350" },
      { name: "Miyazaki mango", price: "₹550" },
      { name: "Red Ivory Mango", price: "₹400" },
      { name: "Red Palmar mango", price: "₹400" },
      { name: "Qjai mango", price: "₹400" },
      { name: "Banana mango", price: "₹350" },
      { name: "Thai katimoni mango", price: "₹350" },
      { name: "Thai All Time mango", price: "₹280" },
      { name: "King of chakapat mango", price: "₹430" },
      { name: "Brunai King Mango", price: "₹380" },
      { name: "Verigated Mango", price: "₹450" },
      { name: "Pusa suriya Mango", price: "₹400" },
      { name: "Pusa Arunima Mango", price: "₹400" },
      { name: "Honeydew mango", price: "₹400" },
      { name: "R2E2 mango", price: "₹400" },
      { name: "Pusa Arunika mango", price: "₹400" },
      { name: "3 taste mango", price: "₹380" },
      { name: "Kasturi black mango", price: "₹500" },
      { name: "Chausa mango", price: "₹350" },
      { name: "Bari 13 mango", price: "₹400" },
      { name: "Nam Docmi mango", price: "₹450" },
      { name: "Ambika mango", price: "₹400" },
      { name: "Totapuri Mango", price: "₹330" }
    ]
  },
  {
    category: "🌳 Guava",
    plants: [
      { name: "Thiwan pink guava", price: "₹200" },
      { name: "Golden 8 Guava", price: "₹200" },
      { name: "Black diamond guava", price: "₹1000" },
      { name: "Vnr guava", price: "₹200" },
      { name: "Red Diamond Guava", price: "₹300" },
      { name: "Allahbad guava", price: "₹150" },
      { name: "Verigated guava", price: "₹300" },
      { name: "Strawberry guava", price: "₹350" },
      { name: "Red diamond Guava", price: "₹200" },
      { name: "Red guava", price: "₹200" },
      { name: "White diamond Guava", price: "₹300" }
    ]
  },
  {
    category: "🍋 Lemon",
    plants: [
      { name: "Baramasi kagzi lemon", price: "₹170" },
      { name: "Kolkata pati lemon", price: "₹170" },
      { name: "Thai pati lemon", price: "₹150" },
      { name: "Seedless lemon", price: "₹180" },
      { name: "Pakistani pati lemon", price: "₹250" },
      { name: "Red pati lemon", price: "₹200" },
      { name: "Sweet lemon", price: "₹250" },
      { name: "Gandharaj pati lemon", price: "₹160" },
      { name: "Finger lime", price: "₹350" },
      { name: "Kamkut lemon", price: "₹200" }
    ]
  },
  {
    category: "🍑 Mosambi",
    plants: [
      { name: "Bari 1 Malta", price: "₹200" },
      { name: "Desi Musambi", price: "₹220" },
      { name: "India musambi", price: "₹300" },
      { name: "Vietnam Malta", price: "₹250" },
      { name: "Misoriyo yellow Malta", price: "₹300" }
    ]
  },
  {
    category: "🍊 Orange (Santra)",
    plants: [
      { name: "Darjeeling Orange", price: "₹300" },
      { name: "Mandarin Orange", price: "₹300" },
      { name: "Vutani Satoki Orange", price: "₹330" },
      { name: "Thai 2 orange", price: "₹350" },
      { name: "Pakistani orange", price: "₹350" },
      { name: "Decopon orange", price: "₹370" },
      { name: "Nagpur orange", price: "₹300" },
      { name: "Chainij Rambutan orange", price: "₹250" },
      { name: "Blood orange", price: "₹450" },
      { name: "Kinnu orange", price: "₹300" }
    ]
  },
  {
    category: "🍎 Apple Ber Plant",
    plants: [
      { name: "Green apple ber plant", price: "₹130" },
      { name: "Miss India apple ber", price: "₹120" },
      { name: "Ball sundari apple ber plant", price: "₹110" }
    ]
  },
  {
    category: "🐉 Dragon Fruit",
    plants: [
      { name: "Pink dragon", price: "₹100" },
      { name: "Moroccan Red dragon", price: "₹120" },
      { name: "Yellow dragon", price: "₹150" }
    ]
  },
  {
    category: "🌰 Chikko Plant",
    plants: [
      { name: "Cricket ball chikko", price: "₹220" },
      { name: "Thai Banana Chiku", price: "₹250" },
      { name: "Kalapati chikko", price: "₹240" },
      { name: "Verigated chikko", price: "₹250" }
    ]
  },
  {
    category: "🥥 Coconut Plant",
    plants: [
      { name: "Gangabardhan coconut", price: "₹500" },
      { name: "Vietnaam coconut", price: "₹500" },
      { name: "Keralian coconut", price: "₹450" },
      { name: "Desi coconut", price: "₹350" },
      { name: "Malasian green coconut", price: "₹500" }
    ]
  },
  {
    category: "🌳 Jackfruit Plant",
    plants: [
      { name: "Vietnam super early jackfruit", price: "₹350" },
      { name: "Red jackfruit", price: "₹300" }
    ]
  },
  {
    category: "🍈 Longon Plant",
    plants: [
      { name: "4 Season Longon", price: "₹900" },
      { name: "Black Longon", price: "₹2500" },
      { name: "White Longon", price: "₹1200" },
      { name: "Ping Pong Longon", price: "₹1200" },
      { name: "Ruby Longon", price: "₹750" },
      { name: "Red Ping Pong Longon", price: "₹1000" },
      { name: "Ping ping Pong Longon", price: "₹1200" },
      { name: "Desi Longon", price: "₹500" }
    ]
  },
  {
    category: "🍒 Litchi Plant",
    plants: [
      { name: "Bombai Litchi", price: "₹300" },
      { name: "Muzaffarpur Sahi Litchi", price: "₹300" },
      { name: "Chaina 3 lichi", price: "₹300" }
    ]
  },
  {
    category: "🍎 Water Apple Plant",
    plants: [
      { name: "Dalhari Champa Water Apple", price: "₹300" },
      { name: "King Kong Chamba Water Apple", price: "₹350" },
      { name: "Bali Champa Water Apple", price: "₹300" },
      { name: "Red Missile Water Apple", price: "₹380" },
      { name: "Rose Apple", price: "₹250" },
      { name: "White Water Apple", price: "₹250" }
    ]
  },
  {
    category: "🍊 Pomelo Plant",
    plants: [
      { name: "Assembly Pomelo (green)", price: "₹0" },
      { name: "Red Pomelo", price: "₹0" },
      { name: "Yellow Pomelo", price: "₹0" }
    ]
  },
  {
    category: "🫐 Jamun Plant",
    plants: [
      { name: "Desi jamun", price: "₹250" },
      { name: "Desi white Jamun", price: "₹280" },
      { name: "Thai king jamun", price: "₹300" }
    ]
  },
  {
    category: "🥝 Kiwi Plant",
    plants: [
      { name: "Kiwi (grafted)", price: "₹450" },
      { name: "Kiwi (clone)", price: "₹250" }
    ]
  },
  {
    category: "🌿 Amla",
    plants: [
      { name: "Red Amla", price: "₹230" },
      { name: "Green Amla", price: "₹250" }
    ]
  },
  {
    category: "🍈 Pomegranate",
    plants: [
      { name: "Super Vagoa Anar", price: "₹350" },
      { name: "Ganesh Anar", price: "₹280" }
    ]
  },
  {
    category: "🫐 Mulberry Plant",
    plants: [
      { name: "Long mulberry", price: "₹400" },
      { name: "Short Mulberry", price: "₹250" }
    ]
  },
  {
    category: "🍈 Custard Apple",
    plants: [
      { name: "Golden custard apple", price: "₹350" },
      { name: "Red custard apple", price: "₹400" }
    ]
  },
  {
    category: "🍒 Cherry",
    plants: [
      { name: "Sweet & sour Cherry", price: "₹250" },
      { name: "Black surinam cherry", price: "₹700" },
      { name: "Red Surinam cherry", price: "₹350" },
      { name: "Manila cherry", price: "₹750" },
      { name: "Savannah cherry", price: "₹800" },
      { name: "Cherry of Rio Grande", price: "₹1200" }
    ]
  },
  {
    category: "🫐 Berry",
    plants: [
      { name: "Blue berry", price: "₹650" },
      { name: "Black berry", price: "₹350" }
    ]
  },
  {
    category: "🌿 Fig Anjeer",
    plants: [
      { name: "Pune rade fig", price: "₹300" },
      { name: "Turki brown fig/five finger fig", price: "₹400" }
    ]
  },
  {
    category: "🌿 Masala Plant",
    plants: [
      { name: "Dalchini plant", price: "₹300" },
      { name: "Bay leaf plant", price: "₹250" },
      { name: "Black paper plant", price: "₹350" },
      { name: "Jayfal plant", price: "₹900" },
      { name: "Kari patta plant", price: "₹300" },
      { name: "Elachi plant", price: "₹250" }
    ]
  },
  {
    category: "🌲 Forest Plant",
    plants: [
      { name: "Red sandalwood", price: "₹250" },
      { name: "White Sandalwood", price: "₹300" },
      { name: "Mehgoni plant", price: "₹150" },
      { name: "Segun plant", price: "₹150" },
      { name: "Supari plant", price: "₹180" }
    ]
  },
  {
    category: "🌹 Climbing & Color Roses",
    plants: [
      { name: "Climbing Rose (Red)", price: "₹400-₹600" },
      { name: "Climbing Rose (Pink)", price: "₹400-₹600" },
      { name: "Climbing Rose (Yellow)", price: "₹350-₹500" },
      { name: "Hybrid English Rose (Lady Hillingdon)", price: "₹240-₹400" },
      { name: "Damascus Rose (scented hybrid)", price: "₹300-₹400" },
      { name: "Miniature/Button Roses (mixed colors)", price: "₹300-₹350" }
    ]
  },
  {
    category: "🌸 Orchids & Exotic Flowerers",
    plants: [
      { name: "Phalaenopsis Hybrid (Flowering)", price: "₹500-₹800" },
      { name: "Dendrobium/Spathoglottis", price: "₹200-₹400" },
      { name: "Oncidium/Tolumnia", price: "₹300-₹500" },
      { name: "Cattleya/Vanda hybrids", price: "₹500-₹1000+" },
      { name: "Jewel Orchid (Anoectochilus spp.)", price: "₹300-₹500" }
    ]
  },
  {
    category: "🌼 Native & Fragrant Indian Flowering Shrubs",
    plants: [
      { name: "Raat Ki Rani (Cestrum nocturnum)", price: "₹300-₹400" },
      { name: "Yellow Raat Ki Rani", price: "₹300-₹499" },
      { name: "Chameli/Mogra (Jasminum sambac)", price: "₹120-₹180" },
      { name: "Harshringar/Parijat (Cestrum diurnum)", price: "₹350-₹450" },
      { name: "Ixora (Flowering shrub native)", price: "₹120-₹150" },
      { name: "Hibiscus Rosa-sinensis (common)", price: "₹150-₹250" },
      { name: "Hibiscus Hybrid Grafted (double blooms)", price: "₹200-₹350" },
      { name: "Thunbergia mysorensis (Mysore trumpet vine)", price: "₹250-₹350" },
      { name: "Periwinkle (Catharanthus roseus)", price: "₹50-₹100" },
      { name: "Marigold (Tagetes) bedding annual", price: "₹30-₹50" },
      { name: "Jasmine sambac 'Mysore Mallige'", price: "₹120-₹180" }
    ]
  },
  {
    category: "🌷 Ornamental Hybrids & Garden Varieties",
    plants: [
      { name: "Azalea/Rhododendron (hybrid)", price: "₹350-₹500" },
      { name: "Petunia (hybrid annual climbers)", price: "₹25-₹50" },
      { name: "Balsam (Impatiens balsamina)", price: "₹20-₹40" },
      { name: "Rain Lily (Zephyranthes) bulbs", price: "₹40-₹70" },
      { name: "Chrysanthemum (garden mum)", price: "₹100-₹150" },
      { name: "Kanakambara (Crossandra spp.)", price: "₹60-₹120" },
      { name: "Perennial Coleus", price: "₹40-₹80" },
      { name: "Geranium (Pelargonium zonale)", price: "₹80-₹150" },
      { name: "Oleander (Nerium oleander)", price: "₹150-₹200" },
      { name: "Plumeria (Frangipani)", price: "₹200-₹350" },
      { name: "Bougainvillea Hybrid", price: "₹350-₹500" },
      { name: "Lantana camara", price: "₹60-₹120" },
      { name: "Mussaenda (tropical shrub)", price: "₹150-₹250" },
      { name: "Philippine Violet (Barleria cristata)", price: "₹80-₹120" },
      { name: "Gardenia jasminoides (Cape Jasmine)", price: "₹150-₹250" },
      { name: "Hibiscus syriacus (Rose of Sharon)", price: "₹200-₹350" },
      { name: "Ixora 'Nora Grant' (hybrid cultivar)", price: "₹150-₹200" },
      { name: "Stephanotis floribunda (Madagascar jasmine)", price: "₹200-₹350" },
      { name: "Tagetes minuta (Wild marigold)", price: "₹20-₹40" },
      { name: "Plumbago auriculata (Cape leadwort)", price: "₹120-₹200" }
    ]
  },
  {
    category: "🌳 Flowering Trees & Seasonal Blooms",
    plants: [
      { name: "Magnolia champaca (Champak)", price: "₹250-₹400" },
      { name: "Tabebuia rosea (Pink trumpet tree)", price: "₹200-₹300" },
      { name: "Bauhinia purpurea (Purple Bauhinia)", price: "₹150-₹250" },
      { name: "Cassia fistula (Golden shower tree)", price: "₹150-₹250" }
    ]
  },
  {
    category: "🏵 Annual & Showy Flowers",
    plants: [
      { name: "Dahlia (grafted tuber plant)", price: "₹150-₹250" },
      { name: "Zinnia (annual flower bedding)", price: "₹20-₹40" },
      { name: "Sunflower (grafted/multi-branch)", price: "₹50-₹100" },
      { name: "Hybrid Gladiolus (flowering bulbs)", price: "₹60-₹100" }
    ]
  },
  {
    category: "🌿 Other Varieties",
    plants: [
      { name: "Sweet tamarind (imly)", price: "₹350" },
      { name: "Thai all Time sweet amra", price: "₹400" },
      { name: "Cashew nuts", price: "₹380" },
      { name: "All time star fruit", price: "₹300" },
      { name: "Parsimmon plant", price: "₹550" },
      { name: "Rambhutan plant", price: "₹550" },
      { name: "Mangosteen plant seedling", price: "₹400" },
      { name: "Mangosteen grafted", price: "₹1200" },
      { name: "HRMN 99 Apple", price: "₹400" },
      { name: "Olive plant", price: "₹300" },
      { name: "G9 Banana Plant", price: "₹250" },
      { name: "Red banana plant", price: "₹300" },
      { name: "Macdomia nut plant", price: "₹450" },
      { name: "Apricot fruit plant", price: "₹450" },
      { name: "Passion fruit plant", price: "₹400" },
      { name: "Pear fruit plant", price: "₹350" },
      { name: "Rambhutan", price: "₹400" },
      { name: "Almond", price: "₹300" },
      { name: "Sweet lubi", price: "₹250" },
      { name: "Black sapota", price: "₹900" },
      { name: "Nonifol", price: "₹400" },
      { name: "Abiu fruit", price: "₹350" },
      { name: "Jaboticaba red hybrid", price: "₹950" }
    ]
  }
];

const categories = [
  { name: "All Plants", icon: Leaf, active: true },
  { name: "Fruit Plants", icon: TreePine, active: false },
  { name: "Flowers", icon: Flower, active: false },
  { name: "Ornamental", icon: Sparkles, active: false },
  { name: "Masala Plants", icon: Leaf, active: false }
];

const PlantCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Plants");
  const { addItem } = useCart();
  
  // Function to add item to cart with proper ID and data
  const handleAddToCart = (plant: { name: string; price: string }, category: string) => {
    // Create a consistent ID using the plant name and category
    const itemId = `${category}-${plant.name}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    const item = {
      id: itemId,
      name: `${plant.name} (${category})`,
      price: plant.price
    };
    
    console.log('Adding to cart:', item);
    addItem(item);
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Function to calculate similarity between two strings (0-1)
  const getSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    
    // Exact match
    if (s1 === s2) return 1;
    
    // Check for partial matches
    if (s1.includes(s2) || s2.includes(s1)) return 0.9;
    
    // Check for common misspellings and alternative names
    const commonMisspellings: Record<string, string[]> = {
      'guava': ['gauva', 'guvava'],
      'mango': ['mangoe', 'manggo'],
      'lemon': ['limon', 'lemin', 'lime'],
      'orange': ['orrange', 'orenge'],
      'dragon fruit': ['pitaya', 'pitahaya'],
      'coconut': ['cocunut', 'cocount'],
      'chrysanthemum': ['chrysanthamum', 'chrysanthemem'],
      'hibiscus': ['hibiscuss', 'hisbiscus'],
      'jasmine': ['jasmin', 'jessamine'],
      'marigold': ['marygold', 'merigold']
    };
    
    // Check if either string is in the other's misspellings
    for (const [correct, misspellings] of Object.entries(commonMisspellings)) {
      if ((s1 === correct && misspellings.includes(s2)) || 
          (s2 === correct && misspellings.includes(s1))) {
        return 0.8;
      }
    }
    
    // Simple similarity check (Levenshtein distance would be better but this is simpler)
    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);
    
    // Check if any word from search appears in the target
    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1.length > 3 && word2.length > 3 && 
            (word1.includes(word2) || word2.includes(word1))) {
          return 0.7;
        }
      }
    }
    
    return 0;
  };
  
  // Filter plants based on search term and active category
  const filteredCategories = plantCategories.filter(({ category, plants }) => {
    // First, check if the category matches the active filter
    const isFruitCategory = [
      'Guava', 'Lemon', 'Mosambi', 'Orange', 'Apple Ber', 'Dragon Fruit', 'Chikko', 'Coconut',
      'Jackfruit', 'Longon', 'Litchi', 'Water Apple', 'Pomelo', 'Jamun', 'Kiwi', 'Amla',
      'Pomegranate', 'Mulberry', 'Custard Apple', 'Cherry', 'Berry', 'Mango'
    ].some(fruit => category.includes(fruit));
    
    const isOrnamentalCategory = [
      'Azalea', 'Rhododendron', 'Petunia', 'Balsam', 'Rain Lily', 'Chrysanthemum', 'Kanakambara',
      'Coleus', 'Geranium', 'Oleander', 'Plumeria', 'Frangipani', 'Bougainvillea', 'Lantana',
      'Mussaenda', 'Philippine Violet', 'Barleria', 'Gardenia', 'Jasmine', 'Hibiscus', 'Ixora',
      'Stephanotis', 'Tagetes', 'Plumbago', 'Magnolia', 'Tabebuia', 'Bauhinia', 'Ornamental',
      'Flowering Trees', 'Seasonal Blooms'
    ].some(ornamental => category.includes(ornamental));
    
    const isMasalaPlant = [
      'Dalchini', 'Bay leaf', 'Black paper', 'Jayfal', 'Kari patta', 'Elachi', 'Masala',
      'Sweet tamarind', 'Thai all Time sweet amra', 'Cashew nuts', 'All time star fruit',
      'Parsimmon', 'Rambhutan', 'Mangosteen', 'HRMN 99 Apple', 'Olive', 'G9 Banana',
      'Red banana', 'Macdomia nut', 'Apricot', 'Passion fruit', 'Pear', 'Almond',
      'Sweet lubi', 'Black sapota', 'Nonifol', 'Abiu', 'Jaboticaba', 'Fig Anjeer',
      'Pune rade fig', 'Turki brown fig', 'Red sandalwood', 'White Sandalwood',
      'Mehgoni', 'Segun', 'Supari', 'Forest Plant'
    ].some(plant => category.includes(plant));
    
    const isFlowerCategory = (category: string): boolean => {
      // Only match exact category names from the provided list
      const flowerCategories = [
        '🌳 Flowering Trees & Seasonal Blooms',
        '🏵 Annual & Showy Flowers',
        '🌹 Climbing & Color Roses',
        '🌸 Orchids & Exotic Flowerers',
        '🌼 Native & Fragrant Indian Flowering Shrubs'
      ];
      
      return flowerCategories.includes(category);
    };
    
    const matchesCategory = 
        activeCategory === "All Plants" || 
        (activeCategory === "Fruit Plants" && isFruitCategory) ||
        (activeCategory === "Flowers" && isFlowerCategory(category)) ||
        (activeCategory === "Ornamental" && (category.includes("🌿") || isOrnamentalCategory)) ||
        (activeCategory === "Masala Plants" && isMasalaPlant);
    
    // If there's a search term, check for matches
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      
      // Check if any plant in this category matches the search
      const matchesSearch = plants.some(plant => {
        const name = plant.name.toLowerCase();
        const categoryLower = category.toLowerCase();
        
        // Check direct matches first
        if (name.includes(search) || categoryLower.includes(search)) {
          return true;
        }
        
        // Check for similar matches
        const nameSimilarity = getSimilarity(name, search);
        const categorySimilarity = getSimilarity(categoryLower, search);
        
        return nameSimilarity > 0.6 || categorySimilarity > 0.6;
      });
      
      return matchesSearch && matchesCategory;
    }
    
    // If no search term, just check category
    return matchesCategory;
  });

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Plant Catalog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide variety of plants and find the perfect addition to your garden
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search plants..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                variant={activeCategory === name ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  activeCategory === name ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setActiveCategory(name)}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Plant Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(({ category, plants }) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg shadow-md overflow-hidden border border-border"
            >
              <div className="bg-muted/50 p-4 border-b border-border">
                <h3 className="text-lg font-semibold">{category}</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {plants.map((plant) => {
                    const searchQuery = encodeURIComponent(`${plant.name} plant care`);
                    const itemId = `${category}-${plant.name}`.replace(/\s+/g, '-').toLowerCase();
                    
                    return (
                      <li key={itemId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b">
                        <div className="flex-1">
                          <a 
                            href={`https://www.google.com/search?q=${searchQuery}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-foreground/90 hover:text-primary hover:underline transition-colors"
                          >
                            {plant.name}
                          </a>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-primary whitespace-nowrap">{plant.price}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                            onClick={() => handleAddToCart(plant, category)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No plants found matching your search.</p>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All Plants");
              }}
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
      <Cart />
    </section>
  );
};

export default PlantCatalog;
