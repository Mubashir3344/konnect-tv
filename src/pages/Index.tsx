import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContentShowcase from "@/components/ContentShowcase";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Devices from "@/components/Devices";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
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
    </div>
  );
};

export default Index;
