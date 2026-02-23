import { User, Clock, MapPin, Globe2, Users, Truck } from "lucide-react";
import TourTemplate, { TourData } from "@/components/tours/TourTemplate";

const wadiRumTour: TourData = {
  title: "2 Days Wadi Rum Overnight 4×4 Jeep Tour",
  country: "Jordan",
  badge: "2-Day Safari",
  location: "Wadi Rum",
  duration: "2 Days",
  price: "147",
  bookingUrl: "https://mysimsem.com/experiences/unforgettable-full-day-adventure-in-wadi-rum/",
  ctaText: "Reserve Now",
  cancelNote: "Free cancellation · Instant confirmation",

  metaTitle: "Wadi Rum Overnight Safari: 2-Day 4x4 Jeep Tour from $147",
  metaDescription: "Book your 2-day 4x4 Jeep tour in Wadi Rum, Jordan. Local Bedouin guide, overnight camp, stargazing & desert adventure from $147.",

  gallery: Array.from({ length: 10 }, (_, i) => ({
    src: `https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_${i + 1}.jpg`,
    alt: `Wadi Rum desert safari adventure photo ${i + 1}`,
  })),

  description: (
    <p>
      Head into Wadi Rum by 4×4 Jeep, leaving the modern world behind. Your Bedouin guide leads you through towering sandstone mountains, vast plains, traditional meals, and a night under the stars — starting from just <strong className="text-[#1a1a2e]">$147</strong>.
    </p>
  ),

  details: [
    { icon: <User size={22} />, label: "Host", value: "Local Guide" },
    { icon: <Clock size={22} />, label: "Duration", value: "2 Days" },
    { icon: <MapPin size={22} />, label: "Pickup", value: "Visitor Center" },
    { icon: <Globe2 size={22} />, label: "Language", value: "EN · AR" },
    { icon: <Users size={22} />, label: "Group", value: "2–8 people" },
    { icon: <Truck size={22} />, label: "Transport", value: "4x4 Jeep" },
  ],

  highlights: [
    "Explore red-rock formations and narrow canyons by 4x4",
    "Discover ancient Nabataean inscriptions and petroglyphs",
    "Witness a desert sunset from a high vantage point",
    "Enjoy an authentic zarb dinner cooked underground",
    "Spend a night in a traditional Bedouin goat-hair tent",
    "Stargazing away from all light pollution",
    "Share shai tea with your Bedouin hosts",
  ],

  included: [
    "Local Bedouin guide",
    "4x4 Jeep transport",
    "All meals (lunch, dinner, breakfast)",
    "Overnight stay in a Bedouin camp",
    "Bottled water",
    "Stargazing experience",
  ],

  notIncluded: [
    "Wadi Rum entrance fee (5 JOD/person)",
    "Personal expenses",
    "Tips for guide",
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
        { time: "9:00 AM", title: "Meet at Visitor Center", desc: "Your Bedouin guide greets you and prepares for departure into the protected area." },
        { time: "9:30 AM", title: "Jeep Tour — North Wadi Rum", desc: "Explore Lawrence's Spring, the Red Sand Dune, and Khazali Canyon with its ancient inscriptions." },
        { time: "1:00 PM", title: "Lunch in the Desert", desc: "Freshly prepared Bedouin lunch at a scenic spot under a rock formation." },
        { time: "2:30 PM", title: "Jeep Tour — South Wadi Rum", desc: "Mushroom Rock, Burdah Rock Bridge, Um Frouth. End with a spectacular sunset." },
        { time: "6:30 PM", title: "Arrive at Camp", desc: "Settle into your goat-hair tent. Relax with shai tea." },
        { time: "8:00 PM", title: "Zarb Dinner & Campfire", desc: "Traditional underground BBQ dinner, stories and tea around the fire." },
        { time: "9:30 PM", title: "Stargazing", desc: "The desert sky offers an incredible display with zero light pollution." },
      ],
    },
    {
      day: 2,
      items: [
        { time: "7:00 AM", title: "Sunrise & Breakfast", desc: "Wake to the desert sunrise. Traditional Bedouin breakfast at camp." },
        { time: "8:30 AM", title: "Return to Visitor Center", desc: "Your guide drives you back, concluding the adventure." },
      ],
    },
  ],

  whoFor: "Perfect for couples seeking a unique getaway, solo travelers looking for cultural exchange, or small groups wanting to explore the desert with a local expert. No hiking experience needed — most exploration is by 4×4.",

  whatDifferent: "An invitation to experience Wadi Rum through the eyes of a local Bedouin — culture, food, stories and stars.",
  diffPoints: [
    "Ancestral knowledge of Wadi Rum",
    "Authentic zarb dinner cooked underground",
    "Overnight in a goat-hair tent",
    "Deep cultural exchange",
  ],

  meetingPoint: "Wadi Rum Visitor Center — the main entry point to the protected area. Reachable by taxi from Aqaba or Petra. Your guide meets you at the entrance.",

  guide: {
    name: "Your Bedouin Guide",
    initial: "B",
    note: "Name shared after booking",
    bio: "Born and raised in Wadi Rum with generations of knowledge about the desert's history, geology, and hidden pathways.",
  },

  faqs: [
    { q: "Do I need previous desert experience?", a: "No. This tour is designed for anyone with a sense of adventure. Your guide ensures your comfort and safety." },
    { q: "What should I pack?", a: "Light clothes for day, warm layers for night, walking shoes, hat, sunglasses, sunscreen, and a camera." },
    { q: "How much does it cost?", a: "From $147 per person — includes guide, transport, all meals, and overnight. Entrance fee paid separately." },
    { q: "Are there restrooms at camp?", a: "Yes. Basic, clean shared facilities are provided." },
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
    "Stargazing experience",
  ],

  relatedLinks: [
    { label: "Book Wadi Rum in Jordan – Visitor Center to Village Tour", href: "https://mysimsem.com/experiences/unforgettable-full-day-adventure-in-wadi-rum/" },
  ],
};

export default function WadiRumTour() {
  return <TourTemplate tour={wadiRumTour} />;
}
