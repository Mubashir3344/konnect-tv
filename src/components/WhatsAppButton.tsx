import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/14049164100";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
        
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-300">
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-card border border-border text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
