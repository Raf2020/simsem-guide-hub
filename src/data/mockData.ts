export interface Experience {
  id: string;
  name: string;
  type: 'Custom' | 'Getaway';
  country: string;
  approval: 'APPROVED' | 'PENDING' | 'REJECTED';
  status: 'ACTIVE' | 'INACTIVE';
  guideId: string;
  guideName: string;
  reviewCount: number;
}

export interface Review {
  id: string;
  experienceId: string;
  travellerName: string;
  travellerCountry: string;
  travellerPhoto: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export const experiences: Experience[] = [
  {
    id: 'EoX72aJxbb',
    name: 'Echoes of Cairo: Tanoura Night & Local Secrets',
    type: 'Custom',
    country: 'Egypt',
    approval: 'APPROVED',
    status: 'ACTIVE',
    guideId: 'p7C5x0LVjl',
    guideName: 'Sameh Muhammed',
    reviewCount: 12,
  },
  {
    id: 'mMbcSsU0Uq',
    name: '7 Nights in Jordan: Explore Ancient Wonders',
    type: 'Getaway',
    country: 'Jordan',
    approval: 'APPROVED',
    status: 'ACTIVE',
    guideId: '2zha1o6cgl',
    guideName: 'Firas Al-Samahin',
    reviewCount: 8,
  },
  {
    id: 'kyzAMAvZSY',
    name: 'City of the Dead Tour – History & Mystery',
    type: 'Custom',
    country: 'Egypt',
    approval: 'APPROVED',
    status: 'ACTIVE',
    guideId: 'BWA81qgARf',
    guideName: 'Abanoub Melad',
    reviewCount: 5,
  },
  {
    id: 'K7PcDMxDbg',
    name: 'Desert Farm & The Lost Oasis Adventure',
    type: 'Custom',
    country: 'Egypt',
    approval: 'APPROVED',
    status: 'ACTIVE',
    guideId: 's9bHDJe1qp',
    guideName: 'Sea The Soul Of Sinai',
    reviewCount: 3,
  },
  {
    id: 'F0QMT3WAjk',
    name: 'Blue Hole – Ras Abu Galloum Trek',
    type: 'Custom',
    country: 'Egypt',
    approval: 'APPROVED',
    status: 'ACTIVE',
    guideId: 's9bHDJe1qp',
    guideName: 'Sea The Soul Of Sinai',
    reviewCount: 15,
  },
  {
    id: '4zUxEJgYIB',
    name: 'Petra & Wadi Rum',
    type: 'Getaway',
    country: 'Jordan',
    approval: 'APPROVED',
    status: 'ACTIVE',
    guideId: '2zha1o6cgl',
    guideName: 'Firas Al-Samahin',
    reviewCount: 22,
  },
  {
    id: 'xY7mNpQwRt',
    name: 'Luxor Temple Night Walk',
    type: 'Custom',
    country: 'Egypt',
    approval: 'PENDING',
    status: 'INACTIVE',
    guideId: 'qR3sT4uVwX',
    guideName: 'Ahmed Hassan',
    reviewCount: 0,
  },
  {
    id: 'aB2cD3eF4g',
    name: 'Dead Sea Wellness Retreat',
    type: 'Getaway',
    country: 'Jordan',
    approval: 'APPROVED',
    status: 'ACTIVE',
    guideId: 'hI5jK6lM7n',
    guideName: 'Layla Mansour',
    reviewCount: 7,
  },
];

export interface Traveller {
  id: string;
  name: string;
  email: string;
  country: string;
  photo: string;
}

export const travellers: Traveller[] = [
  {
    id: 'TRV001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    country: 'United States',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 'TRV002',
    name: 'Marco Rossi',
    email: 'marco.r@email.com',
    country: 'Italy',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 'TRV003',
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    country: 'United Kingdom',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    id: 'TRV004',
    name: 'Hans Mueller',
    email: 'hans.m@email.com',
    country: 'Germany',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
  {
    id: 'TRV005',
    name: 'Yuki Tanaka',
    email: 'yuki.t@email.com',
    country: 'Japan',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  },
  {
    id: 'TRV006',
    name: 'Pierre Dupont',
    email: 'pierre.d@email.com',
    country: 'France',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: 'TRV007',
    name: 'Ana Garcia',
    email: 'ana.g@email.com',
    country: 'Spain',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
  {
    id: 'TRV008',
    name: 'James Smith',
    email: 'james.s@email.com',
    country: 'Australia',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
  },
];

export const reviews: Review[] = [
  {
    id: 'rev1',
    experienceId: 'EoX72aJxbb',
    travellerName: 'Sarah Johnson',
    travellerCountry: 'United States',
    travellerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    reviewText: 'Absolutely magical experience! Sameh was an incredible guide who shared so much about Egyptian culture. The Tanoura dance was mesmerizing.',
    createdAt: '2024-01-15',
  },
  {
    id: 'rev2',
    experienceId: 'EoX72aJxbb',
    travellerName: 'Marco Rossi',
    travellerCountry: 'Italy',
    travellerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4,
    reviewText: 'Great tour with authentic local experiences. Would recommend to anyone visiting Cairo.',
    createdAt: '2024-01-10',
  },
  {
    id: 'rev3',
    experienceId: '4zUxEJgYIB',
    travellerName: 'Emma Wilson',
    travellerCountry: 'United Kingdom',
    travellerPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    reviewText: 'Petra was breathtaking and Wadi Rum felt like being on Mars! Firas made everything so smooth and informative.',
    createdAt: '2024-01-08',
  },
  {
    id: 'rev4',
    experienceId: 'F0QMT3WAjk',
    travellerName: 'Hans Mueller',
    travellerCountry: 'Germany',
    travellerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    reviewText: 'The Blue Hole is a must-see! The trek to Ras Abu Galloum was challenging but so rewarding. Beautiful Bedouin hospitality.',
    createdAt: '2024-01-05',
  },
  {
    id: 'rev5',
    experienceId: 'mMbcSsU0Uq',
    travellerName: 'Yuki Tanaka',
    travellerCountry: 'Japan',
    travellerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    rating: 4,
    reviewText: 'Seven nights flew by! Each day brought new wonders. The ancient sites were incredible.',
    createdAt: '2024-01-02',
  },
];

export const countries = ['All', 'Egypt', 'Jordan', 'Morocco', 'Turkey'];
