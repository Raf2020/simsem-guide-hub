import { Helmet } from "react-helmet-async";

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
  { time: "9:30 AM - 1:00 PM", title: "4x4 Jeep Tour - North Wadi Rum", desc: "Begin your 2 day Wadi Rum jeep tour, exploring iconic sites like Lawrence's Spring, the Red Sand Dune, and Khazali Canyon with its ancient inscriptions. Your guide will share stories of the desert." },
  { time: "1:00 PM", title: "Lunch in the Desert", desc: "Enjoy a freshly prepared Bedouin lunch at a scenic spot, often under the shade of a rock formation." },
  { time: "2:30 PM - 6:00 PM", title: "4x4 Jeep Tour - South Wadi Rum & Sunset", desc: "Continue exploring, visiting the Mushroom Rock, Burdah Rock Bridge, and Um Frouth Rock Bridge. Conclude the afternoon with a spectacular sunset view from a high dune." },
  { time: "6:30 PM", title: "Arrive at Bedouin Camp", desc: "Settle into your traditional goat-hair tent. Relax with shai tea before dinner." },
  { time: "8:00 PM", title: "Zarb Dinner & Campfire", desc: "Savor a traditional zarb (underground BBQ) dinner, followed by conversation and tea around the campfire." },
  { time: "9:30 PM onwards", title: "Stargazing", desc: "With minimal light pollution, the desert sky offers an incredible display of stars." },
];

const day2Schedule = [
  { time: "7:00 AM", title: "Sunrise & Breakfast", desc: "Wake up to the desert sunrise. Enjoy a traditional Bedouin breakfast at the camp." },
  { time: "8:30 AM", title: "Return to Visitor Center", desc: "After breakfast, your guide will drive you back to the Wadi Rum Visitor Center, concluding your desert adventure." },
];

const faqs = [
  { q: "Do I need previous desert experience?", a: "No prior desert experience is necessary. This 2 day Wadi Rum tour is designed for anyone with a sense of adventure and a willingness to embrace the desert environment. Your guide will ensure your comfort and safety throughout." },
  { q: "What should I pack for an overnight camp?", a: "Pack light clothing for the day, warmer layers for the cool desert nights, comfortable walking shoes, a hat, sunglasses, sunscreen, and a small backpack for personal items. Don't forget your camera!" },
  { q: "How much does this 2-day experience cost?", a: "The price for this experience starts from $147.00 per person. This includes your guide, 4x4 transport, all meals, and overnight accommodation. The Wadi Rum entrance fee is paid separately upon arrival." },
  { q: "Are there restrooms at the camp?", a: "Yes, our traditional Bedouin camp is equipped with basic, clean shared toilet facilities for your convenience." },
];

const BOOKING_URL = "https://mysimsem.com/experiences/unforgettable-full-day-adventure-in-wadi-rum/";

