// ─── Place type taxonomy (locked enum) ───
export type PlaceType =
  | "country"
  | "region"
  | "city"
  | "town"
  | "village"
  | "district"
  | "neighborhood"
  | "site"
  | "monument"
  | "museum"
  | "beach"
  | "island"
  | "mountain"
  | "desert"
  | "wadi"
  | "oasis"
  | "park"
  | "reef"
  | "natural"
  | "resort";

export interface Place {
  id: string;            // globally unique slug (namespace generic names with parent, e.g. "petra-treasury")
  name: string;          // human-readable display name
  type: PlaceType;       // constrained to the enum above
  parent_id: string | null;
  country: string;       // ISO country code: JO, EG, SY, TR, DZ, SA, LB, MA…
  aliases?: string[];    // search synonyms ("Madain Saleh" → matches "hegra")
  lat?: number;          // optional geo coords for map view + nearby filters
  lng?: number;
  featured?: boolean;    // surface on country landing pages
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  heroImage: string;
  description: string;
}

// ─── Experience Categories (parent level) ───
export type ExperienceCategory = "getaway" | "local-living" | "dining";

export interface CategoryInfo {
  id: ExperienceCategory;
  name: string;
  icon: string;
  description: string;
  tourTypes: string[];
}

export const experienceCategories: CategoryInfo[] = [
  {
    id: "getaway",
    name: "Getaway",
    icon: "🏕️",
    description: "Multi-day escapes with hikes, desert camps, and scenic explorations",
    tourTypes: [
      "Jeep Tour", "Desert Safari", "Dune Bashing", "Hiking", "Trekking", "Wadi Hiking",
      "Nature Walk", "Camping", "Desert Camping", "Glamping", "Stargazing", "Sunrise Tour",
      "Sunset Tour", "Hot Air Balloon", "Horse Riding", "Camel Riding", "ATV Tour",
      "Buggy Tour", "Cycling Tour", "Mountain Biking", "Kayaking", "Canoeing", "Rafting",
      "Boat Tour", "Sailing", "Yacht Trip", "Snorkeling", "Scuba Diving", "Freediving",
      "Surfing", "Kitesurfing", "Paddleboarding", "Wildlife Safari", "Birdwatching Tour",
      "National Park Tour", "Oasis Tour", "Island Hopping", "Waterfall Tour",
      "Canyon Adventure", "Rock Climbing", "Caving Experience", "Ski Experience",
      "Snow Adventure", "Day Trip", "Road Trip", "Multi Day Adventure",
      "Private Getaway", "Beach Escape",
    ],
  },
  {
    id: "local-living",
    name: "Local Living",
    icon: "🏠",
    description: "Immersive encounters with local culture, history, and daily life",
    tourTypes: [
      "City Walk", "Cultural Tour", "Historical Tour", "Heritage Tour", "Local Market Tour",
      "Souq Tour", "Street Food Tour", "Food Tasting", "Cooking Class", "Coffee Experience",
      "Tea Experience", "Village Experience", "Bedouin Experience", "Nomad Experience",
      "Farm Visit", "Artisan Workshop", "Craft Workshop", "Photography Walk",
      "Architecture Tour", "Museum Tour", "Gallery Tour", "Religious Heritage Tour",
      "Community Experience", "Local Family Experience", "Festival Experience",
      "Storytelling Tour", "Music Experience", "Dance Experience", "Night City Walk",
      "Shopping Experience", "Fashion & Design Tour", "Wellness Experience",
      "Hammam Experience", "Perfume Workshop", "Calligraphy Workshop",
      "Language & Cultural Exchange", "Volunteer Experience",
    ],
  },
  {
    id: "dining",
    name: "Dining",
    icon: "🍽️",
    description: "Savor authentic flavors with locals over traditional dishes",
    tourTypes: [
      "Local Dinner Experience", "Home Dining Experience", "Chef's Table",
      "Traditional Breakfast", "Traditional Lunch", "Traditional Dinner",
      "Food Tasting Tour", "Street Food Experience", "Wine Tasting", "Beer Tasting",
      "Cocktail Experience", "Tea Tasting", "Coffee Tasting", "Dessert Experience",
      "Rooftop Dinner", "Farm to Table Dining", "Bedouin Dinner", "Desert Dinner",
      "Seafood Experience", "BBQ Experience", "Picnic Experience", "Cooking Class",
      "Baking Experience", "Market to Table Experience", "Brunch Experience",
      "Fine Dining Experience", "Sunset Dinner Cruise", "Iftar Experience",
      "Ramadan Night Experience",
    ],
  },
];

export function getCategoryForTourType(tourType: string): ExperienceCategory {
  for (const cat of experienceCategories) {
    if (cat.tourTypes.includes(tourType)) return cat.id;
  }
  return "getaway";
}

// Get all tour types as a flat array
export function getTourTypesForCategory(categoryId: ExperienceCategory): string[] {
  const cat = experienceCategories.find((c) => c.id === categoryId);
  return cat ? cat.tourTypes : [];
}

export interface GuideTour {
  id: string;
  title: string;
  main_place_id: string;
  places: string[]; // child place ids
  price: number;
  duration: string;
  tour_type: string;
  category: ExperienceCategory;
  description: string;
  image?: string;
  status: "draft" | "published";
  created_at: string;
}

// ─── Countries ───
export const countriesAPI: CountryInfo[] = [
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    heroImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=1400&q=80",
    description: "Discover Egypt tours with local guides and explore the best places to visit in Egypt. Visit the Pyramids of Giza, Luxor, Aswan, and Dahab with guided cultural tours, desert trips, and Nile experiences. Browse and book authentic Egypt tours and travel experiences with trusted local experts.",
  },
  {
    code: "JO",
    name: "Jordan",
    flag: "🇯🇴",
    heroImage: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1400&q=80",
    description: "Discover Jordan tours with local guides and explore the best places to visit in Jordan. Visit Petra, Wadi Rum, the Dead Sea, Amman, and Jerash with guided cultural tours, desert trips, and local experiences. Browse and book authentic Jordan tours and travel experiences with trusted local experts.",
  },
  {
    code: "MA",
    name: "Morocco",
    flag: "🇲🇦",
    heroImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1400&q=80",
    description: "Discover Morocco tours with local guides and visit places like Marrakech, Fes, Chefchaouen, and the Sahara Desert. Browse and book Morocco tours directly with local experts through Simsem — the zero-commission marketplace for tours in the Arab world.",
  },
  {
    code: "DZ",
    name: "Algeria",
    flag: "🇩🇿",
    heroImage: "https://images.unsplash.com/photo-1583508805133-8fd03a9916d4?w=1400&q=80",
    description: "Discover Algeria tours with local guides and visit places like the Casbah of Algiers, the Roman ruins of Timgad, and the Sahara desert in Tassili n'Ajjer. Browse and book Algeria tours directly with local experts through Simsem.",
  },
  {
    code: "SY",
    name: "Syria",
    flag: "🇸🇾",
    heroImage: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=1400&q=80",
    description: "Discover Syria tours with local guides and explore one of the Middle East's most historic destinations. Visit the Old City of Damascus, the ancient ruins of Palmyra, the markets of Aleppo, and traditional villages across the country.",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    heroImage: "https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=1400&q=80",
    description: "Discover Saudi Arabia tours with local guides. Explore AlUla, Riyadh, Jeddah, and the Red Sea coast. Browse and book authentic Saudi tours with trusted local experts on Simsem.",
  },
  {
    code: "LB",
    name: "Lebanon",
    flag: "🇱🇧",
    heroImage: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1400&q=80",
    description: "Discover Lebanon tours with local guides. Visit Beirut, Baalbek, Byblos, and the Cedars. Browse and book authentic Lebanese experiences with trusted local experts on Simsem.",
  },
  {
    code: "TR",
    name: "Turkey",
    flag: "🇹🇷",
    heroImage: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1400&q=80",
    description: "Discover Turkey tours with local guides. Explore Istanbul, Cappadocia, Ephesus, Pamukkale, and the Turkish Riviera. Browse and book authentic Turkish experiences with trusted local experts on Simsem.",
  },
  {
    code: "TN",
    name: "Tunisia",
    flag: "🇹🇳",
    heroImage: "https://images.unsplash.com/photo-1572953109213-3be62398eb95?w=1400&q=80",
    description: "Discover Tunisia tours with local guides. Visit Carthage, Sidi Bou Said, the Sahara, and Djerba. Browse and book authentic Tunisian experiences with trusted local experts on Simsem.",
  },
  {
    code: "OM",
    name: "Oman",
    flag: "🇴🇲",
    heroImage: "https://images.unsplash.com/photo-1545047068-3eded44b0a78?w=1400&q=80",
    description: "Discover Oman tours with local guides. Explore Muscat, Nizwa, Wahiba Sands, and the Musandam Peninsula. Browse and book authentic Omani experiences with trusted local experts on Simsem.",
  },
];

// ════════════════════════════════════════════════
// ─── MASTER PLACES API ───
// ════════════════════════════════════════════════

