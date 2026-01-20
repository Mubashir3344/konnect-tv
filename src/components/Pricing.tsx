import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const durations = [
  { value: "1", label: "1 Month" },
  { value: "3", label: "3 Months" },
  { value: "6", label: "6 Months" },
  { value: "12", label: "12 Months" },
  { value: "24", label: "24 Months" },
  { value: "lifetime", label: "Lifetime" },
];

// Connection options per plan
const basicConnections = [
  { value: "1", label: "1 Connection" },
  { value: "2", label: "2 Connections" },
];

const premiumConnections = [
  { value: "1", label: "1 Connection" },
  { value: "2", label: "2 Connections" },
  { value: "3", label: "3 Connections" },
];

const plans = [
  {
    name: "Basic",
    description: "Perfect for personal use",
    basePrice: 25,
    connections: basicConnections,
    features: [
      "22,000+ Live TV Channels",
      "85,000+ Movies & TV Series",
      "HD Quality Streaming",
      "1-2 Simultaneous Connections",
      "24/7 Customer Support",
    ],
    popular: false,
  },
  {
    name: "Premium",
    description: "Ideal for families and power users",
    basePrice: 40,
    connections: premiumConnections,
    features: [
      "50,000+ Live TV Channels",
      "200,000+ Movies & TV Series",
      "HD, FHD & 4K Quality",
      "1-3 Simultaneous Connections",
      "24/7 Priority Support",
      "PPV Events Included",
    ],
    popular: true,
  },
];

const whatsappUrl = "https://wa.me/14049164100";

const Pricing = () => {
  const [selectedDurations, setSelectedDurations] = useState<Record<number, string>>({
    0: "1",
    1: "1",
  });

  const [selectedConnections, setSelectedConnections] = useState<Record<number, string>>({
    0: "1",
    1: "1",
  });

  const handleDurationChange = (planIndex: number, duration: string) => {
    setSelectedDurations((prev) => ({
      ...prev,
      [planIndex]: duration,
    }));
  };

  const handleConnectionChange = (planIndex: number, connection: string) => {
    setSelectedConnections((prev) => ({
      ...prev,
      [planIndex]: connection,
    }));
  };

  const getDurationLabel = (value: string) => {
    const duration = durations.find((d) => d.value === value);
    return duration?.label || "1 Month";
  };

  const getConnectionLabel = (planConnections: typeof basicConnections, value: string) => {
    const connection = planConnections.find((c) => c.value === value);
    return connection?.label || "1 Connection";
  };

  const calculatePrice = (basePrice: number, duration: string) => {
    const durationMultipliers: Record<string, number> = {
      "1": 1,
      "3": 3,
      "6": 6,
      "12": 12,
      "24": 24,
      "lifetime": 60,
    };
    const months = durationMultipliers[duration] || 1;
    return basePrice * months;
  };

  const getDiscountPercentage = (duration: string) => {
    const discounts: Record<string, number> = {
      "1": 0,
      "3": 10,
      "6": 20,
      "12": 30,
      "24": 40,
      "lifetime": 50,
    };
    return discounts[duration] || 0;
  };

  const calculateDiscountedPrice = (basePrice: number, duration: string) => {
    const fullPrice = calculatePrice(basePrice, duration);
    const discount = getDiscountPercentage(duration);
    return Math.round(fullPrice * (1 - discount / 100));
  };

  const generateWhatsAppUrl = (planName: string, duration: string, connection: string, price: number) => {
    const durationLabel = getDurationLabel(duration);
    const message = `Hi! I'm interested in the *${planName} Plan*.\n\n📋 *Order Details:*\n• Plan: ${planName} ($${planName === "Basic" ? "25" : "40"}/month)\n• Duration: ${durationLabel}\n• Connections: ${connection} Connection${connection !== "1" ? "s" : ""}\n• Total Price: $${price}\n\nPlease help me get started!`;
    return `https://wa.me/14049164100?text=${encodeURIComponent(message)}`;
  };

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
            Choose the plan that fits your needs. 100% Guarantee with 24/7 Customer Support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const selectedDuration = selectedDurations[index] || "1";
            const selectedConnection = selectedConnections[index] || (index === 0 ? "1" : "1");
            const currentPrice = calculateDiscountedPrice(plan.basePrice, selectedDuration);
            const originalPrice = calculatePrice(plan.basePrice, selectedDuration);
            const discountPercentage = getDiscountPercentage(selectedDuration);
            const showDiscount = discountPercentage > 0;

            return (
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
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>

                  {/* Base Price Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-primary text-base font-bold border border-primary/30">
                      ${plan.basePrice}/month
                    </span>
                  </div>

                  {/* Discount Badge */}
                  {showDiscount && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold border border-green-500/30">
                        Save {discountPercentage}%
                      </span>
                    </div>
                  )}

                  {/* Price Display */}
                  <div className="flex flex-col items-center justify-center gap-1 mb-4">
                    {showDiscount && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${originalPrice}
                      </span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl text-muted-foreground">$</span>
                      <span className="text-5xl lg:text-6xl font-bold text-foreground transition-all duration-300">
                        {currentPrice}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      for {getDurationLabel(selectedDuration).toLowerCase()}
                    </span>
                  </div>

                  {/* Duration Selector */}
                  <Select
                    value={selectedDuration}
                    onValueChange={(value) => handleDurationChange(index, value)}
                  >
                    <SelectTrigger className="w-full bg-muted/50 border-border/50 mb-3">
                      <SelectValue>{getDurationLabel(selectedDuration)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>


                  {/* Connections Selector */}
                  <Select
                    value={selectedConnection}
                    onValueChange={(value) => handleConnectionChange(index, value)}
                  >
                    <SelectTrigger className="w-full bg-muted/50 border-border/50">
                      <SelectValue>{getConnectionLabel(plan.connections, selectedConnection)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {plan.connections.map((connection) => (
                        <SelectItem key={connection.value} value={connection.value}>
                          {connection.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

                <a 
                  href={generateWhatsAppUrl(plan.name, selectedDuration, selectedConnection, currentPrice)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full"
                >
                  <Button
                    variant={plan.popular ? "hero" : "glass"}
                    className="w-full"
                    size="lg"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Get Started
                  </Button>
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          All plans include a 24-hour money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