const ItineraryItem = ({ time, title, desc, isLast }: { time: string; title: string; desc: string; isLast?: boolean }) => (
  <div className={`flex gap-6 py-5 ${!isLast ? "border-b border-border" : ""}`}>
    <div className="flex-shrink-0 min-w-[110px] text-sm font-bold text-[#e63946]">{time}</div>
    <div>
      <div className="text-lg font-semibold text-foreground mb-1">{title}</div>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function WadiRumTour() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "2 Days Wadi Rum Overnight 4x4 Jeep Tour",
    description: "Wadi Rum overnight safari: Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.00. Experience stargazing & desert adventure!",
    touristType: ["Adventure", "Cultural", "Nature"],
    offers: { "@type": "Offer", price: "147.00", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    itinerary: { "@type": "ItemList", numberOfItems: 2 },
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

      <main className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="w-full max-h-[540px] overflow-hidden">
          <img
            src={galleryImages[0].src}
            alt="Wadi Rum Exploring canyons Wadi Rum Visitor Center"
            className="w-full h-[540px] object-cover"
            loading="eager"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* SEO Meta Preview */}
          <div className="bg-muted/50 rounded-xl p-7 mb-12 border border-border">
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground mb-5">📋 SEO Meta — Copy to Yoast / RankMath</p>
            <p className="text-sm text-muted-foreground mb-1"><strong>Meta Title</strong> <span className="text-emerald-600 text-[11px]">(56 chars)</span></p>
            <p className="text-lg font-semibold text-foreground mb-6 p-3.5 bg-background border border-border rounded-lg">
              Wadi Rum Overnight Safari: 2-Day 4x4 Jeep Tour from $147
            </p>
            <p className="text-sm text-muted-foreground mb-1"><strong>Meta Description</strong> <span className="text-emerald-600 text-[11px]">(157 chars)</span></p>
            <p className="text-lg text-foreground leading-relaxed p-3.5 bg-background border border-border rounded-lg">
              Wadi Rum overnight safari: Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan, with a local guide from just $147.00. Experience stargazing & desert adventure!
            </p>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-[42px] font-extrabold text-foreground leading-tight mb-5 tracking-tight">
            2 Days Wadi Rum Overnight 4x4 Jeep Tour from Wadi Rum Visitor Center
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {["2 Days", "4x4 Jeep", "Local Guide", "Cultural"].map(tag => (
              <span key={tag} className="inline-block bg-muted text-foreground px-5 py-2 rounded-full text-sm font-medium border border-border">
                {tag}
              </span>
            ))}
          </div>

          {/* Intro */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-9 max-w-[740px]">
            Head into Wadi Rum by 4x4 Jeep, leaving the modern world behind for a 2-day adventure. Your Bedouin guide will lead you through the desert's iconic landscapes, from towering sandstone mountains to vast, open plains. This Wadi Rum overnight safari includes traditional meals and a night under the stars, starting from just $147.00.
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 my-10">
            {tourDetails.map(d => (
              <div key={d.label} className="p-6 bg-muted/50 rounded-xl text-center">
                <div className="text-3xl mb-2.5">{d.icon}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{d.label}</div>
                <div className="text-base font-bold text-foreground">{d.value}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <h2 className="text-3xl font-bold text-foreground mt-16 mb-7 tracking-tight">Expedition Highlights</h2>
          <ul className="space-y-0">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-4 py-4">
                <span className="flex-shrink-0 mt-2.5 w-2 h-2 bg-[#e63946] rounded-full" />
                <span className="text-lg text-foreground leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>

          {/* What's Included */}
          <h2 className="text-3xl font-bold text-foreground mt-16 mb-7 tracking-tight">What's Included</h2>
          <div className="flex flex-wrap gap-3 mb-9">
            {[
              { icon: "📏", label: "Distance:", value: "Confirmed after booking" },
              { icon: "🏜", label: "Terrain:", value: "Desert, sand dunes, rocky canyons" },
              { icon: "💪", label: "Fitness:", value: "Easy" },
              { icon: "🔒", label: "Private:", value: "Available" },
            ].map(chip => (
              <span key={chip.label} className="inline-flex items-center gap-2 px-5 py-3 bg-muted/50 rounded-full text-sm text-foreground border border-border">
                {chip.icon} <strong>{chip.label}</strong> {chip.value}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-5">Included</h3>
              <ul className="space-y-0">
                {included.map(item => (
                  <li key={item} className="flex items-center gap-3.5 py-3 text-lg text-foreground">
                    <span className="text-emerald-600 text-xl font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-5">Not Included</h3>
              <ul className="space-y-0">
                {notIncluded.map(item => (
                  <li key={item} className="flex items-center gap-3.5 py-3 text-lg text-muted-foreground">
                    <span className="text-muted-foreground text-xl">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Who Is This For */}
          <h2 className="text-[28px] font-bold text-foreground mt-14 mb-5 tracking-tight">Who Is This Experience For?</h2>
          <p className="text-lg text-foreground leading-relaxed mb-5 max-w-[740px]">
            If you're comfortable with basic camping amenities and eager to disconnect from city life, this experience is for you. It's perfect for couples seeking a unique getaway, solo travelers looking for cultural exchange, or small groups wanting to explore the desert with a local expert. You don't need to be an experienced hiker; most exploration is done by 4x4, with opportunities for short walks.
          </p>

          {/* What Makes This Different */}
          <h2 className="text-[28px] font-bold text-foreground mt-14 mb-5 tracking-tight">What Makes This Tour Different?</h2>
          <p className="text-lg text-foreground leading-relaxed mb-5 max-w-[740px]">
            This isn't just a sightseeing trip; it's an invitation to experience Wadi Rum through the eyes of a local. Your guide comes from a long line of desert dwellers, offering insights into Bedouin culture, traditions, and the desert's ecosystem that you won't find elsewhere. You'll eat traditional food, sleep in a genuine Bedouin camp, and share stories under the stars, fostering a deeper understanding of this unique environment.
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "Guided by a Bedouin with ancestral knowledge of Wadi Rum",
              "Authentic zarb dinner cooked in an underground oven",
              "Overnight stay in a traditional goat-hair tent",
              "Focus on cultural exchange and local perspectives",
            ].map(item => (
              <li key={item} className="py-2 text-lg text-foreground leading-relaxed">• {item}</li>
            ))}
          </ul>

          {/* Where Does It Start */}
          <h2 className="text-[28px] font-bold text-foreground mt-14 mb-5 tracking-tight">Where Does the Tour Start?</h2>
          <p className="text-lg text-foreground leading-relaxed mb-12 max-w-[740px]">
            The tour begins at the Wadi Rum Visitor Center. This is the main entry point to the protected area. You can reach the Visitor Center by taxi from Aqaba or Petra, or by private car. Your guide will meet you directly at the entrance, ready to start your desert journey.
          </p>

          {/* Itinerary */}
          <h2 className="text-3xl font-bold text-foreground mt-16 mb-7 tracking-tight">Itinerary</h2>

          <div className="bg-muted/50 rounded-2xl p-9 mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-7 flex items-center gap-4">
              <span className="w-11 h-11 bg-[#e63946] text-white rounded-full inline-flex items-center justify-center text-lg font-extrabold">1</span>
              Day 1: Desert Exploration & Camp Life
            </h3>
            {day1Schedule.map((item, i) => (
              <ItineraryItem key={i} {...item} isLast={i === day1Schedule.length - 1} />
            ))}
          </div>

          <div className="bg-muted/50 rounded-2xl p-9 mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-7 flex items-center gap-4">
              <span className="w-11 h-11 bg-[#e63946] text-white rounded-full inline-flex items-center justify-center text-lg font-extrabold">2</span>
              Day 2: Morning Views & Departure
            </h3>
            {day2Schedule.map((item, i) => (
              <ItineraryItem key={i} {...item} isLast={i === day2Schedule.length - 1} />
            ))}
          </div>

          {/* CTA */}
          <div className="my-10">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e63946] text-white px-12 py-4.5 rounded-xl text-lg font-bold hover:bg-[#d62f3d] transition-colors"
            >
              Reserve your Wadi Rum 4x4 Jeep tour →
            </a>
          </div>

          {/* Photos */}
          <h2 className="text-3xl font-bold text-foreground mt-16 mb-7 tracking-tight">Photos</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2" style={{ WebkitOverflowScrolling: "touch" }}>
            {galleryImages.map((img, i) => (
              <div key={i} className="flex-shrink-0 w-80 rounded-2xl overflow-hidden">
                <img src={img.src} alt={img.alt} className="w-full h-60 object-cover" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Guide */}
          <div className="flex items-start gap-7 p-9 bg-muted/50 rounded-2xl mt-12">
            <div className="flex-shrink-0 w-[72px] h-[72px] bg-[#e63946] text-white rounded-full flex items-center justify-center text-3xl font-bold">B</div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Your Guide: Bedouin guide (name shared after booking)</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your guide is a local Bedouin, born and raised in Wadi Rum. They possess generations of knowledge about the desert's history, geology, and hidden pathways, ensuring an authentic and insightful experience.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-3xl font-bold text-foreground mt-16 mb-7 tracking-tight">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="py-7 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">{faq.q}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="text-center my-16 py-14 px-9 bg-foreground rounded-2xl">
            <p className="text-sm font-semibold text-white/40 uppercase tracking-[2px] mb-2">Starting from</p>
            <p className="text-5xl font-extrabold text-white mb-8">From $147.00</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e63946] text-white px-14 py-5 rounded-xl text-xl font-bold hover:bg-[#d62f3d] transition-colors"
            >
              Book your 2 Days Wadi Rum tour →
            </a>
          </div>

          {/* Related */}
          <h2 className="text-3xl font-bold text-foreground mt-16 mb-7 tracking-tight">You Might Also Like</h2>
          <div className="flex flex-col gap-3.5">
            <a href={BOOKING_URL} className="block p-5 bg-muted/50 rounded-xl text-foreground text-lg font-semibold hover:bg-muted transition-colors">
              Book Wadi Rum in Jordan – Visitor Center to Village Tour →
            </a>
            <a href="/blog/The Best Guide to Jordan's North-South Railway Revolution" className="block p-5 bg-muted/50 rounded-xl text-foreground text-lg font-semibold hover:bg-muted transition-colors">
              The Best Guide to Jordan's North-South Railway Revolution →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