// ─── EGYPT ───
const egyptPlaces: Place[] = [
  { id: "cairo", name: "Cairo", type: "city", parent_id: null, country: "EG" },
  { id: "old-cairo", name: "Old Cairo", type: "district", parent_id: "cairo", country: "EG" },
  { id: "coptic-cairo", name: "Coptic Cairo", type: "district", parent_id: "old-cairo", country: "EG" },
  { id: "islamic-cairo", name: "Islamic Cairo", type: "district", parent_id: "old-cairo", country: "EG" },
  { id: "khan-el-khalili", name: "Khan El Khalili", type: "site", parent_id: "islamic-cairo", country: "EG" },
  { id: "al-muizz-street", name: "Al Muizz Street", type: "site", parent_id: "islamic-cairo", country: "EG" },
  { id: "citadel-salah-din", name: "Citadel of Salah El Din", type: "site", parent_id: "cairo", country: "EG" },
  { id: "mohamed-ali-mosque", name: "Mohamed Ali Mosque", type: "site", parent_id: "citadel-salah-din", country: "EG" },
  { id: "egyptian-museum", name: "Egyptian Museum", type: "museum", parent_id: "cairo", country: "EG" },
  { id: "grand-egyptian-museum", name: "Grand Egyptian Museum", type: "museum", parent_id: "giza", country: "EG" },
  { id: "zamalek", name: "Zamalek", type: "district", parent_id: "cairo", country: "EG" },
  { id: "garden-city", name: "Garden City", type: "district", parent_id: "cairo", country: "EG" },

  { id: "giza", name: "Giza", type: "city", parent_id: null, country: "EG" },
  { id: "giza-plateau", name: "Giza Plateau", type: "site", parent_id: "giza", country: "EG" },
  { id: "great-pyramid", name: "Great Pyramid of Khufu", type: "site", parent_id: "giza-plateau", country: "EG" },
  { id: "khafre-pyramid", name: "Pyramid of Khafre", type: "site", parent_id: "giza-plateau", country: "EG" },
  { id: "menkaure-pyramid", name: "Pyramid of Menkaure", type: "site", parent_id: "giza-plateau", country: "EG" },
  { id: "sphinx", name: "Great Sphinx", type: "site", parent_id: "giza-plateau", country: "EG" },
  { id: "saqqara", name: "Saqqara", type: "site", parent_id: "giza", country: "EG" },
  { id: "step-pyramid", name: "Step Pyramid of Djoser", type: "site", parent_id: "saqqara", country: "EG" },
  { id: "dahshur", name: "Dahshur", type: "site", parent_id: "giza", country: "EG" },
  { id: "bent-pyramid", name: "Bent Pyramid", type: "site", parent_id: "dahshur", country: "EG" },
  { id: "red-pyramid", name: "Red Pyramid", type: "site", parent_id: "dahshur", country: "EG" },
  { id: "memphis", name: "Memphis", type: "site", parent_id: "giza", country: "EG" },

  { id: "alexandria", name: "Alexandria", type: "city", parent_id: null, country: "EG" },
  { id: "bibliotheca-alexandrina", name: "Bibliotheca Alexandrina", type: "site", parent_id: "alexandria", country: "EG" },
  { id: "qaitbay-citadel", name: "Citadel of Qaitbay", type: "site", parent_id: "alexandria", country: "EG" },
  { id: "montaza-palace", name: "Montaza Palace", type: "site", parent_id: "alexandria", country: "EG" },
  { id: "alexandria-corniche", name: "Alexandria Corniche", type: "site", parent_id: "alexandria", country: "EG" },

  { id: "luxor", name: "Luxor", type: "city", parent_id: null, country: "EG" },
  { id: "east-bank", name: "Luxor East Bank", type: "district", parent_id: "luxor", country: "EG" },
  { id: "west-bank", name: "Luxor West Bank", type: "district", parent_id: "luxor", country: "EG" },
  { id: "karnak-temple", name: "Karnak Temple", type: "site", parent_id: "east-bank", country: "EG" },
  { id: "luxor-temple", name: "Luxor Temple", type: "site", parent_id: "east-bank", country: "EG" },
  { id: "valley-of-the-kings", name: "Valley of the Kings", type: "site", parent_id: "west-bank", country: "EG" },
  { id: "valley-of-the-queens", name: "Valley of the Queens", type: "site", parent_id: "west-bank", country: "EG" },
  { id: "hatchepsut-temple", name: "Temple of Hatshepsut", type: "site", parent_id: "west-bank", country: "EG" },
  { id: "colossi-of-memnon", name: "Colossi of Memnon", type: "site", parent_id: "west-bank", country: "EG" },

  { id: "aswan", name: "Aswan", type: "city", parent_id: null, country: "EG" },
  { id: "philae-temple", name: "Philae Temple", type: "site", parent_id: "aswan", country: "EG" },
  { id: "abu-simbel", name: "Abu Simbel", type: "site", parent_id: "aswan", country: "EG" },
  { id: "kom-ombo", name: "Kom Ombo", type: "site", parent_id: "aswan", country: "EG" },
  { id: "edfu", name: "Edfu", type: "site", parent_id: "aswan", country: "EG" },
  { id: "nubian-village", name: "Nubian Village", type: "site", parent_id: "aswan", country: "EG" },

  { id: "red-sea", name: "Red Sea Coast", type: "region", parent_id: null, country: "EG" },
  { id: "hurghada", name: "Hurghada", type: "city", parent_id: "red-sea", country: "EG" },
  { id: "el-gouna", name: "El Gouna", type: "resort", parent_id: "hurghada", country: "EG" },
  { id: "makadi-bay", name: "Makadi Bay", type: "resort", parent_id: "hurghada", country: "EG" },
  { id: "sahl-hasheesh", name: "Sahl Hasheesh", type: "resort", parent_id: "hurghada", country: "EG" },
  { id: "marsa-alam", name: "Marsa Alam", type: "city", parent_id: "red-sea", country: "EG" },
  { id: "port-ghalib", name: "Port Ghalib", type: "resort", parent_id: "marsa-alam", country: "EG" },

  { id: "sinai", name: "Sinai", type: "region", parent_id: null, country: "EG" },
  { id: "sharm-el-sheikh", name: "Sharm El Sheikh", type: "city", parent_id: "sinai", country: "EG" },
  { id: "ras-mohammed", name: "Ras Mohammed National Park", type: "park", parent_id: "sharm-el-sheikh", country: "EG" },
  { id: "dahab", name: "Dahab", type: "city", parent_id: "sinai", country: "EG" },
  { id: "blue-hole", name: "Blue Hole", type: "reef", parent_id: "dahab", country: "EG" },
  { id: "nueiba", name: "Nuweiba", type: "city", parent_id: "sinai", country: "EG" },
  { id: "saint-catherine", name: "Saint Catherine", type: "town", parent_id: "sinai", country: "EG" },
  { id: "mount-sinai", name: "Mount Sinai", type: "site", parent_id: "saint-catherine", country: "EG" },
  { id: "saint-catherine-monastery", name: "Saint Catherine Monastery", type: "site", parent_id: "saint-catherine", country: "EG" },

  { id: "fayoum", name: "Fayoum", type: "city", parent_id: null, country: "EG" },
  { id: "wadi-el-hitan", name: "Wadi El Hitan", type: "site", parent_id: "fayoum", country: "EG" },
  { id: "qarun-lake", name: "Lake Qarun", type: "natural", parent_id: "fayoum", country: "EG" },
  { id: "tunis-village", name: "Tunis Village", type: "village", parent_id: "fayoum", country: "EG" },

  { id: "western-desert", name: "Western Desert", type: "region", parent_id: null, country: "EG" },
  { id: "siwa", name: "Siwa Oasis", type: "oasis", parent_id: "western-desert", country: "EG" },
  { id: "bahariya", name: "Bahariya Oasis", type: "oasis", parent_id: "western-desert", country: "EG" },
  { id: "white-desert", name: "White Desert", type: "natural", parent_id: "bahariya", country: "EG" },
  { id: "black-desert", name: "Black Desert", type: "natural", parent_id: "bahariya", country: "EG" },
  { id: "dakhla", name: "Dakhla Oasis", type: "oasis", parent_id: "western-desert", country: "EG" },
  { id: "kharga", name: "Kharga Oasis", type: "oasis", parent_id: "western-desert", country: "EG" },

  { id: "upper-egypt", name: "Upper Egypt", type: "region", parent_id: null, country: "EG" },
  { id: "dendera", name: "Dendera", type: "town", parent_id: "upper-egypt", country: "EG" },
  { id: "dendera-temple", name: "Temple of Dendera", type: "site", parent_id: "dendera", country: "EG" },
  { id: "abydos", name: "Abydos", type: "town", parent_id: "upper-egypt", country: "EG" },
  { id: "abydos-temple", name: "Temple of Abydos", type: "site", parent_id: "abydos", country: "EG" },
];

// ─── JORDAN ───
const jordanPlaces: Place[] = [
  { id: "amman", name: "Amman", type: "city", parent_id: null, country: "JO" },
  { id: "downtown-amman", name: "Downtown Amman", type: "district", parent_id: "amman", country: "JO" },
  { id: "amman-citadel", name: "Amman Citadel", type: "site", parent_id: "amman", country: "JO" },
  { id: "roman-theater-amman", name: "Roman Theater", type: "site", parent_id: "downtown-amman", country: "JO" },
  { id: "rainbow-street", name: "Rainbow Street", type: "site", parent_id: "amman", country: "JO" },
  { id: "jabal-al-weibdeh", name: "Jabal Al Weibdeh", type: "district", parent_id: "amman", country: "JO" },
  { id: "jabal-amman", name: "Jabal Amman", type: "district", parent_id: "amman", country: "JO" },

  { id: "madaba", name: "Madaba", type: "city", parent_id: null, country: "JO" },
  { id: "st-george-church", name: "St George Church", type: "site", parent_id: "madaba", country: "JO" },
  { id: "madaba-mosaic-map", name: "Madaba Mosaic Map", type: "site", parent_id: "st-george-church", country: "JO" },
  { id: "mount-nebo", name: "Mount Nebo", type: "site", parent_id: "madaba", country: "JO" },

  { id: "dead-sea", name: "Dead Sea", type: "natural", parent_id: null, country: "JO" },
  { id: "dead-sea-beach", name: "Dead Sea Beach", type: "site", parent_id: "dead-sea", country: "JO" },
  { id: "bethany-beyond-jordan", name: "Bethany Beyond the Jordan", type: "site", parent_id: "dead-sea", country: "JO" },

  { id: "petra-region", name: "Petra Region", type: "region", parent_id: null, country: "JO" },
  { id: "wadi-musa", name: "Wadi Musa", type: "town", parent_id: "petra-region", country: "JO" },
  { id: "petra", name: "Petra", type: "site", parent_id: "wadi-musa", country: "JO" },
  { id: "siq", name: "Al Siq", type: "site", parent_id: "petra", country: "JO" },
  { id: "treasury", name: "Treasury", type: "site", parent_id: "petra", country: "JO" },
  { id: "street-of-facades", name: "Street of Facades", type: "site", parent_id: "petra", country: "JO" },
  { id: "royal-tombs", name: "Royal Tombs", type: "site", parent_id: "petra", country: "JO" },
  { id: "monastery", name: "Monastery", type: "site", parent_id: "petra", country: "JO" },
  { id: "high-place-of-sacrifice", name: "High Place of Sacrifice", type: "site", parent_id: "petra", country: "JO" },
  { id: "little-petra", name: "Little Petra", type: "site", parent_id: "petra-region", country: "JO" },

  { id: "wadi-rum", name: "Wadi Rum", type: "natural", parent_id: null, country: "JO" },
  { id: "rum-village", name: "Rum Village", type: "village", parent_id: "wadi-rum", country: "JO" },
  { id: "lawrence-spring", name: "Lawrence Spring", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "khazali-canyon", name: "Khazali Canyon", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "burdah-rock-bridge", name: "Burdah Rock Bridge", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "um-frouth-rock-bridge", name: "Um Frouth Rock Bridge", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "wadi-rum-desert", name: "Wadi Rum Desert", type: "natural", parent_id: "wadi-rum", country: "JO" },

  { id: "aqaba", name: "Aqaba", type: "city", parent_id: null, country: "JO" },
  { id: "aqaba-beach", name: "Aqaba Beach", type: "site", parent_id: "aqaba", country: "JO" },
  { id: "red-sea-jordan", name: "Red Sea (Jordan)", type: "natural", parent_id: "aqaba", country: "JO" },
  { id: "aqaba-marine-park", name: "Aqaba Marine Park", type: "park", parent_id: "aqaba", country: "JO" },

  { id: "jerash", name: "Jerash", type: "city", parent_id: null, country: "JO" },
  { id: "jerash-ruins", name: "Jerash Ruins", type: "site", parent_id: "jerash", country: "JO" },
  { id: "hadrians-arch", name: "Hadrian's Arch", type: "site", parent_id: "jerash", country: "JO" },
  { id: "oval-plaza", name: "Oval Plaza", type: "site", parent_id: "jerash", country: "JO" },
  { id: "cardo-maximus", name: "Cardo Maximus", type: "site", parent_id: "jerash", country: "JO" },

  { id: "ajloun", name: "Ajloun", type: "city", parent_id: null, country: "JO" },
  { id: "ajloun-castle", name: "Ajloun Castle", type: "site", parent_id: "ajloun", country: "JO" },
  { id: "ajloun-forest", name: "Ajloun Forest Reserve", type: "park", parent_id: "ajloun", country: "JO" },

  { id: "irbid", name: "Irbid", type: "city", parent_id: null, country: "JO" },
  { id: "umm-qais", name: "Umm Qais", type: "site", parent_id: "irbid", country: "JO" },
  { id: "gadara-ruins", name: "Gadara Ruins", type: "site", parent_id: "umm-qais", country: "JO" },

  { id: "karak", name: "Karak", type: "city", parent_id: null, country: "JO" },
  { id: "karak-castle", name: "Karak Castle", type: "site", parent_id: "karak", country: "JO" },

  { id: "shobak", name: "Shobak", type: "town", parent_id: null, country: "JO" },
  { id: "shobak-castle", name: "Shobak Castle", type: "site", parent_id: "shobak", country: "JO" },

  { id: "dana", name: "Dana", type: "town", parent_id: null, country: "JO" },
  { id: "dana-biosphere", name: "Dana Biosphere Reserve", type: "park", parent_id: "dana", country: "JO" },

  { id: "wadi-mujib", name: "Wadi Mujib", type: "natural", parent_id: null, country: "JO" },
  { id: "wadi-mujib-reserve", name: "Wadi Mujib Reserve", type: "park", parent_id: "wadi-mujib", country: "JO" },

  { id: "azraq", name: "Azraq", type: "town", parent_id: null, country: "JO" },
  { id: "azraq-wetland", name: "Azraq Wetland Reserve", type: "park", parent_id: "azraq", country: "JO" },
  { id: "qasr-azraq", name: "Qasr Azraq", type: "site", parent_id: "azraq", country: "JO" },

  { id: "eastern-desert", name: "Eastern Desert", type: "region", parent_id: null, country: "JO" },
  { id: "qasr-amra", name: "Qasr Amra", type: "site", parent_id: "eastern-desert", country: "JO" },
  { id: "qasr-kharana", name: "Qasr Kharana", type: "site", parent_id: "eastern-desert", country: "JO" },
  { id: "qasr-mushatta", name: "Qasr Mushatta", type: "site", parent_id: "eastern-desert", country: "JO" },
];

// ─── SYRIA ───
const syriaPlaces: Place[] = [
  { id: "damascus", name: "Damascus", type: "city", parent_id: null, country: "SY" },
  { id: "old-damascus", name: "Old Damascus", type: "district", parent_id: "damascus", country: "SY" },
  { id: "umayyad-mosque-damascus", name: "Umayyad Mosque", type: "site", parent_id: "old-damascus", country: "SY" },
  { id: "souq-al-hamidiyah", name: "Souq Al Hamidiyah", type: "site", parent_id: "old-damascus", country: "SY" },
  { id: "azem-palace", name: "Azem Palace", type: "site", parent_id: "old-damascus", country: "SY" },
  { id: "straight-street", name: "Straight Street", type: "site", parent_id: "old-damascus", country: "SY" },
  { id: "bab-touma", name: "Bab Touma", type: "district", parent_id: "old-damascus", country: "SY" },
  { id: "bab-sharqi", name: "Bab Sharqi", type: "district", parent_id: "old-damascus", country: "SY" },
  { id: "christian-quarter-damascus", name: "Christian Quarter", type: "district", parent_id: "old-damascus", country: "SY" },
  { id: "national-museum-damascus", name: "National Museum of Damascus", type: "museum", parent_id: "damascus", country: "SY" },
  { id: "al-hijaz-station", name: "Al Hijaz Railway Station", type: "site", parent_id: "damascus", country: "SY" },
  { id: "takiyya-sulaymaniyya", name: "Takiyya Sulaymaniyya", type: "site", parent_id: "damascus", country: "SY" },
  { id: "mount-qasioun", name: "Mount Qasioun", type: "site", parent_id: "damascus", country: "SY" },
  { id: "ghouta", name: "Ghouta", type: "natural", parent_id: "damascus", country: "SY" },

  { id: "maaloula", name: "Maaloula", type: "town", parent_id: null, country: "SY" },
  { id: "saint-thecla-monastery", name: "Saint Thecla Monastery", type: "site", parent_id: "maaloula", country: "SY" },
  { id: "saints-sergius-bacchus", name: "Saints Sergius and Bacchus Monastery", type: "site", parent_id: "maaloula", country: "SY" },

  { id: "sednaya", name: "Sednaya", type: "town", parent_id: null, country: "SY" },
  { id: "sednaya-monastery", name: "Our Lady of Sednaya Monastery", type: "site", parent_id: "sednaya", country: "SY" },

  { id: "qalamoun", name: "Qalamoun Mountains", type: "natural", parent_id: null, country: "SY" },

  { id: "aleppo", name: "Aleppo", type: "city", parent_id: null, country: "SY" },
  { id: "old-aleppo", name: "Old Aleppo", type: "district", parent_id: "aleppo", country: "SY" },
  { id: "aleppo-citadel", name: "Aleppo Citadel", type: "site", parent_id: "old-aleppo", country: "SY" },
  { id: "aleppo-souk", name: "Aleppo Souk", type: "site", parent_id: "old-aleppo", country: "SY" },
  { id: "great-mosque-aleppo", name: "Great Mosque of Aleppo", type: "site", parent_id: "old-aleppo", country: "SY" },
  { id: "khan-al-wazir", name: "Khan Al Wazir", type: "site", parent_id: "old-aleppo", country: "SY" },
  { id: "al-jdeideh", name: "Al Jdeideh", type: "district", parent_id: "aleppo", country: "SY" },
  { id: "national-museum-aleppo", name: "National Museum of Aleppo", type: "museum", parent_id: "aleppo", country: "SY" },

  { id: "homs", name: "Homs", type: "city", parent_id: null, country: "SY" },
  { id: "old-homs", name: "Old Homs", type: "district", parent_id: "homs", country: "SY" },
  { id: "crac-des-chevaliers", name: "Crac des Chevaliers", type: "site", parent_id: "homs", country: "SY" },
  { id: "qalat-salah-eldin", name: "Qalat Salah El Din", type: "site", parent_id: "homs", country: "SY" },

  { id: "hama", name: "Hama", type: "city", parent_id: null, country: "SY" },
  { id: "norias", name: "Norias of Hama", type: "site", parent_id: "hama", country: "SY" },
  { id: "asi-river", name: "Orontes River", type: "natural", parent_id: "hama", country: "SY" },

  { id: "latakia", name: "Latakia", type: "city", parent_id: null, country: "SY" },
  { id: "latakia-corniche", name: "Latakia Corniche", type: "site", parent_id: "latakia", country: "SY" },
  { id: "latakia-beach", name: "Latakia Beach", type: "site", parent_id: "latakia", country: "SY" },
  { id: "ugarit", name: "Ugarit (Ras Shamra)", type: "site", parent_id: "latakia", country: "SY" },
  { id: "saladin-castle", name: "Saladin Castle", type: "site", parent_id: "latakia", country: "SY" },
  { id: "kasab", name: "Kasab", type: "town", parent_id: "latakia", country: "SY" },
  { id: "slunfeh", name: "Slunfeh", type: "town", parent_id: "latakia", country: "SY" },

  { id: "tartus", name: "Tartus", type: "city", parent_id: null, country: "SY" },
  { id: "old-tartus", name: "Old Tartus", type: "district", parent_id: "tartus", country: "SY" },
  { id: "tartus-corniche", name: "Tartus Corniche", type: "site", parent_id: "tartus", country: "SY" },
  { id: "arwad-island", name: "Arwad Island", type: "site", parent_id: "tartus", country: "SY" },
  { id: "amrit", name: "Amrit", type: "site", parent_id: "tartus", country: "SY" },
  { id: "margat-castle", name: "Margat Castle", type: "site", parent_id: "tartus", country: "SY" },

  { id: "palmyra-region", name: "Palmyra Region", type: "region", parent_id: null, country: "SY" },
  { id: "palmyra", name: "Palmyra", type: "site", parent_id: "palmyra-region", country: "SY" },
  { id: "temple-of-bel", name: "Temple of Bel", type: "site", parent_id: "palmyra", country: "SY" },
  { id: "monumental-arch", name: "Monumental Arch", type: "site", parent_id: "palmyra", country: "SY" },
  { id: "roman-theater-palmyra", name: "Roman Theater", type: "site", parent_id: "palmyra", country: "SY" },
  { id: "great-colonnade", name: "Great Colonnade", type: "site", parent_id: "palmyra", country: "SY" },
  { id: "valley-of-the-tombs", name: "Valley of the Tombs", type: "site", parent_id: "palmyra", country: "SY" },

  { id: "bosra", name: "Bosra", type: "town", parent_id: null, country: "SY" },
  { id: "bosra-roman-theater", name: "Bosra Roman Theater", type: "site", parent_id: "bosra", country: "SY" },
  { id: "bosra-old-city", name: "Old Bosra", type: "district", parent_id: "bosra", country: "SY" },

  { id: "sweida", name: "Sweida", type: "city", parent_id: null, country: "SY" },
  { id: "shahba", name: "Shahba", type: "town", parent_id: "sweida", country: "SY" },
  { id: "qanawat", name: "Qanawat", type: "site", parent_id: "sweida", country: "SY" },
  { id: "jabal-al-arab", name: "Jabal Al Arab", type: "natural", parent_id: "sweida", country: "SY" },

  { id: "idlib", name: "Idlib", type: "city", parent_id: null, country: "SY" },
  { id: "dead-cities", name: "Ancient Villages of Northern Syria", type: "site", parent_id: "idlib", country: "SY" },
  { id: "serjilla", name: "Serjilla", type: "site", parent_id: "dead-cities", country: "SY" },
  { id: "al-bara", name: "Al Bara", type: "site", parent_id: "dead-cities", country: "SY" },
  { id: "ebla", name: "Ebla", type: "site", parent_id: "idlib", country: "SY" },

  { id: "deir-ez-zor", name: "Deir ez-Zor", type: "city", parent_id: null, country: "SY" },
  { id: "euphrates", name: "Euphrates River", type: "natural", parent_id: "deir-ez-zor", country: "SY" },
  { id: "mari", name: "Mari", type: "site", parent_id: "deir-ez-zor", country: "SY" },
  { id: "dura-europos", name: "Dura-Europos", type: "site", parent_id: "deir-ez-zor", country: "SY" },

  { id: "raqqa", name: "Raqqa", type: "city", parent_id: null, country: "SY" },
  { id: "raqqa-old-city", name: "Old Raqqa", type: "district", parent_id: "raqqa", country: "SY" },

  { id: "hasakah", name: "Hasakah", type: "city", parent_id: null, country: "SY" },
  { id: "qamishli", name: "Qamishli", type: "city", parent_id: "hasakah", country: "SY" },
  { id: "ras-al-ain", name: "Ras al-Ain", type: "town", parent_id: "hasakah", country: "SY" },
  { id: "khabur-river", name: "Khabur River", type: "natural", parent_id: "hasakah", country: "SY" },
];

