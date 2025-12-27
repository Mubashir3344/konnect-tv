import { Smartphone, Tv, Laptop, Tablet, MonitorPlay, Gamepad2 } from "lucide-react";

const devices = [
  { icon: Smartphone, name: "Mobile", description: "iOS & Android" },
  { icon: Tv, name: "Smart TV", description: "Samsung, LG, Sony" },
  { icon: Laptop, name: "Computer", description: "Windows & Mac" },
  { icon: Tablet, name: "Tablet", description: "iPad & Android" },
  { icon: MonitorPlay, name: "Fire Stick", description: "Amazon Devices" },
  { icon: Gamepad2, name: "MAG Box", description: "All MAG Devices" },
];

const Devices = () => {
  return (
    <section id="devices" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(199_89%_48%_/_0.04)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Compatibility</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Watch on
            <span className="gradient-text"> Any Device</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Seamlessly switch between devices and continue watching where you left off
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {devices.map((device, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <device.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {device.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {device.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl glass-card text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Easy Setup in Minutes
          </h3>
          <p className="text-muted-foreground mb-6">
            Our service works with all popular streaming apps including StreamFlux App, TiviMate, 
            and many more. We'll send you detailed setup instructions for your device.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1.5 rounded-full bg-secondary">StreamFlux App</span>
            <span className="px-3 py-1.5 rounded-full bg-secondary">TiviMate</span>
            <span className="px-3 py-1.5 rounded-full bg-secondary">VLC Player</span>
            <span className="px-3 py-1.5 rounded-full bg-secondary">Kodi</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Devices;
