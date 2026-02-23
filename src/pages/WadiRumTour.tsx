import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Users, Globe2, ArrowRight, Star, ChevronLeft, Camera, User, MessageCircle, CheckCircle, XCircle, Compass, Mountain, Heart, Shield, ChevronDown, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const galleryImages = Array.from({ length: 10 }, (_, i) => ({
  src: `https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_${i + 1}.jpg`,
  alt: `Wadi Rum desert safari adventure photo ${i + 1}`,
}));

const tourDetails = [
  { icon: <User size={22} />, label: "Host", value: "Local Guide" },
  { icon: <Clock size={22} />, label: "Duration", value: "2 Days" },
  { icon: <MapPin size={22} />, label: "Pickup", value: "Visitor Center" },
  { icon: <Globe2 size={22} />, label: "Language", value: "EN · AR" },
  { icon: <Users size={22} />, label: "Group", value: "2–8 people" },
  { icon: <Truck size={22} />, label: "Transport", value: "4x4 Jeep" },
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

      <div className="min-h-screen bg-[#faf9f7] font-sans">

        {/* ===== HERO SECTION — Full width image with overlay ===== */}
        <section className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/30 to-transparent" />

          {/* Back button */}
          <nav className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 pt-5">
            <Link
              to="/experiences"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-white/10 rounded-full px-4 py-2"
            >
              <ChevronLeft size={16} />
              All Experiences
            </Link>
          </nav>

          {/* Hero content overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pb-6 sm:pb-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#1a1a2e] text-xs font-bold uppercase tracking-wider">Jordan</span>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">2-Day Safari</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-3 tracking-tight max-w-3xl">
                2 Days Wadi Rum Overnight 4×4 Jeep Tour
              </h1>
              <div className="flex items-center gap-4 text-white/80 text-sm sm:text-base flex-wrap">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-[#d4af37]" /> Wadi Rum</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> 2 Days</span>
                <span className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-[#d4af37] text-[#d4af37]" />)}
                  <span className="ml-1 text-white/60">(98%)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Photo counter */}
          <button className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-full">
            <Camera size={14} />
            {selectedImage + 1}/{galleryImages.length}
          </button>
        </section>

        {/* ===== THUMBNAIL STRIP ===== */}
        <div className="bg-[#1a1a2e]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="flex gap-2 py-3 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              {galleryImages.map((img, i) => (
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

        {/* ===== MOBILE PRICE + CTA BANNER (visible on mobile only, above content) ===== */}
        <div className="lg:hidden bg-white border-b border-[#e5e5e5] px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#999] uppercase tracking-wider font-semibold">Starting from</p>
              <p className="text-3xl font-extrabold text-[#1a1a2e]">$147<span className="text-base font-normal text-[#999] ml-1">/person</span></p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-[#d4af37] text-[#1a1a2e] font-bold text-base hover:bg-[#c9a230] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20"
            >
              Book Now
            </a>
          </div>
          <p className="text-center text-xs text-[#999] mt-2">✓ Free cancellation · Instant confirmation</p>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">

            {/* ===== LEFT COLUMN ===== */}
            <div>

              {/* Description */}
              <p className="text-lg sm:text-xl text-[#444] leading-relaxed mb-10 max-w-2xl">
                Head into Wadi Rum by 4×4 Jeep, leaving the modern world behind. Your Bedouin guide leads you through towering sandstone mountains, vast plains, traditional meals, and a night under the stars — starting from just <strong className="text-[#1a1a2e]">$147</strong>.
              </p>

              {/* Quick details strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
                {tourDetails.map(d => (
                  <div key={d.label} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#eee] hover:border-[#d4af37]/40 hover:shadow-md transition-all">
                    <div className="text-[#d4af37] mb-2">{d.icon}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#999]">{d.label}</div>
                    <div className="text-sm font-bold text-[#1a1a2e] mt-0.5">{d.value}</div>
                  </div>
                ))}
              </div>

              {/* Social Proof Banner */}
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
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                    <Mountain size={22} className="text-[#d4af37]" />
                  </span>
                  What to Expect
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-white border border-[#eee] hover:border-[#d4af37]/30 transition-all">
                      <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                        <CheckCircle size={16} className="text-[#d4af37]" />
                      </span>
                      <span className="text-[15px] text-[#333] leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Included / Not Included */}
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                    <Shield size={22} className="text-[#d4af37]" />
                  </span>
                  What's Included
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-green-200 bg-green-50/50 p-6">
                    <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle size={16} /> Included
                    </h3>
                    <ul className="space-y-3">
                      {included.map(item => (
                        <li key={item} className="flex items-start gap-3 text-[15px] text-[#333]">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-red-200 bg-red-50/30 p-6">
                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <XCircle size={16} /> Not Included
                    </h3>
                    <ul className="space-y-3">
                      {notIncluded.map(item => (
                        <li key={item} className="flex items-start gap-3 text-[15px] text-[#555]">
                          <XCircle size={16} className="text-red-400 flex-shrink-0 mt-1" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {[
                    { icon: "🏜", text: "Desert terrain" },
                    { icon: "💪", text: "Easy fitness" },
                    { icon: "🔒", text: "Private available" },
                  ].map(chip => (
                    <span key={chip.text} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm text-[#555] border border-[#eee] font-medium">
                      {chip.icon} {chip.text}
                    </span>
                  ))}
                </div>
              </section>

              {/* Mid-page CTA for mobile */}
              <div className="lg:hidden mb-12">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#d4af37] text-[#1a1a2e] font-bold text-lg hover:bg-[#c9a230] active:scale-[0.98] transition-all shadow-lg shadow-[#d4af37]/20"
                >
                  Reserve Your Spot — $147
                  <ArrowRight size={20} />
                </a>
                <p className="text-center text-xs text-[#999] mt-2">Free cancellation · Instant confirmation</p>
              </div>

              {/* Itinerary */}
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                    <Compass size={22} className="text-[#d4af37]" />
                  </span>
                  Detailed Itinerary
                </h2>
                <div className="flex gap-2 mb-6">
                  {[1, 2].map(day => (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                        activeDay === day
                          ? "bg-[#1a1a2e] text-white shadow-lg"
                          : "bg-white border border-[#e5e5e5] text-[#777] hover:text-[#1a1a2e] hover:border-[#ccc]"
                      }`}
                    >
                      Day {day}
                    </button>
                  ))}
                </div>
                <div className="relative pl-7 border-l-[3px] border-[#d4af37]/25">
                  {schedule.map((item, i) => (
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

              {/* Who Is This For + What Makes It Different */}
              <section className="mb-12 space-y-4">
                <div className="rounded-2xl bg-white border border-[#eee] p-7 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a2e] mb-4 flex items-center gap-3">
                    <Heart size={22} className="text-[#d4af37]" /> Who Is This Experience For?
                  </h2>
                  <p className="text-[16px] text-[#555] leading-relaxed">
                    Perfect for couples seeking a unique getaway, solo travelers looking for cultural exchange, or small groups wanting to explore the desert with a local expert. No hiking experience needed — most exploration is by 4×4.
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-[#eee] p-7 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a2e] mb-4 flex items-center gap-3">
                    <Star size={22} className="text-[#d4af37]" /> What Makes This Tour Different?
                  </h2>
                  <p className="text-[16px] text-[#555] leading-relaxed mb-4">
                    An invitation to experience Wadi Rum through the eyes of a local Bedouin — culture, food, stories and stars.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Ancestral knowledge of Wadi Rum",
                      "Authentic zarb dinner cooked underground",
                      "Overnight in a goat-hair tent",
                      "Deep cultural exchange",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3 text-[15px] text-[#333]">
                        <Star size={14} className="text-[#d4af37] fill-[#d4af37] flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Meeting Point */}
              <section className="mb-12">
                <div className="rounded-2xl bg-white border border-[#eee] p-7 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a2e] mb-4 flex items-center gap-3">
                    <MapPin size={22} className="text-[#d4af37]" /> Where Does the Tour Start?
                  </h2>
                  <p className="text-[16px] text-[#555] leading-relaxed">
                    Wadi Rum Visitor Center — the main entry point to the protected area. Reachable by taxi from Aqaba or Petra. Your guide meets you at the entrance.
                  </p>
                </div>
              </section>

              {/* Guide */}
              <section className="mb-12">
                <div className="flex items-start gap-5 p-7 sm:p-8 rounded-2xl bg-white border border-[#eee]">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d52] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    B
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">Your Bedouin Guide</h3>
                    <p className="text-sm text-[#d4af37] font-semibold mb-3">Name shared after booking</p>
                    <p className="text-[16px] text-[#555] leading-relaxed">
                      Born and raised in Wadi Rum with generations of knowledge about the desert's history, geology, and hidden pathways.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                    <MessageCircle size={22} className="text-[#d4af37]" />
                  </span>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
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

              {/* Bottom CTA for mobile */}
              <div className="lg:hidden mb-8">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#1a1a2e] text-white font-bold text-lg hover:bg-[#2a2a4e] active:scale-[0.98] transition-all"
                >
                  Book Your Adventure
                  <ArrowRight size={20} />
                </a>
              </div>

              {/* SEO Meta Preview */}
              <section className="mb-12">
                <details className="rounded-xl border border-dashed border-[#ddd] bg-white/50 overflow-hidden">
                  <summary className="cursor-pointer px-5 py-4 text-xs font-bold uppercase tracking-[2px] text-[#999]">
                    📋 SEO Meta — Copy to Yoast / RankMath
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-xs text-[#999] mb-1"><strong>Meta Title</strong> <span className="text-green-600">(56 chars)</span></p>
                    <p className="text-sm font-semibold text-[#1a1a2e] mb-4 p-3 bg-[#faf9f7] border border-[#eee] rounded-lg">
                      Wadi Rum Overnight Safari: 2-Day 4x4 Jeep Tour from $147
                    </p>
                    <p className="text-xs text-[#999] mb-1"><strong>Meta Description</strong> <span className="text-green-600">(157 chars)</span></p>
                    <p className="text-sm text-[#333] leading-relaxed p-3 bg-[#faf9f7] border border-[#eee] rounded-lg">
                      Wadi Rum overnight safari: Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.00. Experience stargazing & desert adventure!
                    </p>
                  </div>
                </details>
              </section>
            </div>

            {/* ===== RIGHT COLUMN — BOOKING CARD (STICKY) ===== */}
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#1a1a2e]/10 border border-[#e5e5e5]">
                  {/* Price header */}
                  <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] p-8 text-center">
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Starting from</p>
                    <p className="text-5xl font-extrabold text-white tracking-tight">
                      $147<span className="text-xl font-normal text-white/50 ml-1">/person</span>
                    </p>
                  </div>

                  <div className="bg-white p-6 space-y-5">
                    {/* Quick facts */}
                    <div className="space-y-3">
                      {[
                        { icon: <Clock size={16} />, label: "Duration", value: "2 Days, 1 Night" },
                        { icon: <Users size={16} />, label: "Group Size", value: "Private (2–8)" },
                        { icon: <MapPin size={16} />, label: "Start", value: "Visitor Center" },
                        { icon: <Globe2 size={16} />, label: "Languages", value: "English, Arabic" },
                      ].map(fact => (
                        <div key={fact.label} className="flex items-center justify-between text-sm py-1">
                          <span className="flex items-center gap-2 text-[#777]">
                            <span className="text-[#d4af37]">{fact.icon}</span> {fact.label}
                          </span>
                          <span className="font-bold text-[#1a1a2e]">{fact.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#f0f0f0]" />

                    {/* Key inclusions */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#999] mb-3">Key inclusions</p>
                      <div className="space-y-2.5">
                        {["Guide & 4x4 transport", "All meals included", "Desert camp overnight", "Stargazing experience"].map(item => (
                          <div key={item} className="flex items-center gap-2 text-sm text-[#333]">
                            <CheckCircle size={15} className="text-green-500 flex-shrink-0" /> {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#d4af37] text-[#1a1a2e] font-bold text-lg hover:bg-[#c9a230] active:scale-[0.98] transition-all shadow-lg shadow-[#d4af37]/25"
                    >
                      Reserve Now
                      <ArrowRight size={20} />
                    </a>

                    <p className="text-center text-xs text-[#999]">
                      ✓ Free cancellation · Instant confirmation
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-5 flex items-center justify-center gap-5 text-xs text-[#999] font-medium">
                  <span className="flex items-center gap-1.5"><Shield size={14} className="text-green-500" /> Verified</span>
                  <span className="flex items-center gap-1.5"><Star size={14} className="text-[#d4af37] fill-[#d4af37]" /> Top Rated</span>
                  <span className="flex items-center gap-1.5"><Heart size={14} className="text-red-400" /> 98% Love It</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RELATED + FOOTER ===== */}
        <section className="py-12 bg-white border-t border-[#eee]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-5">You Might Also Like</h2>
            <div className="flex flex-col gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl border border-[#eee] bg-[#faf9f7] text-[#1a1a2e] text-base font-semibold hover:border-[#d4af37] hover:shadow-lg transition-all">
                Book Wadi Rum in Jordan – Visitor Center to Village Tour →
              </a>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-[#1a1a2e] text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Simsem — Authentic Middle Eastern Travel Experiences
          </p>
        </footer>

        {/* ===== MOBILE STICKY BOTTOM BAR ===== */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/97 backdrop-blur-xl border-t border-[#e5e5e5] px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <p className="text-[11px] text-[#999] uppercase tracking-wider font-semibold">From</p>
              <p className="text-2xl font-extrabold text-[#1a1a2e]">$147 <span className="text-sm font-normal text-[#999]">/person</span></p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#d4af37] text-[#1a1a2e] font-bold text-base hover:bg-[#c9a230] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/25"
            >
              Reserve Now →
            </a>
          </div>
        </div>

        {/* Bottom padding for mobile sticky bar */}
        <div className="h-20 lg:h-0" />
      </div>
    </>
  );
}
