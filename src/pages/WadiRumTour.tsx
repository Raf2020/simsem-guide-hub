import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Users, Globe2, ArrowRight, Star, ChevronLeft, Camera, User, MessageCircle, CheckCircle, XCircle, Compass, Mountain, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const galleryImages = Array.from({ length: 10 }, (_, i) => ({
  src: `https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_${i + 1}.jpg`,
  alt: `Wadi Rum desert safari adventure photo ${i + 1}`,
}));

const tourDetails = [
  { icon: <User size={20} />, label: "Host", value: "Local Guide" },
  { icon: <Clock size={20} />, label: "Duration", value: "2 Days" },
  { icon: <MapPin size={20} />, label: "Pickup", value: "Visitor Center" },
  { icon: <Globe2 size={20} />, label: "Language", value: "EN · AR" },
  { icon: <Users size={20} />, label: "Group", value: "2–8 people" },
  { icon: <Compass size={20} />, label: "Transport", value: "4x4 Jeep" },
];

const highlights = [
  "Explore red-rock formations and narrow canyons by 4x4",
  "Discover ancient Nabataean inscriptions and petroglyphs",
  "Witness a desert sunset from a high vantage point",
  "Enjoy an authentic zarb dinner cooked underground",
  "Spend a night in a traditional Bedouin goat-hair tent",
  "Stargazing away from all light pollution",
  "Share shai tea with your Bedouin hosts",
];

const included = [
  "Local Bedouin guide",
  "4x4 Jeep transport",
  "All meals (lunch, dinner, breakfast)",
  "Overnight stay in a Bedouin camp",
  "Bottled water",
  "Stargazing experience",
];

const notIncluded = [
  "Wadi Rum entrance fee (5 JOD/person)",
  "Personal expenses",
  "Tips for guide",
];

const day1Schedule = [
  { time: "9:00 AM", title: "Meet at Visitor Center", desc: "Your Bedouin guide greets you and prepares for departure into the protected area." },
  { time: "9:30 AM", title: "Jeep Tour — North Wadi Rum", desc: "Explore Lawrence's Spring, the Red Sand Dune, and Khazali Canyon with its ancient inscriptions." },
  { time: "1:00 PM", title: "Lunch in the Desert", desc: "Freshly prepared Bedouin lunch at a scenic spot under a rock formation." },
  { time: "2:30 PM", title: "Jeep Tour — South Wadi Rum", desc: "Mushroom Rock, Burdah Rock Bridge, Um Frouth. End with a spectacular sunset." },
  { time: "6:30 PM", title: "Arrive at Camp", desc: "Settle into your goat-hair tent. Relax with shai tea." },
  { time: "8:00 PM", title: "Zarb Dinner & Campfire", desc: "Traditional underground BBQ dinner, stories and tea around the fire." },
  { time: "9:30 PM", title: "Stargazing", desc: "The desert sky offers an incredible display with zero light pollution." },
];

const day2Schedule = [
  { time: "7:00 AM", title: "Sunrise & Breakfast", desc: "Wake to the desert sunrise. Traditional Bedouin breakfast at camp." },
  { time: "8:30 AM", title: "Return to Visitor Center", desc: "Your guide drives you back, concluding the adventure." },
];

const faqs = [
  { q: "Do I need previous desert experience?", a: "No. This tour is designed for anyone with a sense of adventure. Your guide ensures your comfort and safety." },
  { q: "What should I pack?", a: "Light clothes for day, warm layers for night, walking shoes, hat, sunglasses, sunscreen, and a camera." },
  { q: "How much does it cost?", a: "From $147 per person — includes guide, transport, all meals, and overnight. Entrance fee paid separately." },
  { q: "Are there restrooms at camp?", a: "Yes. Basic, clean shared facilities are provided." },
];

const BOOKING_URL = "https://mysimsem.com/experiences/unforgettable-full-day-adventure-in-wadi-rum/";

