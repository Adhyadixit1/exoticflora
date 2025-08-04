import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sprout, TrendingUp, Flower, Apple, Thermometer, Droplets, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const lifecycleStages = [
  {
    icon: Sprout,
    title: "Planting",
    period: "Month 1",
    description: "Plant in well-draining soil with proper spacing and initial care setup.",
    color: "bg-green-100 text-green-600",
    iconColor: "text-green-600"
  },
  {
    icon: TrendingUp,
    title: "Growth",
    period: "Months 2-24",
    description: "Active vegetative growth with regular feeding and pruning for shape.",
    color: "bg-blue-100 text-blue-600",
    iconColor: "text-blue-600"
  },
  {
    icon: Flower,
    title: "Flowering",
    period: "Months 24-36",
    description: "First flowering period begins, requiring specific care and pollination.",
    color: "bg-yellow-100 text-yellow-600",
    iconColor: "text-yellow-600"
  },
  {
    icon: Apple,
    title: "Fruiting",
    period: "Months 36+",
    description: "Fruit development and maturation, harvest time varies by species.",
    color: "bg-red-100 text-red-600",
    iconColor: "text-red-600"
  }
];

const careGuidelines = [
  {
    icon: Thermometer,
    title: "Climate Control",
    description: "Our plants are acclimatized to Indian weather conditions gradually",
    details: [
      "Temperature range: 20-35°C",
      "Humidity monitoring",
      "Season adaptation"
    ],
    color: "text-red-500"
  },
  {
    icon: Droplets,
    title: "Watering Schedule",
    description: "Precise watering requirements for optimal growth",
    details: [
      "Deep watering twice weekly",
      "Drainage management",
      "Monsoon adjustments"
    ],
    color: "text-blue-500"
  },
  {
    icon: Sun,
    title: "Light Requirements",
    description: "Proper sunlight exposure for healthy development",
    details: [
      "6-8 hours daily sunlight",
      "Partial shade protection",
      "Seasonal positioning"
    ],
    color: "text-yellow-500"
  }
];

const PlantLifecycle = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-nature-secondary mb-6">
            Plant Lifecycle & Fruiting Timeline
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the journey from seedling to harvest helps you plan and care for your exotic plants
          </p>
        </motion.div>

        {/* Lifecycle Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {lifecycleStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="text-center"
              >
                <div className={`w-20 h-20 rounded-full ${stage.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`h-10 w-10 ${stage.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-nature-secondary mb-2">{stage.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-3">{stage.period}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Expert Care Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-nature-secondary text-center mb-4">
            Expert Care Guidelines
          </h3>
          <p className="text-center text-muted-foreground mb-12">
            Every exotic plant comes with detailed care instructions and ongoing support
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {careGuidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <motion.div
                  key={guideline.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + 0.2 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className={`h-6 w-6 ${guideline.color}`} />
                        </div>
                        <h4 className="text-xl font-bold text-nature-secondary">{guideline.title}</h4>
                      </div>
                      <p className="text-muted-foreground mb-4">{guideline.description}</p>
                      <ul className="space-y-2">
                        {guideline.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-nature-primary" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlantLifecycle;