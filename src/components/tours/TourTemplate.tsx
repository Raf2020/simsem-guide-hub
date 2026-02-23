import { useState, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Users, Globe2, ArrowRight, Star, ChevronLeft, Camera, CheckCircle, XCircle, Compass, Mountain, Heart, Shield, ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

/* ============ TYPES ============ */

export interface TourImage {
  src: string;
  alt: string;
}

export interface TourDetail {
  icon: ReactNode;
  label: string;
  value: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
}

export interface DaySchedule {
  day: number;
  items: ScheduleItem[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface TourChip {
  icon: string;
  text: string;
}

export interface GuideInfo {
  name: string;
  note?: string;
  bio: string;
  initial?: string;
}

export interface SidebarFact {
  icon: ReactNode;
  label: string;
  value: string;
}

export interface TourData {
  /* Hero */
  title: string;
  country: string;
  badge?: string;
  location: string;
  duration: string;
  gallery: TourImage[];

  /* Content */
  description: string | ReactNode;
  price: string;
  bookingUrl: string;
  ctaText?: string;
  cancelNote?: string;
  details: TourDetail[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  chips?: TourChip[];
  itinerary: DaySchedule[];
  whoFor?: string;
  whatDifferent?: string;
  diffPoints?: string[];
  meetingPoint?: string;
  guide?: GuideInfo;
  faqs: FAQ[];

  /* Sidebar */
  sidebarFacts?: SidebarFact[];
  sidebarInclusions?: string[];

  /* SEO */
  metaTitle: string;
  metaDescription: string;

  /* Related */
  relatedLinks?: { label: string; href: string }[];
}

/* ============ COMPONENT ============ */

export default function TourTemplate({ tour }: { tour: TourData }) {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const currentSchedule = tour.itinerary.find(d => d.day === activeDay)?.items ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.metaDescription,
    touristType: ["Adventure", "Cultural", "Nature"],
    offers: { "@type": "Offer", price: tour.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: "SimSem", url: "https://mysimsem.com" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", ratingCount: "127" },
  };

  const ctaText = tour.ctaText || "Reserve Now";
  const cancelNote = tour.cancelNote || "Free cancellation · Instant confirmation";

  return (
    <>
      <Helmet>
        <title>{tour.metaTitle}</title>
        <meta name="description" content={tour.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#faf9f7] font-sans">

        {/* ===== HERO ===== */}
        <section className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
          <img
            src={tour.gallery[selectedImage]?.src}
            alt={tour.gallery[selectedImage]?.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/30 to-transparent" />

          <nav className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 pt-5">
            <Link
              to="/experiences"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-white/10 rounded-full px-4 py-2"
            >
              <ChevronLeft size={16} />
              All Experiences
            </Link>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pb-6 sm:pb-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#1a1a2e] text-xs font-bold uppercase tracking-wider">{tour.country}</span>
                {tour.badge && (
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">{tour.badge}</span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-3 tracking-tight max-w-3xl">
                {tour.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80 text-sm sm:text-base flex-wrap">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-[#d4af37]" /> {tour.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> {tour.duration}</span>
                <span className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-[#d4af37] text-[#d4af37]" />)}
                  <span className="ml-1 text-white/60">(98%)</span>
                </span>
              </div>
            </div>
          </div>

          <button className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-full">
            <Camera size={14} />
            {selectedImage + 1}/{tour.gallery.length}
          </button>
        </section>

        {/* ===== THUMBNAIL STRIP ===== */}
        <div className="bg-[#1a1a2e]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="flex gap-2 py-3 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              {tour.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-[#d4af37] opacity-100" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== MOBILE PRICE + CTA BANNER ===== */}
        <div className="lg:hidden bg-white border-b border-[#e5e5e5] px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#999] uppercase tracking-wider font-semibold">Starting from</p>
              <p className="text-3xl font-extrabold text-[#1a1a2e]">${tour.price}<span className="text-base font-normal text-[#999] ml-1">/person</span></p>
            </div>
            <a
              href={tour.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-[#d4af37] text-[#1a1a2e] font-bold text-base hover:bg-[#c9a230] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20"
            >
              Book Now
            </a>
          </div>
          <p className="text-center text-xs text-[#999] mt-2">✓ {cancelNote}</p>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">

            {/* LEFT COLUMN */}
            <div>
              {/* Description */}
              <div className="text-lg sm:text-xl text-[#444] leading-relaxed mb-10 max-w-2xl">
                {tour.description}
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
                {tour.details.map(d => (
                  <div key={d.label} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#eee] hover:border-[#d4af37]/40 hover:shadow-md transition-all">
                    <div className="text-[#d4af37] mb-2">{d.icon}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#999]">{d.label}</div>
                    <div className="text-sm font-bold text-[#1a1a2e] mt-0.5">{d.value}</div>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-5 rounded-2xl bg-[#1a1a2e] text-white mb-12">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-[#d4af37]" />
                  <span className="text-sm font-semibold">Verified Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-[#d4af37] fill-[#d4af37]" />
                  <span className="text-sm font-semibold">Top Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={18} className="text-red-400" />
                  <span className="text-sm font-semibold">98% Love It</span>
                </div>
              </div>

              {/* Highlights */}
              {tour.highlights.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                      <Mountain size={22} className="text-[#d4af37]" />
                    </span>
                    What to Expect
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-white border border-[#eee] hover:border-[#d4af37]/30 transition-all">
                        <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                          <CheckCircle size={16} className="text-[#d4af37]" />
                        </span>
                        <span className="text-[15px] text-[#333] leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Included / Not Included */}
              {(tour.included.length > 0 || tour.notIncluded.length > 0) && (
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                      <Shield size={22} className="text-[#d4af37]" />
                    </span>
                    What's Included
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {tour.included.length > 0 && (
                      <div className="rounded-2xl border border-green-200 bg-green-50/50 p-6">
                        <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <CheckCircle size={16} /> Included
                        </h3>
                        <ul className="space-y-3">
                          {tour.included.map(item => (
                            <li key={item} className="flex items-start gap-3 text-[15px] text-[#333]">
                              <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tour.notIncluded.length > 0 && (
                      <div className="rounded-2xl border border-red-200 bg-red-50/30 p-6">
                        <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <XCircle size={16} /> Not Included
                        </h3>
                        <ul className="space-y-3">
                          {tour.notIncluded.map(item => (
                            <li key={item} className="flex items-start gap-3 text-[15px] text-[#555]">
                              <XCircle size={16} className="text-red-400 flex-shrink-0 mt-1" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {tour.chips && tour.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {tour.chips.map(chip => (
                        <span key={chip.text} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm text-[#555] border border-[#eee] font-medium">
                          {chip.icon} {chip.text}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Mid-page CTA (mobile) */}
              <div className="lg:hidden mb-12">
                <a
                  href={tour.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#d4af37] text-[#1a1a2e] font-bold text-lg hover:bg-[#c9a230] active:scale-[0.98] transition-all shadow-lg shadow-[#d4af37]/20"
                >
                  {ctaText} — ${tour.price}
                  <ArrowRight size={20} />
                </a>
                <p className="text-center text-xs text-[#999] mt-2">{cancelNote}</p>
              </div>

              {/* Itinerary */}
              {tour.itinerary.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                      <Compass size={22} className="text-[#d4af37]" />
                    </span>
                    Detailed Itinerary
                  </h2>
                  <div className="flex gap-2 mb-6">
                    {tour.itinerary.map(d => (
                      <button
                        key={d.day}
                        onClick={() => setActiveDay(d.day)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                          activeDay === d.day
                            ? "bg-[#1a1a2e] text-white shadow-lg"
                            : "bg-white border border-[#e5e5e5] text-[#777] hover:text-[#1a1a2e] hover:border-[#ccc]"
                        }`}
                      >
                        Day {d.day}
                      </button>
                    ))}
                  </div>
                  <div className="relative pl-7 border-l-[3px] border-[#d4af37]/25">
                    {currentSchedule.map((item, i) => (
                      <div key={i} className="relative mb-6 last:mb-0">
                        <div className="absolute -left-[27px] top-2 w-[18px] h-[18px] rounded-full bg-[#d4af37] border-[3px] border-[#faf9f7] shadow-[0_0_0_3px_rgba(212,175,55,0.2)]" />
                        <div className="bg-white rounded-xl border border-[#eee] p-5 sm:p-6 hover:border-[#d4af37]/30 hover:shadow-md transition-all">
                          <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest">{item.time}</span>
                          <h4 className="text-lg font-bold text-[#1a1a2e] mt-1 mb-1">{item.title}</h4>
                          <p className="text-[15px] text-[#666] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Who Is This For */}
              {tour.whoFor && (
                <section className="mb-4">
                  <div className="rounded-2xl bg-white border border-[#eee] p-7 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a2e] mb-4 flex items-center gap-3">
                      <Heart size={22} className="text-[#d4af37]" /> Who Is This Experience For?
                    </h2>
                    <p className="text-[16px] text-[#555] leading-relaxed">{tour.whoFor}</p>
                  </div>
                </section>
              )}

              {/* What Makes It Different */}
              {tour.whatDifferent && (
                <section className="mb-4">
                  <div className="rounded-2xl bg-white border border-[#eee] p-7 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a2e] mb-4 flex items-center gap-3">
                      <Star size={22} className="text-[#d4af37]" /> What Makes This Tour Different?
                    </h2>
                    <p className="text-[16px] text-[#555] leading-relaxed mb-4">{tour.whatDifferent}</p>
                    {tour.diffPoints && tour.diffPoints.length > 0 && (
                      <ul className="space-y-3">
                        {tour.diffPoints.map(item => (
                          <li key={item} className="flex items-center gap-3 text-[15px] text-[#333]">
                            <Star size={14} className="text-[#d4af37] fill-[#d4af37] flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              )}

              {/* Meeting Point */}
              {tour.meetingPoint && (
                <section className="mb-12">
                  <div className="rounded-2xl bg-white border border-[#eee] p-7 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a2e] mb-4 flex items-center gap-3">
                      <MapPin size={22} className="text-[#d4af37]" /> Where Does the Tour Start?
                    </h2>
                    <p className="text-[16px] text-[#555] leading-relaxed">{tour.meetingPoint}</p>
                  </div>
                </section>
              )}

              {/* Guide */}
              {tour.guide && (
                <section className="mb-12">
                  <div className="flex items-start gap-5 p-7 sm:p-8 rounded-2xl bg-white border border-[#eee]">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d52] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      {tour.guide.initial || tour.guide.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">{tour.guide.name}</h3>
                      {tour.guide.note && <p className="text-sm text-[#d4af37] font-semibold mb-3">{tour.guide.note}</p>}
                      <p className="text-[16px] text-[#555] leading-relaxed">{tour.guide.bio}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* FAQs */}
              {tour.faqs.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                      <MessageCircle size={22} className="text-[#d4af37]" />
                    </span>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {tour.faqs.map((faq, i) => (
                      <details key={i} className="group rounded-xl bg-white border border-[#eee] overflow-hidden hover:border-[#d4af37]/30 transition-all">
                        <summary className="cursor-pointer px-6 py-5 text-[16px] font-semibold text-[#1a1a2e] list-none flex items-center justify-between gap-4">
                          {faq.q}
                          <ChevronDown size={18} className="text-[#999] flex-shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="px-6 pb-5">
                          <p className="text-[15px] text-[#666] leading-relaxed">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom CTA (mobile) */}
              <div className="lg:hidden mb-8">
                <a
                  href={tour.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#1a1a2e] text-white font-bold text-lg hover:bg-[#2a2a4e] active:scale-[0.98] transition-all"
                >
                  Book Your Adventure
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN — BOOKING CARD */}
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#1a1a2e]/10 border border-[#e5e5e5]">
                  <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] p-8 text-center">
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Starting from</p>
                    <p className="text-5xl font-extrabold text-white tracking-tight">
                      ${tour.price}<span className="text-xl font-normal text-white/50 ml-1">/person</span>
                    </p>
                  </div>

                  <div className="bg-white p-6 space-y-5">
                    {tour.sidebarFacts && (
                      <div className="space-y-3">
                        {tour.sidebarFacts.map(fact => (
                          <div key={fact.label} className="flex items-center justify-between text-sm py-1">
                            <span className="flex items-center gap-2 text-[#777]">
                              <span className="text-[#d4af37]">{fact.icon}</span> {fact.label}
                            </span>
                            <span className="font-bold text-[#1a1a2e]">{fact.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-[#f0f0f0]" />

                    {tour.sidebarInclusions && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#999] mb-3">Key inclusions</p>
                        <div className="space-y-2.5">
                          {tour.sidebarInclusions.map(item => (
                            <div key={item} className="flex items-center gap-2 text-sm text-[#333]">
                              <CheckCircle size={15} className="text-green-500 flex-shrink-0" /> {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={tour.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#d4af37] text-[#1a1a2e] font-bold text-lg hover:bg-[#c9a230] active:scale-[0.98] transition-all shadow-lg shadow-[#d4af37]/25"
                    >
                      {ctaText}
                      <ArrowRight size={20} />
                    </a>

                    <p className="text-center text-xs text-[#999]">✓ {cancelNote}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-5 text-xs text-[#999] font-medium">
                  <span className="flex items-center gap-1.5"><Shield size={14} className="text-green-500" /> Verified</span>
                  <span className="flex items-center gap-1.5"><Star size={14} className="text-[#d4af37] fill-[#d4af37]" /> Top Rated</span>
                  <span className="flex items-center gap-1.5"><Heart size={14} className="text-red-400" /> 98% Love It</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related + Footer */}
        {tour.relatedLinks && tour.relatedLinks.length > 0 && (
          <section className="py-12 bg-white border-t border-[#eee]">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
              <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-5">You Might Also Like</h2>
              <div className="flex flex-col gap-3">
                {tour.relatedLinks.map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl border border-[#eee] bg-[#faf9f7] text-[#1a1a2e] text-base font-semibold hover:border-[#d4af37] hover:shadow-lg transition-all">
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <footer className="py-8 bg-[#1a1a2e] text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} SimSem — Authentic Middle Eastern Travel Experiences
          </p>
        </footer>

        {/* Mobile Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/97 backdrop-blur-xl border-t border-[#e5e5e5] px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <p className="text-[11px] text-[#999] uppercase tracking-wider font-semibold">From</p>
              <p className="text-2xl font-extrabold text-[#1a1a2e]">${tour.price} <span className="text-sm font-normal text-[#999]">/person</span></p>
            </div>
            <a
              href={tour.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#d4af37] text-[#1a1a2e] font-bold text-base hover:bg-[#c9a230] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/25"
            >
              {ctaText} →
            </a>
          </div>
        </div>

        <div className="h-20 lg:h-0" />
      </div>
    </>
  );
}
