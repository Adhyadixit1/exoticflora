import { motion } from "framer-motion";
import { Leaf, MessageCircle, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const whatsappNumber = "+919211549170";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <footer className="bg-nature-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="h-8 w-8 text-nature-accent" />
              <span className="text-2xl font-bold">Exotic Flora</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              Your trusted partner in exotic plant cultivation. We bring rare and beautiful plants 
              from around the world to transform your garden into a tropical paradise.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with Expert
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Plants", "Flowers", "Reviews", "Gallery", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/80 hover:text-nature-accent transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-nature-accent" />
                <span className="text-white/80">+91 92115 49170</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-nature-accent" />
                <span className="text-white/80">info@exoticflora.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-nature-accent" />
                <span className="text-white/80">Pan India Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-nature-accent" />
                <span className="text-white/80">9 AM - 8 PM Daily</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-white/20 mt-12 pt-8 text-center text-white/60"
        >
          <p>&copy; 2024 Exotic Flora. All rights reserved. Bringing rare plants to Indian gardens.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;