export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: "car" | "bike" | "scooter" | "cycle";
  href: string;
}

export interface VehicleSpec {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  formattedPrice: string;
  range: string;
  battery: string;
  topSpeed: string;
  chargingTime: string;
  imageUrl: string;
  isPopular?: boolean;
}

export interface WhyFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: "compare" | "battery" | "showroom";
  href: string;
}

export interface NewsArticleItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Compare", href: "/compare" },
  { label: "Battery Estimator", href: "/battery-estimator" },
  { label: "Brands", href: "/catalogue?tab=brands" },
  { label: "Showrooms", href: "/showrooms" },
  { label: "Blog", href: "/blog" },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: "cars",
    name: "Electric Cars",
    description: "Premium electric sedans & SUVs",
    icon: "car",
    href: "/catalogue?category=cars",
  },
  {
    id: "bikes",
    name: "Electric Bikes",
    description: "High performance commuter bikes",
    icon: "bike",
    href: "/catalogue?category=bikes",
  },
  {
    id: "scooters",
    name: "Electric Scooters",
    description: "Smart city commuter scooters",
    icon: "scooter",
    href: "/catalogue?category=scooters",
  },
  {
    id: "cycles",
    name: "Electric Cycles",
    description: "Pedal-assist urban cycles",
    icon: "cycle",
    href: "/catalogue?category=cycles",
  },
];

export const POPULAR_VEHICLES: VehicleSpec[] = [
  {
    id: "niu-nqi-gts",
    name: "NIU NQi GTS",
    brand: "NIU",
    category: "Electric Scooters",
    price: 325000,
    formattedPrice: "৳ 325,000",
    range: "130 km",
    battery: "4.2 kWh",
    topSpeed: "80 km/h",
    chargingTime: "5.5 hrs",
    imageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
    isPopular: true,
  },
  {
    id: "byd-atto-3",
    name: "BYD Atto 3",
    brand: "BYD",
    category: "Electric Cars",
    price: 4850000,
    formattedPrice: "৳ 4,850,000",
    range: "420 km",
    battery: "60.48 kWh",
    topSpeed: "160 km/h",
    chargingTime: "45 min (DC)",
    imageUrl:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
    isPopular: true,
  },
  {
    id: "mg-zs-ev",
    name: "MG ZS EV",
    brand: "MG",
    category: "Electric Cars",
    price: 4200000,
    formattedPrice: "৳ 4,200,000",
    range: "320 km",
    battery: "50.3 kWh",
    topSpeed: "175 km/h",
    chargingTime: "40 min (DC)",
    imageUrl:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
    isPopular: true,
  },
];

export const WHY_FEATURES: WhyFeatureItem[] = [
  {
    id: "compare-specs",
    title: "Compare Raw Specs",
    description:
      "Side-by-side comparison matrix covering real BDT prices, import status, motor outputs, and charging details.",
    icon: "compare",
    href: "/compare",
  },
  {
    id: "battery-estimator",
    title: "Battery Performance Estimator",
    description:
      "Our calculator factors in local conditions—Dhaka heat, traffic density, and hilly terrain in Chittagong—to give you precise range estimations.",
    icon: "battery",
    href: "/battery-estimator",
  },
  {
    id: "showroom-locator",
    title: "Showroom Locator",
    description:
      "Direct physical showroom addresses, verified importer contacts, and authorized service centers across the country.",
    icon: "showroom",
    href: "/showrooms",
  },
];

export const NEWS_ARTICLES: NewsArticleItem[] = [
  {
    id: "charging-policy-2026",
    title: "National EV Charging Policy 2026: What It Means",
    description:
      "An in-depth look at Bangladesh's new framework for public fast-charging grid expansion.",
    category: "Policy & Infrastructure",
    date: "November 2026",
    readTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
    slug: "national-ev-charging-policy-2026",
  },
  {
    id: "heat-affects-batteries",
    title: "How Heat Affects EV Batteries in Bangladesh",
    description:
      "Expert tips to prevent structural degradation of lithium cells during dry summer months.",
    category: "Battery Health",
    date: "October 2026",
    readTime: "4 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    slug: "how-heat-affects-ev-batteries-in-bangladesh",
  },
];

export const FOOTER_PLATFORM_LINKS = [
  { label: "Vehicle Directory", href: "/catalogue" },
  { label: "Compare Tool", href: "/compare" },
  { label: "Battery Estimator", href: "/battery-estimator" },
];

export const FOOTER_ECOSYSTEM_LINKS = [
  { label: "EV Showrooms", href: "/showrooms" },
  { label: "Charging Network", href: "/charging-network" },
  { label: "EV Brands", href: "/catalogue?tab=brands" },
];
