import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Leaf, Flower, TreePine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import miyazakiMango from "@/assets/miyazaki-mango.jpg";
import cherryBlackMango from "@/assets/cherry-black-mango.jpg";
import dragonFruit from "@/assets/dragon-fruit.jpg";

const plants = [
  {
    id: 1,
    name: "Miyazaki Mango",
    price: "₹25,000 - ₹35,000",
    image: miyazakiMango,
    badge: "Premium",
    badgeColor: "bg-purple-500",
    country: "Japan"
  },
  {
    id: 2,
    name: "Cherry Black Mango",
    price: "₹18,000 - ₹22,000",
    image: cherryBlackMango,
    badge: "Rare",
    badgeColor: "bg-orange-500",
    country: "Thailand"
  },
  {
    id: 3,
    name: "Dragon Fruit Cactus",
    price: "₹5,000 - ₹8,000",
    image: dragonFruit,
    badge: "Exotic",
    badgeColor: "bg-blue-500",
    country: "Vietnam"
  }
];

const categories = [
  { name: "Fruit Plants", icon: Leaf, active: true },
  { name: "Flowers", icon: Flower, active: false },
  { name: "Ornamental", icon: TreePine, active: false }
];

const PlantCatalog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const whatsappNumber = "+919211549170";

  const handleEnquireNow = (plantName: string) => {
    const message = `Hi! I'm interested in the ${plantName}. Please provide more details.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden" id="plants">
      {/* Floating background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: parallaxY }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            <Leaf className="h-8 w-8 text-green-200/20" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: parallaxY2 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 4
            }}
          >
            <Flower className="h-12 w-12 text-purple-200/15" />
          </motion.div>
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-nature-secondary mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: "linear-gradient(90deg, hsl(var(--nature-secondary)), hsl(var(--nature-primary)), hsl(var(--nature-secondary)))",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            Complete Plant Catalog
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our extensive collection of rare imported plants, exotic flowers, and unique ornamental varieties
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 80
          }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 p-2 bg-muted rounded-full">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    category.active
                      ? "bg-nature-primary text-white shadow-lg"
                      : "hover:bg-background text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    type: "spring"
                  }}
                >
                  <motion.div
                    animate={category.active ? {
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: category.active ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-nature-secondary text-center mb-4">
            Exotic Fruit Plants
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Rare fruit-bearing plants from around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 1,
                delay: 0.8 + index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative overflow-hidden">
                  <motion.img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-64 object-cover"
                    whileHover={{ 
                      scale: 1.15,
                      filter: "brightness(1.1)"
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                  >
                    <Badge className={`absolute top-4 left-4 ${plant.badgeColor} text-white`}>
                      <motion.span
                        animate={{ 
                          textShadow: ["0 0 0px white", "0 0 8px white", "0 0 0px white"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {plant.badge}
                      </motion.span>
                    </Badge>
                  </motion.div>
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                  >
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      {plant.country}
                    </Badge>
                  </motion.div>

                  {/* Floating sparkle effect */}
                  <motion.div
                    className="absolute top-2 right-2"
                    animate={{
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-300/60" />
                  </motion.div>
                </div>
                <CardContent className="p-6">
                  <motion.h4 
                    className="text-xl font-bold text-nature-secondary mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.6 + index * 0.2, duration: 0.6 }}
                  >
                    {plant.name}
                  </motion.h4>
                  <motion.p 
                    className="text-2xl font-bold text-nature-primary mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.8 + index * 0.2, duration: 0.6 }}
                  >
                    {plant.price}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleEnquireNow(plant.name)}
                      className="w-full bg-nature-primary hover:bg-nature-secondary transition-colors duration-300 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                        </motion.div>
                        Enquire Now
                      </span>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantCatalog;