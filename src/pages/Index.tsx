import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContentShowcase from "@/components/ContentShowcase";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Devices from "@/components/Devices";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Always scroll to top on initial page load and clear hash
    if (location.hash) {
      window.history.replaceState(null, '', '/');
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ContentShowcase />
      <Features />
      <Pricing />
      <Devices />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
