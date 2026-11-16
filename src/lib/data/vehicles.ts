export interface CatalogVehicle {
  id: string;
  name: string;
  brand: string;
  category: "Electric Cars" | "Electric Bikes" | "Electric Scooters" | "Electric Cycles";
  price: number;
  formattedPrice: string;
  rangeKm: number;
  batteryKwh: number;
  topSpeedKmh?: number;
  images: string[];
}

export const CATALOG_VEHICLES: CatalogVehicle[] = [
  {
    id: "super-soco-tc",
    name: "Super Soco TC",
    brand: "SUPER SOCO",
    category: "Electric Bikes",
    price: 290000,
    formattedPrice: "৳ 290,000",
    rangeKm: 110,
    batteryKwh: 3.0,
    topSpeedKmh: 75,
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "niu-nqi-gts",
    name: "NIU NQi GTS",
    brand: "NIU",
    category: "Electric Scooters",
    price: 325000,
    formattedPrice: "৳ 325,000",
    rangeKm: 130,
    batteryKwh: 4.2,
    topSpeedKmh: 80,
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "byd-atto-3",
    name: "BYD Atto 3",
    brand: "BYD",
    category: "Electric Cars",
    price: 4850000,
    formattedPrice: "৳ 4,850,000",
    rangeKm: 420,
    batteryKwh: 60.48,
    topSpeedKmh: 160,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "mg-zs-ev",
    name: "MG ZS EV",
    brand: "MG",
    category: "Electric Cars",
    price: 4200000,
    formattedPrice: "৳ 4,200,000",
    rangeKm: 320,
    batteryKwh: 50.3,
    topSpeedKmh: 175,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "yadea-g5",
    name: "Yadea G5",
    brand: "YADEA",
    category: "Electric Scooters",
    price: 195000,
    formattedPrice: "৳ 195,000",
    rangeKm: 80,
    batteryKwh: 1.92,
    topSpeedKmh: 60,
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "super-soco-ts",
    name: "Super Soco TS Street Hunter",
    brand: "SUPER SOCO",
    category: "Electric Bikes",
    price: 315000,
    formattedPrice: "৳ 315,000",
    rangeKm: 120,
    batteryKwh: 3.24,
    topSpeedKmh: 80,
    images: [
      "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "byd-seal",
    name: "BYD Seal",
    brand: "BYD",
    category: "Electric Cars",
    price: 6500000,
    formattedPrice: "৳ 6,500,000",
    rangeKm: 570,
    batteryKwh: 82.5,
    topSpeedKmh: 200,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "niu-mqi-gt",
    name: "NIU MQi GT",
    brand: "NIU",
    category: "Electric Scooters",
    price: 280000,
    formattedPrice: "৳ 280,000",
    rangeKm: 100,
    batteryKwh: 2.9,
    topSpeedKmh: 70,
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "trek-fx-plus-2",
    name: "Trek FX+ 2 Stagger",
    brand: "TREK",
    category: "Electric Cycles",
    price: 175000,
    formattedPrice: "৳ 175,000",
    rangeKm: 65,
    batteryKwh: 0.25,
    topSpeedKmh: 32,
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

export const ALL_BRANDS = [
  "All Brands",
  "SUPER SOCO",
  "NIU",
  "BYD",
  "MG",
  "YADEA",
  "TREK",
];

export const ALL_CATEGORIES = [
  "Electric Cars",
  "Electric Bikes",
  "Electric Scooters",
  "Electric Cycles",
] as const;
