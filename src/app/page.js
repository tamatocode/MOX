"use client"
import { useState, useEffect } from "react"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
  Badge,
  Sparkles,
  Wallet,
  Globe,
  Clock,
  ArrowUpRight,
  Play,
  ChevronDown,
  Minus,
  Plus
} from "lucide-react"
import Link from "next/link"

export default function EnhancedMonaxLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const features = [
    {
      title: "Lightning Fast Payments",
      description: "Process transactions in milliseconds with our advanced blockchain infrastructure. Experience the future of digital payments.",
      icon: <Zap className="size-6" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Zero Gas Fees",
      description: "Say goodbye to transaction fees forever. Our innovative protocol eliminates all gas costs for seamless transfers.",
      icon: <BarChart className="size-6" />,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Smart Subscriptions",
      description: "Automate recurring payments with intelligent scheduling and flexible subscription management tools.",
      icon: <Clock className="size-6" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Secure Wallet Integration",
      description: "Connect seamlessly with popular wallets while maintaining the highest security standards.",
      icon: <Wallet className="size-6" />,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Global Accessibility",
      description: "Accept payments from anywhere in the world with multi-currency support and localization.",
      icon: <Globe className="size-6" />,
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and multi-layer security protocols protect every transaction.",
      icon: <Shield className="size-6" />,
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  const faqs = [
    {
      question: "How does Monax eliminate gas fees?",
      answer: "Monax uses an innovative layer-2 solution that batches transactions and optimizes gas usage, effectively eliminating fees for end users while maintaining security."
    },
    {
      question: "Which wallets are supported?",
      answer: "We support all major wallets including MetaMask, WalletConnect, Coinbase Wallet, and native Monad wallets for seamless integration."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption, multi-signature security, and never store sensitive wallet information on our servers."
    },
    {
      question: "Can I use Monax for recurring payments?",
      answer: "Absolutely! Set up automated subscriptions, recurring bills, and scheduled payments with flexible customization options."
    }
  ]

  const stats = [
    { value: "$2.4B+", label: "Total Volume Processed" },
    { value: "500K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "<1s", label: "Average Transaction Time" }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 shadow-lg shadow-slate-200/20 dark:shadow-slate-950/20 border-b border-slate-200/20 dark:border-slate-800/20" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                M
              </div>
              <div className="absolute -top-1 -right-1 size-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Monax
            </span>
          </div>
          
          <div className="hidden md:flex gap-6 items-center">
            
            <a href="/signin" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
              Sign In
            </a>
            
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-slate-100 dark:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/20 dark:border-slate-800/20 shadow-xl">
            <div className="container mx-auto p-4 space-y-4">
              <a href="/signin" className="block py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Sign In
              </a>
              
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]"></div>
          
          <div className="container mx-auto px-4 py-20 md:py-32 lg:py-40 relative">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 dark:border-blue-800/50 rounded-full px-4 py-2 mb-8">
                <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Introducing Monax v1.0</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Digital Payments
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience lightning-fast, zero-fee transactions powered by cutting-edge blockchain technology. 
                <span className="text-blue-600 dark:text-blue-400 font-medium"> Join the payment revolution.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/signin">
                   <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 flex items-center justify-center gap-3">
                  <Play className="size-5 group-hover:scale-110 transition-transform" />
                  Start Trial
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
                </Link>
                
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative mx-auto max-w-6xl mt-20">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Monax Dashboard"
                  className="w-full h-auto relative z-10"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10 rounded-2xl"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 size-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 size-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-60 animate-pulse delay-1000"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 rounded-full px-4 py-2 mb-6">
                <Layers className="size-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Features</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Powerful Features for
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Modern Payments
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Everything you need to build the next generation of payment experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="group relative p-8 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl"></div>
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center size-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 rounded-full px-4 py-2 mb-6">
                <ArrowRight className="size-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">How It Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Get Started in
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Three Simple Steps
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative max-w-4xl mx-auto">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Create Account",
                  description: "Sign up in seconds with just your email. No credit card required to get started on your payment journey.",
                  icon: <Users className="size-8" />
                },
                {
                  step: "02", 
                  title: "Connect Wallet",
                  description: "Seamlessly connect your Monad wallet or any supported wallet with our secure integration.",
                  icon: <Wallet className="size-8" />
                },
                {
                  step: "03",
                  title: "Start Paying",
                  description: "Make instant crypto-to-crypto payments in Monad's secure, lightning-fast environment.",
                  icon: <Zap className="size-8" />
                }
              ].map((step, i) => (
                <div key={i} className="relative z-10 text-center group">
                  <div className="relative mb-6">
                    <div className="size-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 group-hover:shadow-xl transition-all duration-300">
                    <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 rounded-full px-4 py-2 mb-6">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">FAQ</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Frequently Asked
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Questions
                  </span>
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <span className="font-semibold text-slate-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {openFaq === i ? (
                          <Minus className="size-5 text-slate-500" />
                        ) : (
                          <Plus className="size-5 text-slate-500" />
                        )}
                      </div>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          
          <div className="container mx-auto px-4 text-center relative">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Payments?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of businesses already using Monax to revolutionize their payment infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
                  Start Free Trial
                  <ArrowRight className="size-5" />
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-cyan-950/20"></div>
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <span className="text-xl font-bold">Monax</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Revolutionizing digital payments with zero fees and lightning-fast transactions.
              </p>
              <div className="flex gap-4">
                {['twitter', 'linkedin', 'github'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="size-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                  >
                    <div className="size-5 bg-slate-400 hover:bg-white transition-colors"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Documentation"]
              },
              {
                title: "Company", 
                links: ["About", "Careers", "Blog", "Press"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact", "Status", "Security"]
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Monax. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
