import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion";
import { MessageCircle, Phone, MapPin, Clock, Leaf, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useEffect } from "react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Simplified parallax effects - no more shrinking
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 2]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const whatsappNumber = "+919211549170";

  const navigateToPlants = (e: React.MouseEvent) => {
    e.preventDefault();
    const plantsSection = document.getElementById('plants');
    if (plantsSection) {
      plantsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen pt-24">
      {/* Enhanced Background with Multiple Parallax Layers */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat gradient-animation"
          style={{
            backgroundImage: `linear-gradient(rgba(22, 101, 52, 0.6), rgba(22, 101, 52, 0.4)), url(${heroBackground})`,
            filter: `blur(${blur}px)`
          }}
        />
      </motion.div>

      {/* Floating Background Elements */}
      <motion.div
        className="absolute inset-0 z-5"
        style={{ y: floatingY }}
      >
        {/* Random floating leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ 
              opacity: 0,
              rotate: Math.random() * 360,
              scale: 0
            }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 50 - 25, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            <Leaf className="h-6 w-6 text-green-300/30" />
          </motion.div>
        ))}

        {/* Floating sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          >
            <Sparkles className="h-4 w-4 text-yellow-300/40" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: textY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center lg:text-left"
              variants={itemVariants}
            >
              <motion.div
                className="mb-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, -360]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Leaf className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Start Your Exotic Garden Journey
                </motion.span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-white/90 mb-8 max-w-2xl"
              >
                Get expert guidance on selecting and caring for your rare plants. We're here to help you create your dream garden.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={navigateToPlants}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ type: "tween", duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Explore Our Collection
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:block"
              style={{ y: cardY }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 relative overflow-hidden">
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-6"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(255,255,255,0.5)",
                          "0 0 20px rgba(255,255,255,0.8)",
                          "0 0 0px rgba(255,255,255,0.5)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Get In Touch
                    </motion.h3>
                  
                    <div className="grid grid-cols-2 gap-6">
                      <motion.div 
                        className="text-center"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -2, 2, 0],
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div 
                          className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.3)",
                              "0 0 0 10px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <MessageCircle className="h-8 w-8 text-green-400" />
                          </motion.div>
                        </motion.div>
                        <h4 className="text-white font-semibold mb-1">WhatsApp</h4>
                        <p className="text-white/80 text-sm">+91 92115 49170</p>
                        <p className="text-white/60 text-xs">Available 9 AM - 8 PM</p>
                      </motion.div>

                      <motion.div 
                        className="text-center"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, 2, -2, 0],
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div 
                          className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(59, 130, 246, 0.3)",
                              "0 0 0 10px rgba(59, 130, 246, 0)",
                              "0 0 0 0 rgba(59, 130, 246, 0)"
                            ]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <Clock className="h-8 w-8 text-blue-400" />
                          </motion.div>
                        </motion.div>
                        <h4 className="text-white font-semibold mb-1">Quick Response</h4>
                        <p className="text-white/80 text-sm">Within 2 Hours</p>
                        <p className="text-white/60 text-xs">Expert plant advice</p>
                      </motion.div>

                      <motion.div 
                        className="text-center"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -2, 2, 0],
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div 
                          className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3"
                          animate={{
                            y: [0, -5, 0],
                            boxShadow: [
                              "0 0 0 0 rgba(239, 68, 68, 0.3)",
                              "0 0 0 10px rgba(239, 68, 68, 0)",
                              "0 0 0 0 rgba(239, 68, 68, 0)"
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        >
                          <MapPin className="h-8 w-8 text-red-400" />
                        </motion.div>
                        <h4 className="text-white font-semibold mb-1">Pan India Delivery</h4>
                        <p className="text-white/80 text-sm">Nationwide Shipping</p>
                        <p className="text-white/60 text-xs">Safe plant transportation</p>
                      </motion.div>

                      <motion.div 
                        className="text-center"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, 2, -2, 0],
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div 
                          className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3"
                          animate={{
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(234, 179, 8, 0.3)",
                              "0 0 0 10px rgba(234, 179, 8, 0)",
                              "0 0 0 0 rgba(234, 179, 8, 0)"
                            ]
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                          }}
                        >
                          <motion.div
                            animate={{ rotate: [0, -360] }}
                            transition={{
                              duration: 12,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <Clock className="h-8 w-8 text-yellow-400" />
                          </motion.div>
                        </motion.div>
                        <h4 className="text-white font-semibold mb-1">Consultation Hours</h4>
                        <p className="text-white/80 text-sm">Mon - Sat</p>
                        <p className="text-white/60 text-xs">9:00 AM - 8:00 PM</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Smooth scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-sm mb-2">Scroll to Explore</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60 w-6 h-6"
            >
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Seamless transition section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent -mb-px"></div>
    </section>
  );
};

export default HeroSection;