import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Rocket, Target, ArrowRight, Lightbulb, ChartBar, Users, Brain, TrendingUp } from "lucide-react"
import PricingSection from "@/components/pricing-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-2xl">StartupSpark</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="gradient-bg shadow-lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                Discover Your Perfect{" "}
                <span className="gradient-text">Business Idea</span>
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl max-w-xl mb-12">
                Let AI help you uncover exciting business opportunities perfectly matched to your skills, interests, and market potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gradient-bg text-lg px-8 py-6 shadow-lg group"
                  asChild
                >
                  <Link href="/signup">
                    Find Your Idea
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 hover:bg-accent/5 border-2"
                  asChild
                >
                  <Link href="/questionnaire">Try Idea Generator</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative h-[600px] hidden md:block">
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 visual-element w-48 h-48 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-sm">AI-Powered</p>
                  <p className="text-xs text-muted-foreground">Idea Generation</p>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/10">
                {/* Market Analysis */}
                <div className="orbit-element animate-orbit">
                  <ChartBar className="w-8 h-8 text-primary mb-1" />
                  <p className="text-sm font-medium">Market Analysis</p>
                  <p className="text-xs text-muted-foreground">Validate Potential</p>
                </div>

                {/* Target Audience */}
                <div className="orbit-element animate-orbit animation-delay-2000" style={{ animationDelay: "-6s" }}>
                  <Users className="w-8 h-8 text-accent mb-1" />
                  <p className="text-sm font-medium">Target Audience</p>
                  <p className="text-xs text-muted-foreground">Define Your Market</p>
                </div>

                {/* Growth Strategy */}
                <div className="orbit-element animate-orbit animation-delay-4000" style={{ animationDelay: "-12s" }}>
                  <TrendingUp className="w-8 h-8 text-secondary mb-1" />
                  <p className="text-sm font-medium">Growth Strategy</p>
                  <p className="text-xs text-muted-foreground">Scale Your Business</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-primary/20 animate-pulse"></div>
              <div className="absolute bottom-32 right-24 w-6 h-6 rounded-full bg-accent/20 animate-pulse animation-delay-2000"></div>
              <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-secondary/20 animate-pulse animation-delay-4000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Discovery",
                description: "Our AI analyzes your profile to discover untapped business opportunities perfect for you."
              },
              {
                icon: Target,
                title: "Market Potential",
                description: "Each idea comes with market analysis to ensure real business potential."
              },
              {
                icon: Rocket,
                title: "Actionable Path",
                description: "Get a clear roadmap to turn your chosen idea into a real business."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-8 rounded-xl border-2 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="h-0.5 w-0 group-hover:w-full mt-4 gradient-bg transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 StartupSpark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
