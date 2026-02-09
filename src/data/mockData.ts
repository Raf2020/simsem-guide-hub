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

export interface PaymentRequest {
  id: string;
  amount: number;
  country: string;
  email: string;
  invoiceId: string;
  invoiceUrl?: string;
  isPaid: boolean;
  experienceDetails: {
    id: string;
    name: string;
    cost: number;
  };
  payerName: string;
  payerId: string;
  payerPhone: string;
  createdAt: string;
  paidAt?: string;
  commissionRate: number; // e.g., 0.15 for 15%
}

export const paymentRequests: PaymentRequest[] = [
  // January 2026 - Higher commission rates (10-15%)
  {
    id: 'MtWIsuokWj',
    amount: 170.00,
    country: 'Egypt',
    email: 'hassan.luxortourguide@gmail.com',
    invoiceId: 'INV1769464981795',
    invoiceUrl: 'https://simemmedia.b-cdn.net/invoices/P4RrshMtjX/INV1769464981795.pdf',
    isPaid: true,
    experienceDetails: {
      id: 'uvlPzCZpTm',
      name: 'Luxor: Amazing Sunrise Hot Air Balloon Ride',
      cost: 170.0,
    },
    payerName: 'Hassan Tayea',
    payerId: 'iougtALBnw',
    payerPhone: '+201062217720',
    createdAt: '01/26/2026 22:03:11',
    paidAt: '01/27/2026 09:27:10',
    commissionRate: 0.10, // Custom tour - 10%
  },
  {
    id: 'ol9RJ6SR4A',
    amount: 70.00,
    country: 'Egypt',
    email: 'abanop.photographer@gmail.com',
    invoiceId: 'INV1768920926745',
    invoiceUrl: 'https://simemmedia.b-cdn.net/invoices/BWA81qgARf/INV1768920926745.pdf',
    isPaid: true,
    experienceDetails: {
      id: 'cUTJotNNLd',
      name: 'Discovering The Secrets of Garbage City and the Cave Church',
      cost: 73.5,
    },
    payerName: 'Abanoub Melad',
    payerId: 'gfDfszVhLz',
    payerPhone: '+201001752498',
    createdAt: '01/20/2026 14:55:27',
    paidAt: '01/26/2026 09:38:38',
    commissionRate: 0.08, // Custom tour - 8%
  },
  {
    id: 'PND001',
    amount: 120.00,
    country: 'Jordan',
    email: 'firas.guide@gmail.com',
    invoiceId: 'INV1769500001',
    isPaid: false,
    experienceDetails: {
      id: 'mMbcSsU0Uq',
      name: '7 Nights in Jordan: Explore Ancient Wonders',
      cost: 120.0,
    },
    payerName: 'Firas Al-Samahin',
    payerId: '2zha1o6cgl',
    payerPhone: '+962791234567',
    createdAt: '01/27/2026 10:00:00',
    commissionRate: 0.15, // Getaway - 15%
  },
  {
    id: 'PND002',
    amount: 95.00,
    country: 'Egypt',
    email: 'sameh.guide@gmail.com',
    invoiceId: 'INV1769500002',
    isPaid: false,
    experienceDetails: {
      id: 'EoX72aJxbb',
      name: 'Echoes of Cairo: Tanoura Night & Local Secrets',
      cost: 95.0,
    },
    payerName: 'Sameh Muhammed',
    payerId: 'p7C5x0LVjl',
    payerPhone: '+201098765432',
    createdAt: '01/28/2026 08:30:00',
    commissionRate: 0.10, // Custom tour - 10%
  },
  // December 2025 - Lower promotional rates (5-8%)
  {
    id: 'DEC001',
    amount: 250.00,
    country: 'Jordan',
    email: 'firas.guide@gmail.com',
    invoiceId: 'INV1767500001',
    invoiceUrl: 'https://simemmedia.b-cdn.net/invoices/2zha1o6cgl/INV1767500001.pdf',
    isPaid: true,
    experienceDetails: {
      id: '4zUxEJgYIB',
      name: 'Petra & Wadi Rum',
      cost: 250.0,
    },
    payerName: 'Firas Al-Samahin',
    payerId: '2zha1o6cgl',
    payerPhone: '+962791234567',
    createdAt: '12/15/2025 14:30:00',
    paidAt: '12/18/2025 10:00:00',
    commissionRate: 0.05, // Holiday promo - 5%
  },
  {
    id: 'DEC002',
    amount: 180.00,
    country: 'Egypt',
    email: 'hassan.luxortourguide@gmail.com',
    invoiceId: 'INV1767500002',
    isPaid: true,
    experienceDetails: {
      id: 'F0QMT3WAjk',
      name: 'Blue Hole – Ras Abu Galloum Trek',
      cost: 180.0,
    },
    payerName: 'Sea The Soul Of Sinai',
    payerId: 's9bHDJe1qp',
    payerPhone: '+201155443322',
    createdAt: '12/20/2025 09:00:00',
    paidAt: '12/22/2025 11:30:00',
    commissionRate: 0.05, // Holiday promo - 5%
  },
  {
    id: 'DEC003',
    amount: 90.00,
    country: 'Egypt',
    email: 'sameh.guide@gmail.com',
    invoiceId: 'INV1767500003',
    invoiceUrl: 'https://simemmedia.b-cdn.net/invoices/p7C5x0LVjl/INV1767500003.pdf',
    isPaid: true,
    experienceDetails: {
      id: 'EoX72aJxbb',
      name: 'Echoes of Cairo: Tanoura Night & Local Secrets',
      cost: 90.0,
    },
    payerName: 'Sameh Muhammed',
    payerId: 'p7C5x0LVjl',
    payerPhone: '+201098765432',
    createdAt: '12/28/2025 18:00:00',
    paidAt: '12/30/2025 09:00:00',
    commissionRate: 0.08, // Custom tour - 8%
  },
  // November 2025 - Standard rates (10-12%)
  {
    id: 'NOV001',
    amount: 85.00,
    country: 'Egypt',
    email: 'hassan.luxortourguide@gmail.com',
    invoiceId: 'INV1741589641889',
    isPaid: true,
    experienceDetails: {
      id: 'F6Bmq9J7PR',
      name: 'Luxor Day Trip from Hurghada',
      cost: 85.0,
    },
    payerName: 'Hassan Tayea',
    payerId: 'iougtALBnw',
    payerPhone: '+201062217720',
    createdAt: '11/10/2025 07:00:41',
    paidAt: '11/12/2025 09:39:03',
    commissionRate: 0.10, // Standard - 10%
  },
  {
    id: 'NOV002',
    amount: 140.00,
    country: 'Jordan',
    email: 'layla.guide@gmail.com',
    invoiceId: 'INV1765500001',
    invoiceUrl: 'https://simemmedia.b-cdn.net/invoices/hI5jK6lM7n/INV1765500001.pdf',
    isPaid: true,
    experienceDetails: {
      id: 'aB2cD3eF4g',
      name: 'Dead Sea Wellness Retreat',
      cost: 140.0,
    },
    payerName: 'Layla Mansour',
    payerId: 'hI5jK6lM7n',
    payerPhone: '+962799887766',
    createdAt: '11/22/2025 11:00:00',
    paidAt: '11/25/2025 14:00:00',
    commissionRate: 0.12, // Getaway - 12%
  },
  // February 2026 - Pending payments with mixed rates
  {
    id: 'FEB001',
    amount: 200.00,
    country: 'Egypt',
    email: 'abanop.photographer@gmail.com',
    invoiceId: 'INV1770500001',
    isPaid: false,
    experienceDetails: {
      id: 'kyzAMAvZSY',
      name: 'City of the Dead Tour – History & Mystery',
      cost: 200.0,
    },
    payerName: 'Abanoub Melad',
    payerId: 'gfDfszVhLz',
    payerPhone: '+201001752498',
    createdAt: '02/05/2026 10:00:00',
    commissionRate: 0.10, // Custom tour - 10%
  },
  {
    id: 'FEB002',
    amount: 320.00,
    country: 'Jordan',
    email: 'firas.guide@gmail.com',
    invoiceId: 'INV1770500002',
    isPaid: false,
    experienceDetails: {
      id: '4zUxEJgYIB',
      name: 'Petra & Wadi Rum',
      cost: 320.0,
    },
    payerName: 'Firas Al-Samahin',
    payerId: '2zha1o6cgl',
    payerPhone: '+962791234567',
    createdAt: '02/08/2026 15:30:00',
    commissionRate: 0.15, // Getaway - 15%
  },
];

export const countries = ['All', 'Egypt', 'Jordan', 'Morocco', 'Turkey'];
