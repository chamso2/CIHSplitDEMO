"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Star } from "lucide-react"

export default function PartnersPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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

  const partners = [
    {
      id: 1,
      name: "Marjane",
      category: "Hypermarché",
      rating: 4.6,
      stores: 28,
      description: "Votre hypermarché préféré avec des produits de qualité",
      logo: "/images/marjane.png",
    },
    {
      id: 2,
      name: "Electroplanet",
      category: "Électronique",
      rating: 4.8,
      stores: 45,
      description: "Les meilleures marques d'électronique et électroménager",
      logo: "/images/electroplanetlogo.jpeg",
    },
    {
      id: 3,
      name: "Biougnach",
      category: "Électroménager",
      rating: 4.5,
      stores: 15,
      description: "Appareils ménagers et équipement de cuisine premium",
      logo: "/images/biougnachlogo.png",
    },
  ]

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>

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
          <h1 className="text-xl font-bold text-foreground">Partenaires</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Title */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nos Partenaires</h2>
          <p className="text-foreground/60 text-lg">
            Découvrez plus de {partners.length} marques partenaires où vous pouvez utiliser CIH Split
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, i) => (
            <Link
              key={partner.id}
              href={`/products?partner=${partner.name.toLowerCase()}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all h-full">
                {/* Logo Area */}
                <div className="bg-white h-32 flex items-center justify-center group-hover:scale-105 transition-transform p-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-1">{partner.category}</p>
                  </div>

                  <p className="text-foreground/60 text-sm">{partner.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent" fill="currentColor" />
                      <span className="text-sm font-semibold text-foreground">{partner.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-semibold text-foreground">{partner.stores} magasins</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-2 bg-primary/20 text-primary rounded-lg font-medium hover:bg-primary/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    Explorer
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div
          className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center space-y-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-2xl font-bold text-foreground">Davantage de partenaires à venir</h3>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Nous ajoutons continuellement de nouveaux partenaires pour élargir vos options de shopping. Revenez bientôt!
          </p>
        </div>
      </div>
    </main>
  )
}