// ─── TURKEY ───
const turkeyPlaces: Place[] = [
  { id: "istanbul", name: "Istanbul", type: "city", parent_id: null, country: "TR" },
  { id: "sultanahmet", name: "Sultanahmet", type: "district", parent_id: "istanbul", country: "TR" },
  { id: "hagia-sophia", name: "Hagia Sophia", type: "site", parent_id: "sultanahmet", country: "TR" },
  { id: "blue-mosque", name: "Blue Mosque", type: "site", parent_id: "sultanahmet", country: "TR" },
  { id: "topkapi-palace", name: "Topkapi Palace", type: "site", parent_id: "sultanahmet", country: "TR" },
  { id: "basilica-cistern", name: "Basilica Cistern", type: "site", parent_id: "sultanahmet", country: "TR" },
  { id: "grand-bazaar", name: "Grand Bazaar", type: "site", parent_id: "istanbul", country: "TR" },
  { id: "spice-bazaar", name: "Spice Bazaar", type: "site", parent_id: "istanbul", country: "TR" },
  { id: "galata", name: "Galata", type: "district", parent_id: "istanbul", country: "TR" },
  { id: "galata-tower", name: "Galata Tower", type: "site", parent_id: "galata", country: "TR" },
  { id: "taksim", name: "Taksim", type: "district", parent_id: "istanbul", country: "TR" },
  { id: "istiklal-street", name: "Istiklal Street", type: "site", parent_id: "taksim", country: "TR" },
  { id: "bosphorus", name: "Bosphorus", type: "natural", parent_id: "istanbul", country: "TR" },
  { id: "ortakoy", name: "Ortakoy", type: "district", parent_id: "istanbul", country: "TR" },
  { id: "bosphorus-cruise", name: "Bosphorus Cruise", type: "site", parent_id: "bosphorus", country: "TR" },

  { id: "cappadocia", name: "Cappadocia", type: "region", parent_id: null, country: "TR" },
  { id: "goreme", name: "Goreme", type: "town", parent_id: "cappadocia", country: "TR" },
  { id: "goreme-open-air-museum", name: "Goreme Open Air Museum", type: "site", parent_id: "goreme", country: "TR" },
  { id: "love-valley", name: "Love Valley", type: "natural", parent_id: "cappadocia", country: "TR" },
  { id: "pasabag", name: "Pasabag", type: "site", parent_id: "cappadocia", country: "TR" },
  { id: "uchisar", name: "Uchisar", type: "town", parent_id: "cappadocia", country: "TR" },
  { id: "uchisar-castle", name: "Uchisar Castle", type: "site", parent_id: "uchisar", country: "TR" },
  { id: "derinkuyu", name: "Derinkuyu Underground City", type: "site", parent_id: "cappadocia", country: "TR" },
  { id: "kaymakli", name: "Kaymakli Underground City", type: "site", parent_id: "cappadocia", country: "TR" },

  { id: "antalya", name: "Antalya", type: "city", parent_id: null, country: "TR" },
  { id: "kaleici", name: "Kaleici Old Town", type: "district", parent_id: "antalya", country: "TR" },
  { id: "duden-waterfalls", name: "Duden Waterfalls", type: "natural", parent_id: "antalya", country: "TR" },
  { id: "konyaalti-beach", name: "Konyaalti Beach", type: "site", parent_id: "antalya", country: "TR" },
  { id: "lara-beach", name: "Lara Beach", type: "site", parent_id: "antalya", country: "TR" },
  { id: "kas", name: "Kas", type: "town", parent_id: "antalya", country: "TR" },
  { id: "kalkan", name: "Kalkan", type: "town", parent_id: "antalya", country: "TR" },
  { id: "patara", name: "Patara", type: "site", parent_id: "antalya", country: "TR" },
  { id: "patara-beach", name: "Patara Beach", type: "site", parent_id: "patara", country: "TR" },

  { id: "oludeniz", name: "Oludeniz", type: "town", parent_id: null, country: "TR" },
  { id: "blue-lagoon", name: "Blue Lagoon", type: "natural", parent_id: "oludeniz", country: "TR" },

  { id: "fethiye", name: "Fethiye", type: "city", parent_id: null, country: "TR" },
  { id: "butterfly-valley", name: "Butterfly Valley", type: "natural", parent_id: "fethiye", country: "TR" },

  { id: "pamukkale", name: "Pamukkale", type: "town", parent_id: null, country: "TR" },
  { id: "hierapolis", name: "Hierapolis", type: "site", parent_id: "pamukkale", country: "TR" },
  { id: "travertines", name: "Pamukkale Travertines", type: "natural", parent_id: "pamukkale", country: "TR" },

  { id: "ephesus", name: "Ephesus", type: "site", parent_id: null, country: "TR" },
  { id: "library-of-celsus", name: "Library of Celsus", type: "site", parent_id: "ephesus", country: "TR" },
  { id: "temple-of-artemis", name: "Temple of Artemis", type: "site", parent_id: "ephesus", country: "TR" },
  { id: "house-of-virgin-mary", name: "House of Virgin Mary", type: "site", parent_id: "ephesus", country: "TR" },

  { id: "izmir", name: "Izmir", type: "city", parent_id: null, country: "TR" },
  { id: "cesme", name: "Cesme", type: "town", parent_id: "izmir", country: "TR" },
  { id: "alacati", name: "Alacati", type: "town", parent_id: "izmir", country: "TR" },

  { id: "bursa", name: "Bursa", type: "city", parent_id: null, country: "TR" },
  { id: "uludag", name: "Uludag", type: "natural", parent_id: "bursa", country: "TR" },

  { id: "ankara", name: "Ankara", type: "city", parent_id: null, country: "TR" },
  { id: "anitkabir", name: "Anitkabir", type: "site", parent_id: "ankara", country: "TR" },

  { id: "konya", name: "Konya", type: "city", parent_id: null, country: "TR" },
  { id: "mevlana-museum", name: "Mevlana Museum", type: "museum", parent_id: "konya", country: "TR" },

  { id: "trabzon", name: "Trabzon", type: "city", parent_id: null, country: "TR" },
  { id: "sumela-monastery", name: "Sumela Monastery", type: "site", parent_id: "trabzon", country: "TR" },
  { id: "uzungol", name: "Uzungol", type: "natural", parent_id: "trabzon", country: "TR" },

  { id: "black-sea-tr", name: "Black Sea Region", type: "region", parent_id: null, country: "TR" },

  { id: "mardin", name: "Mardin", type: "city", parent_id: null, country: "TR" },
  { id: "old-mardin", name: "Old Mardin", type: "district", parent_id: "mardin", country: "TR" },

  { id: "gobekli-tepe", name: "Gobekli Tepe", type: "site", parent_id: null, country: "TR" },

  { id: "sanliurfa", name: "Sanliurfa", type: "city", parent_id: null, country: "TR" },
  { id: "balikli-gol", name: "Balikli Gol", type: "site", parent_id: "sanliurfa", country: "TR" },
];

// ─── ALGERIA ───
const algeriaPlaces: Place[] = [
  { id: "algiers", name: "Algiers", type: "city", parent_id: null, country: "DZ" },
  { id: "casbah-algiers", name: "Casbah of Algiers", type: "site", parent_id: "algiers", country: "DZ" },
  { id: "ketchaoua-mosque", name: "Ketchaoua Mosque", type: "site", parent_id: "casbah-algiers", country: "DZ" },
  { id: "martyrs-memorial", name: "Martyrs Memorial", type: "site", parent_id: "algiers", country: "DZ" },
  { id: "notre-dame-afrique", name: "Notre Dame d'Afrique", type: "site", parent_id: "algiers", country: "DZ" },
  { id: "algiers-corniche", name: "Algiers Corniche", type: "site", parent_id: "algiers", country: "DZ" },

  { id: "oran", name: "Oran", type: "city", parent_id: null, country: "DZ" },
  { id: "oran-old-town", name: "Old Oran", type: "district", parent_id: "oran", country: "DZ" },
  { id: "fort-santa-cruz", name: "Fort Santa Cruz", type: "site", parent_id: "oran", country: "DZ" },
  { id: "oran-waterfront", name: "Oran Waterfront", type: "site", parent_id: "oran", country: "DZ" },
  { id: "place-du-1er-novembre", name: "Place du 1er Novembre", type: "site", parent_id: "oran", country: "DZ" },

  { id: "constantine", name: "Constantine", type: "city", parent_id: null, country: "DZ" },
  { id: "constantine-old-town", name: "Old Constantine", type: "district", parent_id: "constantine", country: "DZ" },
  { id: "sidi-msid-bridge", name: "Sidi M'Sid Bridge", type: "site", parent_id: "constantine", country: "DZ" },
  { id: "emir-abdelkader-mosque", name: "Emir Abdelkader Mosque", type: "site", parent_id: "constantine", country: "DZ" },

  { id: "annaba", name: "Annaba", type: "city", parent_id: null, country: "DZ" },
  { id: "basilica-st-augustine", name: "Basilica of St Augustine", type: "site", parent_id: "annaba", country: "DZ" },
  { id: "annaba-beach", name: "Annaba Beach", type: "site", parent_id: "annaba", country: "DZ" },

  { id: "bejaia", name: "Bejaia", type: "city", parent_id: null, country: "DZ" },
  { id: "cap-carbon", name: "Cap Carbon", type: "natural", parent_id: "bejaia", country: "DZ" },
  { id: "yemma-gouraya", name: "Yemma Gouraya National Park", type: "park", parent_id: "bejaia", country: "DZ" },

  { id: "tipaza", name: "Tipaza", type: "city", parent_id: null, country: "DZ" },
  { id: "tipaza-ruins", name: "Tipaza Roman Ruins", type: "site", parent_id: "tipaza", country: "DZ" },
  { id: "tipaza-coast", name: "Tipaza Coast", type: "natural", parent_id: "tipaza", country: "DZ" },

  { id: "tlemcen", name: "Tlemcen", type: "city", parent_id: null, country: "DZ" },
  { id: "tlemcen-great-mosque", name: "Great Mosque of Tlemcen", type: "site", parent_id: "tlemcen", country: "DZ" },
  { id: "mansourah", name: "Mansourah", type: "site", parent_id: "tlemcen", country: "DZ" },

  { id: "setif", name: "Setif", type: "city", parent_id: null, country: "DZ" },
  { id: "djemila", name: "Djemila", type: "town", parent_id: "setif", country: "DZ" },
  { id: "djemila-ruins", name: "Djemila Roman Ruins", type: "site", parent_id: "djemila", country: "DZ" },

  { id: "batna", name: "Batna", type: "city", parent_id: null, country: "DZ" },
  { id: "timgad", name: "Timgad", type: "town", parent_id: "batna", country: "DZ" },
  { id: "timgad-ruins", name: "Timgad Roman Ruins", type: "site", parent_id: "timgad", country: "DZ" },
  { id: "lambaesis", name: "Lambaesis", type: "site", parent_id: "batna", country: "DZ" },

  { id: "kabylie", name: "Kabylie", type: "region", parent_id: null, country: "DZ" },
  { id: "tizi-ouzou", name: "Tizi Ouzou", type: "city", parent_id: "kabylie", country: "DZ" },
  { id: "djurdjura", name: "Djurdjura National Park", type: "park", parent_id: "kabylie", country: "DZ" },

  { id: "ghardaia", name: "Ghardaia", type: "city", parent_id: null, country: "DZ" },
  { id: "mzab-valley", name: "M'zab Valley", type: "site", parent_id: "ghardaia", country: "DZ" },
  { id: "beni-izguen", name: "Beni Isguen", type: "town", parent_id: "mzab-valley", country: "DZ" },
  { id: "el-atteuf", name: "El Atteuf", type: "town", parent_id: "mzab-valley", country: "DZ" },

  { id: "ouargla", name: "Ouargla", type: "city", parent_id: null, country: "DZ" },
  { id: "touggourt", name: "Touggourt", type: "town", parent_id: "ouargla", country: "DZ" },

  { id: "el-oued", name: "El Oued", type: "city", parent_id: null, country: "DZ" },
  { id: "el-oued-desert", name: "El Oued Desert", type: "natural", parent_id: "el-oued", country: "DZ" },

  { id: "tamanrasset", name: "Tamanrasset", type: "city", parent_id: null, country: "DZ" },
  { id: "hoggar-mountains", name: "Hoggar Mountains", type: "natural", parent_id: "tamanrasset", country: "DZ" },
  { id: "assekrem", name: "Assekrem", type: "site", parent_id: "hoggar-mountains", country: "DZ" },

  { id: "djanet", name: "Djanet", type: "city", parent_id: null, country: "DZ" },
  { id: "tassili-n-ajjer", name: "Tassili n'Ajjer", type: "park", parent_id: "djanet", country: "DZ" },
  { id: "tassili-rock-art", name: "Tassili Rock Art", type: "site", parent_id: "tassili-n-ajjer", country: "DZ" },

  { id: "adrar", name: "Adrar", type: "city", parent_id: null, country: "DZ" },
  { id: "timimoun", name: "Timimoun", type: "town", parent_id: "adrar", country: "DZ" },
  { id: "gourara", name: "Gourara", type: "oasis", parent_id: "adrar", country: "DZ" },

  { id: "sahara-algeria", name: "Algerian Sahara", type: "region", parent_id: null, country: "DZ" },
  { id: "grand-erg-oriental", name: "Grand Erg Oriental", type: "natural", parent_id: "sahara-algeria", country: "DZ" },
  { id: "grand-erg-occidental", name: "Grand Erg Occidental", type: "natural", parent_id: "sahara-algeria", country: "DZ" },
];

