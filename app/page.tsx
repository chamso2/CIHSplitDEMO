import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-background/80 border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/images/cih-split-logo.png" alt="CIH Split" className="h-10 w-auto" />
            <span className="font-bold text-xl text-foreground">CIH Split</span>
          </div>
          <Link
            href="/login"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg"
          >
            Se Connecter
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Achats Flexibles,
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {" "}
                    Paiements Faciles
                  </span>
                </h1>
                <p className="mt-6 text-xl text-foreground/70 max-w-lg leading-relaxed">
                  Divisez vos achats en paiements simples sans intérêt. Accès instantané à votre plafond disponible avec
                  CIH Split.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Commencer Maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-3 bg-secondary/20 text-foreground rounded-lg font-semibold border border-secondary hover:bg-secondary/30"
                >
                  En Savoir Plus
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-foreground/60">Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">0%</div>
                  <div className="text-sm text-foreground/60">Intérêt</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-foreground/60">Sécurisé</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20">
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 space-y-4 shadow-xl border border-border">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-muted/50 rounded-lg"></div>
                    <div className="h-20 bg-muted/50 rounded-lg"></div>
                  </div>
                  <div className="h-8 bg-primary/20 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Pourquoi CIH Split?</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Découvrez comment nous rendons vos achats plus flexibles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Paiements Rapides", desc: "Processus ultra-rapide en 2 minutes" },
              { title: "0% Intérêt", desc: "Pas de frais cachés sur 4 mois" },
              { title: "Partenaires Premium", desc: "Marjane, Electroplanet, Biougnach..." },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center space-y-6 border border-primary/20">
          <h2 className="text-4xl font-bold text-primary-foreground">Prêt à commencer?</h2>
          <p className="text-primary-foreground/90 text-lg">
            Connectez-vous avec vos identifiants pour explorer nos partenaires et plans de paiement.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform"
          >
            Se Connecter Maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-foreground/60 text-sm">
          <p>© 2025 CIH Split. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  )
}
