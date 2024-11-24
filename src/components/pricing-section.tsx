import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Infinity } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground text-xl">
            Choose the perfect plan for your entrepreneurial journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <Card className="relative p-6 flex flex-col border-2 hover:border-primary/50 transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Free</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">Forever free</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {[
                "1 AI-generated business idea",
                "Basic market insights",
                "Personality assessment",
                "Skills matching"
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card className="relative p-6 flex flex-col border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 lg:scale-105 shadow-lg">
            <Badge className="absolute -top-3 right-4">
              Popular
            </Badge>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground ml-2">One-time payment</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {[
                "10 AI-generated business ideas",
                "Deep market analysis",
                "Competitor insights",
                "Revenue potential estimates",
                "Step-by-step launch guide",
                "Export to PDF"
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </Card>

          {/* Premium Plan */}
          <Card className="relative p-6 flex flex-col border-2 hover:border-primary/50 transition-all duration-300">
            <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-accent">
              Best Value
            </Badge>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">$10</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <span className="text-sm text-muted-foreground">Cancel anytime</span>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {[
                { text: "Unlimited business ideas", icon: Infinity },
                { text: "Monthly validation report", icon: Check },
                { text: "In-depth market analysis", icon: Check },
                { text: "Competitor tracking", icon: Check },
                { text: "Revenue forecasting", icon: Check },
                { text: "Custom launch roadmap", icon: Check },
                { text: "Priority support", icon: Check }
              ].map(({ text, icon: Icon }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className={`text-muted-foreground ${text === "Unlimited business ideas" ? "font-medium" : ""}`}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full border-primary hover:bg-primary hover:text-white transition-colors"
              asChild
            >
              <Link href="/signup">Subscribe Now</Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
