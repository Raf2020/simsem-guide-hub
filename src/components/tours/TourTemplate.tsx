import { useState, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, X, ChevronDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ============ FADE-IN WRAPPER ============ */
const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ============ TYPES ============ */

export interface TourImage { src: string; alt: string; }
export interface TourDetail { icon: ReactNode; label: string; value: string; }
export interface ScheduleItem { time: string; title: string; desc: string; }
export interface DaySchedule { day: number; items: ScheduleItem[]; }
export interface FAQ { q: string; a: string; }
export interface TourChip { icon: string; text: string; }
export interface GuideInfo { name: string; note?: string; bio: string; initial?: string; }
export interface SidebarFact { icon: ReactNode; label: string; value: string; }

export interface TourData {
  title: string; country: string; badge?: string; location: string; duration: string;
  gallery: TourImage[]; description: string | ReactNode; price: string; bookingUrl: string;
  ctaText?: string; cancelNote?: string; details: TourDetail[]; highlights: string[];
  included: string[]; notIncluded: string[]; chips?: TourChip[]; itinerary: DaySchedule[];
  whoFor?: string; whatDifferent?: string; diffPoints?: string[]; meetingPoint?: string;
  guide?: GuideInfo; faqs: FAQ[];
  sidebarFacts?: SidebarFact[]; sidebarInclusions?: string[];
  metaTitle: string; metaDescription: string;
  relatedLinks?: { label: string; href: string }[];
}

/* ============ COMPONENT ============ */

export default function TourTemplate({ tour }: { tour: TourData }) {
  const [heroImg, setHeroImg] = useState(0);
  const [activeDay, setActiveDay] = useState(1);

  const schedule = tour.itinerary.find(d => d.day === activeDay)?.items ?? [];
  const cta = tour.ctaText || "Reserve Now";
  const cancel = tour.cancelNote || "Free cancellation · Instant confirmation";

  const jsonLd = {
    "@context": "https://schema.org", "@type": "TouristTrip",
    name: tour.title, description: tour.metaDescription,
    touristType: ["Adventure", "Cultural", "Nature"],
    offers: { "@type": "Offer", price: tour.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: "SimSem", url: "https://mysimsem.com" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", ratingCount: "127" },
  };

  return (
    <>
      <Helmet>
        <title>{tour.metaTitle}</title>
        <meta name="description" content={tour.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">

        {/* ─── HERO ─── */}
        <section className="relative w-full h-[50vh] lg:h-[55vh] max-h-[560px] lg:max-h-[620px] overflow-hidden bg-black">
          <img
            src={tour.gallery[heroImg]?.src}
            alt={tour.gallery[heroImg]?.alt}
            className="absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Breadcrumb */}
          <nav className="absolute top-6 left-6 lg:left-10 z-20 text-white/60 text-[13px] tracking-wide" aria-label="Breadcrumb">
            <Link to="/experiences" className="hover:text-white transition">Tours</Link>
            <span className="mx-2">/</span>
            <Link to={`/tours/${tour.country.toLowerCase()}`} className="hover:text-white transition capitalize">{tour.country}</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{tour.location}</span>
          </nav>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 lg:px-10 pb-10 lg:pb-16">
            <div className="max-w-5xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4af37] bg-[#d4af37]/15 backdrop-blur-sm px-3 py-1.5 rounded">{tour.country}</span>
                {tour.badge && <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded">{tour.badge}</span>}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] text-white leading-[1.08] tracking-tight max-w-4xl">
                {tour.title}
              </h1>
              <div className="flex items-center gap-6 mt-5 text-white/60 text-[15px] tracking-wide">
                <span>{tour.location}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{tour.duration}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[#d4af37]">★ 4.9</span>
              </div>
            </div>
          </div>

          {/* Gallery nav */}
          <div className="absolute bottom-6 right-6 lg:right-10 z-20 flex items-center gap-2">
            <span className="text-white/50 text-xs tracking-wider mr-2">{heroImg + 1}/{tour.gallery.length}</span>
            <button onClick={() => setHeroImg(i => i > 0 ? i - 1 : tour.gallery.length - 1)} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition">←</button>
            <button onClick={() => setHeroImg(i => i < tour.gallery.length - 1 ? i + 1 : 0)} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition">→</button>
          </div>
        </section>

        {/* ─── THUMBNAIL ROW ─── */}
        <div className="border-b border-[#eee]">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="flex gap-1.5 py-3 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              {tour.gallery.map((img, i) => (
                <button key={i} onClick={() => setHeroImg(i)}
                  className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded overflow-hidden transition-all ${heroImg === i ? "ring-2 ring-[#d4af37] opacity-100" : "opacity-40 hover:opacity-70"}`}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── MAIN ─── */}
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-20">

            {/* LEFT */}
            <div>
              {/* Description */}
              <FadeIn>
              <div className="text-lg lg:text-[21px] text-[#555] leading-[1.7] mb-16 max-w-xl">
                {tour.description}
              </div>
              </FadeIn>

              {/* Quick facts — minimal horizontal strip */}
              <FadeIn delay={0.05}>
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16 pb-16 border-b border-[#eee]">
                {tour.details.map(d => (
                  <div key={d.label}>
                    <div className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#999] mb-1">{d.label}</div>
                    <div className="text-[16px] font-semibold text-[#1a1a2e]">{d.value}</div>
                  </div>
                ))}
              </div>
              </FadeIn>

              {/* Highlights */}
              {tour.highlights.length > 0 && (
                <FadeIn>
                <section className="mb-16">
                  <h2 className="font-display text-2xl text-[#1a1a2e] mb-6">What to Expect</h2>
                  <ul className="space-y-4">
                    {tour.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-4 text-[17px] text-[#333] leading-relaxed">
                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </section>
                </FadeIn>
              )}

              {/* Included / Not Included */}
              {(tour.included.length > 0 || tour.notIncluded.length > 0) && (
                <FadeIn>
                <section className="mb-16 pb-16 border-b border-[#eee]">
                  <h2 className="font-display text-2xl text-[#1a1a2e] mb-6">What's Included</h2>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
                    <ul className="space-y-3">
                      {tour.included.map(item => (
                        <li key={item} className="flex items-center gap-3 text-[15px] text-[#333]">
                          <Check size={15} className="text-emerald-500 flex-shrink-0" /> <span className="text-[16px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {tour.notIncluded.length > 0 && (
                      <ul className="space-y-3 mt-6 md:mt-0">
                        {tour.notIncluded.map(item => (
                          <li key={item} className="flex items-center gap-3 text-[15px] text-[#888]">
                            <X size={15} className="text-[#ccc] flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
                </FadeIn>
              )}

              {/* Mobile CTA */}
              <div className="lg:hidden mb-16">
                <a href={tour.bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#1a1a2e] text-white font-semibold text-base rounded-lg hover:bg-[#2a2a4e] transition">
                  {cta} — ${tour.price} <ArrowRight size={18} />
                </a>
                <p className="text-center text-xs text-[#aaa] mt-2">{cancel}</p>
              </div>

              {/* Itinerary */}
              {tour.itinerary.length > 0 && (
                <FadeIn>
                <section className="mb-16">
                  <h2 className="font-display text-2xl text-[#1a1a2e] mb-6">Itinerary</h2>
                  {tour.itinerary.length > 1 && (
                    <div className="flex gap-2 mb-8">
                      {tour.itinerary.map(d => (
                        <button key={d.day} onClick={() => setActiveDay(d.day)}
                          className={`px-5 py-2 rounded-full text-sm font-semibold transition ${activeDay === d.day ? "bg-[#1a1a2e] text-white" : "text-[#999] hover:text-[#1a1a2e]"}`}>
                          Day {d.day}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="space-y-0">
                    {schedule.map((item, i) => (
                      <div key={i} className="flex gap-6 py-6 border-t border-[#f0f0f0] first:border-t-0">
                        <div className="flex-shrink-0 w-20 text-xs font-semibold text-[#d4af37] uppercase tracking-wider pt-0.5">{item.time}</div>
                        <div>
                          <h4 className="text-[17px] font-semibold text-[#1a1a2e] mb-1">{item.title}</h4>
                          <p className="text-[15px] text-[#777] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                </FadeIn>
              )}

              {/* Who & What */}
              {(tour.whoFor || tour.whatDifferent) && (
                <FadeIn>
                <section className="mb-16 pb-16 border-b border-[#eee]">
                  {tour.whoFor && (
                    <div className="mb-10">
                      <h2 className="font-display text-2xl text-[#1a1a2e] mb-4">Who Is This For</h2>
                      <p className="text-[17px] text-[#555] leading-relaxed max-w-xl">{tour.whoFor}</p>
                    </div>
                  )}
                  {tour.whatDifferent && (
                    <div>
                      <h2 className="font-display text-2xl text-[#1a1a2e] mb-4">What Makes It Different</h2>
                      <p className="text-[17px] text-[#555] leading-relaxed max-w-xl mb-4">{tour.whatDifferent}</p>
                      {tour.diffPoints && (
                        <ul className="space-y-2">
                          {tour.diffPoints.map(p => (
                            <li key={p} className="flex items-center gap-3 text-[15px] text-[#333]">
                              <Minus size={12} className="text-[#d4af37] flex-shrink-0" /> {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </section>
                </FadeIn>
              )}

              {/* Meeting Point */}
              {tour.meetingPoint && (
                <FadeIn>
                <section className="mb-16">
                  <h2 className="font-display text-2xl text-[#1a1a2e] mb-4">Meeting Point</h2>
                  <p className="text-[17px] text-[#555] leading-relaxed max-w-xl">{tour.meetingPoint}</p>
                </section>
                </FadeIn>
              )}

              {/* Guide */}
              {tour.guide && (
                <FadeIn>
                <section className="mb-16 pb-16 border-b border-[#eee]">
                  <h2 className="font-display text-2xl text-[#1a1a2e] mb-6">Your Guide</h2>
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {tour.guide.initial || tour.guide.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1a1a2e]">{tour.guide.name}</h3>
                      {tour.guide.note && <p className="text-[13px] text-[#d4af37] font-medium mt-0.5">{tour.guide.note}</p>}
                      <p className="text-[15px] text-[#666] leading-relaxed mt-2">{tour.guide.bio}</p>
                    </div>
                  </div>
                </section>
                </FadeIn>
              )}

              {/* FAQs */}
              {tour.faqs.length > 0 && (
                <FadeIn>
                <section className="mb-12">
                  <h2 className="font-display text-2xl text-[#1a1a2e] mb-6">Questions & Answers</h2>
                  <div>
                    {tour.faqs.map((faq, i) => (
                      <details key={i} className="group border-t border-[#f0f0f0] first:border-t-0">
                        <summary className="cursor-pointer py-5 text-[17px] font-medium text-[#1a1a2e] list-none flex items-center justify-between gap-4">
                          {faq.q}
                          <ChevronDown size={16} className="text-[#ccc] flex-shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="pb-5 text-[16px] text-[#777] leading-[1.7] -mt-1">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
                </FadeIn>
              )}
            </div>

            {/* RIGHT — BOOKING CARD */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                  {/* Price */}
                  <div className="p-8 text-center border-b border-[#eee]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#999] mb-1">From</p>
                    <p className="text-4xl font-bold text-[#1a1a2e] tracking-tight">
                      ${tour.price}<span className="text-base font-normal text-[#aaa] ml-1">/person</span>
                    </p>
                  </div>

                  {/* Facts */}
                  <div className="p-6 space-y-3 border-b border-[#eee]">
                    {tour.sidebarFacts?.map(f => (
                      <div key={f.label} className="flex items-center justify-between text-sm">
                        <span className="text-[#888]">{f.label}</span>
                        <span className="font-medium text-[#1a1a2e]">{f.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Inclusions */}
                  {tour.sidebarInclusions && (
                    <div className="p-6 border-b border-[#eee]">
                      <div className="space-y-2.5">
                        {tour.sidebarInclusions.map(item => (
                          <div key={item} className="flex items-center gap-2.5 text-sm text-[#555]">
                            <Check size={14} className="text-emerald-500 flex-shrink-0" /> {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="p-6">
                    <a href={tour.bookingUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-[#d4af37] text-[#1a1a2e] font-bold text-[15px] hover:bg-[#c9a230] active:scale-[0.98] transition-all">
                      {cta} <ArrowRight size={16} />
                    </a>
                    <p className="text-center text-[11px] text-[#aaa] mt-3">{cancel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RELATED ─── */}
        {tour.relatedLinks && tour.relatedLinks.length > 0 && (
          <section className="border-t border-[#eee] py-12">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
              <h2 className="font-display text-2xl text-[#1a1a2e] mb-5">You Might Also Like</h2>
              {tour.relatedLinks.map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" 
                  className="block py-4 text-[16px] font-medium text-[#1a1a2e] hover:text-[#d4af37] transition border-b border-[#f0f0f0] last:border-b-0">
                  {link.label} →
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-[#eee] py-8 text-center">
          <p className="text-[13px] text-[#bbb] tracking-wide">
            © {new Date().getFullYear()} SimSem — Authentic Middle Eastern Travel
          </p>
        </footer>

        {/* ─── MOBILE STICKY BAR ─── */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-[#e5e5e5] px-5 py-3">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <p className="text-[10px] text-[#999] uppercase tracking-widest font-semibold">From</p>
              <p className="text-xl font-bold text-[#1a1a2e]">${tour.price} <span className="text-sm font-normal text-[#999]">/person</span></p>
            </div>
            <a href={tour.bookingUrl} target="_blank" rel="noopener noreferrer"
              className="px-7 py-3 rounded-lg bg-[#d4af37] text-[#1a1a2e] font-bold text-sm hover:bg-[#c9a230] active:scale-95 transition">
              {cta} →
            </a>
          </div>
        </div>

        <div className="h-16 lg:h-0" />
      </div>
    </>
  );
}