// ─── SAUDI ARABIA ───
const saudiPlaces: Place[] = [
  { id: "riyadh", name: "Riyadh", type: "city", parent_id: null, country: "SA" },
  { id: "diriyah", name: "Diriyah", type: "town", parent_id: "riyadh", country: "SA" },
  { id: "at-turaif", name: "At-Turaif District", type: "site", parent_id: "diriyah", country: "SA" },
  { id: "kingdom-centre", name: "Kingdom Centre Tower", type: "site", parent_id: "riyadh", country: "SA" },
  { id: "national-museum-riyadh", name: "National Museum", type: "museum", parent_id: "riyadh", country: "SA" },
  { id: "edge-of-the-world", name: "Edge of the World", type: "natural", parent_id: "riyadh", country: "SA" },
  { id: "wadi-hanifa", name: "Wadi Hanifa", type: "natural", parent_id: "riyadh", country: "SA" },

  { id: "jeddah", name: "Jeddah", type: "city", parent_id: null, country: "SA" },
  { id: "al-balad", name: "Al-Balad", type: "district", parent_id: "jeddah", country: "SA" },
  { id: "al-balad-historic", name: "Historic Jeddah", type: "site", parent_id: "al-balad", country: "SA" },
  { id: "jeddah-corniche", name: "Jeddah Corniche", type: "site", parent_id: "jeddah", country: "SA" },
  { id: "king-fahd-fountain", name: "King Fahd Fountain", type: "site", parent_id: "jeddah", country: "SA" },
  { id: "red-sea-jeddah", name: "Red Sea Coast (Jeddah)", type: "natural", parent_id: "jeddah", country: "SA" },

  { id: "mecca", name: "Mecca", type: "city", parent_id: null, country: "SA" },
  { id: "masjid-al-haram", name: "Masjid al-Haram", type: "site", parent_id: "mecca", country: "SA" },
  { id: "kaaba", name: "Kaaba", type: "site", parent_id: "masjid-al-haram", country: "SA" },
  { id: "mina", name: "Mina", type: "site", parent_id: "mecca", country: "SA" },
  { id: "arafat", name: "Mount Arafat", type: "site", parent_id: "mecca", country: "SA" },
  { id: "muzdalifah", name: "Muzdalifah", type: "site", parent_id: "mecca", country: "SA" },

  { id: "medina", name: "Medina", type: "city", parent_id: null, country: "SA" },
  { id: "prophets-mosque", name: "Al-Masjid an-Nabawi", type: "site", parent_id: "medina", country: "SA" },
  { id: "quba-mosque", name: "Quba Mosque", type: "site", parent_id: "medina", country: "SA" },
  { id: "uhud-mountain", name: "Mount Uhud", type: "site", parent_id: "medina", country: "SA" },

  { id: "alula", name: "AlUla", type: "city", parent_id: null, country: "SA" },
  { id: "hegra", name: "Hegra (Madain Saleh)", type: "site", parent_id: "alula", country: "SA" },
  { id: "elephant-rock", name: "Elephant Rock", type: "natural", parent_id: "alula", country: "SA" },
  { id: "dadan", name: "Dadan", type: "site", parent_id: "alula", country: "SA" },
  { id: "jabal-ikmah", name: "Jabal Ikmah", type: "site", parent_id: "alula", country: "SA" },
  { id: "alula-old-town", name: "AlUla Old Town", type: "site", parent_id: "alula", country: "SA" },

  { id: "tabuk", name: "Tabuk", type: "city", parent_id: null, country: "SA" },
  { id: "neom", name: "NEOM", type: "site", parent_id: "tabuk", country: "SA" },
  { id: "the-line", name: "The Line", type: "site", parent_id: "neom", country: "SA" },
  { id: "red-sea-project", name: "Red Sea Project", type: "resort", parent_id: "tabuk", country: "SA" },
  { id: "umluj", name: "Umluj", type: "town", parent_id: "tabuk", country: "SA" },
  { id: "umluj-beach", name: "Umluj Beach", type: "site", parent_id: "umluj", country: "SA" },

  { id: "abha", name: "Abha", type: "city", parent_id: null, country: "SA" },
  { id: "asir", name: "Asir Region", type: "region", parent_id: "abha", country: "SA" },
  { id: "al-soudah", name: "Al Soudah Mountains", type: "natural", parent_id: "asir", country: "SA" },
  { id: "rijal-almaa", name: "Rijal Almaa", type: "village", parent_id: "asir", country: "SA" },

  { id: "taif", name: "Taif", type: "city", parent_id: null, country: "SA" },
  { id: "taif-mountains", name: "Taif Mountains", type: "natural", parent_id: "taif", country: "SA" },
  { id: "rose-fields", name: "Taif Rose Fields", type: "natural", parent_id: "taif", country: "SA" },

  { id: "eastern-province", name: "Eastern Province", type: "region", parent_id: null, country: "SA" },
  { id: "dammam", name: "Dammam", type: "city", parent_id: "eastern-province", country: "SA" },
  { id: "khobar", name: "Al Khobar", type: "city", parent_id: "eastern-province", country: "SA" },
  { id: "half-moon-bay", name: "Half Moon Bay", type: "site", parent_id: "khobar", country: "SA" },

  { id: "najran", name: "Najran", type: "city", parent_id: null, country: "SA" },
  { id: "najran-fort", name: "Najran Fort", type: "site", parent_id: "najran", country: "SA" },

  { id: "hail", name: "Hail", type: "city", parent_id: null, country: "SA" },
  { id: "jubbah", name: "Jubbah Rock Art", type: "site", parent_id: "hail", country: "SA" },

  { id: "saudi-desert", name: "Saudi Desert", type: "region", parent_id: null, country: "SA" },
  { id: "empty-quarter", name: "Rub al Khali (Empty Quarter)", type: "natural", parent_id: "saudi-desert", country: "SA" },
  { id: "wadi-al-dawasir", name: "Wadi Al Dawasir", type: "natural", parent_id: "saudi-desert", country: "SA" },
];

// ─── LEBANON ───
const lebanonPlaces: Place[] = [
  { id: "beirut", name: "Beirut", type: "city", parent_id: null, country: "LB" },
  { id: "downtown-beirut", name: "Downtown Beirut", type: "district", parent_id: "beirut", country: "LB" },
  { id: "zaitunay-bay", name: "Zaitunay Bay", type: "site", parent_id: "beirut", country: "LB" },
  { id: "gemmayzeh", name: "Gemmayzeh", type: "district", parent_id: "beirut", country: "LB" },
  { id: "mar-mikhael", name: "Mar Mikhael", type: "district", parent_id: "beirut", country: "LB" },
  { id: "hamra", name: "Hamra", type: "district", parent_id: "beirut", country: "LB" },
  { id: "raouche", name: "Raouche", type: "district", parent_id: "beirut", country: "LB" },
  { id: "pigeon-rocks", name: "Pigeon Rocks", type: "natural", parent_id: "raouche", country: "LB" },
  { id: "beirut-national-museum", name: "National Museum of Beirut", type: "museum", parent_id: "beirut", country: "LB" },
  { id: "mohammad-al-amin-mosque", name: "Mohammad Al Amin Mosque", type: "site", parent_id: "downtown-beirut", country: "LB" },

  { id: "jounieh", name: "Jounieh", type: "city", parent_id: null, country: "LB" },
  { id: "harissa", name: "Harissa", type: "town", parent_id: "jounieh", country: "LB" },
  { id: "our-lady-of-lebanon", name: "Our Lady of Lebanon", type: "site", parent_id: "harissa", country: "LB" },
  { id: "jounieh-bay", name: "Jounieh Bay", type: "natural", parent_id: "jounieh", country: "LB" },

  { id: "byblos", name: "Byblos (Jbeil)", type: "city", parent_id: null, country: "LB" },
  { id: "byblos-old-town", name: "Byblos Old Town", type: "district", parent_id: "byblos", country: "LB" },
  { id: "byblos-port", name: "Byblos Port", type: "site", parent_id: "byblos", country: "LB" },
  { id: "byblos-castle", name: "Byblos Castle", type: "site", parent_id: "byblos", country: "LB" },

  { id: "batroun", name: "Batroun", type: "city", parent_id: null, country: "LB" },
  { id: "batroun-old-town", name: "Batroun Old Town", type: "district", parent_id: "batroun", country: "LB" },
  { id: "batroun-beach", name: "Batroun Beach", type: "site", parent_id: "batroun", country: "LB" },

  { id: "tripoli-lb", name: "Tripoli", type: "city", parent_id: null, country: "LB" },
  { id: "tripoli-old-city", name: "Tripoli Old City", type: "district", parent_id: "tripoli-lb", country: "LB" },
  { id: "tripoli-citadel", name: "Citadel of Raymond de Saint-Gilles", type: "site", parent_id: "tripoli-lb", country: "LB" },
  { id: "tripoli-souk", name: "Tripoli Souk", type: "site", parent_id: "tripoli-old-city", country: "LB" },

  { id: "sidon", name: "Sidon (Saida)", type: "city", parent_id: null, country: "LB" },
  { id: "sidon-sea-castle", name: "Sidon Sea Castle", type: "site", parent_id: "sidon", country: "LB" },
  { id: "sidon-souk", name: "Sidon Souk", type: "site", parent_id: "sidon", country: "LB" },

  { id: "tyre", name: "Tyre (Sour)", type: "city", parent_id: null, country: "LB" },
  { id: "tyre-hippodrome", name: "Tyre Hippodrome", type: "site", parent_id: "tyre", country: "LB" },
  { id: "tyre-ruins", name: "Tyre Ruins", type: "site", parent_id: "tyre", country: "LB" },
  { id: "tyre-beach", name: "Tyre Beach", type: "site", parent_id: "tyre", country: "LB" },

  { id: "bekaa", name: "Bekaa Valley", type: "region", parent_id: null, country: "LB" },
  { id: "baalbek", name: "Baalbek", type: "town", parent_id: "bekaa", country: "LB" },
  { id: "baalbek-temples", name: "Baalbek Temples", type: "site", parent_id: "baalbek", country: "LB" },
  { id: "ksara", name: "Ksara", type: "town", parent_id: "bekaa", country: "LB" },
  { id: "ksara-winery", name: "Chateau Ksara Winery", type: "site", parent_id: "ksara", country: "LB" },
  { id: "zahle", name: "Zahle", type: "city", parent_id: "bekaa", country: "LB" },

  { id: "chouf", name: "Chouf Mountains", type: "region", parent_id: null, country: "LB" },
  { id: "beit-ed-dine", name: "Beiteddine", type: "town", parent_id: "chouf", country: "LB" },
  { id: "beit-ed-dine-palace", name: "Beiteddine Palace", type: "site", parent_id: "beit-ed-dine", country: "LB" },
  { id: "deir-el-qamar", name: "Deir El Qamar", type: "town", parent_id: "chouf", country: "LB" },
  { id: "chouf-reserve", name: "Chouf Biosphere Reserve", type: "park", parent_id: "chouf", country: "LB" },

  { id: "bcharre", name: "Bcharre", type: "town", parent_id: null, country: "LB" },
  { id: "qadisha-valley", name: "Qadisha Valley", type: "natural", parent_id: "bcharre", country: "LB" },
  { id: "cedars-of-god", name: "Cedars of God", type: "natural", parent_id: "bcharre", country: "LB" },
  { id: "gibran-museum", name: "Gibran Museum", type: "museum", parent_id: "bcharre", country: "LB" },

  { id: "faraya", name: "Faraya", type: "town", parent_id: null, country: "LB" },
  { id: "mzaar", name: "Mzaar Ski Resort", type: "resort", parent_id: "faraya", country: "LB" },

  { id: "ehden", name: "Ehden", type: "town", parent_id: null, country: "LB" },
  { id: "ehden-reserve", name: "Ehden Nature Reserve", type: "park", parent_id: "ehden", country: "LB" },

  { id: "akkar", name: "Akkar", type: "region", parent_id: null, country: "LB" },
  { id: "qammouaa", name: "Qammouaa", type: "natural", parent_id: "akkar", country: "LB" },

  { id: "jeita", name: "Jeita", type: "town", parent_id: null, country: "LB" },
  { id: "jeita-grotto", name: "Jeita Grotto", type: "site", parent_id: "jeita", country: "LB" },
];

// ─── MOROCCO (existing) ───
const moroccoPlaces: Place[] = [
  { id: "marrakech", name: "Marrakech", type: "city", parent_id: null, country: "MA" },
  { id: "jemaa-el-fna", name: "Jemaa El-Fna", type: "site", parent_id: "marrakech", country: "MA" },
  { id: "majorelle-garden", name: "Majorelle Garden", type: "site", parent_id: "marrakech", country: "MA" },
  { id: "medina-marrakech", name: "Medina of Marrakech", type: "site", parent_id: "marrakech", country: "MA" },
  { id: "bahia-palace", name: "Bahia Palace", type: "site", parent_id: "marrakech", country: "MA" },

  { id: "fes", name: "Fes", type: "city", parent_id: null, country: "MA" },
  { id: "fes-medina", name: "Medina of Fes", type: "site", parent_id: "fes", country: "MA" },
  { id: "chouara-tannery", name: "Chouara Tannery", type: "site", parent_id: "fes", country: "MA" },
  { id: "bou-inania-madrasa", name: "Bou Inania Madrasa", type: "site", parent_id: "fes", country: "MA" },

  { id: "chefchaouen", name: "Chefchaouen", type: "city", parent_id: null, country: "MA" },
  { id: "blue-medina", name: "Blue Medina", type: "site", parent_id: "chefchaouen", country: "MA" },

  { id: "sahara-morocco", name: "Sahara Desert", type: "natural", parent_id: null, country: "MA" },
  { id: "erg-chebbi", name: "Erg Chebbi", type: "site", parent_id: "sahara-morocco", country: "MA" },
  { id: "merzouga", name: "Merzouga", type: "town", parent_id: "sahara-morocco", country: "MA" },
];

// ─── Combined ───
export const placesData: Place[] = [
  ...egyptPlaces,
  ...jordanPlaces,
  ...syriaPlaces,
  ...turkeyPlaces,
  ...algeriaPlaces,
  ...saudiPlaces,
  ...lebanonPlaces,
  ...moroccoPlaces,
];

// ─── City/destination descriptions for cards ───
export const placeDescriptions: Record<string, string> = {
  // Egypt
  "cairo": "Discover Cairo tours with local guides. Visit the Pyramids, the Egyptian Museum, Khan El Khalili, and Islamic Cairo with guided cultural tours...",
  "giza": "Discover Giza tours with local guides. Visit the Great Pyramids, the Sphinx, Saqqara, Dahshur, and Memphis with expert Egyptologists...",
  "alexandria": "Discover Alexandria tours with local guides. Visit the Bibliotheca Alexandrina, Qaitbay Citadel, and Montaza Palace on the Mediterranean coast...",
  "luxor": "Discover Luxor tours with local guides. Visit the Valley of the Kings, Karnak Temple, and Hatshepsut Temple with guided cultural tours...",
  "aswan": "Discover Aswan tours with local guides. Visit Philae Temple, Abu Simbel, and the Nubian Village with guided Nile experiences...",
  "red-sea": "Discover Red Sea Coast tours with local guides. Snorkel and dive in Hurghada, El Gouna, and Marsa Alam...",
  "sinai": "Discover Sinai tours with local guides. Visit Sharm El Sheikh, Dahab, Mount Sinai, and Saint Catherine...",
  "dahab": "Discover Dahab tours with local guides. Dive the Blue Hole, snorkel pristine reefs, and experience desert adventures...",
  "fayoum": "Discover Fayoum tours with local guides. Visit Wadi El Hitan, Lake Qarun, and the artistic Tunis Village...",
  "western-desert": "Discover Western Desert tours with local guides. Visit Siwa Oasis, the White Desert, and Bahariya Oasis...",
  "upper-egypt": "Discover Upper Egypt tours with local guides. Visit the ancient temples of Dendera and Abydos...",
  "hurghada": "Discover Hurghada tours with local guides. Snorkel, dive, and relax on the Red Sea coast...",
  "sharm-el-sheikh": "Discover Sharm El Sheikh tours with local guides. Dive Ras Mohammed and explore the Sinai coast...",
  // Jordan
  "amman": "Discover Amman tours with local guides. Visit the Citadel, Roman Theater, and Rainbow Street with guided cultural tours...",
  "madaba": "Discover Madaba tours with local guides. See the ancient mosaic map at St George's Church and visit Mount Nebo...",
  "dead-sea": "Discover Dead Sea tours with local guides. Float in the lowest point on Earth and explore Wadi Mujib...",
  "petra-region": "Discover Petra tours with local guides. Visit the Treasury, the Monastery, Al Siq, and Little Petra with guided hiking tours...",
  "wadi-rum": "Discover Wadi Rum tours with local guides. Experience jeep safaris, camel rides, stargazing, and Bedouin camping...",
  "aqaba": "Discover Aqaba tours with local guides. Snorkel the Red Sea coral reefs and explore the marine park...",
  "jerash": "Discover Jerash tours with local guides. Walk through one of the best-preserved Roman cities in the world...",
  "ajloun": "Discover Ajloun tours with local guides. Visit Ajloun Castle and hike through the forest reserve...",
  "irbid": "Discover Irbid tours with local guides. Visit Umm Qais and the Gadara Ruins in northern Jordan...",
  "karak": "Discover Karak tours with local guides. Visit the imposing Crusader castle with views of the Dead Sea...",
  "dana": "Discover Dana tours with local guides. Trek through Jordan's largest nature reserve...",
  "wadi-mujib": "Discover Wadi Mujib tours with local guides. Hike through the dramatic canyon gorges...",
  "eastern-desert": "Discover Eastern Desert tours with local guides. Explore UNESCO-listed Umayyad desert palaces...",
  // Syria
  "damascus": "Discover Damascus tours with local guides. Visit the Umayyad Mosque, Souq Al Hamidiyah, and the Old City...",
  "aleppo": "Discover Aleppo tours with local guides. Visit the Citadel, the ancient souk, and the Old City...",
  "homs": "Discover Homs tours with local guides. Visit Crac des Chevaliers and the Old City...",
  "hama": "Discover Hama tours with local guides. See the famous Norias waterwheels on the Orontes River...",
  "latakia": "Discover Latakia tours with local guides. Visit Ugarit, Saladin Castle, and the Mediterranean coast...",
  "tartus": "Discover Tartus tours with local guides. Visit Arwad Island, Old Tartus, and Margat Castle...",
  "palmyra-region": "Discover Palmyra tours with local guides. Visit the ancient ruins, Temple of Bel, and the Great Colonnade...",
  "bosra": "Discover Bosra tours with local guides. Visit the incredible Roman theater and Old City...",
  "maaloula": "Discover Maaloula tours with local guides. Visit ancient monasteries where Aramaic is still spoken...",
  // Turkey
  "istanbul": "Discover Istanbul tours with local guides. Visit Hagia Sophia, the Blue Mosque, Topkapi Palace, and the Grand Bazaar...",
  "cappadocia": "Discover Cappadocia tours with local guides. Explore fairy chimneys, cave churches, and underground cities...",
  "antalya": "Discover Antalya tours with local guides. Visit Kaleici Old Town, stunning beaches, and ancient Lycian sites...",
  "pamukkale": "Discover Pamukkale tours with local guides. Walk the white travertines and explore ancient Hierapolis...",
  "ephesus": "Discover Ephesus tours with local guides. Visit the Library of Celsus and the Temple of Artemis...",
  "fethiye": "Discover Fethiye tours with local guides. Visit Butterfly Valley and the turquoise coast...",
  "oludeniz": "Discover Oludeniz tours with local guides. Visit the Blue Lagoon and paraglide over the coast...",
  "konya": "Discover Konya tours with local guides. Visit the Mevlana Museum and whirling dervish culture...",
  "mardin": "Discover Mardin tours with local guides. Explore the stunning stone architecture of Old Mardin...",
  // Algeria
  "algiers": "Discover Algiers tours with local guides. Visit the UNESCO Casbah, Martyrs Memorial, and the corniche...",
  "oran": "Discover Oran tours with local guides. Visit Fort Santa Cruz and the vibrant waterfront...",
  "constantine": "Discover Constantine tours with local guides. See the dramatic bridges and gorges of the City of Bridges...",
  "ghardaia": "Discover Ghardaia tours with local guides. Visit the UNESCO M'zab Valley and its unique architecture...",
  "tamanrasset": "Discover Tamanrasset tours with local guides. Explore the Hoggar Mountains and Assekrem...",
  "djanet": "Discover Djanet tours with local guides. Visit Tassili n'Ajjer and its ancient rock art...",
  "tipaza": "Discover Tipaza tours with local guides. Visit the Roman ruins on the Mediterranean coast...",
  "batna": "Discover Batna tours with local guides. Visit the Roman city of Timgad...",
  // Saudi Arabia
  "riyadh": "Discover Riyadh tours with local guides. Visit Diriyah, the Edge of the World, and the National Museum...",
  "jeddah": "Discover Jeddah tours with local guides. Explore historic Al-Balad, the corniche, and Red Sea coast...",
  "mecca": "Discover Mecca tours with local guides. Visit Masjid al-Haram and the holy sites...",
  "medina": "Discover Medina tours with local guides. Visit Al-Masjid an-Nabawi and Mount Uhud...",
  "alula": "Discover AlUla tours with local guides. Visit Hegra, Elephant Rock, and the ancient Dadan ruins...",
  "tabuk": "Discover Tabuk tours with local guides. Explore NEOM, the Red Sea Project, and Umluj...",
  "abha": "Discover Abha tours with local guides. Visit the Asir highlands, Al Soudah, and Rijal Almaa...",
  "taif": "Discover Taif tours with local guides. Visit the mountains and the famous rose fields...",
  // Lebanon
  "beirut": "Discover Beirut tours with local guides. Visit Downtown, Gemmayzeh, Pigeon Rocks, and the National Museum...",
  "byblos": "Discover Byblos tours with local guides. Visit the ancient port, old town, and Crusader castle...",
  "batroun": "Discover Batroun tours with local guides. Visit the old town and beautiful beaches...",
  "tripoli-lb": "Discover Tripoli tours with local guides. Visit the old city, citadel, and traditional souks...",
  "bekaa": "Discover Bekaa Valley tours with local guides. Visit Baalbek temples and Chateau Ksara winery...",
  "chouf": "Discover Chouf tours with local guides. Visit Beiteddine Palace and the Chouf Biosphere Reserve...",
  "bcharre": "Discover Bcharre tours with local guides. Visit the Cedars of God and Qadisha Valley...",
  "jeita": "Discover Jeita tours with local guides. Visit the spectacular Jeita Grotto...",
  // Morocco
  "marrakech": "Discover Marrakech tours with local guides. Explore the labyrinthine medina, souks, and Jemaa El-Fna...",
  "fes": "Discover Fes tours with local guides. Explore the medieval medina and centuries-old tanneries...",
  "chefchaouen": "Discover Chefchaouen tours with local guides. Wander the famous blue-washed streets...",
  "sahara-morocco": "Discover Sahara Desert tours with local guides. Ride camels over golden dunes at sunset...",
};

