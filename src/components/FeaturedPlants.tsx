import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Thermometer, Droplets, Sun, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import miyazakiMango from "@/assets/miyazaki-mango.jpg";
import cherryBlackMango from "@/assets/cherry-black-mango.jpg";
import dragonFruit from "@/assets/dragon-fruit.jpg";

const featuredPlants = [
  {
    id: 1,
    name: "Miyazaki Mango",
    scientificName: "Mangifera indica 'Miyazaki'",
    image: miyazakiMango,
    badge: "Premium",
    badgeColor: "bg-purple-500",
    description: "The world's most expensive mango variety, known for its exceptional sweetness and ruby-red skin when ripe.",
    temperature: "25-35°C",
    humidity: "60-80%",
    sunlight: "Full sun 6-8 hours",
    rarity: "⭐ Rare"
  },
  {
    id: 2,
    name: "Seedless Cherry Black Mango",
    scientificName: "Mangifera indica 'Cherry Black'",
    image: cherryBlackMango,
    badge: "Rare",
    badgeColor: "bg-orange-500",
    description: "A rare seedless variety with dark purple-black skin and incredibly sweet, cherry-flavored flesh.",
    temperature: "22-32°C",
    humidity: "65-85%",
    sunlight: "Full sun 6-7 hours",
    rarity: "⭐ Rare"
  },
  {
    id: 3,
    name: "Dragon Fruit Cactus",
    scientificName: "Hylocereus undatus",
    image: dragonFruit,
    badge: "Exotic",
    badgeColor: "bg-blue-500",
    description: "Exotic climbing cactus producing stunning white-fleshed dragon fruits with black seeds.",
    temperature: "20-30°C",
    humidity: "50-70%",
    sunlight: "Partial shade 4-6 hours",
    rarity: "⭐ Rare"
  }
];

const FeaturedPlants = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const whatsappNumber = "+919211549170";

  const handleEnquireNow = (plantName: string) => {
    const message = `Hi! I'm interested in the ${plantName} from your featured collection. Please provide detailed information about availability, care instructions, and pricing.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-nature-secondary mb-6">
            Featured Exotic Plants
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our crown jewels - rare imported varieties that represent the pinnacle of horticultural excellence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * index }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className={`absolute top-4 left-4 ${plant.badgeColor} text-white`}>
                    {plant.badge}
                  </Badge>
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                    {plant.rarity}
                  </Badge>
                </div>
                
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-nature-secondary mb-2">
                    {plant.name}
                  </h3>
                  <p className="text-sm italic text-muted-foreground mb-4">
                    {plant.scientificName}
                  </p>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {plant.description}
                  </p>

                  {/* Care Requirements */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Temperature:</p>
                        <p className="text-sm font-medium">{plant.temperature}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Humidity:</p>
                        <p className="text-sm font-medium">{plant.humidity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Sunlight:</p>
                        <p className="text-sm font-medium">{plant.sunlight}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleEnquireNow(plant.name)}
                    className="w-full bg-nature-primary hover:bg-nature-secondary transition-colors duration-300"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enquire Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlants;