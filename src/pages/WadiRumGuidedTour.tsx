import { User, Clock, MapPin, Globe2, Users, Truck } from "lucide-react";
import TourTemplate, { TourData } from "@/components/tours/TourTemplate";

const wadiRumGuidedTour: TourData = {
  title: "Wadi Rum Guided Tour with Local Bedouin Guide",
  country: "Jordan",
  badge: "2-Day Safari",
  location: "Wadi Rum",
  duration: "2 Days",
  price: "147",
  bookingUrl: "https://mysimsem.com/experiences/unforgettable-full-day-adventure-in-wadi-rum/",
  ctaText: "Reserve Your Wadi Rum Tour",
  cancelNote: "Free cancellation · Instant confirmation",

  metaTitle: "Wadi Rum Guided Tour: 2-Day Local Bedouin Desert Safari from $147",
  metaDescription: "Book a 2-day Wadi Rum guided tour with a local Bedouin guide. 4x4 desert safari, zarb dinner, overnight camp & stargazing from $147 per person.",

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
      Meet your Bedouin guide at Wadi Rum and head into the desert by 4×4. This 2 Days Wadi Rum tour takes you into the desert with a local Bedouin guide whose family has lived here for generations. Starting from Wadi Rum Visitor Center at <strong className="text-[#1a1a2e]">$147</strong> per person. Travel by 4×4, eat traditional zarb cooked underground, sleep in a goat-hair tent.
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
    "Led by a local Bedouin guide with generations of desert knowledge",
    "Traditional zarb dinner cooked underground — real Bedouin cuisine",
    "Experience a stunning Wadi Rum sunset jeep tour from a high vantage point",
    "Enjoy a traditional Jordanian dinner cooked underground in a zarb oven",
    "Spend a night under the stars in a Bedouin camp",
    "Participate in a Bedouin tea ceremony, learning about local customs",
    "Wake up to a desert sunrise before a simple breakfast at camp",
  ],

  included: [
    "2-day 4x4 desert tour",
    "Overnight stay in a traditional Bedouin camp",
    "Dinner (Jordanian style)",
    "Breakfast",
    "Bedouin tea throughout the tour",
    "Bottled water",
    "Local Bedouin guide",
    "All transportation within Wadi Rum",
  ],

  notIncluded: [
    "Wadi Rum protected area entrance fee (5 JD/person or free with Jordan Pass)",
    "Travel insurance",
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
        { time: "Morning", title: "Meet your Bedouin guide — local family, generations here", desc: "Your Bedouin guide will meet you at the Wadi Rum Visitor Center. After a brief introduction, you'll transfer into a comfortable 4x4 vehicle to begin your Wadi Rum desert safari." },
        { time: "Late Morning", title: "Traditional 4x4 route through ancestral paths", desc: "Drive through diverse desert scenery, stopping to explore several narrow canyons on foot. Your guide will point out and explain ancient inscriptions on rock faces." },
        { time: "Late Afternoon", title: "Guide shares local stories at each stop", desc: "As the sun begins to dip, your guide will find a scenic spot to enjoy a breathtaking sunset viewing over the vast desert landscape, accompanied by traditional Bedouin tea." },
        { time: "Evening", title: "Zarb preparation — underground cooking method", desc: "Arrive at a traditional Bedouin camp for the night. Settle into your goat-hair tent before enjoying a Jordanian dinner, often cooked in a zarb oven. Spend the evening around a campfire." },
      ],
    },
    {
      day: 2,
      items: [
        { time: "Morning", title: "Traditional Bedouin breakfast", desc: "Wake up to the sounds of the desert. Enjoy a simple Bedouin breakfast at the camp, with fresh tea or coffee." },
        { time: "Mid-Morning", title: "Guide explains desert navigation", desc: "A final short drive through the desert, perhaps to revisit a previously unseen area. Your guide will share more insights about Bedouin life and the desert ecosystem." },
        { time: "Late Morning", title: "Return via local route", desc: "You'll be driven back to Wadi Rum Village, arriving by late morning. Your guide will ensure you are dropped off where you can easily continue your onward journey." },
      ],
    },
  ],

  whoFor: "Cultural travellers, experience seekers, and anyone who'd rather learn from a local than follow a tour script. If you value genuine interactions over polished tourism, and you're comfortable with rustic camping, this is your kind of trip.",

  whatDifferent: "Your guide isn't a tour operator reading a script — they're a Bedouin whose family has navigated Wadi Rum for generations. They cook your dinner in a zarb oven the way their parents taught them. They tell stories about the desert because it's their home, not their workplace.",
  diffPoints: [
    "Guide from a multi-generational Bedouin family",
    "Traditional zarb dinner cooked underground",
    "Campfire storytelling and shai tea — genuine, not staged",
    "Revenue goes directly to the local community",
  ],

  meetingPoint: "Your desert adventure begins at the Wadi Rum Visitor Center, located at the entrance to the protected area. It's easily accessible by private car or taxi from nearby towns like Aqaba or Petra. After a quick introduction and confirmation of your booking, you'll transfer directly into the 4x4 vehicle and head into the desert.",

  guide: {
    name: "Your Bedouin Guide",
    initial: "B",
    note: "Name shared after booking",
    bio: "Your local guide is a local host based in Wadi Rum. After booking, we share the guide name, WhatsApp contact, and exact meeting instructions.",
  },

  faqs: [
    { q: "Is the guide really local?", a: "Yes. Your guide is a Bedouin from the area, whose family has lived in the desert for many generations. They share genuine local knowledge, not scripted commentary." },
    { q: "Is this a commercialised tour?", a: "No. This is a local-first experience focused on direct cultural exchange. Your guide operates independently, and revenue stays within the local community." },
    { q: "Will I learn about Bedouin culture?", a: "Naturally, yes. Through shared meals (zarb cooking), campfire storytelling, and your guide's personal connection to the land. It's woven into the experience, not a lecture." },
    { q: "What should I pack for the overnight camp?", a: "Plan for layers of clothing as desert temperatures can change significantly from day to night. Bring comfortable walking shoes for canyon explorations, sun protection (hat, sunglasses, sunscreen), and a reusable water bottle. While blankets are provided, a personal sleeping bag liner or light blanket can add comfort." },
    { q: "How authentic is the Bedouin camp experience?", a: "The camp used is traditional, built from goat hair, and run by local families. While it provides basic comfort, it remains authentic to Bedouin hospitality. The focus is on cultural immersion — sharing food, tea, and stories, rather than luxury amenities." },
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
    { label: "Wadi Rum Tours from Aqaba with Local Bedouin Guide", href: "/tours/jordan/wadi-rum-from-aqaba", image: "https://simemmedia.b-cdn.net/experiences//tours/lLWveUbeLG/gallery/image_1768180453799_3.jpg", price: "147" },
  ],
};

export default function WadiRumGuidedTour() {
  return <TourTemplate tour={wadiRumGuidedTour} />;
}
