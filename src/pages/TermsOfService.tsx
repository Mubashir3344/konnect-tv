import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '@/assets/logo.png';

const TermsOfService = () => {
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
              <div className="flex items-center gap-3">
                <div className="h-9 w-24">
                  <img 
                    src={logo} 
                    alt="Konnect TV Logo" 
                    className="h-full w-full object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
                <span className="text-xl font-bold text-foreground">Konnect TV</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 26, 2024</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Konnect TV services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Konnect TV provides premium streaming services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access to live television channels</li>
              <li>Video-on-demand content including movies and TV series</li>
              <li>Sports and entertainment programming</li>
              <li>Electronic Program Guide (EPG)</li>
              <li>Multi-device streaming capabilities</li>
            </ul>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To access our services, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Not share your account with unauthorized users</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Subscription and Payments</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Konnect TV offers various subscription plans. By subscribing, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Pay the applicable subscription fees in advance</li>
              <li>Automatic renewal unless cancelled before the renewal date</li>
              <li>Price changes with 30 days advance notice</li>
              <li>No refunds for partial subscription periods unless stated in our Refund Policy</li>
            </ul>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Redistribute, resell, or share our content without authorization</li>
              <li>Use VPNs or proxies to circumvent geographical restrictions</li>
              <li>Attempt to hack, disrupt, or damage our services</li>
              <li>Record, download, or copy streaming content</li>
              <li>Use our service for any illegal purposes</li>
            </ul>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive for 99.9% uptime, Konnect TV does not guarantee uninterrupted access to services. We reserve the right to modify, suspend, or discontinue services for maintenance, updates, or other operational reasons. We are not liable for any service interruptions.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, trademarks, and intellectual property on Konnect TV are owned by their respective owners. You are granted a limited, non-exclusive license to access and view content for personal, non-commercial use only.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violations of these terms, fraudulent activity, or any reason at our sole discretion. Upon termination, your right to use the service ceases immediately.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Konnect TV shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you in the preceding 12 months.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us via WhatsApp at +1 (404) 952-6878 or email at support@konnecttv.shop.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
