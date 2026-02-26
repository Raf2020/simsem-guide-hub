import { User, Clock, MapPin, Globe2, Users, Truck } from "lucide-react";
import TourTemplate, { TourData } from "@/components/tours/TourTemplate";

const wadiRumFromAqaba: TourData = {
  title: "Wadi Rum Tours from Aqaba with Local Bedouin Guide",
  country: "Jordan",
  badge: "From Aqaba",
  location: "Wadi Rum",
  duration: "2 Days",
  price: "147",
  bookingUrl: "https://mysimsem.com/experiences/unforgettable-full-day-adventure-in-wadi-rum/",
  ctaText: "Reserve Your Tour from Aqaba",
  cancelNote: "Free cancellation · Instant confirmation",

  metaTitle: "Wadi Rum Tours from Aqaba: 2-Day 4x4 Bedouin Safari from $147",
  metaDescription: "Book a 2-day Wadi Rum tour from Aqaba with local Bedouin guide. 4x4 transfers, zarb dinner, overnight camp & stargazing. $147 per person all-inclusive.",

  gallery: Array.from({ length: 8 }, (_, i) => ({
    src: `https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_${i + 1}.jpg`,
    alt: [
      "Wadi Rum 4x4 desert tour Wadi Rum",
      "Wadi Rum canyon exploration Wadi Rum Visitor Center",
      "Wadi Rum visit ancient inscriptions Wadi Rum Village",
      "Wadi Rum sunset viewing Wadi Rum",
      "Wadi Rum stargazing Wadi Rum Visitor Center",
      "Wadi Rum Bedouin tea Wadi Rum Village",
      "Wadi Rum campfire Wadi Rum",
      "Wadi Rum overnight in Bedouin camp Wadi Rum Visitor Center",
    ][i],
  })),

  description: (
    <p>
      Planning a Wadi Rum tour from Aqaba without renting a car? This 2 Days Wadi Rum 4×4 tour starts directly from Aqaba, with your guide handling all transfers to Wadi Rum and back. <strong className="text-[#1a1a2e]">$147</strong> per person covers guide, 4×4 transport, dinner, breakfast, and camp. Route: Aqaba → Wadi Rum → overnight camp → Aqaba.
    </p>
  ),

  details: [
    { icon: <User size={22} />, label: "Guide", value: "Bedouin Guide" },
    { icon: <Clock size={22} />, label: "Duration", value: "2 Days" },
    { icon: <MapPin size={22} />, label: "Start", value: "Visitor Center" },
    { icon: <Globe2 size={22} />, label: "Language", value: "EN · AR" },
    { icon: <Users size={22} />, label: "Group", value: "2–8 people" },
    { icon: <Truck size={22} />, label: "Transport", value: "4x4" },
  ],

  highlights: [
    "Clear pickup and dropoff at Aqaba — no navigation needed",
    "Confirmed departure times with 4x4 transport included",
    "Experience a breathtaking desert sunset viewing",
    "Enjoy stargazing far from city lights",
    "Sip Bedouin tea by a crackling campfire",
    "Dine on traditional Jordanian dinner prepared underground",
    "Spend a night in a traditional Bedouin camp in Wadi Rum",
  ],

  included: [
    "Local Bedouin guide with 4x4 transport",
    "Guided 4x4 desert tour",
    "Overnight stay in a traditional Bedouin camp",
    "Dinner (traditional Jordanian zarb)",
    "Breakfast",
    "Drinking water and Bedouin tea",
  ],

  notIncluded: [
    "Entrance fees to Wadi Rum Protected Area (5 JD per person)",
    "Travel insurance",
    "Personal expenses",
    "Tips for guide (optional)",
  ],

  chips: [
    { icon: "🏜", text: "Desert terrain" },
    { icon: "💪", text: "Easy fitness" },
    { icon: "🔒", text: "Private available" },
  ],

  itinerary: [
    {
      day: 1,
      items: [
        { time: "Morning", title: "Transfer from Aqaba", desc: "Meet your Bedouin guide at the Wadi Rum Visitor Center. After a quick introduction and ensuring all entry formalities are handled, you'll transfer into a 4x4 vehicle ready for your desert adventure." },
        { time: "Late Morning", title: "Canyon exploration & ancient inscriptions", desc: "Your 4x4 will take you through several stunning sandstone canyons. You'll stop to walk through winding natural formations and visit sites featuring ancient inscriptions." },
        { time: "Late Afternoon", title: "Sunset viewing with Bedouin tea", desc: "As the sun dips towards the horizon, your guide will find a prime spot for a spectacular sunset viewing. Relax with freshly brewed Bedouin tea prepared over an open fire." },
        { time: "Evening", title: "Zarb dinner & campfire", desc: "Arrive at your traditional Bedouin camp. Enjoy a generous Jordanian zarb – meat and vegetables slow-cooked in an underground oven. Gather around a warm campfire afterwards." },
        { time: "Night", title: "Stargazing & overnight stay", desc: "With minimal light pollution, the desert sky opens up for incredible stargazing. Your guide can point out constellations as you settle into your comfortable goat-hair tent." },
      ],
    },
    {
      day: 2,
      items: [
        { time: "Early Morning", title: "Sunrise viewing", desc: "Wake early for an optional sunrise viewing, watching the desert glow as the sun rises over the eastern mountains." },
        { time: "Morning", title: "Bedouin breakfast", desc: "Enjoy a simple but hearty Bedouin breakfast with fresh bread, local spreads, and plenty of shai tea." },
        { time: "Late Morning", title: "Return to Visitor Center", desc: "After breakfast, you'll be driven back to the Wadi Rum Visitor Center, concluding your 2-day desert experience. From here you can arrange your onward journey." },
      ],
    },
  ],

  whoFor: "If you're arriving from Aqaba or a nearby city and want zero hassle getting into the desert, this experience removes the guesswork. Good for travellers without a car, those on tight schedules, and anyone who wants clear pickup/dropoff logistics handled by a local.",

  whatDifferent: "This experience removes the transport headache. Your guide meets you at Aqaba, handles all entry formalities, and drives you between every stop in a 4x4. No navigation, no coordination, no missed turns. At the end of 2 Days, you're dropped back exactly where you started.",
  diffPoints: [
    "Door-to-door 4x4 transport from Aqaba",
    "Guide handles all park entry and permits",
    "Confirmed pickup and dropoff times",
    "Clear directions provided before arrival",
  ],

  meetingPoint: "This tour starts directly from the Wadi Rum Visitor Center. When arriving from Aqaba, you can easily take a taxi directly to the Visitor Center, which is the main entry point for all desert tours. Your guide will meet you there, ready to take you into the protected area.",

  guide: {
    name: "Your Bedouin Guide",
    initial: "B",
    note: "Details shared after booking",
    bio: "Your local guide is a local host based in Wadi Rum. After booking, we share the guide name, WhatsApp contact, and exact meeting instructions.",
  },

  faqs: [
    { q: "How do I get from Aqaba to Wadi Rum?", a: "Your guide meets you at Aqaba and drives you directly to Wadi Rum by 4x4. The drive takes approximately 1 hour. At the end of the tour, you're driven back to Aqaba." },
    { q: "Is hotel pickup included?", a: "Hotel pickup is not included in the base price, but your guide can arrange a transfer from Aqaba or other nearby towns for an additional fee. Ask when booking." },
    { q: "What time does the tour start and end?", a: "The tour typically starts at 9:00 AM on Day 1 and ends around 11:00 AM on Day 2. Your guide will confirm exact times after booking." },
    { q: "Can I arrive from a city other than Aqaba?", a: "Yes. Most travellers arrive from Aqaba, Amman, or Petra. Your guide can arrange transfers from any of these cities for an additional fee." },
    { q: "What should I pack for an overnight stay?", a: "Bring layers of clothing including a warm jacket for evenings, comfortable walking shoes, sun protection, a small backpack, and a portable charger. A head torch can also be useful." },
  ],

  sidebarFacts: [
    { icon: <Clock size={16} />, label: "Duration", value: "2 Days, 1 Night" },
    { icon: <Users size={16} />, label: "Group Size", value: "Private (2–8)" },
    { icon: <MapPin size={16} />, label: "Start", value: "Visitor Center" },
    { icon: <Globe2 size={16} />, label: "Languages", value: "English, Arabic" },
  ],

  sidebarInclusions: [
    "Guide & 4x4 transport",
    "All meals included",
    "Desert camp overnight",
    "Bedouin tea & water",
  ],

  relatedLinks: [
    { label: "2 Days Wadi Rum Overnight 4×4 Jeep Tour", href: "/tours/jordan/wadi-rum-overnight-4x4-jeep-tour", image: "https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_2.jpg", price: "147" },
    { label: "Wadi Rum Guided Tour with Local Bedouin Guide", href: "/tours/jordan/wadi-rum-guided-tour", image: "https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_1.jpg", price: "147" },
  ],
};

export default function WadiRumFromAqaba() {
  return <TourTemplate tour={wadiRumFromAqaba} />;
}
