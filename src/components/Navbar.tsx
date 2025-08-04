import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border h-20 flex items-center"
    >
      <div className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Leaf className="h-8 w-8 text-nature-primary" />
            <span className="text-2xl font-bold text-nature-secondary">Exotic Flora</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Plants", "Flowers", "Reviews", "Gallery", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground hover:text-nature-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;