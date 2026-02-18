import { useState } from "react";
import { MapPin, Clock, Users, ArrowRight, Star, Globe2, ChevronDown } from "lucide-react";
import { countries, tourTypes } from "@/data/experiencesData";

const ExperiencesPage = () => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const toggleCountry = (slug: string) => {
    setActiveCountry(activeCountry === slug ? null : slug);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* SEO Head meta is handled by index.html; structured data inline */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Simsem",
            url: "https://mysimsem.com",
            description:
              "Book authentic local travel experiences across the Arab world — tours in Egypt, Jordan, Morocco, Saudi Arabia and more.",
            areaServed: countries.map((c) => c.name),
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <header className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=1600&q=80')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16">
          <p className="text-accent font-semibold tracking-widest text-sm uppercase mb-3">
            Experiences
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4 max-w-3xl">
            Explore the Arab World Like a Local
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mb-8">
            Authentic tours in Egypt, Jordan, Morocco & 13 more countries — guided by people who call it home.
          </p>

          {/* Tour type pills */}
          <div className="flex flex-wrap gap-3">
            {tourTypes.map((type) => (
              <a
                key={type.id}
                href={type.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 backdrop-blur-sm border border-card/30 text-primary-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <span>{type.icon}</span>
                {type.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ===== TOUR CATEGORIES ===== */}
      <section className="py-20 bg-card border-b border-border" aria-labelledby="categories-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">What We Offer</p>
            <h2 id="categories-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Every Way to Experience the Middle East
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From intimate dining tables to desert camps under the stars — choose the experience that speaks to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourTypes.map((type) => (
              <article
                key={type.id}
                className="group relative rounded-2xl border border-border bg-background p-6 hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{type.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {type.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COUNTRIES + CITIES ===== */}
      <main className="py-20" aria-label="Tours by Country">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Destinations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tours Across 16 Arab Countries
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select a country to discover tours by city, curated and led by local guides.
            </p>
          </div>

          <div className="space-y-6">
            {countries.map((country) => {
              const isOpen = activeCountry === country.slug;
              return (
                <section
                  key={country.slug}
                  id={`tours-in-${country.slug}`}
                  className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm"
                  aria-labelledby={`country-${country.slug}`}
                >
                  {/* Country header — clickable accordion trigger */}
                  <button
                    onClick={() => toggleCountry(country.slug)}
                    className="w-full text-left group relative flex items-center justify-between gap-4 p-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-expanded={isOpen}
                    aria-controls={`cities-${country.slug}`}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${country.heroImage}')` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />

                    <div className="relative z-10 flex items-center gap-4 p-6 sm:p-8 flex-1">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3
                          id={`country-${country.slug}`}
                          className="text-2xl sm:text-3xl font-bold text-primary-foreground"
                        >
                          Tours in {country.name}
                        </h3>
                        <p className="text-primary-foreground/75 text-sm mt-1 max-w-md hidden sm:block">
                          {country.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3 pr-6 sm:pr-8">
                      <span className="hidden sm:flex items-center gap-1.5 text-primary-foreground/80 text-sm">
                        <Globe2 size={14} />
                        {country.cities.length} cities
                      </span>
                      <div className="w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center border border-card/30">
                        <ChevronDown
                          size={16}
                          className={`text-primary-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* City cards grid — collapsible */}
                  <div
                    id={`cities-${country.slug}`}
                    role="region"
                    aria-labelledby={`country-${country.slug}`}
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 sm:p-8 border-t border-border">
                      <p className="text-muted-foreground text-sm mb-6 sm:hidden">
                        {country.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {country.cities.map((city) => (
                          <article
                            key={city.slug}
                            className="group rounded-xl overflow-hidden border border-border bg-background hover:shadow-xl transition-all duration-300 flex flex-col"
                          >
                            {/* City photo */}
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={city.photo}
                                alt={`${city.name} — tours and experiences in ${city.name}, ${country.name}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                width={600}
                                height={400}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                              <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                                <MapPin size={12} className="text-accent" />
                                <span className="text-primary-foreground font-semibold text-sm">
                                  {city.name}
                                </span>
                              </div>
                              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                                <Users size={10} />
                                {city.tourCount} tours
                              </div>
                            </div>

                            {/* City info */}
                            <div className="p-4 flex flex-col flex-1">
                              <h4 className="text-base font-bold text-foreground mb-1">
                                Tours in {city.name}
                              </h4>
                              <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4">
                                {city.description}
                              </p>

                              {/* Stars */}
                              <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    size={12}
                                    className="fill-accent text-accent"
                                  />
                                ))}
                                <span className="text-xs text-muted-foreground ml-1">Top rated</span>
                              </div>

                              {/* CTA */}
                              <a
                                href={city.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200"
                                aria-label={`Explore tours in ${city.name}, ${country.name}`}
                              >
                                Explore {city.name}
                                <ArrowRight size={14} />
                              </a>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Coming soon teaser */}
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <Globe2 size={32} className="text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">More Countries Coming Soon</h3>
            <p className="text-muted-foreground text-sm">
              Tunisia, Oman, Kuwait, Bahrain, Palestine & more — we're expanding across the Arab world.
            </p>
          </div>
        </div>
      </main>

      {/* ===== BOTTOM CTA BANNER ===== */}
      <section className="py-20 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-3">Ready?</p>
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Experience the Middle East Like Never Before
          </h2>
          <p className="text-primary-foreground/75 text-lg mb-8">
            Join thousands of travelers who've discovered the Arab world through the eyes of local guides.
          </p>
          <a
            href="https://mysimsem.com/experiences/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold text-base hover:bg-accent/90 active:scale-95 transition-all duration-200 shadow-lg"
          >
            Browse All Experiences
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ===== FOOTER NOTE ===== */}
      <footer className="py-6 bg-card border-t border-border text-center">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Simsem — Authentic Middle Eastern Travel Experiences
        </p>
      </footer>
    </div>
  );
};

export default ExperiencesPage;
