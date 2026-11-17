export interface EVBrand {
  id: string;
  name: string;
  slug: string;
  vehicleCount: number;
  origin: string;
  category: string;
  description: string;
  logoType: "haval" | "byd" | "mg" | "niu" | "yadea" | "super-soco" | "tesla" | "audi" | "hyundai" | "trek";
}

export const EV_BRANDS: EVBrand[] = [
  {
    id: "haval",
    name: "Haval",
    slug: "haval",
    vehicleCount: 2,
    origin: "China",
    category: "Electric SUVs & Hybrids",
    description: "Great Wall Motor's specialized SUV marque with dedicated electric & hybrid platforms.",
    logoType: "haval",
  },
  {
    id: "byd",
    name: "BYD",
    slug: "byd",
    vehicleCount: 3,
    origin: "China",
    category: "Electric Cars & SUVs",
    description: "Global pioneer in Blade Battery technology with official showrooms in Dhaka.",
    logoType: "byd",
  },
  {
    id: "mg",
    name: "MG",
    slug: "mg",
    vehicleCount: 2,
    origin: "UK / SAIC",
    category: "Electric Sedans & SUVs",
    description: "British automotive heritage offering cutting-edge ZS EV and MG4 models in BD.",
    logoType: "mg",
  },
  {
    id: "niu",
    name: "NIU",
    slug: "niu",
    vehicleCount: 3,
    origin: "Global",
    category: "Smart Electric Scooters",
    description: "The world's leading smart urban mobility brand featuring cloud-connected batteries.",
    logoType: "niu",
  },
  {
    id: "yadea",
    name: "Yadea",
    slug: "yadea",
    vehicleCount: 2,
    origin: "China",
    category: "Electric Commuter Scooters",
    description: "High-volume commuter electric two-wheelers with localized parts distribution.",
    logoType: "yadea",
  },
  {
    id: "super-soco",
    name: "Super Soco",
    slug: "super-soco",
    vehicleCount: 2,
    origin: "Australia / VMoto",
    category: "Electric Street Bikes",
    description: "Performance electric cafe racers and street motorcycles engineered for urban riders.",
    logoType: "super-soco",
  },
  {
    id: "tesla",
    name: "Tesla",
    slug: "tesla",
    vehicleCount: 2,
    origin: "USA",
    category: "Premium Electric Cars",
    description: "High-performance electric vehicles available through verified importer partners.",
    logoType: "tesla",
  },
  {
    id: "audi",
    name: "Audi",
    slug: "audi",
    vehicleCount: 2,
    origin: "Germany",
    category: "Luxury Electric Vehicles",
    description: "Audi e-tron lineup providing quattro all-wheel drive and luxury electric performance.",
    logoType: "audi",
  },
  {
    id: "hyundai",
    name: "Hyundai",
    slug: "hyundai",
    vehicleCount: 1,
    origin: "South Korea",
    category: "Electric Crossovers",
    description: "Award-winning E-GMP platform featuring ultra-fast 800V charging in Bangladesh.",
    logoType: "hyundai",
  },
  {
    id: "trek",
    name: "Trek",
    slug: "trek",
    vehicleCount: 1,
    origin: "USA",
    category: "Electric Pedal-Assist Cycles",
    description: "Premium pedal-assist city and trekking cycles for zero-emission daily commutes.",
    logoType: "trek",
  },
];
