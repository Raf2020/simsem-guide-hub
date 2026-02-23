export interface TourType {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  url: string;
}

export interface City {
  name: string;
  slug: string;
  photo: string;
  description: string;
  tourCount: number;
  url: string;
}

export interface Country {
  name: string;
  slug: string;
  flag: string;
  heroImage: string;
  description: string;
  cities: City[];
}

export const tourTypes: TourType[] = [
  {
    id: 'getaway',
    name: 'Getaway',
    slug: 'getaway',
    description: 'Multi-day escapes with thrilling hikes, desert camps, and scenic explorations into the heart of the Arab world.',
    icon: '🏕️',
    url: 'https://mysimsem.com/experience-category/getaway/',
  },
  {
    id: 'dining',
    name: 'Dining',
    slug: 'dining',
    description: 'Savor authentic flavors as you dine with locals, sharing stories over delectable dishes and family recipes.',
    icon: '🍽️',
    url: 'https://mysimsem.com/experience-category/dining/',
  },
  {
    id: 'local-living',
    name: 'Local Living',
    slug: 'local-living',
    description: 'Step into daily life with immersive encounters — from coffee shop hangouts to bread baking with real families.',
    icon: '🏠',
    url: 'https://mysimsem.com/experience-category/local-living/',
  },
  {
    id: 'custom',
    name: 'Custom Tours',
    slug: 'custom',
    description: 'Guided adventures through ancient sites, hidden gems, and local secrets with knowledgeable local guides.',
    icon: '🗺️',
    url: 'https://mysimsem.com/experiences/',
  },
];

export const countries: Country[] = [
  {
    name: 'Egypt',
    slug: 'egypt',
    flag: '🇪🇬',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=1200&q=80',
    description: 'From the ancient pyramids of Giza to the vibrant streets of Cairo and the pristine shores of Sinai — Egypt is a land of endless wonder.',
    cities: [
      {
        name: 'Cairo',
        slug: 'cairo',
        photo: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=80',
        description: 'Explore ancient history, Islamic architecture, and the world-famous Egyptian Museum in the beating heart of the Arab world.',
        tourCount: 24,
        url: 'https://mysimsem.com/experiences/?destination=cairo',
      },
      {
        name: 'Luxor',
        slug: 'luxor',
        photo: 'https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?w=600&q=80',
        description: 'Walk among pharaohs in the world\'s greatest open-air museum — home to Karnak, the Valley of the Kings, and hot air balloons at sunrise.',
        tourCount: 18,
        url: 'https://mysimsem.com/experiences/?destination=luxor',
      },
      {
        name: 'Sinai',
        slug: 'sinai',
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        description: 'Dive the legendary Blue Hole, trek to Saint Catherine\'s Monastery, and sleep under a canopy of Bedouin stars.',
        tourCount: 12,
        url: 'https://mysimsem.com/experiences/?destination=sinai',
      },
      {
        name: 'Aswan',
        slug: 'aswan',
        photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        description: 'Sail the Nile on a traditional felucca, visit Philae Temple, and experience the warmth of Nubian village culture.',
        tourCount: 9,
        url: 'https://mysimsem.com/experiences/?destination=aswan',
      },
      {
        name: 'Alexandria',
        slug: 'alexandria',
        photo: 'https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=600&q=80',
        description: 'Discover Cleopatra\'s city — where Mediterranean breezes meet ancient catacombs, seafood markets, and faded colonial grandeur.',
        tourCount: 8,
        url: 'https://mysimsem.com/experiences/?destination=alexandria',
      },
    ],
  },
  {
    name: 'Jordan',
    slug: 'jordan',
    flag: '🇯🇴',
    heroImage: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=1200&q=80',
    description: 'From the rose-red city of Petra to the silence of Wadi Rum and the healing waters of the Dead Sea — Jordan is where history meets hospitality.',
    cities: [
      {
        name: 'Petra',
        slug: 'petra',
        photo: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        description: 'Walk through the Siq and emerge before the iconic Treasury — the ancient Nabataean city carved into rose-red rock awaits.',
        tourCount: 20,
        url: 'https://mysimsem.com/experiences/?destination=petra',
      },
      {
        name: 'Amman',
        slug: 'amman',
        photo: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=600&q=80',
        description: 'Explore the white city built on hills — where Roman ruins meet hip cafes, art galleries, and the finest Middle Eastern street food.',
        tourCount: 15,
        url: 'https://mysimsem.com/experiences/?destination=amman',
      },
      {
        name: 'Wadi Rum',
        slug: 'wadi-rum',
        photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        description: 'Camp under billions of stars in the Valley of the Moon — a Martian landscape of red sand dunes and towering sandstone cliffs.',
        tourCount: 11,
        url: '/tours/jordan/wadi-rum-overnight-4x4-jeep-tour',
      },
      {
        name: 'Aqaba',
        slug: 'aqaba',
        photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
        description: 'Dive coral reefs teeming with life in Jordan\'s only sea port — snorkel, sail, and shop for handcrafted Bedouin souvenirs.',
        tourCount: 7,
        url: 'https://mysimsem.com/experiences/?destination=aqaba',
      },
      {
        name: 'Jerash',
        slug: 'jerash',
        photo: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=600&q=80',
        description: 'Step into one of the best-preserved Roman cities in the world — columns, theaters, and chariot tracks frozen in time.',
        tourCount: 6,
        url: 'https://mysimsem.com/experiences/?destination=jerash',
      },
    ],
  },
  {
    name: 'Morocco',
    slug: 'morocco',
    flag: '🇲🇦',
    heroImage: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&q=80',
    description: 'Where the Sahara meets the Atlantic — Morocco dazzles with ancient medinas, fragrant souks, blue alleys, and the world\'s finest mint tea.',
    cities: [
      {
        name: 'Marrakech',
        slug: 'marrakech',
        photo: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80',
        description: 'Get lost in the labyrinthine medina, haggle at the souks, and watch the world from Djemaa el-Fna as the sun sets over minarets.',
        tourCount: 22,
        url: 'https://mysimsem.com/experiences/?destination=marrakech',
      },
      {
        name: 'Fes',
        slug: 'fes',
        photo: 'https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=600&q=80',
        description: 'The spiritual soul of Morocco — medieval tanneries, centuries-old madrasas, and a medina unchanged since the Middle Ages.',
        tourCount: 14,
        url: 'https://mysimsem.com/experiences/?destination=fes',
      },
      {
        name: 'Chefchaouen',
        slug: 'chefchaouen',
        photo: 'https://images.unsplash.com/photo-1553603227-2358aabe8eca?w=600&q=80',
        description: 'The famous Blue Pearl — a mountain town of indigo-washed streets, artisan shops, and breathtaking Rif Mountain views.',
        tourCount: 9,
        url: 'https://mysimsem.com/experiences/?destination=chefchaouen',
      },
      {
        name: 'Sahara Desert',
        slug: 'sahara',
        photo: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80',
        description: 'Ride camels over golden dunes at sunset, sleep in a Berber camp, and wake to the silence of the world\'s largest hot desert.',
        tourCount: 13,
        url: 'https://mysimsem.com/experiences/?destination=sahara',
      },
    ],
  },
  {
    name: 'Saudi Arabia',
    slug: 'saudi-arabia',
    flag: '🇸🇦',
    heroImage: 'https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=1200&q=80',
    description: 'A kingdom awakening to tourism — from the ancient Nabataean city of AlUla to the futuristic skyline of Riyadh and the coral reefs of the Red Sea.',
    cities: [
      {
        name: 'AlUla',
        slug: 'alula',
        photo: 'https://images.unsplash.com/photo-1586102643897-31b4e6fe0f74?w=600&q=80',
        description: 'Explore Hegra — Arabia\'s Petra — and the dramatic sandstone formations of this ancient oasis city rising from the desert.',
        tourCount: 10,
        url: 'https://mysimsem.com/experiences/?destination=alula',
      },
      {
        name: 'Riyadh',
        slug: 'riyadh',
        photo: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&q=80',
        description: 'Discover the modern face of Saudi Arabia — towering skylines, world-class museums, and a culinary scene taking the world by storm.',
        tourCount: 8,
        url: 'https://mysimsem.com/experiences/?destination=riyadh',
      },
      {
        name: 'Jeddah',
        slug: 'jeddah',
        photo: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80',
        description: 'Walk the UNESCO-listed Historic District of Al-Balad, snorkel the Red Sea, and feast on the freshest seafood in the Arab world.',
        tourCount: 7,
        url: 'https://mysimsem.com/experiences/?destination=jeddah',
      },
    ],
  },
  {
    name: 'UAE',
    slug: 'uae',
    flag: '🇦🇪',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    description: 'Where tradition meets tomorrow — from the golden dunes of Abu Dhabi to the record-breaking skyline of Dubai and the old fishing villages of Fujairah.',
    cities: [
      {
        name: 'Dubai',
        slug: 'dubai',
        photo: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
        description: 'From desert safaris to the world\'s tallest tower — Dubai blends Bedouin heritage with jaw-dropping modern ambition.',
        tourCount: 18,
        url: 'https://mysimsem.com/experiences/?destination=dubai',
      },
      {
        name: 'Abu Dhabi',
        slug: 'abu-dhabi',
        photo: 'https://images.unsplash.com/photo-1533395427226-788cee21cc9e?w=600&q=80',
        description: 'Visit the grand Sheikh Zayed Mosque, explore Louvre Abu Dhabi, and discover the quieter, more cultural soul of the Emirates.',
        tourCount: 10,
        url: 'https://mysimsem.com/experiences/?destination=abu-dhabi',
      },
    ],
  },
  {
    name: 'Lebanon',
    slug: 'lebanon',
    flag: '🇱🇧',
    heroImage: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1200&q=80',
    description: 'The jewel of the Levant — Lebanon packs cedar forests, Phoenician ruins, Mediterranean beaches, and the Arab world\'s most vibrant nightlife into a tiny, extraordinary country.',
    cities: [
      {
        name: 'Beirut',
        slug: 'beirut',
        photo: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=600&q=80',
        description: 'The Paris of the Middle East — a city of resilience, art, world-class food, and nights that never end.',
        tourCount: 14,
        url: 'https://mysimsem.com/experiences/?destination=beirut',
      },
      {
        name: 'Baalbek',
        slug: 'baalbek',
        photo: 'https://images.unsplash.com/photo-1569230919100-d3fd5e1132f4?w=600&q=80',
        description: 'Marvel at the most impressive Roman temple complex ever built — massive columns rising from the Bekaa Valley floor.',
        tourCount: 6,
        url: 'https://mysimsem.com/experiences/?destination=baalbek',
      },
    ],
  },
];
