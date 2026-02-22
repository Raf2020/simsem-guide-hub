import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Users, Globe2, ArrowRight, Star, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const galleryImages = Array.from({ length: 10 }, (_, i) => ({
  src: `https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_${i + 1}.jpg`,
  alt: `Wadi Rum desert safari adventure photo ${i + 1}`,
}));

const tourDetails = [
  { icon: "👤", label: "Guide", value: "Local guide" },
  { icon: "💰", label: "Price", value: "From $147.00" },
  { icon: "📍", label: "Meeting Point", value: "Wadi Rum Visitor Center" },
  { icon: "⏱", label: "Duration", value: "2 Days" },
  { icon: "🌐", label: "Language", value: "English, Arabic" },
  { icon: "🗺", label: "Location", value: "Wadi Rum, Jordan" },
  { icon: "🚐", label: "Transport", value: "4x4 Jeep" },
  { icon: "👥", label: "Group Size", value: "Private or small group (2-8)" },
];

const highlights = [
  "Explore the red-rock formations and narrow canyons of Wadi Rum by 4x4",
  "Discover ancient Nabataean inscriptions and petroglyphs",
  "Witness a desert sunset from a high vantage point",
  "Enjoy an authentic zarb dinner cooked underground",
  "Spend a night in a traditional Bedouin goat-hair tent",
  "Experience a Wadi Rum overnight tour with stargazing away from light pollution",
  "Share shai tea with your Bedouin hosts",
];

const included = [
  "Local Bedouin guide",
  "4x4 Jeep transport",
  "All meals (lunch, dinner, breakfast)",
  "Overnight stay in a traditional Bedouin camp",
  "Bottled water",
  "Stargazing experience",
];

const notIncluded = [
  "Wadi Rum entrance fee (5 JOD per person)",
  "Personal expenses",
  "Tips for guide",
];

const day1Schedule = [
  { time: "9:00 AM", title: "Meet at Wadi Rum Visitor Center", desc: "Your Bedouin guide will greet you and prepare for departure into the protected area." },
  { time: "9:30 AM - 1:00 PM", title: "4x4 Jeep Tour - North Wadi Rum", desc: "Begin your 2 day Wadi Rum jeep tour, exploring iconic sites like Lawrence's Spring, the Red Sand Dune, and Khazali Canyon with its ancient inscriptions." },
  { time: "1:00 PM", title: "Lunch in the Desert", desc: "Enjoy a freshly prepared Bedouin lunch at a scenic spot, often under the shade of a rock formation." },
  { time: "2:30 PM - 6:00 PM", title: "4x4 Jeep Tour - South Wadi Rum & Sunset", desc: "Continue exploring, visiting the Mushroom Rock, Burdah Rock Bridge, and Um Frouth Rock Bridge. Conclude with a spectacular sunset view." },
  { time: "6:30 PM", title: "Arrive at Bedouin Camp", desc: "Settle into your traditional goat-hair tent. Relax with shai tea before dinner." },
  { time: "8:00 PM", title: "Zarb Dinner & Campfire", desc: "Savor a traditional zarb (underground BBQ) dinner, followed by conversation and tea around the campfire." },
  { time: "9:30 PM onwards", title: "Stargazing", desc: "With minimal light pollution, the desert sky offers an incredible display of stars." },
];

const day2Schedule = [
  { time: "7:00 AM", title: "Sunrise & Breakfast", desc: "Wake up to the desert sunrise. Enjoy a traditional Bedouin breakfast at the camp." },
  { time: "8:30 AM", title: "Return to Visitor Center", desc: "After breakfast, your guide will drive you back to the Wadi Rum Visitor Center, concluding your desert adventure." },
];

const faqs = [
  { q: "Do I need previous desert experience?", a: "No prior desert experience is necessary. This 2 day Wadi Rum tour is designed for anyone with a sense of adventure. Your guide will ensure your comfort and safety throughout." },
  { q: "What should I pack for an overnight camp?", a: "Pack light clothing for the day, warmer layers for the cool desert nights, comfortable walking shoes, a hat, sunglasses, sunscreen, and a small backpack for personal items." },
  { q: "How much does this 2-day experience cost?", a: "The price starts from $147.00 per person. This includes your guide, 4x4 transport, all meals, and overnight accommodation. The Wadi Rum entrance fee is paid separately upon arrival." },
  { q: "Are there restrooms at the camp?", a: "Yes, our traditional Bedouin camp is equipped with basic, clean shared toilet facilities for your convenience." },
];

const BOOKING_URL = "https://mysimsem.com/experiences/unforgettable-full-day-adventure-in-wadi-rum/";

