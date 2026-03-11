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
  title: "Dahab Red Sea with Sea The Soul Of Sinai",
  country: "Egypt",
  badge: "4 Hours · Private Car · Sea The Soul Of Sinai · nature",
  location: "Dahab",
  duration: "4 Hours",
  price: "36.75",
  bookingUrl: "https://mysimsem.com/experiences/dahab-scuba-diving-snorkeling-golden-hour-reef-tour/",
  ctaText: "Book This Easy Dahab Tour — No Prep Needed",
  cancelNote: "Free cancellation · Instant confirmation",

  metaTitle: "Dahab Red Sea: 4 Hours Tour in Dahab from $36.75",
  metaDescription: "Dahab Red Sea snorkeling adventure! Experience 4 thrilling hours in Egypt's Red Sea. Private car pickup from Dahab, just $36.75 Book your Dahab Red Sea snorkeling tour now!",

  gallery: gallery.map((src, i) => ({ src, alt: `Dahab Red Sea snorkeling tour photo ${i + 1}` })),

  description: (
    <p>
      Gentle waves lap the shoreline, a soft invitation to the Red Sea's clear waters. This Dahab Red Sea tour takes you from your Dahab accommodation for a relaxing 4-hour journey. You'll ease into golden hour snorkelling at Napoleon Reef, perfect for those new to underwater exploration. With Sea The Soul Of Sinai as your guide, you'll feel completely at home, ensuring a carefree experience. Unlike tours that rush, this trip offers a peaceful pace, designed for anyone to enjoy the stunning marine life and the beauty of a sunset over Red Sea Dahab. We handle all the details, so you can simply float and unwind.
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
    "No prior experience required",
    "Sea The Soul Of Sinai guides every step",
    "Red Sea",
    "Napoleon Reef",
  ],

  whoFor: "Never done anything like this? Good — that's the point. Sea The Soul Of Sinai handles every detail from pickup to return. You show up, follow along, and leave with stories. No gear, no prep, no experience needed.",

  whatDifferent: "Sea The Soul Of Sinai takes first-timers through this all the time — the 4 Hours is designed for people with zero experience. Everything from Private Car to timing is handled. You book on Simsem, Sea gets paid directly, no middleman confusion.",
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
    { q: "Do I need to prepare anything?", a: "Nope. Just show up at the meeting point. Sea The Soul Of Sinai handles everything from there — Private Car, timing, stops." },
    { q: "How much does this cost?", a: "From $36.75 per person. That covers: Pick-up from and drop-off to your accommodation (in Dahab), Snorkelling equipment (mask, fins & life jacket), Bottled water & fresh fruit. Not included: Food, Tips/gratuities for guides and/or drivers." },
    { q: "Is pickup from Dahab included?", a: "Yes. Sea The Soul Of Sinai picks you up by Private Car from Dahab. Exact time and pin shared after booking." },
    { q: "What should I wear or bring?", a: "Sunglasses, sun cream, and a hat to protect from the sun." },
    { q: "What else should I know before booking?", a: "Swimming costume or trunks, and a towel. Comfortable clothing for the boat. Follow the instructions of your guide for safety while snorkelling and on the boat." },
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
    { label: "Napoleon Reef Dahab Snorkeling Tour", href: "/tours/egypt/napoleon-reef-dahab", image: gallery[1], price: "36.75" },
    { label: "Red Sea Relax Dahab Tour", href: "/tours/egypt/red-sea-relax-dahab", image: gallery[2], price: "36.75" },
  ],
};

export default function DahabRedSea() {
  return <TourTemplate tour={tour} />;
}
