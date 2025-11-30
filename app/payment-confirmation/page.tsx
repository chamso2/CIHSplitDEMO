"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Download, Home } from "lucide-react"

export default function PaymentConfirmationPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")
  const plan = searchParams.get("plan")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full animate-pulse"></div>
          <p className="text-foreground/60">Traitement de votre paiement...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-accent/5 flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8 animate-slide-up">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center animate-pulse-glow">
            <Check className="w-10 h-10 text-accent-foreground" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Paiement Approuvé!</h1>
          <p className="text-foreground/60 text-lg">
            Votre commande a été confirmée avec succès. Vous recevrez une confirmation par email.
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
          <div>
            <p className="text-sm text-foreground/60 mb-1">Numéro de Commande</p>
            <p className="text-2xl font-bold text-foreground font-mono">
              CIH#{Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-foreground/60 mb-1">Plan de Paiement</p>
            <p className="font-semibold text-foreground">
              {plan === "no-interest"
                ? "4 Paiements - Sans Intérêt"
                : plan === "extended"
                  ? "6 Paiements - Avec Intérêt"
                  : "8 Paiements - Début Différé"}
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-foreground/60 mb-1">Prochain Paiement</p>
            <p className="font-semibold text-foreground">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Prochaines Étapes</h3>
          <ul className="space-y-3">
            {["Confirmation par email", "Suivi du paiement en temps réel", "Rappels avant chaque échéance"].map(
              (step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  {step}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Retour au Tableau de Bord
          </Link>
          <button className="w-full py-3 bg-secondary/20 text-foreground rounded-lg font-semibold hover:bg-secondary/30 transition-colors border border-secondary/30 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Télécharger la Facture
          </button>
        </div>

        {/* Contact Support */}
        <div className="text-center text-sm text-foreground/60">
          Une question?{" "}
          <a href="#" className="text-primary hover:text-primary/80 font-medium">
            Contactez le support
          </a>
        </div>
      </div>
    </main>
  )
}
