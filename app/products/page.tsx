"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Filter, Grid3X3, List } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [viewMode, setViewMode] = useState("grid")
  const [priceFilter, setPriceFilter] = useState(50000)
  const [selectedPartner, setSelectedPartner] = useState("all")
  const router = useRouter()
  const searchParams = useSearchParams()
  const partnerParam = searchParams.get("partner")

  useEffect(() => {
    if (partnerParam) {
      setSelectedPartner(partnerParam)
    }

    const mockProducts = [
      {
        id: 1,
        name: "Samsung Galaxy S24",
        partner: "electroplanet",
        price: 8500,
        image: "/samsung-galaxy-s24-smartphone.jpg",
        rating: 4.8,
        reviews: 156,
        category: "Smartphones",
      },
      {
        id: 2,
        name: "MacBook Air M3",
        partner: "electroplanet",
        price: 12500,
        image: "/macbook-air-m3-laptop.jpg",
        rating: 4.9,
        reviews: 342,
        category: "Laptops",
      },
      {
        id: 3,
        name: "Réfrigérateur LG",
        partner: "marjane",
        price: 6200,
        image: "/lg-refrigerator-appliance.jpg",
        rating: 4.6,
        reviews: 89,
        category: "Électroménager",
      },
      {
        id: 4,
        name: 'TV Sony 55"',
        partner: "electroplanet",
        price: 7800,
        image: "/sony-55-inch-television.jpg",
        rating: 4.7,
        reviews: 224,
        category: "Téléviseurs",
      },
      {
        id: 5,
        name: "Lave-linge Bosch",
        partner: "biougnach",
        price: 5400,
        image: "/bosch-washing-machine.jpg",
        rating: 4.5,
        reviews: 67,
        category: "Électroménager",
      },
      {
        id: 6,
        name: 'iPad Pro 12.9"',
        partner: "marjane",
        price: 9200,
        image: "/ipad-pro-tablet.jpg",
        rating: 4.8,
        reviews: 198,
        category: "Tablettes",
      },
      {
        id: 7,
        name: "AirPods Pro Max",
        partner: "electroplanet",
        price: 4500,
        image: "/airpods-pro-max-headphones.jpg",
        rating: 4.9,
        reviews: 412,
        category: "Audio",
      },
      {
        id: 8,
        name: "Four Beko",
        partner: "biougnach",
        price: 2800,
        image: "/beko-oven-kitchen.jpg",
        rating: 4.4,
        reviews: 42,
        category: "Électroménager",
      },
    ]

    setProducts(mockProducts)
  }, [partnerParam])

  const filteredProducts = products.filter((p) => {
    const partnerMatch = selectedPartner === "all" || p.partner === selectedPartner
    const priceMatch = p.price <= priceFilter
    return partnerMatch && priceMatch
  })

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
          <h1 className="text-xl font-bold text-foreground">Produits</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtres
              </h3>
            </div>

            {/* Partner Filter */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Partenaires</h4>
              {[
                { value: "all", label: "Tous" },
                { value: "electroplanet", label: "Electroplanet" },
                { value: "marjane", label: "Marjane" },
                { value: "biougnach", label: "Biougnach" },
              ].map((partner) => (
                <label key={partner.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="partner"
                    value={partner.value}
                    checked={selectedPartner === partner.value}
                    onChange={(e) => setSelectedPartner(e.target.value)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground/70 group-hover:text-foreground">{partner.label}</span>
                </label>
              ))}
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Prix Maximum</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(Number.parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="text-sm text-foreground/60 font-mono">
                  jusqu'à {priceFilter.toLocaleString("fr-FR")} MAD
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground/60">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* View Mode Selector */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Tous les Produits</h2>
              <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
                {filteredProducts.map((product, i) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group animate-slide-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div
                      className={`bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all ${
                        viewMode === "list" ? "flex gap-4 p-4" : ""
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`bg-muted/50 overflow-hidden ${
                          viewMode === "list" ? "w-32 h-32 rounded-lg flex-shrink-0" : "h-64 rounded-t-lg"
                        }`}
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className={`flex flex-col justify-between p-4 flex-1 ${viewMode === "list" ? "" : ""}`}>
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-xs text-primary font-semibold uppercase">{product.category}</p>
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                                {product.name}
                              </h3>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${i < Math.floor(product.rating) ? "bg-accent" : "bg-muted"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-foreground/60">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Price and Partner */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <p className="text-xl font-bold text-foreground">
                              {product.price.toLocaleString("fr-FR")} MAD
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">Aucun produit ne correspond à vos critères.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