// ─── Helper functions ───
export function getTopLevelPlaces(): Place[] {
  return placesData.filter((p) => p.parent_id === null);
}

export function getTopLevelPlacesByCountry(countryCode: string): Place[] {
  return placesData.filter((p) => p.parent_id === null && p.country === countryCode);
}

export function getDescendants(parentId: string): Place[] {
  const children = placesData.filter((p) => p.parent_id === parentId);
  const all: Place[] = [...children];
  children.forEach((c) => {
    all.push(...getDescendants(c.id));
  });
  return all;
}

export function getChildren(parentId: string): Place[] {
  return placesData.filter((p) => p.parent_id === parentId);
}

export function getPlaceById(id: string): Place | undefined {
  return placesData.find((p) => p.id === id);
}

export function getPlaceBreadcrumb(placeId: string): Place[] {
  const path: Place[] = [];
  let current = getPlaceById(placeId);
  while (current) {
    path.unshift(current);
    current = current.parent_id ? getPlaceById(current.parent_id) : undefined;
  }
  return path;
}

export function getCountryByCode(code: string): CountryInfo | undefined {
  return countriesAPI.find((c) => c.code === code);
}

// Tour types: collect all unique types from categories
export const tourTypes: string[] = experienceCategories.flatMap((c) => c.tourTypes);

export type TourType = string;

// ─── Destination images ───
export const destinationImages: Record<string, string> = {
  // Egypt
  "cairo": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop",
  "giza": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&h=600&fit=crop",
  "alexandria": "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop",
  "luxor": "https://images.unsplash.com/photo-1568322503652-5e6e5b8b4c0e?w=800&h=600&fit=crop",
  "aswan": "https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=800&h=600&fit=crop",
  "red-sea": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "sinai": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "dahab": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "hurghada": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "sharm-el-sheikh": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "fayoum": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
  "western-desert": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop",
  "upper-egypt": "https://images.unsplash.com/photo-1568322503652-5e6e5b8b4c0e?w=800&h=600&fit=crop",
  // Jordan
  "amman": "https://images.unsplash.com/photo-1563235876-dd5e5db6b536?w=800&h=600&fit=crop",
  "madaba": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "dead-sea": "https://images.unsplash.com/photo-1600002415506-dd06090d3480?w=800&h=600&fit=crop",
  "petra-region": "https://images.unsplash.com/photo-1563631292-c4bba4023273?w=800&h=600&fit=crop",
  "wadi-rum": "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=800&h=600&fit=crop",
  "aqaba": "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop",
  "jerash": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=600&fit=crop",
  "ajloun": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
  "irbid": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&h=600&fit=crop",
  "karak": "https://images.unsplash.com/photo-1568322503652-5e6e5b8b4c0e?w=800&h=600&fit=crop",
  "dana": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
  "wadi-mujib": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
  "eastern-desert": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
  "shobak": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
  // Syria
  "damascus": "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800&h=600&fit=crop",
  "aleppo": "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800&h=600&fit=crop",
  "homs": "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800&h=600&fit=crop",
  "hama": "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800&h=600&fit=crop",
  "latakia": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "tartus": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "palmyra-region": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "bosra": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=600&fit=crop",
  "maaloula": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  // Turkey
  "istanbul": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
  "cappadocia": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop",
  "antalya": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "pamukkale": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
  "ephesus": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=600&fit=crop",
  "fethiye": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "oludeniz": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "konya": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "mardin": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  "izmir": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  // Algeria
  "algiers": "https://images.unsplash.com/photo-1583508805133-8fd03a9916d4?w=800&h=600&fit=crop",
  "oran": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "constantine": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  "ghardaia": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
  "tamanrasset": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop",
  "djanet": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop",
  "tipaza": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=600&fit=crop",
  "batna": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=600&fit=crop",
  // Saudi Arabia
  "riyadh": "https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=800&h=600&fit=crop",
  "jeddah": "https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=800&h=600&fit=crop",
  "mecca": "https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=800&h=600&fit=crop",
  "medina": "https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=800&h=600&fit=crop",
  "alula": "https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=800&h=600&fit=crop",
  "tabuk": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "abha": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
  "taif": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
  // Lebanon
  "beirut": "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&h=600&fit=crop",
  "byblos": "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&h=600&fit=crop",
  "batroun": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  "tripoli-lb": "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&h=600&fit=crop",
  "bekaa": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
  "chouf": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
  "bcharre": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
  "jeita": "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&h=600&fit=crop",
  // Morocco
  "marrakech": "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=600&fit=crop",
  "fes": "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=800&h=600&fit=crop",
  "chefchaouen": "https://images.unsplash.com/photo-1553603227-2358aabe8eca?w=800&h=600&fit=crop",
  "sahara-morocco": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop",
};

// ─── Tour-type themed images (fallback when destination image doesn't capture the activity) ───
export const tourTypeImages: Record<string, string> = {
  "Jeep Tour": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop",
  "Desert Safari": "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&h=600&fit=crop",
  "Hiking": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
  "Trekking": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
  "Snorkeling": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "Diving": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "Scuba Diving": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "Freediving": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  "Camel Riding": "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop",
  "Horse Riding": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop",
  "Camping": "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
  "Desert Camping": "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
  "Stargazing": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
  "Hot Air Balloon": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop",
  "Boat Tour": "https://images.unsplash.com/photo-1544551763-92ab472cad1f?w=800&h=600&fit=crop",
  "Kayaking": "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
  "Paddleboarding": "https://images.unsplash.com/photo-1526188717906-ab4a2f949f3c?w=800&h=600&fit=crop",
  "Kitesurfing": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
  "Surfing": "https://images.unsplash.com/photo-1502680390548-bdbac40c7fcc?w=800&h=600&fit=crop",
  "City Walk": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
  "Cultural Tour": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "Cultural": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "Historical Tour": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "Food Tour": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
  "Street Food Tour": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
  "Street Food Experience": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
  "Cooking Class": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
  "Home Dining Experience": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "Local Dinner Experience": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "Traditional Dinner": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "Traditional Breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f10a081a?w=800&h=600&fit=crop",
  "Rooftop Dinner": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  "Bedouin Dinner": "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
  "Desert Dinner": "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
  "Market to Table Experience": "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
  "Coffee Experience": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
  "Tea Experience": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&h=600&fit=crop",
  "Artisan Workshop": "https://images.unsplash.com/photo-1452860606245-08f8e4ee9145?w=800&h=600&fit=crop",
  "Photography Walk": "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&h=600&fit=crop",
  "Bedouin Experience": "https://images.unsplash.com/photo-1549944850-84e00be4203b?w=800&h=600&fit=crop",
  "Storytelling Tour": "https://images.unsplash.com/photo-1549944850-84e00be4203b?w=800&h=600&fit=crop",
  "Village Experience": "https://images.unsplash.com/photo-1549944850-84e00be4203b?w=800&h=600&fit=crop",
  "Day Trip": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
  "Road Trip": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
  "Canyon Adventure": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
  "Sunrise Tour": "https://images.unsplash.com/photo-1500534314263-a834e38d523f?w=800&h=600&fit=crop",
  "Sunset Tour": "https://images.unsplash.com/photo-1500534314263-a834e38d523f?w=800&h=600&fit=crop",
  "Nature Walk": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
  "Private Tour": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
  "Hammam Experience": "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&h=600&fit=crop",
  "Museum Tour": "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&h=600&fit=crop",
};

