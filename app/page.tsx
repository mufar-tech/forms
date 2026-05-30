import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoIcon } from "@/components/logo"
import {
  FileText,
  BarChart3,
  Puzzle,
  Users,
  Shield,
  Globe,
  Sparkles,
  Play,
  ArrowRight,
  Check,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon />
            <span className="text-xl font-bold text-foreground">Mufar Forms</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Trusted by 10,000+ businesses worldwide</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
            Build Beautiful Forms in{" "}
            <span className="text-primary">Minutes</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Create powerful surveys, registration forms, and feedback systems with our intuitive drag-and-drop builder. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2 px-8">
                Start Building Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="gap-2 px-8">
                <Play className="h-4 w-4" />
                View Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card required. Free plan includes 100 responses/month.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "1M+", label: "Forms Created" },
              { value: "50M+", label: "Responses Collected" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need to Collect Data
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Powerful features designed to help you create, distribute, and analyze forms effortlessly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: FileText,
              title: "Drag & Drop Builder",
              description: "Intuitive form builder with 20+ field types. No coding skills needed.",
            },
            {
              icon: BarChart3,
              title: "Real-time Analytics",
              description: "Track responses, completion rates, and user behavior in real-time.",
            },
            {
              icon: Puzzle,
              title: "Powerful Integrations",
              description: "Connect with 1000+ apps including Zapier, Slack, and Google Sheets.",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Work together with your team. Share forms and manage permissions.",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description: "SOC 2 compliant with data encryption and GDPR compliance.",
            },
            {
              icon: Globe,
              title: "Multi-language Support",
              description: "Create forms in 50+ languages and reach a global audience.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-24">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              description: "Perfect for getting started",
              features: ["100 responses/month", "5 forms", "Basic analytics", "Email support"],
              cta: "Get Started",
              popular: false,
            },
            {
              name: "Pro",
              price: "$29",
              description: "For growing businesses",
              features: ["10,000 responses/month", "Unlimited forms", "Advanced analytics", "Priority support", "Custom branding", "Integrations"],
              cta: "Start Free Trial",
              popular: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For large organizations",
              features: ["Unlimited responses", "Unlimited forms", "Custom integrations", "Dedicated support", "SSO & SAML", "SLA guarantee"],
              cta: "Contact Sales",
              popular: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col gap-6 rounded-xl border p-8 ${
                plan.popular
                  ? "border-primary bg-primary/5 shadow-lg scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="mt-auto">
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-12 md:p-16">
          <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Build Better Forms?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Join thousands of businesses using Mufar Forms to collect and analyze data efficiently.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Free
                <Icons.arrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Logo />
                <span className="font-bold text-foreground">Mufar Forms</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Build beautiful forms and collect data with ease.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Mufar Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icons.twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icons.github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icons.linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
