import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is StreamFlux and how does it work?",
    answer: "StreamFlux delivers television content over the internet instead of traditional cable or satellite. You simply need an internet connection and a compatible device to stream live TV channels, movies, and on-demand content.",
  },
  {
    question: "What internet speed do I need?",
    answer: "For smooth streaming, we recommend a minimum of 10 Mbps for HD content and 25 Mbps for 4K content. A stable internet connection is more important than raw speed for the best experience.",
  },
  {
    question: "Can I use the service on multiple devices?",
    answer: "Yes! Depending on your subscription plan, you can use our service on up to 5 devices simultaneously. Each plan clearly states the number of connections included.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 24-hour free trial so you can test our service before committing. This gives you full access to all channels and features to ensure it meets your needs.",
  },
  {
    question: "What channels are included?",
    answer: "We offer 50,000+ live channels from around the world, including sports, news, entertainment, movies, kids content, and international channels. We also provide 200,000+ movies and TV series on demand.",
  },
  {
    question: "How do I set up the service?",
    answer: "Setup is quick and easy. After purchasing, you'll receive login credentials and detailed setup instructions for your device. Our support team is available 24/7 if you need assistance.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and cryptocurrency for your convenience and privacy. All payments are processed securely.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "We offer a 24-hour money-back guarantee. If you're not completely satisfied with our service, simply contact our support team for a full refund, no questions asked.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Frequently Asked
            <span className="gradient-text"> Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our IPTV service
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-border/50 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
