import { Button } from "@/components/ui/button";
import { Play, Zap, Globe, Shield, MessageCircle } from "lucide-react";

const Hero = () => {
  const whatsappUrl = "https://wa.me/19177304481";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(199_89%_48%_/_0.08)_0%,_transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Premium Streaming Service • 50,000+ Channels
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Unlimited </span>
            <span className="gradient-text">Entertainment</span>
            <br />
            <span className="text-foreground">At Your Fingertips</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Stream live TV, movies, and sports from around the world. 
            Crystal clear quality, reliable service, and unbeatable prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="hero" size="xl" className="w-full">
                <MessageCircle className="w-5 h-5" />
                Start Free Trial
              </Button>
            </a>
            <a href="#pricing" className="w-full sm:w-auto">
              <Button variant="glass" size="xl" className="w-full">
                <Play className="w-5 h-5" />
                Plans Checkout
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Live Channels</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">200K+</p>
              <p className="text-sm text-muted-foreground">Movies & Shows</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
