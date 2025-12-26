import { Button } from "@/components/ui/button";
import { Check, Zap, MessageCircle } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "14.99",
    period: "/month",
    description: "Perfect for trying out our service",
    features: [
      "40,000+ Live Channels",
      "80,000+ Movies & Series",
      "HD & 4K Quality",
      "1 Device Connection",
      "24/7 Support",
      "7-Day Catch-Up",
    ],
    popular: false,
  },
  {
    name: "Quarterly",
    price: "29.99",
    period: "/3 months",
    description: "Save 33% with quarterly billing",
    features: [
      "40,000+ Live Channels",
      "80,000+ Movies & Series",
      "HD & 4K Quality",
      "2 Device Connections",
      "24/7 Priority Support",
      "14-Day Catch-Up",
      "PPV Events Included",
    ],
    popular: true,
  },
  {
    name: "Annual",
    price: "79.99",
    period: "/year",
    description: "Best value - Save 55%",
    features: [
      "40,000+ Live Channels",
      "80,000+ Movies & Series",
      "HD & 4K Quality",
      "4 Device Connections",
      "24/7 VIP Support",
      "30-Day Catch-Up",
      "PPV Events Included",
      "Adult Content Access",
    ],
    popular: false,
  },
];

const whatsappUrl = "https://wa.me/19177304481";

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(199_89%_48%_/_0.06)_0%,_transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your needs. All plans include a 24-hour free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 lg:p-8 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? "glass-card border-primary/50 glow-effect scale-105"
                  : "glass-card hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg text-muted-foreground">$</span>
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button
                  variant={plan.popular ? "hero" : "glass"}
                  className="w-full"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Get Started
                </Button>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          All plans include a 24-hour money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
