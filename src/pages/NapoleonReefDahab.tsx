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
  title: "Napoleon Reef Dahab with Sea The Soul Of Sinai",
  country: "Egypt",
  badge: "4 Hours · Private Car · Sea The Soul Of Sinai · nature",
  location: "Dahab",
  duration: "4 Hours",
  price: "36.75",
  bookingUrl: "https://mysimsem.com/experiences/dahab-scuba-diving-snorkeling-golden-hour-reef-tour/",
  ctaText: "Check availability for this 4 Hours Dahab Tour",
  cancelNote: "Free cancellation · Instant confirmation",

  metaTitle: "Napoleon Reef Dahab: 4 Hours Tour in Dahab from $36.75",
  metaDescription: "Napoleon Reef Dahab snorkeling tour! Experience 4 thrilling hours in Egypt's Red Sea. Private car pickup from Dahab, just $36.75. Book your Napoleon Reef Dahab tour now!",

  gallery: gallery.map((src, i) => ({ src, alt: `Napoleon Reef Dahab tour photo ${i + 1}` })),

  description: (
    <p>
      This napoleon reef dahab tour takes you from Dahab and guides you through the Red Sea to Napoleon Reef. Over 4 Hours, you'll snorkel among marine life and witness a stunning golden hour sunset, all while your Sea The Soul Of Sinai shares insights into the coastal landscape. This experience is designed for direct booking, ensuring clear logistics and no middleman. You'll know exactly what's included before you arrive, making your booking process seamless and transparent. Unlike large group tours, this intimate experience focuses on natural beauty and tranquility, a perfect choice for those ready to secure their Dahab adventure with confidence.
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
    "Book direct — $36.75",
    "Instant confirmation via WhatsApp",
    "Red Sea",
    "Napoleon Reef",
  ],

  whoFor: "Ready to go? $36.75 gets you Pick-up from and drop-off to your accommodation (in Dahab), Snorkelling equipment (mask, fins & life jacket), Bottled water & fresh fruit. Book direct on Simsem — instant confirmation, WhatsApp contact with Sea The Soul Of Sinai, and everything locked in before you arrive.\n\n• From $36.75 per person\n• Private Car included\n• 4 Hours — fully guided\n• Instant booking confirmation",

  whatDifferent: "No OTA fees, no middleman. You book direct on Simsem, Sea The Soul Of Sinai gets 100% of the revenue. $36.75 covers private car, guide, and Pick-up from and drop-off to your accommodation (in Dahab) + Snorkelling equipment (mask, fins & life jacket). After booking, Sea contacts you on WhatsApp with the exact meeting pin and timing.",
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
    { q: "How do I book?", a: "Click \"Book Now\" on this page. You'll get instant confirmation and Sea The Soul Of Sinai will contact you on WhatsApp with exact meeting details." },
    { q: "Can I cancel or change dates?", a: "Cancellation terms are shown at checkout. Contact Sea The Soul Of Sinai directly on WhatsApp after booking for date changes." },
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
    { label: "Red Sea Relax Dahab Tour", href: "/tours/egypt/red-sea-relax-dahab", image: gallery[2], price: "36.75" },
  ],
};

export default function NapoleonReefDahab() {
  return <TourTemplate tour={tour} />;
}
