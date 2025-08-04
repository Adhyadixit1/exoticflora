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
      <PlantCatalog />
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
