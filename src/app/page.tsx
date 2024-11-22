import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl">
            <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              StartupSpark
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Transform Your Ideas into{" "}
            <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              Thriving Businesses
            </span>
          </h1>
          <p className="text-gray-700 text-xl md:text-2xl max-w-2xl mx-auto mb-12">
            Use AI-powered insights to discover personalized business ideas that match your skills, passions, and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="gradient" className="text-lg px-8 py-6" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/questionnaire">Try Demo</Link>
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-24">
          <div className="p-8 rounded-xl border bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Ideas</h3>
            <p className="text-gray-600 leading-relaxed">
              Get business ideas tailored to your unique skills and interests.
            </p>
          </div>
          <div className="p-8 rounded-xl border bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Market Validation</h3>
            <p className="text-gray-600 leading-relaxed">
              Validate your ideas with real market data and insights.
            </p>
          </div>
          <div className="p-8 rounded-xl border bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quick Start</h3>
            <p className="text-gray-600 leading-relaxed">
              Get actionable steps to start your business journey today.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 StartupSpark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
