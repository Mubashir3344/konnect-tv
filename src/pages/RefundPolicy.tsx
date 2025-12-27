import { Link } from 'react-router-dom';
import { Tv, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Tv className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">StreamFlux</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 26, 2024</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="glass-card rounded-xl p-6 border-primary/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">24-Hour Money-Back Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              At StreamFlux, we stand behind the quality of our service. We offer a <strong className="text-primary">24-hour money-back guarantee</strong> on all new subscriptions. If you are not satisfied with our service within the first 24 hours of your subscription, you are entitled to a full refund, no questions asked.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Eligibility for Refund</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To be eligible for a refund, you must meet the following criteria:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Request must be made within 24 hours of initial subscription purchase</li>
              <li>This is your first subscription with StreamFlux</li>
              <li>Account must not have been suspended for Terms of Service violations</li>
              <li>You must provide a valid reason for the refund request</li>
            </ul>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Non-Refundable Situations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Refunds will NOT be issued in the following cases:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Requests made after 24 hours from the initial purchase</li>
              <li>Renewal subscriptions (only first-time subscriptions are eligible)</li>
              <li>Account terminated due to Terms of Service violations</li>
              <li>Technical issues on the user's end (internet connection, device compatibility)</li>
              <li>Failure to use the service does not qualify for a refund</li>
              <li>Change of mind after the 24-hour window</li>
            </ul>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">How to Request a Refund</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To request a refund, please follow these steps:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-3">
              <li>Contact us via WhatsApp at +1 917 730 4481 within 24 hours of purchase</li>
              <li>Provide your account email and order/transaction ID</li>
              <li>Briefly explain the reason for your refund request</li>
              <li>Our support team will review your request within 24 hours</li>
              <li>If approved, refunds will be processed within 5-7 business days</li>
            </ol>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Refund Processing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Once your refund is approved:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Refunds will be credited to the original payment method</li>
              <li>Credit card refunds may take 5-7 business days to appear</li>
              <li>PayPal refunds are typically processed within 24-48 hours</li>
              <li>Cryptocurrency payments may be refunded to a wallet of your choice</li>
              <li>Your account access will be revoked upon refund processing</li>
            </ul>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Service Credits</h2>
            <p className="text-muted-foreground leading-relaxed">
              In cases where a refund is not applicable, we may offer service credits or subscription extensions at our discretion. This may apply to situations such as extended service outages or technical issues on our end affecting your viewing experience.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Chargebacks</h2>
            <p className="text-muted-foreground leading-relaxed">
              We encourage customers to contact us directly before initiating a chargeback with their payment provider. Chargebacks initiated without prior communication may result in permanent account suspension. We are committed to resolving any issues fairly and promptly.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For refund requests or questions about our refund policy, please contact our support team. We are available 24/7 to assist you.
            </p>
            <a href="https://wa.me/19177304481" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg">
                <MessageCircle className="w-5 h-5" />
                Contact Support on WhatsApp
              </Button>
            </a>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Policy Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              StreamFlux reserves the right to modify this refund policy at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicy;