export default function WadiRumTour() {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "2 Days Wadi Rum Overnight 4x4 Jeep Tour",
    description: "Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.",
    touristType: ["Adventure", "Cultural", "Nature"],
    offers: { "@type": "Offer", price: "147.00", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: "SimSem", url: "https://mysimsem.com" },
  };

  const schedule = activeDay === 1 ? day1Schedule : day2Schedule;

  return (
    <>
      <Helmet>
        <title>Wadi Rum Overnight Safari: 2-Day 4x4 Jeep Tour from $147</title>
        <meta name="description" content="Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan. Local Bedouin guide, overnight camp, stargazing & desert adventure from $147." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* ===== TOP NAV BAR ===== */}
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link to="/experiences" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Back to Experiences</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-foreground">From $147</span>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-bold hover:bg-accent/90 active:scale-95 transition-all"
              >
                Book Now
              </a>
            </div>
          </div>
        </nav>

        {/* ===== GALLERY ===== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3 rounded-2xl overflow-hidden">
            {/* Main image */}
            <div className="relative h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden rounded-2xl lg:rounded-r-none">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full object-cover transition-all duration-500"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-foreground/60 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                <Camera size={12} />
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnails grid — desktop */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {galleryImages.slice(1, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i + 1)}
                  className={`relative h-full overflow-hidden rounded-xl border-2 transition-all ${selectedImage === i + 1 ? "border-accent" : "border-transparent hover:border-accent/50"}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                  {i === 3 && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">+{galleryImages.length - 5} more</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnails strip — mobile */}
          <div className="flex lg:hidden gap-2 mt-3 overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: "touch" }}>
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i ? "border-accent" : "border-transparent"}`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        {/* ===== CONTENT + SIDEBAR ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

            {/* ===== LEFT COLUMN ===== */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider">Jordan</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">2-Day Safari</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4 tracking-tight">
                  2 Days Wadi Rum Overnight 4x4 Jeep Tour
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-accent" /> Wadi Rum Visitor Center</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 2 Days</span>
                  <span className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-accent text-accent" />)}
                  </span>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Head into Wadi Rum by 4x4 Jeep, leaving the modern world behind. Your Bedouin guide leads you through towering sandstone mountains, vast plains, traditional meals, and a night under the stars — starting from just $147.
                </p>
              </div>

              {/* Quick details strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
                {tourDetails.map(d => (
                  <div key={d.label} className="flex flex-col items-center text-center p-3 rounded-xl bg-card border border-border">
                    <div className="text-accent mb-1.5">{d.icon}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{d.label}</div>
                    <div className="text-xs font-bold text-foreground mt-0.5">{d.value}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Mountain size={22} className="text-accent" /> What to Expect
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                      <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center">
                        <CheckCircle size={14} className="text-accent" />
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Included / Not Included */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Shield size={22} className="text-accent" /> What's Included
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-success/30 bg-success/5 p-6">
                    <h3 className="text-sm font-bold text-success uppercase tracking-wider mb-4">✓ Included</h3>
                    <ul className="space-y-3">
                      {included.map(item => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                          <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                    <h3 className="text-sm font-bold text-destructive uppercase tracking-wider mb-4">✗ Not Included</h3>
                    <ul className="space-y-3">
                      {notIncluded.map(item => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <XCircle size={16} className="text-destructive/60 flex-shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { icon: "🏜", text: "Desert terrain" },
                    { icon: "💪", text: "Easy fitness" },
                    { icon: "🔒", text: "Private available" },
                  ].map(chip => (
                    <span key={chip.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card rounded-full text-xs text-muted-foreground border border-border font-medium">
                      {chip.icon} {chip.text}
                    </span>
                  ))}
                </div>
              </section>

              {/* Itinerary with day tabs */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Compass size={22} className="text-accent" /> Detailed Itinerary
                </h2>
                <div className="flex gap-2 mb-5">
                  {[1, 2].map(day => (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                        activeDay === day
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Day {day}
                    </button>
                  ))}
                </div>
                <div className="relative pl-6 border-l-2 border-accent/30">
                  {schedule.map((item, i) => (
                    <div key={i} className="relative mb-6 last:mb-0">
                      {/* Timeline dot */}
                      <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                      <div className="bg-card rounded-xl border border-border p-5">
                        <span className="text-xs font-bold text-accent uppercase tracking-wider">{item.time}</span>
                        <h4 className="text-base font-bold text-foreground mt-1 mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Who Is This For + What Makes It Different */}
              <section className="mb-12 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-7">
                  <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Heart size={18} className="text-accent" /> Who Is This Experience For?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Perfect for couples seeking a unique getaway, solo travelers looking for cultural exchange, or small groups wanting to explore the desert with a local expert. No hiking experience needed — most exploration is by 4x4.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-7">
                  <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Star size={18} className="text-accent" /> What Makes This Tour Different?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    An invitation to experience Wadi Rum through the eyes of a local Bedouin — culture, food, stories and stars.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Ancestral knowledge of Wadi Rum",
                      "Authentic zarb dinner cooked underground",
                      "Overnight in a goat-hair tent",
                      "Deep cultural exchange",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <Star size={10} className="text-accent fill-accent flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Meeting Point */}
              <section className="mb-12">
                <div className="rounded-2xl border border-border bg-card p-7">
                  <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-accent" /> Where Does the Tour Start?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Wadi Rum Visitor Center — the main entry point to the protected area. Reachable by taxi from Aqaba or Petra. Your guide meets you at the entrance.
                  </p>
                </div>
              </section>

              {/* Guide */}
              <section className="mb-12">
                <div className="flex items-start gap-5 p-7 rounded-2xl border border-border bg-card">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                    B
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Your Bedouin Guide</h3>
                    <p className="text-xs text-accent font-medium mb-2">Name shared after booking</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Born and raised in Wadi Rum with generations of knowledge about the desert's history, geology, and hidden pathways.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <MessageCircle size={22} className="text-accent" /> FAQs
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group rounded-xl border border-border bg-card overflow-hidden">
                      <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-foreground list-none flex items-center justify-between hover:bg-muted/50 transition-colors">
                        {faq.q}
                        <ChevronLeft size={16} className="text-muted-foreground -rotate-90 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-5 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* SEO Meta Preview */}
              <section className="mb-12">
                <details className="rounded-xl border border-dashed border-border bg-card/50 overflow-hidden">
                  <summary className="cursor-pointer px-5 py-4 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                    📋 SEO Meta — Copy to Yoast / RankMath
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-xs text-muted-foreground mb-1"><strong>Meta Title</strong> <span className="text-success">(56 chars)</span></p>
                    <p className="text-sm font-semibold text-foreground mb-4 p-3 bg-background border border-border rounded-lg">
                      Wadi Rum Overnight Safari: 2-Day 4x4 Jeep Tour from $147
                    </p>
                    <p className="text-xs text-muted-foreground mb-1"><strong>Meta Description</strong> <span className="text-success">(157 chars)</span></p>
                    <p className="text-sm text-foreground leading-relaxed p-3 bg-background border border-border rounded-lg">
                      Wadi Rum overnight safari: Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.00. Experience stargazing & desert adventure!
                    </p>
                  </div>
                </details>
              </section>
            </div>

            {/* ===== RIGHT COLUMN — BOOKING CARD (STICKY) ===== */}
            <div className="hidden lg:block">
              <div className="sticky top-20">
                <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                  {/* Price header */}
                  <div className="bg-primary p-6 text-center">
                    <p className="text-primary-foreground/60 text-xs font-bold uppercase tracking-wider mb-1">Starting from</p>
                    <p className="text-4xl font-extrabold text-primary-foreground">$147<span className="text-lg font-medium text-primary-foreground/60">/person</span></p>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Quick facts */}
                    <div className="space-y-3">
                      {[
                        { icon: <Clock size={16} />, label: "Duration", value: "2 Days, 1 Night" },
                        { icon: <Users size={16} />, label: "Group Size", value: "Private (2–8)" },
                        { icon: <MapPin size={16} />, label: "Start", value: "Visitor Center" },
                        { icon: <Globe2 size={16} />, label: "Languages", value: "English, Arabic" },
                      ].map(fact => (
                        <div key={fact.label} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-accent">{fact.icon}</span> {fact.label}
                          </span>
                          <span className="font-semibold text-foreground">{fact.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border" />

                    {/* Key inclusions */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Key inclusions</p>
                      <div className="space-y-2">
                        {["Guide & 4x4 transport", "All meals included", "Desert camp overnight", "Stargazing experience"].map(item => (
                          <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle size={14} className="text-success flex-shrink-0" /> {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold text-base hover:bg-accent/90 active:scale-[0.98] transition-all shadow-lg"
                    >
                      Reserve Now
                      <ArrowRight size={18} />
                    </a>

                    <p className="text-center text-xs text-muted-foreground">
                      Free cancellation · Instant confirmation
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Shield size={12} className="text-success" /> Verified</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-accent fill-accent" /> Top Rated</span>
                  <span className="flex items-center gap-1"><Heart size={12} className="text-destructive" /> 98% Love It</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MOBILE STICKY BOTTOM BAR ===== */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-3">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="text-xl font-extrabold text-foreground">$147 <span className="text-sm font-normal text-muted-foreground">/person</span></p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-bold text-sm hover:bg-accent/90 active:scale-95 transition-all shadow-lg"
            >
              Reserve Now
            </a>
          </div>
        </div>

        {/* ===== RELATED + FOOTER ===== */}
        <section className="py-12 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-foreground mb-5">You Might Also Like</h2>
            <div className="flex flex-col gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl border border-border bg-background text-foreground text-sm font-semibold hover:border-accent hover:shadow-lg transition-all">
                Book Wadi Rum in Jordan – Visitor Center to Village Tour →
              </a>
              <a href="/blog/The Best Guide to Jordan's North-South Railway Revolution" className="block p-4 rounded-xl border border-border bg-background text-foreground text-sm font-semibold hover:border-accent hover:shadow-lg transition-all">
                The Best Guide to Jordan's North-South Railway Revolution →
              </a>
            </div>
          </div>
        </section>

        <footer className="py-6 bg-card border-t border-border text-center mb-16 lg:mb-0">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Simsem — Authentic Middle Eastern Travel Experiences
          </p>
        </footer>
      </div>
    </>
  );
}
