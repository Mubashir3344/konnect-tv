import { useEffect, useState, useRef } from "react";
import { Globe, Play, Shield } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    value: 50000,
    suffix: "+",
    label: "Live Channels",
  },
  {
    icon: <Play className="w-6 h-6 text-primary" />,
    value: 200000,
    suffix: "+",
    label: "Movies & Shows",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    value: 99.9,
    suffix: "%",
    label: "Uptime",
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 0)}K`;
  }
  return num.toFixed(num % 1 === 0 ? 0 : 1);
};

interface CountingStatProps {
  stat: StatItem;
  isVisible: boolean;
}

const CountingStat = ({ stat, isVisible }: CountingStatProps) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div className="text-center group perspective-1000">
      <div className="transform-gpu transition-transform duration-300 group-hover:rotate-y-12 group-hover:scale-105">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
          {stat.icon}
        </div>
        <p className="text-2xl font-bold text-foreground">
          {formatNumber(count)}{stat.suffix}
        </p>
        <p className="text-sm text-muted-foreground">{stat.label}</p>
      </div>
    </div>
  );
};

const CountingStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-6 max-w-xl mx-auto animate-fade-up"
      style={{ animationDelay: "0.4s" }}
    >
      {stats.map((stat, index) => (
        <CountingStat key={index} stat={stat} isVisible={isVisible} />
      ))}
    </div>
  );
};

export default CountingStats;
