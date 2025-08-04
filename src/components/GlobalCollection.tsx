import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Award, Heart, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Globe,
    title: "Global Collection",
    description: "Sourced from the finest nurseries across Japan, Thailand, and tropical regions",
    color: "text-green-500"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Each plant is carefully selected and quarantined before reaching you",
    color: "text-blue-500"
  },
  {
    icon: Leaf,
    title: "Expert Care",
    description: "Detailed growing guides and ongoing support for every plant",
    color: "text-emerald-500"
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "Years of experience in exotic plant cultivation and care",
    color: "text-red-500"
  }
];

const GlobalCollection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-nature-secondary mb-6">
              Rare Treasures from Around the World
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We specialize in importing and cultivating the world's most exotic and rare plants, 
              bringing you varieties that are not native to India but thrive in our carefully controlled 
              environments.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 * index }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <Icon className={`h-6 w-6 ${feature.color}`} />
                          </div>
                        </div>
                        <h3 className="font-bold text-nature-secondary mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            style={{ y }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Placeholder for nursery image - you can replace with actual image */}
              <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden">
                <div className="text-center text-white">
                  <Globe className="h-20 w-20 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">Our Global Network</h3>
                  <p className="text-white/80">Premium nurseries worldwide</p>
                </div>
              </div>
              
              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-nature-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Rare Species</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-nature-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCollection;