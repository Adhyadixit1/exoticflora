import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Heart, ThumbsUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  {
    icon: Heart,
    value: "2000+",
    label: "Happy Customers",
    color: "text-red-500"
  },
  {
    icon: ThumbsUp,
    value: "97%",
    label: "Plant Survival Rate",
    color: "text-green-500"
  },
  {
    icon: Award,
    value: "120+",
    label: "Rare Varieties",
    color: "text-yellow-500"
  }
];

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    plant: "Miyazaki Mango",
    rating: 5,
    review: "I purchased a Miyazaki mango sapling 3 years ago and it finally fruited this season! The taste is absolutely incredible - nothing like any mango I've ever had. The sweetness is unreal and the texture is like butter. Worth every penny of the ₹30,000 I paid. The team provided excellent care instructions and follow-up support.",
    story: "As a fruit enthusiast, this has been a dream come true. My neighbors can't believe the quality of mangoes growing in my Mumbai terrace garden!"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi NCR",
    plant: "Queen of the Night Orchid",
    rating: 5,
    review: "The Queen of the Night orchid I bought bloomed for the first time last month and the experience was magical! The fragrance filled my entire house and lasted the whole night. My family and I stayed awake just to witness this rare beauty. The customer service was exceptional - they even called to remind me about the expected bloom time.",
    story: "It was like having a natural perfume factory in my garden. The scent was so intoxicating that even my neighbors came to see what was happening!"
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Bangalore, Karnataka",
    plant: "Japanese Maple",
    rating: 5,
    review: "I was skeptical about growing a Japanese Maple in Bangalore's climate, but the team's expert advice made it possible. The tree is thriving and the autumn colors are breathtaking. Their detailed care guide and 24/7 support made all the difference.",
    story: "My garden has become the talk of the neighborhood, especially when the leaves turn fiery red in November. It's like having a piece of Japan in my backyard!"
  },
  {
    id: 4,
    name: "Ananya Reddy",
    location: "Hyderabad, Telangana",
    plant: "Black Rose Succulent",
    rating: 4,
    review: "The Black Rose succulents I ordered arrived in perfect condition, carefully packaged. They've adapted well to my balcony garden. The deep purple-black leaves create a stunning contrast with my other plants. The only reason I'm not giving 5 stars is that one plant took longer to acclimate than expected.",
    story: "These unique succulents have become the centerpiece of my urban garden. Visitors always ask about them and I proudly share where I got them from!"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    plant: "Dragon Fruit Cactus",
    rating: 5,
    review: "Incredible experience! My dragon fruit cactus started flowering within 18 months, and the fruits were absolutely delicious. The team's growing tips were spot on, especially about the trellis support and pollination. The plant is now over 8 feet tall and produces dozens of fruits each season.",
    story: "From a small cutting to a magnificent fruiting plant, this has been the most rewarding gardening experience of my life. The entire family enjoys harvesting the fruits together!"
  },
  {
    id: 6,
    name: "Meera Iyer",
    location: "Chennai, Tamil Nadu",
    plant: "Plumeria Collection",
    rating: 5,
    review: "I ordered a collection of rare plumeria varieties, and I'm beyond impressed. Each plant was healthy and true to its description. The fragrance of the flowers is intoxicating, especially in the evenings. The detailed care instructions helped me create the perfect growing conditions despite Chennai's humidity.",
    story: "My balcony has transformed into a tropical paradise. The different colored blooms bring me so much joy every morning. I've already ordered more varieties!"
  }
];

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 hero-gradient text-white" id="reviews">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Stories from Our Garden Family
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Real experiences from customers who have transformed their gardens with our exotic plants
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <Icon className={`h-10 w-10 ${stat.color}`} />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + 0.2 * index }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-white/20 text-white">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{review.name}</h4>
                      <p className="text-white/70 text-sm">{review.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white/80 ml-2">• {review.plant}</span>
                  </div>

                  <blockquote className="text-white/90 mb-6 leading-relaxed">
                    "{review.review}"
                  </blockquote>

                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-green-400">
                    <p className="text-sm text-green-300 font-semibold mb-1">Customer Story:</p>
                    <p className="text-white/80 text-sm italic">{review.story}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;