// ─── Mock tours ───
// Note: place IDs updated to match the new master Places API
export const mockGuideTours: GuideTour[] = [
  // Jordan
  { id: "1", title: "Wadi Rum Overnight 4x4 Jeep Safari", main_place_id: "wadi-rum", places: ["khazali-canyon", "lawrence-spring", "um-frouth-rock-bridge"], price: 147, duration: "2 Days", tour_type: "Jeep Tour", category: "getaway", description: "Explore the vast desert landscapes of Wadi Rum on a 4x4 jeep adventure with overnight Bedouin camping.", image: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-15" },
  { id: "2", title: "Petra Full Day Guided Tour", main_place_id: "petra-region", places: ["siq", "treasury", "monastery", "royal-tombs", "high-place-of-sacrifice"], price: 95, duration: "8 Hours", tour_type: "Hiking", category: "getaway", description: "Walk through the ancient city of Petra with a local Bedouin guide.", image: "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=800&h=600&fit=crop", status: "published", created_at: "2026-01-20" },
  { id: "3", title: "Amman Street Food & Culture Walk", main_place_id: "amman", places: ["downtown-amman", "rainbow-street", "amman-citadel", "roman-theater-amman"], price: 45, duration: "4 Hours", tour_type: "Food Tour", category: "dining", description: "Taste authentic Jordanian street food while exploring Amman's historic downtown.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-01" },
  { id: "4", title: "Dead Sea & Wadi Mujib Adventure", main_place_id: "dead-sea", places: ["dead-sea-beach", "wadi-mujib-reserve"], price: 75, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Float in the Dead Sea and hike through the stunning Wadi Mujib canyon.", image: "https://images.unsplash.com/photo-1544551763-77932df47f1f?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-28" },
  { id: "5", title: "Aqaba Snorkeling & Reef Tour", main_place_id: "aqaba", places: ["aqaba-marine-park", "aqaba-beach"], price: 60, duration: "5 Hours", tour_type: "Snorkeling", category: "getaway", description: "Discover the coral reefs and marine life of the Red Sea in Aqaba.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-10" },
  { id: "6", title: "Petra by Night & Treasury Candlelight", main_place_id: "petra-region", places: ["siq", "treasury"], price: 70, duration: "3 Hours", tour_type: "Cultural", category: "local-living", description: "Experience the magic of Petra illuminated by thousands of candles under the stars.", image: "https://images.unsplash.com/photo-1563631292-c4bba4023273?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-10" },
  { id: "7", title: "Wadi Rum Sunset Hike & Stargazing", main_place_id: "wadi-rum", places: ["burdah-rock-bridge"], price: 85, duration: "6 Hours", tour_type: "Hiking", category: "getaway", description: "Hike to Burdah Rock Bridge at sunset then stargaze from the desert.", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-05" },
  { id: "8", title: "Jerash & Ajloun Castle Day Trip", main_place_id: "jerash", places: ["jerash-ruins", "ajloun-castle"], price: 65, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Visit the best-preserved Roman ruins outside Italy and the medieval Ajloun Castle.", image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=600&fit=crop", status: "published", created_at: "2026-01-15" },
  { id: "9", title: "Amman Citadel & Roman Theater Walk", main_place_id: "amman", places: ["amman-citadel", "roman-theater-amman"], price: 35, duration: "3 Hours", tour_type: "City Walk", category: "local-living", description: "Discover 7,000 years of history at the Citadel hilltop and the ancient Roman Theater.", image: "https://images.unsplash.com/photo-1563235876-dd5e5db6b536?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-20" },
  { id: "10", title: "Dana Nature Reserve Hiking Trail", main_place_id: "dana", places: ["dana-biosphere"], price: 55, duration: "Full Day", tour_type: "Hiking", category: "getaway", description: "Trek through Dana Biosphere Reserve from mountaintop to the desert valley.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-08" },
  { id: "11", title: "Aqaba Scuba Diving Experience", main_place_id: "aqaba", places: ["aqaba-marine-park", "aqaba-beach"], price: 120, duration: "4 Hours", tour_type: "Diving", category: "getaway", description: "Dive the Red Sea and explore vibrant coral gardens.", image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-25" },
  { id: "12", title: "Madaba Mosaics & Mount Nebo Tour", main_place_id: "madaba", places: ["st-george-church", "mount-nebo"], price: 50, duration: "5 Hours", tour_type: "Cultural", category: "local-living", description: "See the ancient mosaic map of the Holy Land and the panoramic views from Mount Nebo.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop", status: "published", created_at: "2026-01-28" },
  { id: "13", title: "Wadi Rum Bedouin Camp & Camel Ride", main_place_id: "wadi-rum", places: ["rum-village", "wadi-rum-desert", "khazali-canyon"], price: 110, duration: "2 Days", tour_type: "Camping", category: "getaway", description: "Stay with Bedouin families, ride camels at sunrise, and sleep under desert stars.", image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-12" },
  { id: "14", title: "Petra Back Trail to the Monastery", main_place_id: "petra-region", places: ["monastery"], price: 80, duration: "6 Hours", tour_type: "Hiking", category: "getaway", description: "Take the less-traveled back trail to the Monastery, avoiding the crowds.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-18" },
  { id: "15", title: "Desert Castles Loop from Amman", main_place_id: "eastern-desert", places: ["qasr-amra", "qasr-kharana", "qasr-azraq"], price: 70, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Explore UNESCO-listed Umayyad desert palaces on a scenic loop through eastern Jordan.", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-02" },
  { id: "16", title: "Karak Castle & Dead Sea Panorama", main_place_id: "karak", places: ["karak-castle"], price: 55, duration: "Full Day", tour_type: "Cultural", category: "local-living", description: "Visit the imposing Crusader castle in Karak with views stretching to the Dead Sea.", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&h=600&fit=crop", status: "published", created_at: "2026-01-10" },
  { id: "17", title: "Umm Qais & Northern Jordan Highlights", main_place_id: "irbid", places: ["umm-qais", "gadara-ruins"], price: 60, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Discover the Greco-Roman ruins of Umm Qais with views of the Sea of Galilee.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-05" },
  { id: "18", title: "Private Petra & Little Petra Combo", main_place_id: "petra-region", places: ["petra", "little-petra", "siq", "treasury", "monastery"], price: 180, duration: "2 Days", tour_type: "Private Tour", category: "local-living", description: "An exclusive two-day private tour covering both Petra and the hidden gem Little Petra.", image: "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-14" },
  { id: "19", title: "Amman to Wadi Rum Express", main_place_id: "wadi-rum", places: ["wadi-rum-desert", "lawrence-spring"], price: 130, duration: "Full Day", tour_type: "Jeep Tour", category: "getaway", description: "A fast-paced day trip from Amman to experience Wadi Rum's iconic landmarks.", image: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-09" },
  { id: "20", title: "Wadi Rum Desert Safari by 4x4", main_place_id: "wadi-rum", places: ["khazali-canyon", "lawrence-spring"], price: 95, duration: "6 Hours", tour_type: "Desert Safari", category: "getaway", description: "Blast across red sand valleys and ancient rock formations in a classic 4x4 desert safari.", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-01" },

  // Egypt
  { id: "21", title: "Pyramids of Giza & Sphinx Tour", main_place_id: "giza", places: ["giza-plateau", "great-pyramid", "sphinx"], price: 65, duration: "5 Hours", tour_type: "Cultural", category: "local-living", description: "Stand before the last surviving wonder of the ancient world with an expert Egyptologist.", image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-01" },
  { id: "22", title: "Cairo Islamic Quarter & Khan El Khalili", main_place_id: "cairo", places: ["islamic-cairo", "khan-el-khalili", "egyptian-museum"], price: 40, duration: "4 Hours", tour_type: "City Walk", category: "local-living", description: "Wander through medieval mosques, madrasas, and the legendary bazaar of Cairo.", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-20" },
  { id: "23", title: "Luxor West Bank: Valley of the Kings", main_place_id: "luxor", places: ["valley-of-the-kings", "hatchepsut-temple", "colossi-of-memnon"], price: 80, duration: "6 Hours", tour_type: "Cultural", category: "local-living", description: "Explore the tombs of pharaohs and the temple of Egypt's only female pharaoh.", image: "https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=800&h=600&fit=crop", status: "published", created_at: "2026-01-25" },
  { id: "24", title: "Karnak & Luxor Temple Sunset Walk", main_place_id: "luxor", places: ["karnak-temple", "luxor-temple"], price: 55, duration: "4 Hours", tour_type: "Cultural", category: "local-living", description: "Walk the hypostyle halls at golden hour and watch the temples glow at sunset.", image: "https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-14" },
  { id: "25", title: "Dahab Blue Hole Freediving Day", main_place_id: "dahab", places: ["blue-hole"], price: 70, duration: "Full Day", tour_type: "Diving", category: "getaway", description: "Freedive the legendary Blue Hole and snorkel the pristine reefs.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-08" },
  { id: "26", title: "Aswan Felucca Sail & Nubian Village", main_place_id: "aswan", places: ["philae-temple", "nubian-village"], price: 50, duration: "5 Hours", tour_type: "Cultural", category: "local-living", description: "Sail the Nile on a traditional felucca and dine with a Nubian family.", image: "https://images.unsplash.com/photo-1568322503652-5e6e5b8b4c0e?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-18" },
  { id: "27", title: "Abu Simbel Sunrise Day Trip", main_place_id: "aswan", places: ["abu-simbel"], price: 110, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Witness the sun illuminate Ramses II's face at the Great Temple of Abu Simbel.", image: "https://images.unsplash.com/photo-1568322503652-5e6e5b8b4c0e?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-12" },
  { id: "28", title: "Luxor Hot Air Balloon at Dawn", main_place_id: "luxor", places: ["valley-of-the-kings", "hatchepsut-temple"], price: 130, duration: "3 Hours", tour_type: "Hot Air Balloon", category: "getaway", description: "Soar over the Valley of the Kings as the sun paints the temples in gold.", image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-06" },
  { id: "29", title: "Dahab Snorkeling Three Reefs Tour", main_place_id: "dahab", places: ["blue-hole"], price: 45, duration: "5 Hours", tour_type: "Snorkeling", category: "getaway", description: "Snorkel stunning reef sites along Dahab's coastline with a marine guide.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-01" },
  { id: "30", title: "Cairo to Alexandria Day Trip", main_place_id: "alexandria", places: ["bibliotheca-alexandrina", "qaitbay-citadel"], price: 55, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Escape Cairo for the Mediterranean coast — visit the ancient library and citadel.", image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-09" },

  // Morocco
  { id: "31", title: "Marrakech Medina & Souks Tour", main_place_id: "marrakech", places: ["jemaa-el-fna", "medina-marrakech", "bahia-palace"], price: 40, duration: "4 Hours", tour_type: "City Walk", category: "local-living", description: "Navigate the labyrinthine medina with a local guide — souks, riads, and rooftop views.", image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-22" },
  { id: "32", title: "Sahara Desert Camel Trek & Camp", main_place_id: "sahara-morocco", places: ["erg-chebbi", "merzouga"], price: 150, duration: "2 Days", tour_type: "Camping", category: "getaway", description: "Ride camels over golden dunes at sunset and sleep under the Saharan stars.", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-05" },
  { id: "33", title: "Fes Tanneries & Medieval Medina", main_place_id: "fes", places: ["fes-medina", "chouara-tannery", "bou-inania-madrasa"], price: 35, duration: "3 Hours", tour_type: "Cultural", category: "local-living", description: "Explore the world's oldest university city and its centuries-old leather tanneries.", image: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=800&h=600&fit=crop", status: "published", created_at: "2026-01-30" },
  { id: "34", title: "Marrakech Cooking Class: Tagine", main_place_id: "marrakech", places: ["medina-marrakech"], price: 55, duration: "4 Hours", tour_type: "Cooking Class", category: "dining", description: "Shop for spices in the souks then cook a traditional Moroccan meal in a riad.", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-16" },
  { id: "35", title: "Chefchaouen Blue City Photography Walk", main_place_id: "chefchaouen", places: ["blue-medina"], price: 30, duration: "3 Hours", tour_type: "Photography Walk", category: "local-living", description: "Capture the iconic blue-washed streets at their most photogenic hours.", image: "https://images.unsplash.com/photo-1553603227-2358aabe8eca?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-11" },

  // Dining tours
  { id: "36", title: "Amman Home Dining with Local Family", main_place_id: "amman", places: ["downtown-amman"], price: 50, duration: "3 Hours", tour_type: "Home Dining Experience", category: "dining", description: "Dine in a Jordanian home — mansaf, maqluba, and family warmth.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-01" },
  { id: "37", title: "Amman Traditional Breakfast Tour", main_place_id: "amman", places: ["downtown-amman", "rainbow-street"], price: 25, duration: "2 Hours", tour_type: "Traditional Breakfast", category: "dining", description: "Taste foul, hummus, falafel, and knafeh at the best local breakfast spots.", image: "https://images.unsplash.com/photo-1533089860892-a7c6f10a081a?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-20" },
  { id: "38", title: "Wadi Rum Bedouin Dinner Under Stars", main_place_id: "wadi-rum", places: ["rum-village"], price: 60, duration: "4 Hours", tour_type: "Bedouin Dinner", category: "dining", description: "Zarb feast cooked underground in the desert — the ultimate Bedouin dinner.", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop", status: "published", created_at: "2026-02-15" },
  { id: "39", title: "Cairo Street Food Feast", main_place_id: "cairo", places: ["islamic-cairo", "khan-el-khalili"], price: 30, duration: "3 Hours", tour_type: "Street Food Experience", category: "dining", description: "Koshari, ful, ta'ameya, and sugar cane juice — Cairo's essential street food.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-02" },
  { id: "40", title: "Marrakech Food Tasting Medina Tour", main_place_id: "marrakech", places: ["jemaa-el-fna", "medina-marrakech"], price: 40, duration: "3 Hours", tour_type: "Food Tasting Tour", category: "dining", description: "Taste tagine, pastilla, msemen, and fresh juices in the labyrinthine medina.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop", status: "published", created_at: "2026-03-04" },
];
