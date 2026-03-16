export interface Place {
  id: string;
  name: string;
  type: string;
  parent_id: string | null;
  country: string; // country code: JO, EG, etc.
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

// ─── Places API — Jordan ───
const jordanPlaces: Place[] = [
  { id: "amman", name: "Amman", type: "city", parent_id: null, country: "JO" },
  { id: "downtown-amman", name: "Downtown Amman", type: "district", parent_id: "amman", country: "JO" },
  { id: "jabal-amman", name: "Jabal Amman", type: "district", parent_id: "amman", country: "JO" },
  { id: "jabal-al-weibdeh", name: "Jabal Al Weibdeh", type: "district", parent_id: "amman", country: "JO" },
  { id: "abdoun", name: "Abdoun", type: "district", parent_id: "amman", country: "JO" },
  { id: "rainbow-street", name: "Rainbow Street", type: "site", parent_id: "jabal-amman", country: "JO" },
  { id: "amman-citadel", name: "Amman Citadel", type: "site", parent_id: "amman", country: "JO" },
  { id: "roman-theater-amman", name: "Roman Theater", type: "site", parent_id: "downtown-amman", country: "JO" },
  { id: "jordan-museum", name: "The Jordan Museum", type: "museum", parent_id: "amman", country: "JO" },
  { id: "royal-automobile-museum", name: "Royal Automobile Museum", type: "museum", parent_id: "amman", country: "JO" },
  { id: "king-abdullah-i-mosque", name: "King Abdullah I Mosque", type: "site", parent_id: "amman", country: "JO" },
  { id: "iraq-al-amir", name: "Iraq Al-Amir", type: "site", parent_id: "amman", country: "JO" },
  { id: "qasr-al-abd", name: "Qasr Al-Abd", type: "site", parent_id: "iraq-al-amir", country: "JO" },

  { id: "jerash", name: "Jerash", type: "city", parent_id: null, country: "JO" },
  { id: "jerash-archaeological-site", name: "Jerash Archaeological Site", type: "site", parent_id: "jerash", country: "JO" },

  { id: "ajloun", name: "Ajloun", type: "city", parent_id: null, country: "JO" },
  { id: "ajloun-castle", name: "Ajloun Castle", type: "site", parent_id: "ajloun", country: "JO" },
  { id: "ajloun-forest-reserve", name: "Ajloun Forest Reserve", type: "park", parent_id: "ajloun", country: "JO" },

  { id: "irbid", name: "Irbid", type: "city", parent_id: null, country: "JO" },
  { id: "umm-qais", name: "Umm Qais", type: "site", parent_id: "irbid", country: "JO" },
  { id: "beit-ras", name: "Beit Ras (Capitolias)", type: "site", parent_id: "irbid", country: "JO" },
  { id: "pella", name: "Pella", type: "site", parent_id: "irbid", country: "JO" },
  { id: "yarmouk-forest-reserve", name: "Yarmouk Forest Reserve", type: "park", parent_id: "irbid", country: "JO" },

  { id: "salt", name: "As-Salt", type: "city", parent_id: null, country: "JO" },
  { id: "salt-historic-center", name: "As-Salt Historic Center", type: "site", parent_id: "salt", country: "JO" },

  { id: "zarqa", name: "Zarqa", type: "city", parent_id: null, country: "JO" },
  { id: "azraq", name: "Azraq", type: "town", parent_id: "zarqa", country: "JO" },
  { id: "azraq-wetland-reserve", name: "Azraq Wetland Reserve", type: "park", parent_id: "azraq", country: "JO" },
  { id: "azraq-castle", name: "Azraq Castle", type: "site", parent_id: "azraq", country: "JO" },
  { id: "shaumari", name: "Shaumari", type: "natural", parent_id: "azraq", country: "JO" },
  { id: "shaumari-wildlife-reserve", name: "Shaumari Wildlife Reserve", type: "park", parent_id: "shaumari", country: "JO" },

  { id: "desert-castles", name: "Desert Castles", type: "natural", parent_id: null, country: "JO" },
  { id: "quseir-amra", name: "Quseir Amra", type: "site", parent_id: "desert-castles", country: "JO" },
  { id: "qasr-kharana", name: "Qasr Kharana", type: "site", parent_id: "desert-castles", country: "JO" },
  { id: "qasr-al-hallabat", name: "Qasr Al-Hallabat", type: "site", parent_id: "desert-castles", country: "JO" },
  { id: "qasr-al-mushatta", name: "Qasr Al-Mushatta", type: "site", parent_id: "desert-castles", country: "JO" },

  { id: "madaba", name: "Madaba", type: "city", parent_id: null, country: "JO" },
  { id: "st-george-church", name: "St George's Church and Mosaic Map", type: "site", parent_id: "madaba", country: "JO" },
  { id: "madaba-archaeological-park", name: "Madaba Archaeological Park", type: "site", parent_id: "madaba", country: "JO" },
  { id: "mount-nebo", name: "Mount Nebo", type: "site", parent_id: "madaba", country: "JO" },
  { id: "machaerus", name: "Machaerus (Mukawir)", type: "site", parent_id: "madaba", country: "JO" },
  { id: "bethany-beyond-the-jordan", name: "Bethany Beyond the Jordan (Al-Maghtas)", type: "site", parent_id: "madaba", country: "JO" },
  { id: "um-er-rasas", name: "Um er-Rasas", type: "site", parent_id: "madaba", country: "JO" },

  { id: "dead-sea", name: "Dead Sea", type: "natural", parent_id: null, country: "JO" },
  { id: "sweimeh", name: "Sweimeh", type: "resort", parent_id: "dead-sea", country: "JO" },
  { id: "mujib", name: "Wadi Mujib", type: "natural", parent_id: "dead-sea", country: "JO" },
  { id: "mujib-biosphere-reserve", name: "Mujib Biosphere Reserve", type: "park", parent_id: "mujib", country: "JO" },

  { id: "karak", name: "Karak", type: "city", parent_id: null, country: "JO" },
  { id: "karak-castle", name: "Karak Castle", type: "site", parent_id: "karak", country: "JO" },
  { id: "lot-cave", name: "Lot's Cave", type: "site", parent_id: "karak", country: "JO" },

  { id: "tafila", name: "Tafila", type: "city", parent_id: null, country: "JO" },
  { id: "dana", name: "Dana", type: "village", parent_id: "tafila", country: "JO" },
  { id: "dana-biosphere-reserve", name: "Dana Biosphere Reserve", type: "park", parent_id: "dana", country: "JO" },
  { id: "feynan", name: "Feynan", type: "village", parent_id: "dana", country: "JO" },
  { id: "feynan-ecolodge", name: "Feynan Ecolodge", type: "site", parent_id: "feynan", country: "JO" },

  { id: "shobak", name: "Shobak", type: "town", parent_id: null, country: "JO" },
  { id: "shobak-castle", name: "Shobak Castle", type: "site", parent_id: "shobak", country: "JO" },

  { id: "petra-region", name: "Petra Region", type: "natural", parent_id: null, country: "JO" },
  { id: "wadi-musa", name: "Wadi Musa", type: "town", parent_id: "petra-region", country: "JO" },
  { id: "petra", name: "Petra", type: "site", parent_id: "wadi-musa", country: "JO" },
  { id: "little-petra", name: "Little Petra (Siq al-Barid)", type: "site", parent_id: "wadi-musa", country: "JO" },
  { id: "al-siq", name: "Al-Siq", type: "site", parent_id: "petra", country: "JO" },
  { id: "the-treasury", name: "The Treasury", type: "site", parent_id: "petra", country: "JO" },
  { id: "street-of-facades", name: "Street of Facades", type: "site", parent_id: "petra", country: "JO" },
  { id: "royal-tombs", name: "Royal Tombs", type: "site", parent_id: "petra", country: "JO" },
  { id: "great-temple", name: "Great Temple", type: "site", parent_id: "petra", country: "JO" },
  { id: "qasr-al-bint", name: "Qasr Al-Bint", type: "site", parent_id: "petra", country: "JO" },
  { id: "the-monastery", name: "The Monastery", type: "site", parent_id: "petra", country: "JO" },
  { id: "high-place-of-sacrifice", name: "High Place of Sacrifice", type: "site", parent_id: "petra", country: "JO" },

  { id: "wadi-rum", name: "Wadi Rum", type: "natural", parent_id: null, country: "JO" },
  { id: "wadi-rum-protected-area", name: "Wadi Rum Protected Area", type: "park", parent_id: "wadi-rum", country: "JO" },
  { id: "rum-village", name: "Rum Village", type: "village", parent_id: "wadi-rum", country: "JO" },
  { id: "khazali-canyon", name: "Khazali Canyon", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "lawrence-spring", name: "Lawrence Spring", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "seven-pillars-of-wisdom", name: "Seven Pillars of Wisdom", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "um-frouth-rock-bridge", name: "Um Frouth Rock Bridge", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "burdah-rock-bridge", name: "Burdah Rock Bridge", type: "site", parent_id: "wadi-rum", country: "JO" },
  { id: "jebel-umm-ad-dami", name: "Jebel Umm ad Dami", type: "site", parent_id: "wadi-rum", country: "JO" },

  { id: "aqaba", name: "Aqaba", type: "city", parent_id: null, country: "JO" },
  { id: "aqaba-city-center", name: "Aqaba City Center", type: "district", parent_id: "aqaba", country: "JO" },
  { id: "aqaba-fort", name: "Aqaba Fort", type: "site", parent_id: "aqaba", country: "JO" },
  { id: "aqaba-marine-park", name: "Aqaba Marine Park", type: "park", parent_id: "aqaba", country: "JO" },
  { id: "south-beach", name: "South Beach", type: "site", parent_id: "aqaba", country: "JO" },
  { id: "berenice-beach", name: "Berenice Beach", type: "site", parent_id: "aqaba", country: "JO" },
  { id: "japanese-garden", name: "Japanese Garden", type: "reef", parent_id: "aqaba", country: "JO" },
  { id: "cedar-pride-wreck", name: "Cedar Pride Wreck", type: "reef", parent_id: "aqaba", country: "JO" },

  { id: "mafraq", name: "Mafraq", type: "city", parent_id: null, country: "JO" },
  { id: "umm-al-jimal", name: "Umm Al-Jimal", type: "site", parent_id: "mafraq", country: "JO" },
];

// ─── Places API — Egypt ───
const egyptPlaces: Place[] = [
  { id: "cairo", name: "Cairo", type: "city", parent_id: null, country: "EG" },
  { id: "giza", name: "Giza", type: "district", parent_id: "cairo", country: "EG" },
  { id: "great-pyramids", name: "Great Pyramids of Giza", type: "site", parent_id: "giza", country: "EG" },
  { id: "sphinx", name: "The Sphinx", type: "site", parent_id: "giza", country: "EG" },
  { id: "egyptian-museum", name: "Egyptian Museum", type: "museum", parent_id: "cairo", country: "EG" },
  { id: "khan-el-khalili", name: "Khan El Khalili", type: "site", parent_id: "cairo", country: "EG" },
  { id: "islamic-cairo", name: "Islamic Cairo", type: "district", parent_id: "cairo", country: "EG" },
  { id: "coptic-cairo", name: "Coptic Cairo", type: "district", parent_id: "cairo", country: "EG" },

  { id: "luxor", name: "Luxor", type: "city", parent_id: null, country: "EG" },
  { id: "valley-of-kings", name: "Valley of the Kings", type: "site", parent_id: "luxor", country: "EG" },
  { id: "karnak-temple", name: "Karnak Temple", type: "site", parent_id: "luxor", country: "EG" },
  { id: "luxor-temple", name: "Luxor Temple", type: "site", parent_id: "luxor", country: "EG" },
  { id: "hatshepsut-temple", name: "Hatshepsut Temple", type: "site", parent_id: "luxor", country: "EG" },
  { id: "colossi-of-memnon", name: "Colossi of Memnon", type: "site", parent_id: "luxor", country: "EG" },

  { id: "aswan", name: "Aswan", type: "city", parent_id: null, country: "EG" },
  { id: "philae-temple", name: "Philae Temple", type: "site", parent_id: "aswan", country: "EG" },
  { id: "abu-simbel", name: "Abu Simbel", type: "site", parent_id: "aswan", country: "EG" },
  { id: "nubian-village", name: "Nubian Village", type: "site", parent_id: "aswan", country: "EG" },

  { id: "dahab", name: "Dahab", type: "city", parent_id: null, country: "EG" },
  { id: "blue-hole-dahab", name: "Blue Hole", type: "reef", parent_id: "dahab", country: "EG" },
  { id: "lighthouse-reef", name: "Lighthouse Reef", type: "reef", parent_id: "dahab", country: "EG" },
  { id: "napoleon-reef", name: "Napoleon Reef", type: "reef", parent_id: "dahab", country: "EG" },
  { id: "three-pools", name: "Three Pools", type: "reef", parent_id: "dahab", country: "EG" },

  { id: "alexandria", name: "Alexandria", type: "city", parent_id: null, country: "EG" },
  { id: "bibliotheca-alexandrina", name: "Bibliotheca Alexandrina", type: "site", parent_id: "alexandria", country: "EG" },
  { id: "qaitbay-citadel", name: "Qaitbay Citadel", type: "site", parent_id: "alexandria", country: "EG" },
  { id: "catacombs-kom-el-shoqafa", name: "Catacombs of Kom El Shoqafa", type: "site", parent_id: "alexandria", country: "EG" },
];

// ─── Places API — Morocco ───
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
export const placesData: Place[] = [...jordanPlaces, ...egyptPlaces, ...moroccoPlaces];

// ─── City/destination descriptions for cards ───
export const placeDescriptions: Record<string, string> = {
  // Jordan
  "amman": "Discover Amman tours with local guides and explore the best things to do in Amman, Jordan. Visit the Citadel, Roman Theater, and Rainbow Street with guided cultural tours...",
  "jerash": "Discover Jerash tours with local guides and explore one of the best-preserved Roman cities in the world. Walk through ancient colonnaded streets and theaters...",
  "ajloun": "Discover Ajloun tours with local guides. Visit Ajloun Castle, hike through the forest reserve, and experience the green highlands of northern Jordan...",
  "irbid": "Discover Irbid tours with local guides. Visit Umm Qais, Pella, and the Yarmouk Forest Reserve in northern Jordan...",
  "salt": "Discover As-Salt tours with local guides. Walk through the UNESCO World Heritage historic center and its Ottoman-era architecture...",
  "zarqa": "Discover Zarqa tours with local guides. Visit Azraq Wetland Reserve, Azraq Castle, and the Shaumari Wildlife Reserve...",
  "desert-castles": "Discover Desert Castles tours with local guides. Explore UNESCO-listed Umayyad palaces including Quseir Amra, Qasr Kharana, and more...",
  "madaba": "Discover Madaba tours with local guides. See the ancient mosaic map at St George's Church, visit Mount Nebo, and explore Bethany Beyond the Jordan...",
  "dead-sea": "Discover Dead Sea tours with local guides. Float in the lowest point on Earth, hike Wadi Mujib canyon, and relax at world-class resorts...",
  "karak": "Discover Karak tours with local guides. Visit the imposing Crusader castle and explore Lot's Cave with panoramic Dead Sea views...",
  "tafila": "Discover Tafila tours with local guides. Trek through Dana Biosphere Reserve and stay at the eco-friendly Feynan Ecolodge...",
  "shobak": "Discover Shobak tours with local guides. Visit the dramatic Crusader fortress perched on a hilltop south of Jordan...",
  "petra-region": "Discover Petra tours with local guides and explore the best things to do in Petra, Jordan. Visit the Treasury, the Monastery, Al-Siq, and Little Petra with guided hiking tours...",
  "wadi-rum": "Discover Wadi Rum tours with local guides and explore the Valley of the Moon. Experience jeep safaris, camel rides, stargazing, and overnight Bedouin camping...",
  "aqaba": "Discover Aqaba tours with local guides. Snorkel the Red Sea coral reefs, dive the Cedar Pride wreck, and explore the marine park...",
  "mafraq": "Discover Mafraq tours with local guides. Visit the ancient basalt city of Umm Al-Jimal in eastern Jordan...",
  // Egypt
  "cairo": "Discover Cairo tours with local guides and explore the best things to do in Cairo, Egypt. Visit the Pyramids of Giza, the Egyptian Museum, and the historic markets of Khan El Khalili...",
  "luxor": "Discover Luxor tours with local guides and explore the best things to do in Luxor, Egypt. Visit the Valley of the Kings, Karnak Temple, and Luxor Temple with guided cultural tours...",
  "aswan": "Discover Aswan tours with local guides and explore the best things to do in Aswan, Egypt. Visit landmarks like Philae Temple, the High Dam, and take an Abu Simbel day trip...",
  "dahab": "Discover Dahab tours with local guides and explore the best things to do in Dahab, Egypt. Visit the famous Blue Hole, snorkel the Red Sea coral reefs, and experience desert adventures...",
  "alexandria": "Discover Alexandria tours with local guides. Visit the Bibliotheca Alexandrina, Qaitbay Citadel, and the ancient Catacombs of Kom El Shoqafa...",
  // Morocco
  "marrakech": "Discover Marrakech tours with local guides. Explore the labyrinthine medina, haggle at the souks, and watch sunset from Jemaa El-Fna square...",
  "fes": "Discover Fes tours with local guides. Explore the medieval medina, visit centuries-old tanneries, and discover the spiritual soul of Morocco...",
  "chefchaouen": "Discover Chefchaouen tours with local guides. Wander the famous blue-washed streets and enjoy breathtaking Rif Mountain views...",
  "sahara-morocco": "Discover Sahara Desert tours with local guides. Ride camels over golden dunes at sunset and sleep under the stars in a Berber camp...",
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
  "wadi-rum": "https://images.unsplash.com/photo-1580834341580-8c17a3a630c0?w=600&h=400&fit=crop",
  "petra-region": "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600&h=400&fit=crop",
  "amman": "https://images.unsplash.com/photo-1563235876-dd5e5db6b536?w=600&h=400&fit=crop",
  "dead-sea": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  "aqaba": "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
  "jerash": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&h=400&fit=crop",
  "madaba": "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?w=600&h=400&fit=crop",
  "ajloun": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
  "cairo": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&h=400&fit=crop",
  "luxor": "https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?w=600&h=400&fit=crop",
  "aswan": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  "dahab": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  "alexandria": "https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=600&h=400&fit=crop",
  "marrakech": "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop",
  "fes": "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=600&h=400&fit=crop",
  "chefchaouen": "https://images.unsplash.com/photo-1553603227-2358aabe8eca?w=600&h=400&fit=crop",
  "sahara-morocco": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop",
};

// ─── Mock tours ───
export const mockGuideTours: GuideTour[] = [
  // Jordan
  { id: "1", title: "Wadi Rum Overnight 4x4 Jeep Safari", main_place_id: "wadi-rum", places: ["khazali-canyon", "lawrence-spring", "um-frouth-rock-bridge", "seven-pillars-of-wisdom"], price: 147, duration: "2 Days", tour_type: "Jeep Tour", category: "getaway", description: "Explore the vast desert landscapes of Wadi Rum on a 4x4 jeep adventure with overnight Bedouin camping.", status: "published", created_at: "2026-02-15" },
  { id: "2", title: "Petra Full Day Guided Tour", main_place_id: "petra-region", places: ["al-siq", "the-treasury", "the-monastery", "royal-tombs", "high-place-of-sacrifice"], price: 95, duration: "8 Hours", tour_type: "Hiking", category: "getaway", description: "Walk through the ancient city of Petra with a local Bedouin guide.", status: "published", created_at: "2026-01-20" },
  { id: "3", title: "Amman Street Food & Culture Walk", main_place_id: "amman", places: ["downtown-amman", "rainbow-street", "amman-citadel", "roman-theater-amman"], price: 45, duration: "4 Hours", tour_type: "Food Tour", category: "dining", description: "Taste authentic Jordanian street food while exploring Amman's historic downtown.", status: "published", created_at: "2026-03-01" },
  { id: "4", title: "Dead Sea & Wadi Mujib Adventure", main_place_id: "dead-sea", places: ["sweimeh", "mujib", "mujib-biosphere-reserve"], price: 75, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Float in the Dead Sea and hike through the stunning Wadi Mujib canyon.", status: "published", created_at: "2026-02-28" },
  { id: "5", title: "Aqaba Snorkeling & Reef Tour", main_place_id: "aqaba", places: ["japanese-garden", "cedar-pride-wreck", "aqaba-marine-park"], price: 60, duration: "5 Hours", tour_type: "Snorkeling", category: "getaway", description: "Discover the coral reefs and marine life of the Red Sea in Aqaba.", status: "published", created_at: "2026-03-10" },
  { id: "6", title: "Petra by Night & Treasury Candlelight", main_place_id: "petra-region", places: ["al-siq", "the-treasury"], price: 70, duration: "3 Hours", tour_type: "Cultural", category: "local-living", description: "Experience the magic of Petra illuminated by thousands of candles under the stars.", status: "published", created_at: "2026-02-10" },
  { id: "7", title: "Wadi Rum Sunset Hike & Stargazing", main_place_id: "wadi-rum", places: ["burdah-rock-bridge", "jebel-umm-ad-dami"], price: 85, duration: "6 Hours", tour_type: "Hiking", category: "getaway", description: "Hike to Burdah Rock Bridge at sunset then stargaze from Jordan's highest peak.", status: "published", created_at: "2026-03-05" },
  { id: "8", title: "Jerash & Ajloun Castle Day Trip", main_place_id: "jerash", places: ["jerash-archaeological-site", "ajloun-castle"], price: 65, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Visit the best-preserved Roman ruins outside Italy and the medieval Ajloun Castle.", status: "published", created_at: "2026-01-15" },
  { id: "9", title: "Amman Citadel & Roman Theater Walk", main_place_id: "amman", places: ["amman-citadel", "roman-theater-amman", "jordan-museum"], price: 35, duration: "3 Hours", tour_type: "City Walk", category: "local-living", description: "Discover 7,000 years of history at the Citadel hilltop and the ancient Roman Theater.", status: "published", created_at: "2026-02-20" },
  { id: "10", title: "Dana Nature Reserve Hiking Trail", main_place_id: "tafila", places: ["dana", "dana-biosphere-reserve", "feynan", "feynan-ecolodge"], price: 55, duration: "Full Day", tour_type: "Hiking", category: "getaway", description: "Trek through Dana Biosphere Reserve from mountaintop to the Feynan desert valley.", status: "published", created_at: "2026-03-08" },
  { id: "11", title: "Aqaba Scuba Diving Experience", main_place_id: "aqaba", places: ["cedar-pride-wreck", "aqaba-marine-park", "south-beach"], price: 120, duration: "4 Hours", tour_type: "Diving", category: "getaway", description: "Dive the famous Cedar Pride shipwreck and explore vibrant coral gardens.", status: "published", created_at: "2026-02-25" },
  { id: "12", title: "Madaba Mosaics & Mount Nebo Tour", main_place_id: "madaba", places: ["st-george-church", "madaba-archaeological-park", "mount-nebo"], price: 50, duration: "5 Hours", tour_type: "Cultural", category: "local-living", description: "See the ancient mosaic map of the Holy Land and the panoramic views from Mount Nebo.", status: "published", created_at: "2026-01-28" },
  { id: "13", title: "Wadi Rum Bedouin Camp & Camel Ride", main_place_id: "wadi-rum", places: ["rum-village", "wadi-rum-protected-area", "khazali-canyon"], price: 110, duration: "2 Days", tour_type: "Camping", category: "getaway", description: "Stay with Bedouin families, ride camels at sunrise, and sleep under desert stars.", status: "published", created_at: "2026-03-12" },
  { id: "14", title: "Petra Back Trail to the Monastery", main_place_id: "petra-region", places: ["the-monastery", "qasr-al-bint", "great-temple"], price: 80, duration: "6 Hours", tour_type: "Hiking", category: "getaway", description: "Take the less-traveled back trail to the Monastery, avoiding the crowds.", status: "published", created_at: "2026-02-18" },
  { id: "15", title: "Desert Castles Loop from Amman", main_place_id: "desert-castles", places: ["quseir-amra", "qasr-kharana", "qasr-al-hallabat", "azraq-castle"], price: 70, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Explore UNESCO-listed Umayyad desert palaces on a scenic loop through eastern Jordan.", status: "published", created_at: "2026-03-02" },
  { id: "16", title: "Karak Castle & Dead Sea Panorama", main_place_id: "karak", places: ["karak-castle", "lot-cave"], price: 55, duration: "Full Day", tour_type: "Cultural", category: "local-living", description: "Visit the imposing Crusader castle in Karak with views stretching to the Dead Sea.", status: "published", created_at: "2026-01-10" },
  { id: "17", title: "Umm Qais & Northern Jordan Highlights", main_place_id: "irbid", places: ["umm-qais", "pella", "yarmouk-forest-reserve"], price: 60, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Discover the Greco-Roman ruins of Umm Qais with views of the Sea of Galilee.", status: "published", created_at: "2026-02-05" },
  { id: "18", title: "Private Petra & Little Petra Combo", main_place_id: "petra-region", places: ["petra", "little-petra", "al-siq", "the-treasury", "the-monastery"], price: 180, duration: "2 Days", tour_type: "Private Tour", category: "local-living", description: "An exclusive two-day private tour covering both Petra and the hidden gem Little Petra.", status: "published", created_at: "2026-03-14" },
  { id: "19", title: "Amman to Wadi Rum Express", main_place_id: "wadi-rum", places: ["wadi-rum-protected-area", "seven-pillars-of-wisdom", "lawrence-spring"], price: 130, duration: "Full Day", tour_type: "Jeep Tour", category: "getaway", description: "A fast-paced day trip from Amman to experience Wadi Rum's iconic landmarks.", status: "published", created_at: "2026-03-09" },
  { id: "20", title: "As-Salt Heritage Walk", main_place_id: "salt", places: ["salt-historic-center"], price: 30, duration: "3 Hours", tour_type: "City Walk", category: "local-living", description: "Walk through the UNESCO World Heritage town of As-Salt and its Ottoman architecture.", status: "published", created_at: "2026-02-12" },

  // Egypt
  { id: "21", title: "Pyramids of Giza & Sphinx Tour", main_place_id: "cairo", places: ["giza", "great-pyramids", "sphinx"], price: 65, duration: "5 Hours", tour_type: "Cultural", category: "local-living", description: "Stand before the last surviving wonder of the ancient world with an expert Egyptologist.", status: "published", created_at: "2026-03-01" },
  { id: "22", title: "Cairo Islamic Quarter & Khan El Khalili", main_place_id: "cairo", places: ["islamic-cairo", "khan-el-khalili", "egyptian-museum"], price: 40, duration: "4 Hours", tour_type: "City Walk", category: "local-living", description: "Wander through medieval mosques, madrasas, and the legendary bazaar of Cairo.", status: "published", created_at: "2026-02-20" },
  { id: "23", title: "Luxor West Bank: Valley of the Kings", main_place_id: "luxor", places: ["valley-of-kings", "hatshepsut-temple", "colossi-of-memnon"], price: 80, duration: "6 Hours", tour_type: "Cultural", category: "local-living", description: "Explore the tombs of pharaohs and the temple of Egypt's only female pharaoh.", status: "published", created_at: "2026-01-25" },
  { id: "24", title: "Karnak & Luxor Temple Sunset Walk", main_place_id: "luxor", places: ["karnak-temple", "luxor-temple"], price: 55, duration: "4 Hours", tour_type: "Cultural", category: "local-living", description: "Walk the hypostyle halls at golden hour and watch the temples glow at sunset.", status: "published", created_at: "2026-02-14" },
  { id: "25", title: "Dahab Blue Hole Freediving Day", main_place_id: "dahab", places: ["blue-hole-dahab", "lighthouse-reef"], price: 70, duration: "Full Day", tour_type: "Diving", category: "getaway", description: "Freedive the legendary Blue Hole and snorkel the pristine Lighthouse reef.", status: "published", created_at: "2026-03-08" },
  { id: "26", title: "Aswan Felucca Sail & Nubian Village", main_place_id: "aswan", places: ["philae-temple", "nubian-village"], price: 50, duration: "5 Hours", tour_type: "Cultural", category: "local-living", description: "Sail the Nile on a traditional felucca and dine with a Nubian family.", status: "published", created_at: "2026-02-18" },
  { id: "27", title: "Abu Simbel Sunrise Day Trip", main_place_id: "aswan", places: ["abu-simbel"], price: 110, duration: "Full Day", tour_type: "Day Trip", category: "getaway", description: "Witness the sun illuminate Ramses II's face at the Great Temple of Abu Simbel.", status: "published", created_at: "2026-03-12" },

  // Morocco
  { id: "28", title: "Marrakech Medina & Souks Tour", main_place_id: "marrakech", places: ["jemaa-el-fna", "medina-marrakech", "bahia-palace"], price: 40, duration: "4 Hours", tour_type: "City Walk", category: "local-living", description: "Navigate the labyrinthine medina with a local guide — souks, riads, and rooftop views.", status: "published", created_at: "2026-02-22" },
  { id: "29", title: "Sahara Desert Camel Trek & Camp", main_place_id: "sahara-morocco", places: ["erg-chebbi", "merzouga"], price: 150, duration: "2 Days", tour_type: "Camping", category: "getaway", description: "Ride camels over golden dunes at sunset and sleep under the Saharan stars.", status: "published", created_at: "2026-03-05" },
  { id: "30", title: "Fes Tanneries & Medieval Medina", main_place_id: "fes", places: ["fes-medina", "chouara-tannery", "bou-inania-madrasa"], price: 35, duration: "3 Hours", tour_type: "Cultural", category: "local-living", description: "Explore the world's oldest university city and its centuries-old leather tanneries.", status: "published", created_at: "2026-01-30" },
];
