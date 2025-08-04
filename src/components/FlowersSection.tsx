import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Flower2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import orchid from "@/assets/orchid.jpg";
import chocolateCosmos from "@/assets/chocolate-cosmos.jpg";

const flowers = [
  {
    id: 1,
    name: "Queen of the Night Orchid",
    scientificName: "Epiphyllum oxypetalum",
    image: orchid,
    fragrance: "Intense vanilla and jasmine notes",
    bloomingPeriod: "Night blooming, once a year",
    description: "A legendary orchid that blooms only one night per year, releasing an intoxicating fragrance that can perfume an entire garden.",
    intensity: "Very Strong",
    duration: "8-12 hours",
    range: "Up to 50 meters",
    notes: ["Vanilla", "Jasmine", "Sweet floral"]
  },
  {
    id: 2,
    name: "Chocolate Cosmos",
    scientificName: "Cosmos atrosanguineus",
    image: chocolateCosmos,
    fragrance: "Rich chocolate and vanilla",
    bloomingPeriod: "Summer to autumn",
    description: "An extinct-in-the-wild flower that smells exactly like dark chocolate, making it one of the most unique flowers in the world.",
    intensity: "Strong",
    duration: "All day",
    range: "10-15 meters",
    notes: ["Dark chocolate", "Vanilla", "Cocoa"]
  }
];

const FlowersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const whatsappNumber = "+919211549170";

  const handleFragranceProfile = (flowerName: string) => {
    const message = `Hi! I'd like to know more about the fragrance profile of ${flowerName}. When can I expect it to bloom?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section ref={ref} className="py-20 bg-background" id="flowers">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <Flower2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-nature-secondary mb-6">
            Rare Fragrant Flowers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover extraordinary flowers with powerful, lasting fragrances that can transform your garden into a sensory paradise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {flowers.map((flower, index) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * index }}
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={flower.image}
                        alt={flower.name}
                        className="w-full h-80 object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-purple-500 text-white">
                        Rare Fragrance
                      </Badge>
                    </div>
                  </Card>
                </div>

                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <h3 className="text-3xl font-bold text-nature-secondary mb-2">
                    {flower.name}
                  </h3>
                  <p className="text-muted-foreground italic mb-4">{flower.scientificName}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Flower2 className="h-5 w-5 text-pink-500" />
                    <span className="text-pink-600 font-medium">{flower.fragrance}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-blue-600">{flower.bloomingPeriod}</span>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {flower.description}
                  </p>

                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-nature-secondary mb-3 flex items-center gap-2">
                        <Flower2 className="h-5 w-5" />
                        Fragrance Profile
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground">Intensity:</p>
                          <Badge variant="outline" className="text-xs">
                            {flower.intensity}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Duration:</p>
                          <p className="text-nature-primary font-medium">{flower.duration}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Range:</p>
                          <p className="text-nature-primary font-medium">{flower.range}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="font-medium text-muted-foreground mb-2">Notes:</p>
                        <div className="flex flex-wrap gap-2">
                          {flower.notes.map((note) => (
                            <Badge key={note} variant="secondary" className="text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={() => handleFragranceProfile(flower.name)}
                    className="w-full bg-nature-primary hover:bg-nature-secondary transition-colors duration-300"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Fragrance Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowersSection;