export interface Place {
  id: string;
  name: string;
  type: string;
  parent_id: string | null;
}

export interface GuideTour {
  id: string;
  title: string;
  main_place_id: string;
  places: string[]; // child place ids
  price: number;
  duration: string;
  tour_type: string;
  description: string;
  status: "draft" | "published";
  created_at: string;
}

export const placesData: Place[] = [
  { id: "amman", name: "Amman", type: "city", parent_id: null },
  { id: "downtown-amman", name: "Downtown Amman", type: "district", parent_id: "amman" },
  { id: "jabal-amman", name: "Jabal Amman", type: "district", parent_id: "amman" },
  { id: "jabal-al-weibdeh", name: "Jabal Al Weibdeh", type: "district", parent_id: "amman" },
  { id: "abdoun", name: "Abdoun", type: "district", parent_id: "amman" },
  { id: "rainbow-street", name: "Rainbow Street", type: "site", parent_id: "jabal-amman" },
  { id: "amman-citadel", name: "Amman Citadel", type: "site", parent_id: "amman" },
  { id: "roman-theater-amman", name: "Roman Theater", type: "site", parent_id: "downtown-amman" },
  { id: "jordan-museum", name: "The Jordan Museum", type: "museum", parent_id: "amman" },
  { id: "royal-automobile-museum", name: "Royal Automobile Museum", type: "museum", parent_id: "amman" },
  { id: "king-abdullah-i-mosque", name: "King Abdullah I Mosque", type: "site", parent_id: "amman" },
  { id: "iraq-al-amir", name: "Iraq Al-Amir", type: "site", parent_id: "amman" },
  { id: "qasr-al-abd", name: "Qasr Al-Abd", type: "site", parent_id: "iraq-al-amir" },
  { id: "jerash", name: "Jerash", type: "city", parent_id: null },
  { id: "jerash-archaeological-site", name: "Jerash Archaeological Site", type: "site", parent_id: "jerash" },
  { id: "ajloun", name: "Ajloun", type: "city", parent_id: null },
  { id: "ajloun-castle", name: "Ajloun Castle", type: "site", parent_id: "ajloun" },
  { id: "ajloun-forest-reserve", name: "Ajloun Forest Reserve", type: "park", parent_id: "ajloun" },
  { id: "irbid", name: "Irbid", type: "city", parent_id: null },
  { id: "umm-qais", name: "Umm Qais", type: "site", parent_id: "irbid" },
  { id: "beit-ras", name: "Beit Ras (Capitolias)", type: "site", parent_id: "irbid" },
  { id: "pella", name: "Pella", type: "site", parent_id: "irbid" },
  { id: "yarmouk-forest-reserve", name: "Yarmouk Forest Reserve", type: "park", parent_id: "irbid" },
  { id: "salt", name: "As-Salt", type: "city", parent_id: null },
  { id: "salt-historic-center", name: "As-Salt Historic Center", type: "site", parent_id: "salt" },
  { id: "zarqa", name: "Zarqa", type: "city", parent_id: null },
  { id: "azraq", name: "Azraq", type: "town", parent_id: "zarqa" },
  { id: "azraq-wetland-reserve", name: "Azraq Wetland Reserve", type: "park", parent_id: "azraq" },
  { id: "azraq-castle", name: "Azraq Castle", type: "site", parent_id: "azraq" },
  { id: "shaumari", name: "Shaumari", type: "natural", parent_id: "azraq" },
  { id: "shaumari-wildlife-reserve", name: "Shaumari Wildlife Reserve", type: "park", parent_id: "shaumari" },
  { id: "desert-castles", name: "Desert Castles", type: "natural", parent_id: null },
  { id: "quseir-amra", name: "Quseir Amra", type: "site", parent_id: "desert-castles" },
  { id: "qasr-kharana", name: "Qasr Kharana", type: "site", parent_id: "desert-castles" },
  { id: "qasr-al-hallabat", name: "Qasr Al-Hallabat", type: "site", parent_id: "desert-castles" },
  { id: "qasr-al-mushatta", name: "Qasr Al-Mushatta", type: "site", parent_id: "desert-castles" },
  { id: "madaba", name: "Madaba", type: "city", parent_id: null },
  { id: "st-george-church", name: "St George's Church and Mosaic Map", type: "site", parent_id: "madaba" },
  { id: "madaba-archaeological-park", name: "Madaba Archaeological Park", type: "site", parent_id: "madaba" },
  { id: "mount-nebo", name: "Mount Nebo", type: "site", parent_id: "madaba" },
  { id: "machaerus", name: "Machaerus (Mukawir)", type: "site", parent_id: "madaba" },
  { id: "bethany-beyond-the-jordan", name: "Bethany Beyond the Jordan (Al-Maghtas)", type: "site", parent_id: "madaba" },
  { id: "um-er-rasas", name: "Um er-Rasas", type: "site", parent_id: "madaba" },
  { id: "dead-sea", name: "Dead Sea", type: "natural", parent_id: null },
  { id: "sweimeh", name: "Sweimeh", type: "resort", parent_id: "dead-sea" },
  { id: "mujib", name: "Wadi Mujib", type: "natural", parent_id: "dead-sea" },
  { id: "mujib-biosphere-reserve", name: "Mujib Biosphere Reserve", type: "park", parent_id: "mujib" },
  { id: "karak", name: "Karak", type: "city", parent_id: null },
  { id: "karak-castle", name: "Karak Castle", type: "site", parent_id: "karak" },
  { id: "lot-cave", name: "Lot's Cave", type: "site", parent_id: "karak" },
  { id: "tafila", name: "Tafila", type: "city", parent_id: null },
  { id: "dana", name: "Dana", type: "village", parent_id: "tafila" },
  { id: "dana-biosphere-reserve", name: "Dana Biosphere Reserve", type: "park", parent_id: "dana" },
  { id: "feynan", name: "Feynan", type: "village", parent_id: "dana" },
  { id: "feynan-ecolodge", name: "Feynan Ecolodge", type: "site", parent_id: "feynan" },
  { id: "shobak", name: "Shobak", type: "town", parent_id: null },
  { id: "shobak-castle", name: "Shobak Castle", type: "site", parent_id: "shobak" },
  { id: "petra-region", name: "Petra Region", type: "natural", parent_id: null },
  { id: "wadi-musa", name: "Wadi Musa", type: "town", parent_id: "petra-region" },
  { id: "petra", name: "Petra", type: "site", parent_id: "wadi-musa" },
  { id: "little-petra", name: "Little Petra (Siq al-Barid)", type: "site", parent_id: "wadi-musa" },
  { id: "al-siq", name: "Al-Siq", type: "site", parent_id: "petra" },
  { id: "the-treasury", name: "The Treasury", type: "site", parent_id: "petra" },
  { id: "street-of-facades", name: "Street of Facades", type: "site", parent_id: "petra" },
  { id: "royal-tombs", name: "Royal Tombs", type: "site", parent_id: "petra" },
  { id: "great-temple", name: "Great Temple", type: "site", parent_id: "petra" },
  { id: "qasr-al-bint", name: "Qasr Al-Bint", type: "site", parent_id: "petra" },
  { id: "the-monastery", name: "The Monastery", type: "site", parent_id: "petra" },
  { id: "high-place-of-sacrifice", name: "High Place of Sacrifice", type: "site", parent_id: "petra" },
  { id: "wadi-rum", name: "Wadi Rum", type: "natural", parent_id: null },
  { id: "wadi-rum-protected-area", name: "Wadi Rum Protected Area", type: "park", parent_id: "wadi-rum" },
  { id: "rum-village", name: "Rum Village", type: "village", parent_id: "wadi-rum" },
  { id: "khazali-canyon", name: "Khazali Canyon", type: "site", parent_id: "wadi-rum" },
  { id: "lawrence-spring", name: "Lawrence Spring", type: "site", parent_id: "wadi-rum" },
  { id: "seven-pillars-of-wisdom", name: "Seven Pillars of Wisdom", type: "site", parent_id: "wadi-rum" },
  { id: "um-frouth-rock-bridge", name: "Um Frouth Rock Bridge", type: "site", parent_id: "wadi-rum" },
  { id: "burdah-rock-bridge", name: "Burdah Rock Bridge", type: "site", parent_id: "wadi-rum" },
  { id: "jebel-umm-ad-dami", name: "Jebel Umm ad Dami", type: "site", parent_id: "wadi-rum" },
  { id: "aqaba", name: "Aqaba", type: "city", parent_id: null },
  { id: "aqaba-city-center", name: "Aqaba City Center", type: "district", parent_id: "aqaba" },
  { id: "aqaba-fort", name: "Aqaba Fort", type: "site", parent_id: "aqaba" },
  { id: "aqaba-marine-park", name: "Aqaba Marine Park", type: "park", parent_id: "aqaba" },
  { id: "south-beach", name: "South Beach", type: "site", parent_id: "aqaba" },
  { id: "berenice-beach", name: "Berenice Beach", type: "site", parent_id: "aqaba" },
  { id: "japanese-garden", name: "Japanese Garden", type: "reef", parent_id: "aqaba" },
  { id: "cedar-pride-wreck", name: "Cedar Pride Wreck", type: "reef", parent_id: "aqaba" },
  { id: "mafraq", name: "Mafraq", type: "city", parent_id: null },
  { id: "umm-al-jimal", name: "Umm Al-Jimal", type: "site", parent_id: "mafraq" },
];

// Helper functions
export function getTopLevelPlaces(): Place[] {
  return placesData.filter((p) => p.parent_id === null);
}

/** Get all descendants of a place (recursive) */
export function getDescendants(parentId: string): Place[] {
  const children = placesData.filter((p) => p.parent_id === parentId);
  const all: Place[] = [...children];
  children.forEach((c) => {
    all.push(...getDescendants(c.id));
  });
  return all;
}

/** Get direct children */
export function getChildren(parentId: string): Place[] {
  return placesData.filter((p) => p.parent_id === parentId);
}

export function getPlaceById(id: string): Place | undefined {
  return placesData.find((p) => p.id === id);
}

/** Get breadcrumb path from root to place */
export function getPlaceBreadcrumb(placeId: string): Place[] {
  const path: Place[] = [];
  let current = getPlaceById(placeId);
  while (current) {
    path.unshift(current);
    current = current.parent_id ? getPlaceById(current.parent_id) : undefined;
  }
  return path;
}

// Tour types for filtering
export const tourTypes = [
  "Jeep Tour", "Hiking", "Food Tour", "Cultural", "Diving",
  "Snorkeling", "Camping", "City Walk", "Private Tour", "Day Trip",
] as const;

export type TourType = typeof tourTypes[number];

// Mock tours for demo
export const mockGuideTours: GuideTour[] = [
  {
    id: "1",
    title: "Wadi Rum Overnight 4x4 Jeep Safari",
    main_place_id: "wadi-rum",
    places: ["khazali-canyon", "lawrence-spring", "um-frouth-rock-bridge", "seven-pillars-of-wisdom"],
    price: 147,
    duration: "2 Days",
    tour_type: "Jeep Tour",
    description: "Explore the vast desert landscapes of Wadi Rum on a 4x4 jeep adventure with overnight Bedouin camping.",
    status: "published",
    created_at: "2026-02-15",
  },
  {
    id: "2",
    title: "Petra Full Day Guided Tour",
    main_place_id: "petra-region",
    places: ["al-siq", "the-treasury", "the-monastery", "royal-tombs", "high-place-of-sacrifice"],
    price: 95,
    duration: "8 Hours",
    tour_type: "Hiking",
    description: "Walk through the ancient city of Petra with a local Bedouin guide.",
    status: "published",
    created_at: "2026-01-20",
  },
  {
    id: "3",
    title: "Amman Street Food & Culture Walk",
    main_place_id: "amman",
    places: ["downtown-amman", "rainbow-street", "amman-citadel", "roman-theater-amman"],
    price: 45,
    duration: "4 Hours",
    tour_type: "Food Tour",
    description: "Taste authentic Jordanian street food while exploring Amman's historic downtown.",
    status: "draft",
    created_at: "2026-03-01",
  },
  {
    id: "4",
    title: "Dead Sea & Wadi Mujib Adventure",
    main_place_id: "dead-sea",
    places: ["sweimeh", "mujib", "mujib-biosphere-reserve"],
    price: 75,
    duration: "Full Day",
    tour_type: "Day Trip",
    description: "Float in the Dead Sea and hike through the stunning Wadi Mujib canyon.",
    status: "published",
    created_at: "2026-02-28",
  },
  {
    id: "5",
    title: "Aqaba Snorkeling & Reef Tour",
    main_place_id: "aqaba",
    places: ["japanese-garden", "cedar-pride-wreck", "aqaba-marine-park"],
    price: 60,
    duration: "5 Hours",
    tour_type: "Snorkeling",
    description: "Discover the coral reefs and marine life of the Red Sea in Aqaba.",
    status: "published",
    created_at: "2026-03-10",
  },
];
