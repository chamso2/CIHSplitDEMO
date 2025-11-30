"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, CreditCard, Wallet } from "lucide-react"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: credentials.email,
            creditScore: 750,
            availableLimit: 15000,
            nextInstallment: "2025-12-15",
          }),
        )
        router.push("/dashboard")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-accent/5 flex flex-col justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md mx-auto space-y-6 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <img src="/images/cih-split-logo.png" alt="CIH Split" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Se Connecter</h1>
          <p className="text-foreground/60 text-sm sm:text-base">
            Accédez à votre portefeuille et vos plans de paiement
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 bg-card border border-border rounded-2xl p-6 sm:p-8">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="vous@exemple.com"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span className="text-foreground/70 text-xs sm:text-sm">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-primary hover:text-primary/80 font-medium text-xs sm:text-sm">
              Mot de passe oublié?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all text-sm sm:text-base"
          >
            {loading ? "Connexion..." : "Se Connecter"}
          </button>
        </form>

        <div className="space-y-3 pt-4">
          <p className="text-center text-foreground/60 text-sm font-medium">Navigation rapide</p>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/dashboard"
              className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/15 transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-foreground">Tableau de bord</span>
            </Link>
            <Link
              href="/checkout"
              className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/15 transition-colors group"
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-foreground">Paiements</span>
            </Link>
            <Link
              href="/wallet"
              className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/15 transition-colors group"
            >
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-secondary group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-foreground">Portefeuille</span>
            </Link>
          </div>
        </div>

        {/* Signup Link */}
        <div className="text-center text-foreground/60 text-sm">
          Pas encore de compte?{" "}
          <a href="#" className="text-primary hover:text-primary/80 font-semibold">
            Demander l'accès
          </a>
        </div>

        {/* Test Credentials */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm">
          <p className="text-foreground/70 font-medium mb-2">Démonstration:</p>
          <p className="text-foreground/60 text-xs sm:text-sm">
            Email: <span className="font-mono">demo@cihsplit.com</span>
          </p>
          <p className="text-foreground/60 text-xs sm:text-sm">
            Mot de passe: <span className="font-mono">demo123</span>
          </p>
        </div>
      </div>
    </main>
  )
}
