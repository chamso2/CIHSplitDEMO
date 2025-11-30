"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, ShoppingBag, Wallet, Zap } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(userData)
    parsedUser.creditScore = 70
    parsedUser.availableLimit = 45000
    setUser(parsedUser)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-foreground">Chargement...</div>

  const topProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S24",
      partner: "Electroplanet",
      price: 8500,
      purchases: 342,
      image: "/samsung-galaxy-s24-smartphone.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "MacBook Air M3",
      partner: "Electroplanet",
      price: 12500,
      purchases: 289,
      image: "/macbook-air-m3-laptop.jpg",
      rating: 4.9,
    },
    {
      id: 3,
      name: "iPad Pro 12.9",
      partner: "Marjane",
      price: 9200,
      purchases: 156,
      image: "/ipad-pro-tablet.jpg",
      rating: 4.8,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-2">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/images/cih-split-logo.png" alt="CIH Split" className="h-10 w-auto" />
            <span className="font-bold text-lg sm:text-xl text-foreground hidden sm:inline">CIH Split</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-foreground/60">Bienvenue</p>
              <p className="font-semibold text-foreground text-sm">{user?.email?.split("@")[0]}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-lg text-foreground/60 hover:text-foreground transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6">
        {/* Welcome Section */}
        <div className="animate-slide-up">
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-1">
            Bienvenue, {user?.email?.split("@")[0]}
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base">Gérez vos paiements et découvrez nos partenaires</p>
        </div>

        {/* Key Metrics - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Credit Score Card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4 animate-slide-up">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-foreground/60 text-xs sm:text-sm font-medium">Score de Crédit</p>
                <div className="text-3xl sm:text-4xl font-bold text-primary mt-2">{user?.creditScore || 70}</div>
              </div>
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${((user?.creditScore || 70) / 100) * 100}%` }}></div>
            </div>
            <p className="text-xs text-foreground/50 font-medium">Bon score</p>
          </div>

          {/* Available Limit Card */}
          <div
            className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6 space-y-4 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-foreground/60 text-xs sm:text-sm font-medium">Plafond Disponible</p>
                <div className="text-2xl sm:text-3xl font-bold text-accent mt-2">
                  {(user?.availableLimit || 45000).toLocaleString("fr-FR")}
                </div>
                <p className="text-xs text-accent font-medium mt-1">MAD</p>
              </div>
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
          </div>

          {/* Next Installment Card */}
          <div
            className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-6 space-y-4 animate-slide-up sm:col-span-2 lg:col-span-1"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-foreground/60 text-xs sm:text-sm font-medium">Prochain Paiement</p>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mt-2">15 Déc 2025</div>
              </div>
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </div>
            <p className="text-xs text-foreground/50 font-medium">Aucune échéance urgente</p>
          </div>
        </div>

        {/* Top Products Section */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Produits Populaires</h2>
              <p className="text-foreground/60 text-xs sm:text-sm mt-1">Les 3 produits les plus achetés</p>
            </div>
            <Link href="/products" className="text-primary hover:text-primary/80 font-medium text-xs sm:text-sm">
              Voir tous →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProducts.map((product, i) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="bg-muted/50 h-40 sm:h-48 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-primary font-semibold uppercase">{product.partner}</p>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors mt-1 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < Math.floor(product.rating) ? "bg-accent" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-foreground/60">{product.rating}</span>
                  </div>

                  {/* Price - MAD Format */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">
                        {product.price.toLocaleString("fr-FR")} MAD
                      </p>
                    </div>
                    <span className="text-xs text-foreground/50 font-medium">{product.purchases} achats</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Partenaires</h2>
            <p className="text-foreground/60 text-xs sm:text-sm mt-1">Accédez à des milliers de produits</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Marjane", logo: "/images/marjane.png" },
              { name: "Electroplanet", logo: "/images/electroplanetlogo.jpeg" },
              { name: "Biougnach", logo: "/images/biougnachlogo.png" },
            ].map((partner, i) => (
              <Link
                key={i}
                href={`/products?partner=${partner.name.toLowerCase()}`}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all animate-slide-up cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-full h-16 sm:h-20 bg-muted/50 rounded-lg mb-4 group-hover:scale-105 transition-transform flex items-center justify-center p-2">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/60 mt-2">Découvrez les offres →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/products"
            className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group"
          >
            <ShoppingBag className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Parcourir les Produits</h3>
            <p className="text-foreground/60 text-xs sm:text-sm">Découvrez notre catalogue complet</p>
          </Link>

          <Link
            href="/wallet"
            className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/20 rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all group"
          >
            <Wallet className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Mon Portefeuille</h3>
            <p className="text-foreground/60 text-xs sm:text-sm">Gérez vos transactions</p>
          </Link>
        </section>
      </div>
    </main>
  )
}
