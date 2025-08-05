import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlantCatalog from "@/components/PlantCatalog";
import ReviewsSection from "@/components/ReviewsSection";
import FlowersSection from "@/components/FlowersSection";
import PlantLifecycle from "@/components/PlantLifecycle";
import FeaturedPlants from "@/components/FeaturedPlants";
import GlobalCollection from "@/components/GlobalCollection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="plants" className="scroll-mt-20">
        <PlantCatalog />
      </div>
      <ReviewsSection />
      <FlowersSection />
      <PlantLifecycle />
      <FeaturedPlants />
      <GlobalCollection />
      <Footer />
    </div>
  );
};

export default Index;
