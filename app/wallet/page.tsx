"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Download, Send } from "lucide-react"

export default function WalletPage() {
  const [user, setUser] = useState<any>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "installments">("overview")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>

  const mockTransactions = [
    {
      id: 1,
      type: "purchase",
      description: "Samsung Galaxy S24 Ultra",
      amount: 8500,
      date: "2025-01-15",
      status: "completed",
      partner: "Electroplanet",
    },
    {
      id: 2,
      type: "payment",
      description: "Paiement échéance 1/4",
      amount: 2125,
      date: "2025-02-15",
      status: "completed",
      partner: "CIH Split",
    },
    {
      id: 3,
      type: "payment",
      description: "Paiement échéance 2/4",
      amount: 2125,
      date: "2025-03-15",
      status: "completed",
      partner: "CIH Split",
    },
    {
      id: 4,
      type: "purchase",
      description: "MacBook Air M3",
      amount: 12500,
      date: "2025-03-20",
      status: "completed",
      partner: "Electroplanet",
    },
    {
      id: 5,
      type: "payment",
      description: "Paiement échéance 3/4",
      amount: 2125,
      date: "2025-04-15",
      status: "pending",
      partner: "CIH Split",
    },
    {
      id: 6,
      type: "refund",
      description: "Remboursement",
      amount: 500,
      date: "2025-03-10",
      status: "completed",
      partner: "Marjane",
    },
  ]

  const mockInstallments = [
    {
      id: 1,
      product: "Samsung Galaxy S24 Ultra",
      totalPayments: 4,
      paid: 2,
      nextPayment: "2025-04-15",
      amount: 2125,
      partner: "Electroplanet",
    },
    {
      id: 2,
      product: "MacBook Air M3",
      totalPayments: 6,
      paid: 0,
      nextPayment: "2025-04-20",
      amount: 2083,
      partner: "Electroplanet",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">CIH Split</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-foreground/60">Portefeuille</p>
              <p className="font-semibold text-foreground">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-lg text-foreground/60 hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-primary-foreground mb-12 animate-slide-up shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-primary-foreground/70 text-sm mb-2">Solde Total</p>
              <div className="flex items-baseline gap-3">
                <h1 className="text-5xl font-bold">
                  {showBalance ? `${(user?.availableLimit / 1000).toFixed(1)}K` : "••••"}
                </h1>
                <span className="text-primary-foreground/80 text-lg">DH</span>
              </div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
            >
              {showBalance ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-primary-foreground/20">
            <div>
              <p className="text-primary-foreground/70 text-xs mb-1">Disponible</p>
              <p className="text-lg font-semibold">{(user?.availableLimit / 1000).toFixed(1)}K DH</p>
            </div>
            <div>
              <p className="text-primary-foreground/70 text-xs mb-1">Utilisé</p>
              <p className="text-lg font-semibold">5.2K DH</p>
            </div>
            <div>
              <p className="text-primary-foreground/70 text-xs mb-1">Limite</p>
              <p className="text-lg font-semibold">20K DH</p>
            </div>
          </div>

          {/* Card Display */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary-foreground/70 text-xs mb-2">NUMÉRO DE COMPTE</p>
              <p className="font-mono text-lg font-semibold">**** **** **** 4829</p>
            </div>
            <div className="text-right">
              <p className="text-primary-foreground/70 text-xs mb-1">Valide jusqu'au</p>
              <p className="font-semibold">12/26</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Link
            href="/products"
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <ArrowDownLeft className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Acheter</p>
              <p className="text-sm text-foreground/60">Parcourir les produits</p>
            </div>
          </Link>

          <button className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <Send className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Envoyer</p>
              <p className="text-sm text-foreground/60">Virement de fonds</p>
            </div>
          </button>

          <button className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
              <Download className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Télécharger</p>
              <p className="text-sm text-foreground/60">Relevé de compte</p>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-card border-b border-border mb-8 rounded-t-2xl">
          <div className="flex">
            {(["overview", "transactions", "installments"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "text-primary border-primary"
                    : "text-foreground/60 border-transparent hover:text-foreground"
                }`}
              >
                {tab === "overview" ? "Aperçu" : tab === "transactions" ? "Transactions" : "Échéances"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-slide-up">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-foreground/60 text-sm mb-2">Dépenses ce mois</p>
                <p className="text-3xl font-bold text-foreground">2.1K DH</p>
                <p className="text-xs text-foreground/50 mt-2">↓ 15% par rapport au mois précédent</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-foreground/60 text-sm mb-2">Prochaine échéance</p>
                <p className="text-3xl font-bold text-foreground">15 Avr</p>
                <p className="text-xs text-foreground/50 mt-2">2.1K DH - MacBook Air</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-foreground/60 text-sm mb-2">Score de Crédit</p>
                <p className="text-3xl font-bold text-accent">750</p>
                <p className="text-xs text-foreground/50 mt-2">Excellent</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Activité Récente</h3>
              <div className="space-y-2">
                {mockTransactions.slice(0, 4).map((tx, i) => (
                  <div
                    key={tx.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between animate-slide-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tx.type === "purchase"
                            ? "bg-primary/20"
                            : tx.type === "payment"
                              ? "bg-accent/20"
                              : "bg-secondary/20"
                        }`}
                      >
                        {tx.type === "purchase" ? (
                          <ArrowDownLeft className="w-5 h-5 text-primary" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{tx.description}</p>
                        <p className="text-sm text-foreground/60">{new Date(tx.date).toLocaleDateString("fr-FR")}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">
                      {tx.type === "purchase" || tx.type === "refund" ? "-" : "+"}
                      {(tx.amount / 1000).toFixed(2)}K DH
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="space-y-4 animate-slide-up">
            {mockTransactions.map((tx, i) => (
              <div
                key={tx.id}
                className="bg-card border border-border rounded-lg p-6 flex items-center justify-between hover:shadow-lg transition-all"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      tx.type === "purchase"
                        ? "bg-primary/20"
                        : tx.type === "payment"
                          ? "bg-accent/20"
                          : "bg-secondary/20"
                    }`}
                  >
                    {tx.type === "purchase" ? (
                      <ArrowDownLeft className="w-6 h-6 text-primary" />
                    ) : tx.type === "payment" ? (
                      <ArrowUpRight className="w-6 h-6 text-accent" />
                    ) : (
                      <ArrowDownLeft className="w-6 h-6 text-secondary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tx.description}</p>
                    <p className="text-sm text-foreground/60">
                      {tx.partner} • {new Date(tx.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tx.status === "completed" ? "bg-accent/20 text-accent" : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {tx.status === "completed" ? "Complété" : "En attente"}
                  </span>
                  <p className="font-semibold text-foreground min-w-fit">
                    {tx.type === "purchase" || tx.type === "refund" ? "-" : "+"}
                    {(tx.amount / 1000).toFixed(2)}K DH
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "installments" && (
          <div className="space-y-6 animate-slide-up">
            {mockInstallments.map((installment, idx) => (
              <div key={installment.id} className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{installment.product}</h4>
                    <p className="text-sm text-foreground/60">de {installment.partner}</p>
                  </div>
                  <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-semibold text-sm">
                    {installment.paid}/{installment.totalPayments}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Progression</span>
                    <span className="font-semibold text-foreground">
                      {Math.round((installment.paid / installment.totalPayments) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(installment.paid / installment.totalPayments) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Installment Details */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Paiement Mensuel</p>
                    <p className="text-lg font-bold text-foreground">{(installment.amount / 1000).toFixed(2)}K DH</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Prochain Paiement</p>
                    <p className="text-lg font-bold text-foreground">
                      {new Date(installment.nextPayment).toLocaleDateString("fr-FR", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Restant</p>
                    <p className="text-lg font-bold text-accent">
                      {installment.totalPayments - installment.paid} paiements
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
