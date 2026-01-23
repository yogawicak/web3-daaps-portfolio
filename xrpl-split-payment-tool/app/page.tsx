"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Globe, Shield, TrendingDown } from "lucide-react";

export default function LandingPage() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    // Simulate navigation to dashboard
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-foreground">
              SplitPay
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#how"
              className="text-muted-foreground hover:text-foreground transition"
            >
              How it Works
            </a>
            <a
              href="#benefits"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Benefits
            </a>
            <Button
              onClick={handleConnect}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              Connect Wallet <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
              Split Bills Instantly on XRPL
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Fast • Cheap • Transparent • Global
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={handleConnect}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how"
        className="bg-secondary/30 py-20 border-t border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create a Split",
                desc: "Enter the total amount and number of participants",
                icon: <Zap className="w-8 h-8" />,
              },
              {
                step: "2",
                title: "Add Details",
                desc: "Add participant addresses and optional nicknames",
                icon: <Globe className="w-8 h-8" />,
              },
              {
                step: "3",
                title: "Send Payments",
                desc: "Confirm and send all payments in one transaction",
                icon: <ArrowRight className="w-8 h-8" />,
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose SplitPay
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Lightning Fast",
                desc: "Settle payments in seconds on XRPL",
              },
              {
                icon: <TrendingDown className="w-6 h-6" />,
                title: "Ultra Low Fees",
                desc: "Minimal transaction costs compared to traditional methods",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Transparent",
                desc: "Every transaction is immutable and verifiable on the ledger",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Global",
                desc: "Send payments worldwide with no borders or intermediaries",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-6 rounded-lg border border-border hover:border-primary/30 transition hover:bg-muted/20"
              >
                <div className="flex-shrink-0 text-primary">{benefit.icon}</div>
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border py-16 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Split Smarter?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your wallet and start splitting payments on XRPL today
          </p>
          <Button
            size="lg"
            onClick={handleConnect}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
