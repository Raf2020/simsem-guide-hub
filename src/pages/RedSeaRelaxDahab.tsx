import { User, Clock, MapPin, Globe2, Users, Truck } from "lucide-react";
import TourTemplate, { TourData } from "@/components/tours/TourTemplate";

const gallery = [
  "https://simemmedia.b-cdn.net/experiences/s9bHDJe1qp/tours/27xHSwpJQY/cover/1769851423848.jpeg",
  "https://simemmedia.b-cdn.net/experiences/s9bHDJe1qp/tours/27xHSwpJQY/gallery/1769851559499.jpeg",
  "https://simemmedia.b-cdn.net/experiences/s9bHDJe1qp/tours/27xHSwpJQY/gallery/1769851561181.jpeg",
  "https://simemmedia.b-cdn.net/experiences/s9bHDJe1qp/tours/27xHSwpJQY/gallery/1769851564884.jpeg",
  "https://simemmedia.b-cdn.net/experiences/s9bHDJe1qp/tours/27xHSwpJQY/gallery/1769851567630.jpeg",
];

const tour: TourData = {
  title: "Red Sea Relax Dahab with Sea The Soul Of Sinai",
  country: "Egypt",
  badge: "4 Hours · Private Car · Sea The Soul Of Sinai · nature",
  location: "Dahab",
  duration: "4 Hours",
  price: "36.75",
  bookingUrl: "https://mysimsem.com/experiences/dahab-scuba-diving-snorkeling-golden-hour-reef-tour/",
  ctaText: "See the Full Dahab Route from Dahab",
  cancelNote: "Free cancellation · Instant confirmation",

  metaTitle: "Red Sea Relax Dahab: 4 Hours Tour in Dahab from $36.75",
  metaDescription: "Experience Red Sea Relax Dahab! Enjoy a 4-hour private car tour from $36.75 with local pickup. Book your well-regarded Dahab adventure today!",

  gallery: gallery.map((src, i) => ({ src, alt: `Red Sea Relax Dahab tour photo ${i + 1}` })),

  description: (
    <p>
      4 Hours door-to-door from Dahab. Sea The Soul Of Sinai handles the route. Pick up from accommodation in Dahab, Snorkelling and relaxation at Napoleon Reef, Golden hour sunset. From <strong className="text-[#1a1a2e]">$36.75</strong> per person from Dahab.
    </p>
  ),

  details: [
    { icon: <User size={22} />, label: "Host", value: "Sea The Soul Of Sinai" },
    { icon: <Clock size={22} />, label: "Duration", value: "4 Hours" },
    { icon: <MapPin size={22} />, label: "Pickup", value: "Dahab" },
    { icon: <Globe2 size={22} />, label: "Language", value: "English" },
    { icon: <Users size={22} />, label: "Group", value: "Private or small group (2-8)" },
    { icon: <Truck size={22} />, label: "Transport", value: "Private Car" },
  ],

  highlights: [
    "Pickup from Dahab included",
    "Private Car transport during 4 Hours",
    "Red Sea",
    "Napoleon Reef",
  ],

  whoFor: "You know where you want to go — you just need the route sorted. Sea The Soul Of Sinai picks you up from Dahab, handles 4 Hours of private car and stops, and drops you back. No navigation, no parking stress.\n\n• Door-to-door from Dahab\n• Private Car the whole way\n• 4 Hours — back before dark\n• Return to Dahab",

  whatDifferent: "Sea The Soul Of Sinai handles every transfer detail — Private Car from Dahab, timed stops, and return. No guessing routes or negotiating with taxi drivers. You book on Simsem, Sea The Soul Of Sinai gets paid directly, and the route is locked in before you land.",
  diffPoints: [
    "Sea The Soul Of Sinai — local, not a franchise guide",
    "Direct booking (no OTA commission)",
    "Max 10 guests",
    "Revenue stays in the community",
  ],

  itinerary: [
    {
      day: 1,
      items: [
        { time: "15:30", title: "Pick up from accommodation in Dahab", desc: "Meet your guide and transfer to the boat at Dahab's Lagoona. Board and get settled as you prepare for the cruise." },
        { time: "16:00", title: "Snorkelling and relaxation at Napoleon Reef", desc: "Set off along the Red Sea, enjoying the warm afternoon sun and gentle sea breeze as the boat glides toward Napoleon Reef. Arrive at Napoleon Reef. Snorkel among colourful fish and corals, or relax on deck and take in the clear waters and peaceful surroundings." },
        { time: "17:30", title: "Golden hour sunset", desc: "As the sun begins to set, watch the mountains and sea bathe in golden light. Traditional Bedouin tea is served on board, offering a calm moment as the day winds down." },
        { time: "18:30", title: "Arrive back to Lagoona", desc: "Cruise back to Dahab's Lagoona as the evening sets in, enjoying the tranquil sea and sunset views. After this you will be taken back to your accommodation in Dahab." },
      ],
    },
  ],

  included: [
    "Pick-up from and drop-off to your accommodation (in Dahab)",
    "Snorkelling equipment (mask, fins & life jacket)",
    "Bottled water & fresh fruit",
    "Traditional Bedouin tea",
  ],

  notIncluded: [
    "Food",
    "Tips/gratuities for guides and/or drivers",
    "Any extra activities or services not mentioned in the itinerary",
  ],

  meetingPoint: "Dahab",

  guide: {
    name: "Sea The Soul Of Sinai",
    initial: "S",
    note: "Name shared after booking",
    bio: "Sea The Soul Of Sinai is a local host based in Dahab. After booking, we share the guide name, WhatsApp contact, and exact meeting instructions.",
  },

  reviews: [
    {
      text: "Amaaaaazing experience at dahab! Ahmed is a great guy and very helpful and loves what he does, he'll make sure you have the best time !",
      author: "B A",
      rating: 5,
      date: "Aug 2023",
    },
  ],

  faqs: [
    { q: "Where exactly do we meet?", a: "Dahab. Once you book, Sea The Soul Of Sinai sends the exact pin and pickup time on WhatsApp. No guessing." },
    { q: "Can you pick me up from my hotel?", a: "Usually yes. Drop your hotel address in the booking and Sea The Soul Of Sinai will confirm if direct pickup works." },
    { q: "How much does this cost?", a: "From $36.75 per person. That covers: Pick-up from and drop-off to your accommodation (in Dahab), Snorkelling equipment (mask, fins & life jacket), Bottled water & fresh fruit. Not included: Food, Tips/gratuities for guides and/or drivers." },
    { q: "Is pickup from Dahab included?", a: "Yes. Sea The Soul Of Sinai picks you up by Private Car from Dahab. Exact time and pin shared after booking." },
    { q: "What should I wear or bring?", a: "Sunglasses, sun cream, and a hat to protect from the sun." },
    { q: "Is there a private tour option?", a: "Yes. Sea The Soul Of Sinai offers private bookings for your group. Share your group size when booking and we'll confirm availability." },
  ],

  sidebarFacts: [
    { icon: <Clock size={16} />, label: "Duration", value: "4 Hours" },
    { icon: <Users size={16} />, label: "Group Size", value: "Private (2-8)" },
    { icon: <MapPin size={16} />, label: "Start", value: "Dahab" },
    { icon: <Globe2 size={16} />, label: "Languages", value: "English" },
  ],

  sidebarInclusions: [
    "Pickup & drop-off included",
    "Snorkelling equipment",
    "Water & fresh fruit",
    "Bedouin tea",
  ],

  relatedLinks: [
    { label: "Dahab Red Sea Snorkeling Tour", href: "/tours/egypt/dahab-red-sea", image: gallery[1], price: "36.75" },
    { label: "Napoleon Reef Dahab Tour", href: "/tours/egypt/napoleon-reef-dahab", image: gallery[2], price: "36.75" },
  ],
};

export default function RedSeaRelaxDahab() {
  return <TourTemplate tour={tour} />;
}
