import { Tv, Clapperboard, Trophy, Film, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Live TV Channels",
    description: "Access 50,000+ live channels from every corner of the globe including sports, news, and entertainment.",
  },
  {
    icon: Clapperboard,
    title: "Movies & Series",
    description: "Enjoy our massive library of 200,000+ movies and TV series, updated daily with the latest releases.",
  },
  {
    icon: Trophy,
    title: "Sports Coverage",
    description: "Never miss a game with comprehensive sports coverage including PPV events, UFC, boxing, and more.",
  },
  {
    icon: Film,
    title: "4K & HD Quality",
    description: "Experience crystal clear streaming in 4K and HD quality on all your favorite content.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Our service runs around the clock with 99.9% uptime guarantee for uninterrupted viewing.",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description: "Get help whenever you need it with our responsive 24/7 customer support team.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(199_89%_48%_/_0.04)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Everything You Need for
            <span className="gradient-text"> Perfect Entertainment</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover why thousands choose us for their streaming needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl glass-card card-glow hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