const ItineraryItem = ({ time, title, desc, isLast }: { time: string; title: string; desc: string; isLast?: boolean }) => (
  <div className={`flex gap-6 py-5 ${!isLast ? "border-b border-border" : ""}`}>
    <div className="flex-shrink-0 min-w-[110px] text-sm font-bold text-accent">{time}</div>
    <div>
      <div className="text-lg font-semibold text-foreground mb-1">{title}</div>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function WadiRumTour() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "2 Days Wadi Rum Overnight 4x4 Jeep Tour",
    description: "Wadi Rum overnight safari: Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.00.",
    touristType: ["Adventure", "Cultural", "Nature"],
    offers: { "@type": "Offer", price: "147.00", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: "SimSem", url: "https://mysimsem.com" },
  };

  return (
    <>
      <Helmet>
        <title>Wadi Rum Overnight Safari: 2-Day 4x4 Jeep Tour from $147</title>
        <meta name="description" content="Wadi Rum overnight safari: Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.00. Experience stargazing & desert adventure!" />
        <link rel="canonical" href="/experiences/wadi-rum-overnight-jeep-tour" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* ===== HERO ===== */}
        <header className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${galleryImages[0].src}')` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-12">
            <Link
              to="/experiences"
              className="inline-flex items-center gap-1.5 text-primary-foreground/70 text-sm font-medium mb-4 hover:text-accent transition-colors"
            >
              <ChevronLeft size={14} />
              Back to Experiences
            </Link>
            <p className="text-accent font-semibold tracking-widest text-sm uppercase mb-3">
              Jordan · Wadi Rum
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-4 max-w-3xl">
              2 Days Wadi Rum Overnight 4x4 Jeep Tour
            </h1>
            <div className="flex flex-wrap gap-2.5">
              {["2 Days", "4x4 Jeep", "Local Guide", "Cultural"].map(tag => (
                <span key={tag} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 backdrop-blur-sm border border-card/30 text-primary-foreground text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="max-w-6xl mx-auto px-6 py-12">

          {/* SEO Meta Preview */}
          <section className="rounded-2xl border border-border bg-card p-7 mb-12">
            <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-5">📋 SEO Meta — Copy to Yoast / RankMath</p>
            <p className="text-sm text-muted-foreground mb-1"><strong>Meta Title</strong> <span className="text-success text-xs">(56 chars)</span></p>
            <p className="text-lg font-semibold text-foreground mb-6 p-3.5 bg-background border border-border rounded-lg">
              Wadi Rum Overnight Safari: 2-Day 4x4 Jeep Tour from $147
            </p>
            <p className="text-sm text-muted-foreground mb-1"><strong>Meta Description</strong> <span className="text-success text-xs">(157 chars)</span></p>
            <p className="text-base text-foreground leading-relaxed p-3.5 bg-background border border-border rounded-lg">
              Wadi Rum overnight safari: Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.00. Experience stargazing & desert adventure!
            </p>
          </section>

          {/* Intro */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl">
            Head into Wadi Rum by 4x4 Jeep, leaving the modern world behind for a 2-day adventure. Your Bedouin guide will lead you through the desert's iconic landscapes, from towering sandstone mountains to vast, open plains. This Wadi Rum overnight safari includes traditional meals and a night under the stars, starting from just $147.00.
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {tourDetails.map(d => (
              <div key={d.label} className="p-5 rounded-2xl border border-border bg-card text-center hover:border-accent hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-2">{d.icon}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{d.label}</div>
                <div className="text-sm font-bold text-foreground">{d.value}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <section className="mb-16">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">What to expect</p>
            <h2 className="text-3xl font-bold text-foreground mb-7">Expedition Highlights</h2>
            <ul className="space-y-0">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-4 py-4">
                  <span className="flex-shrink-0 mt-2 w-2.5 h-2.5 bg-accent rounded-full" />
                  <span className="text-base text-foreground leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What's Included */}
          <section className="mb-16">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Details</p>
            <h2 className="text-3xl font-bold text-foreground mb-7">What's Included</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: "📏", label: "Distance:", value: "Confirmed after booking" },
                { icon: "🏜", label: "Terrain:", value: "Desert, sand dunes, rocky canyons" },
                { icon: "💪", label: "Fitness:", value: "Easy" },
                { icon: "🔒", label: "Private:", value: "Available" },
              ].map(chip => (
                <span key={chip.label} className="inline-flex items-center gap-2 px-4 py-2.5 bg-card rounded-full text-sm text-foreground border border-border">
                  {chip.icon} <strong>{chip.label}</strong> {chip.value}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Included</h3>
                <ul className="space-y-0">
                  {included.map(item => (
                    <li key={item} className="flex items-center gap-3 py-3 text-sm text-foreground border-b border-border last:border-0">
                      <span className="text-success font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Not Included</h3>
                <ul className="space-y-0">
                  {notIncluded.map(item => (
                    <li key={item} className="flex items-center gap-3 py-3 text-sm text-muted-foreground border-b border-border last:border-0">
                      <span className="text-muted-foreground">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Who Is This For + What Makes It Different */}
          <section className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Who Is This Experience For?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you're comfortable with basic camping amenities and eager to disconnect from city life, this experience is for you. It's perfect for couples seeking a unique getaway, solo travelers looking for cultural exchange, or small groups wanting to explore the desert with a local expert.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">What Makes This Tour Different?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                This isn't just a sightseeing trip; it's an invitation to experience Wadi Rum through the eyes of a local. Your guide comes from a long line of desert dwellers.
              </p>
              <ul className="space-y-1.5">
                {[
                  "Guided by a Bedouin with ancestral knowledge",
                  "Authentic zarb dinner cooked underground",
                  "Overnight stay in a traditional goat-hair tent",
                  "Focus on cultural exchange",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <Star size={10} className="text-accent fill-accent flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Meeting Point */}
          <section className="mb-16">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <MapPin size={18} className="text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Where Does the Tour Start?</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The tour begins at the Wadi Rum Visitor Center — the main entry point to the protected area. You can reach it by taxi from Aqaba or Petra, or by private car. Your guide will meet you directly at the entrance.
              </p>
            </div>
          </section>

          {/* Itinerary */}
          <section className="mb-16">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Day by day</p>
            <h2 className="text-3xl font-bold text-foreground mb-7">Itinerary</h2>

            <div className="rounded-2xl border border-border bg-card p-8 mb-4">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-4">
                <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full inline-flex items-center justify-center text-sm font-extrabold">1</span>
                Day 1: Desert Exploration & Camp Life
              </h3>
              {day1Schedule.map((item, i) => (
                <ItineraryItem key={i} {...item} isLast={i === day1Schedule.length - 1} />
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-4">
                <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full inline-flex items-center justify-center text-sm font-extrabold">2</span>
                Day 2: Morning Views & Departure
              </h3>
              {day2Schedule.map((item, i) => (
                <ItineraryItem key={i} {...item} isLast={i === day2Schedule.length - 1} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mb-16">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold text-base hover:bg-accent/90 active:scale-95 transition-all duration-200 shadow-lg"
            >
              Reserve your Wadi Rum 4x4 Jeep tour
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Photos */}
          <section className="mb-16">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Gallery</p>
            <h2 className="text-3xl font-bold text-foreground mb-7">Photos</h2>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ WebkitOverflowScrolling: "touch" }}>
              {galleryImages.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-72 rounded-2xl overflow-hidden border border-border">
                  <img src={img.src} alt={img.alt} className="w-full h-52 object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* Guide */}
          <section className="mb-16">
            <div className="flex items-start gap-6 p-8 rounded-2xl border border-border bg-card">
              <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">B</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Your Guide: Bedouin guide (name shared after booking)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your guide is a local Bedouin, born and raised in Wadi Rum. They possess generations of knowledge about the desert's history, geology, and hidden pathways, ensuring an authentic and insightful experience.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Common questions</p>
            <h2 className="text-3xl font-bold text-foreground mb-7">Frequently Asked Questions</h2>
            {faqs.map((faq, i) => (
              <div key={i} className="py-6 border-b border-border">
                <h3 className="text-base font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </section>
        </main>

        {/* ===== BOTTOM CTA ===== */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-3">Starting from</p>
            <p className="text-5xl font-extrabold mb-6">$147.00</p>
            <p className="text-primary-foreground/75 text-lg mb-8">
              Includes local guide, 4x4 transport, all meals & overnight camp
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-accent text-accent-foreground font-bold text-lg hover:bg-accent/90 active:scale-95 transition-all duration-200 shadow-lg"
            >
              Book your 2 Days Wadi Rum tour
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-card border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">You Might Also Like</h2>
            <div className="flex flex-col gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl border border-border bg-background text-foreground font-semibold hover:border-accent hover:shadow-lg transition-all duration-300">
                Book Wadi Rum in Jordan – Visitor Center to Village Tour →
              </a>
              <a href="/blog/The Best Guide to Jordan's North-South Railway Revolution" className="block p-5 rounded-xl border border-border bg-background text-foreground font-semibold hover:border-accent hover:shadow-lg transition-all duration-300">
                The Best Guide to Jordan's North-South Railway Revolution →
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 bg-card border-t border-border text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Simsem — Authentic Middle Eastern Travel Experiences
          </p>
        </footer>
      </div>
    </>
  );
}
