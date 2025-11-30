"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Check, Lock } from "lucide-react"

export default function CheckoutPage() {
  const [product, setProduct] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<"no-interest" | "extended" | "deferred">("no-interest")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")

  useEffect(() => {
    // Mock product data
    const mockProducts: Record<string, any> = {
      "1": { id: 1, name: "Samsung Galaxy S24 Ultra", price: 8500 },
      "2": { id: 2, name: "MacBook Air M3", price: 12500 },
      "3": { id: 3, name: "Réfrigérateur LG", price: 6200 },
      "4": { id: 4, name: 'TV Sony 55"', price: 7800 },
      "5": { id: 5, name: "Lave-linge Bosch", price: 5400 },
    }
    setProduct(mockProducts[productId || "1"])
  }, [productId])

  const calculatePlanDetails = () => {
    if (!product) return null

    const plans = {
      "no-interest": {
        name: "4 Paiements - Sans Intérêt",
        duration: 4,
        interestRate: 0,
        firstPaymentDelay: 0,
        description: "Premier paiement immédiat, puis 3 paiements mensuels égaux",
      },
      extended: {
        name: "6 Paiements - Avec Intérêt Réduit",
        duration: 6,
        interestRate: 3.5,
        firstPaymentDelay: 0,
        description: "Étalez vos paiements sur 6 mois avec un taux préférentiel",
      },
      deferred: {
        name: "8 Paiements - Début Différé",
        duration: 8,
        interestRate: 4.5,
        firstPaymentDelay: 2,
        description: "Premier paiement après 2 mois, puis 7 paiements mensuels",
      },
    }

    const plan = plans[selectedPlan]
    const totalInterest = (product.price * plan.interestRate) / 100
    const totalAmount = product.price + totalInterest
    const monthlyPayment = totalAmount / plan.duration

    return {
      ...plan,
      totalInterest,
      totalAmount,
      monthlyPayment,
    }
  }

  const planDetails = calculatePlanDetails()

  const handleConfirmPayment = async () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      router.push(`/payment-confirmation?productId=${productId}&plan=${selectedPlan}`)
    }, 1500)
  }

  if (!product || !planDetails) return <div>Chargement...</div>

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <h1 className="text-xl font-bold text-foreground">Paiement</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <section className="bg-card border border-border rounded-2xl p-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-foreground mb-6">Résumé de la Commande</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-border">
                  <div>
                    <p className="font-semibold text-foreground">{product.name}</p>
                    <p className="text-sm text-foreground/60 mt-1">Quantité: 1</p>
                  </div>
                  <p className="text-lg font-bold text-foreground">{(product.price / 1000).toFixed(1)}K DH</p>
                </div>
                <div className="flex justify-between items-center text-foreground/60">
                  <span>Total</span>
                  <p className="text-xl font-bold text-foreground">{(product.price / 1000).toFixed(1)}K DH</p>
                </div>
              </div>
            </section>

            {/* Payment Plans */}
            <section className="space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-2xl font-bold text-foreground">Choisissez un Plan de Paiement</h2>

              {(["no-interest", "extended", "deferred"] as const).map((planKey) => {
                const details = calculatePlanDetails()
                if (planKey === "extended") {
                  const plan = {
                    name: "6 Paiements - Avec Intérêt Réduit",
                    duration: 6,
                    interestRate: 3.5,
                    firstPaymentDelay: 0,
                    description: "Étalez vos paiements sur 6 mois avec un taux préférentiel",
                  }
                  const totalInterest = (product.price * plan.interestRate) / 100
                  const totalAmount = product.price + totalInterest
                  const monthlyPayment = totalAmount / plan.duration

                  return (
                    <label key={planKey} className="cursor-pointer">
                      <div
                        className={`border-2 rounded-2xl p-6 transition-all ${
                          selectedPlan === planKey
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            name="payment-plan"
                            value={planKey}
                            checked={selectedPlan === planKey}
                            onChange={(e) => setSelectedPlan(e.target.value as any)}
                            className="w-5 h-5 accent-primary mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                              {planKey === "no-interest" && (
                                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                                  Populaire
                                </span>
                              )}
                            </div>
                            <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-foreground/50 mb-1">Paiement Mensuel</p>
                                <p className="text-xl font-bold text-foreground">
                                  {(monthlyPayment / 1000).toFixed(2)}K DH
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-foreground/50 mb-1">Intérêt Total</p>
                                <p className="text-xl font-bold text-foreground">
                                  {(totalInterest / 1000).toFixed(2)}K DH
                                </p>
                              </div>
                            </div>

                            <div className="text-xs text-foreground/60">
                              <p>• Durée: {plan.duration} mois</p>
                              <p>• Montant total: {(totalAmount / 1000).toFixed(2)}K DH</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  )
                } else if (planKey === "deferred") {
                  const plan = {
                    name: "8 Paiements - Début Différé",
                    duration: 8,
                    interestRate: 4.5,
                    firstPaymentDelay: 2,
                    description: "Premier paiement après 2 mois, puis 7 paiements mensuels",
                  }
                  const totalInterest = (product.price * plan.interestRate) / 100
                  const totalAmount = product.price + totalInterest
                  const monthlyPayment = totalAmount / plan.duration

                  return (
                    <label key={planKey} className="cursor-pointer">
                      <div
                        className={`border-2 rounded-2xl p-6 transition-all ${
                          selectedPlan === planKey
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            name="payment-plan"
                            value={planKey}
                            checked={selectedPlan === planKey}
                            onChange={(e) => setSelectedPlan(e.target.value as any)}
                            className="w-5 h-5 accent-primary mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                            </div>
                            <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-foreground/50 mb-1">Paiement Mensuel</p>
                                <p className="text-xl font-bold text-foreground">
                                  {(monthlyPayment / 1000).toFixed(2)}K DH
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-foreground/50 mb-1">Intérêt Total</p>
                                <p className="text-xl font-bold text-foreground">
                                  {(totalInterest / 1000).toFixed(2)}K DH
                                </p>
                              </div>
                            </div>

                            <div className="text-xs text-foreground/60">
                              <p>
                                • Durée: {plan.duration} mois (avec {plan.firstPaymentDelay} mois de délai)
                              </p>
                              <p>• Montant total: {(totalAmount / 1000).toFixed(2)}K DH</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  )
                } else {
                  const plan = {
                    name: "4 Paiements - Sans Intérêt",
                    duration: 4,
                    interestRate: 0,
                    firstPaymentDelay: 0,
                    description: "Premier paiement immédiat, puis 3 paiements mensuels égaux",
                  }
                  const totalInterest = (product.price * plan.interestRate) / 100
                  const totalAmount = product.price + totalInterest
                  const monthlyPayment = totalAmount / plan.duration

                  return (
                    <label key={planKey} className="cursor-pointer">
                      <div
                        className={`border-2 rounded-2xl p-6 transition-all ${
                          selectedPlan === planKey
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            name="payment-plan"
                            value={planKey}
                            checked={selectedPlan === planKey}
                            onChange={(e) => setSelectedPlan(e.target.value as any)}
                            className="w-5 h-5 accent-primary mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                              {planKey === "no-interest" && (
                                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                                  Populaire
                                </span>
                              )}
                            </div>
                            <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-foreground/50 mb-1">Paiement Mensuel</p>
                                <p className="text-xl font-bold text-foreground">
                                  {(monthlyPayment / 1000).toFixed(2)}K DH
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-foreground/50 mb-1">Intérêt Total</p>
                                <p className="text-xl font-bold text-foreground">
                                  {(totalInterest / 1000).toFixed(2)}K DH
                                </p>
                              </div>
                            </div>

                            <div className="text-xs text-foreground/60">
                              <p>• Durée: {plan.duration} mois</p>
                              <p>• Montant total: {(totalAmount / 1000).toFixed(2)}K DH</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  )
                }
              })}
            </section>

            {/* Payment Schedule */}
            <section
              className="bg-card border border-border rounded-2xl p-8 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Calendrier de Paiement</h3>
              <div className="space-y-3">
                {[...Array(planDetails.duration)].map((_, i) => {
                  const date = new Date()
                  if (planDetails.firstPaymentDelay > 0) {
                    date.setMonth(date.getMonth() + planDetails.firstPaymentDelay + i)
                  } else {
                    date.setMonth(date.getMonth() + i)
                  }
                  return (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                          {i + 1}
                        </div>
                        <span className="text-foreground/70">
                          {date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {(planDetails.monthlyPayment / 1000).toFixed(2)}K DH
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="space-y-6">
            {/* Summary Card */}
            <div
              className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 space-y-6 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div>
                <p className="text-sm text-foreground/60 mb-2">Prix du Produit</p>
                <p className="text-3xl font-bold text-foreground">{(product.price / 1000).toFixed(1)}K</p>
              </div>

              <div className="bg-background/50 rounded-lg p-4 space-y-3 border border-primary/10">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Intérêt Total</span>
                  <span className="font-semibold text-foreground">
                    {(planDetails.totalInterest / 1000).toFixed(2)}K DH
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Paiement Mensuel</span>
                  <span className="font-semibold text-foreground">
                    {(planDetails.monthlyPayment / 1000).toFixed(2)}K DH
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{(planDetails.totalAmount / 1000).toFixed(2)}K DH</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                disabled={loading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-4 h-4" />
                {loading ? "Traitement..." : "Confirmer le Paiement"}
              </button>

              {/* Security Badge */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-accent text-sm">Sécurisé par CIH</span>
                </div>
                <p className="text-xs text-foreground/60">Paiement 100% sécurisé</p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-3">
              {[
                { icon: "⚡", title: "Rapide", desc: "Traitement en 2 min" },
                { icon: "🔒", title: "Sécurisé", desc: "Chiffrement SSL" },
                { icon: "✓", title: "Approuvé", desc: "Portefeuille CIH" },
              ].map((info, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <p className="text-2xl mb-2">{info.icon}</p>
                  <p className="font-semibold text-foreground text-sm">{info.title}</p>
                  <p className="text-xs text-foreground/60">{info.desc}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
