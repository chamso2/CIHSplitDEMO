"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react"

export default function ProductDetailPage() {
  const [product, setProduct] = useState<any>(null)
  const [wishlist, setWishlist] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Mock product data
    const mockProducts: Record<string, any> = {
      "1": {
        id: 1,
        name: "Samsung Galaxy S24 Ultra",
        partner: "Electroplanet",
        price: 8500,
        image: "/samsung-galaxy-s24-ultra-flagship-phone.jpg",
        rating: 4.8,
        reviews: 156,
        category: "Smartphones",
        inStock: true,
        description:
          'Le dernier flagship de Samsung avec écran 6.8", caméra 200MP, processeur Snapdragon 8 Gen 3, batterie 5000mAh.',
        specs: [
          'Écran: 6.8" Dynamic AMOLED 2X',
          "Processeur: Snapdragon 8 Gen 3",
          "RAM: 12GB",
          "Stockage: 256GB",
          "Caméra: 200MP + 50MP + 10MP + 10MP",
          "Batterie: 5000mAh",
          "Charge: 45W filaire + 15W sans fil",
        ],
      },
      "2": {
        id: 2,
        name: "MacBook Air M3",
        partner: "Electroplanet",
        price: 12500,
        image: "/macbook-air-m3-laptop-computer.jpg",
        rating: 4.9,
        reviews: 342,
        category: "Laptops",
        inStock: true,
        description: "Ultrabook puissant avec processeur M3, écran Retina 13.6\", jusqu'à 18h d'autonomie.",
        specs: [
          "Processeur: Apple M3",
          "RAM: 8GB",
          "Stockage: 512GB SSD",
          'Écran: 13.6" Retina',
          "Autonomie: jusqu'à 18h",
          "Poids: 1.24kg",
          "Ports: 2x Thunderbolt",
        ],
      },
    }

    setProduct(mockProducts[params.id as string] || mockProducts["1"])
  }, [params.id])

  if (!product) return <div>Chargement...</div>

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
          <h1 className="text-xl font-bold text-foreground">Détails du Produit</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4 animate-slide-up">
            <div className="bg-muted/30 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-muted/50 rounded-lg border-2 border-primary/20 hover:border-primary cursor-pointer"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {/* Header Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-primary font-semibold uppercase text-sm">{product.category}</p>
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`p-2 rounded-lg border transition-colors ${
                    wishlist
                      ? "bg-accent/20 border-accent text-accent"
                      : "border-border text-foreground/40 hover:text-accent hover:border-accent"
                  }`}
                >
                  <Heart className="w-6 h-6" fill={wishlist ? "currentColor" : "none"} />
                </button>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-full ${i < Math.floor(product.rating) ? "bg-accent" : "bg-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-foreground/60">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              {/* Partner */}
              <div className="inline-block bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <p className="text-sm text-foreground/60">
                  Vendu par <span className="font-semibold text-primary">{product.partner}</span>
                </p>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">{(product.price / 1000).toFixed(1)}K</span>
                <span className="text-foreground/60">DH</span>
              </div>
              <p className="text-foreground/70">Prix total TTC</p>

              {product.inStock && <div className="text-sm text-accent font-medium">✓ En stock</div>}
            </div>

            {/* Specs */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Spécifications</h3>
              <div className="grid gap-2">
                {product.specs.map((spec: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-foreground/80 text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Link
                href={`/checkout?productId=${product.id}`}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Procéder au Paiement
              </Link>
              <button className="w-full py-3 bg-secondary/20 text-foreground rounded-xl font-semibold hover:bg-secondary/30 transition-colors border border-secondary/30">
                Ajouter au Panier
              </button>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-3">À propos de ce produit</h4>
              <p className="text-foreground/70 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
