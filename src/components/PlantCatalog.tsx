import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Leaf, Flower, TreePine, Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Single source of truth for plant categories and their plants
const plantCategories = [
  {
    category: "🌳 Guava",
    plants: [
      { name: "Thiwan pink guava", price: "₹200" },
      { name: "Golden 8 Guava", price: "₹200" },
      { name: "Black diamond guava", price: "₹1000" },
      { name: "Vnr guava", price: "₹200" },
      { name: "Red Diamond 1 guava", price: "₹300" },
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
  // ... (other categories remain the same)
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
  { name: "Ornamental", icon: Sparkles, active: false }
];

const PlantCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Plants");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Filter plants based on search term and active category
  const filteredCategories = plantCategories.filter(({ category, plants }) => {
    const matchesSearch = plants.some(
      (plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesCategory = 
      activeCategory === "All Plants" || 
      (activeCategory === "Fruit Plants" && !category.includes("🌿")) ||
      (activeCategory === "Flowers" && category.includes("🌺")) ||
      (activeCategory === "Ornamental" && category.includes("🌿"));
    
    return matchesSearch && matchesCategory;
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
                  {plants.map((plant) => (
                    <li key={`${category}-${plant.name}`} className="flex justify-between">
                      <span className="text-foreground/90">{plant.name}</span>
                      <span className="font-medium text-primary">{plant.price}</span>
                    </li>
                  ))}
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
    </section>
  );
};

export default PlantCatalog;
