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
