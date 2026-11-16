export interface ComparisonVehicle {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  category: string;
  priceBdt: string;
  numericPrice: number;
  batteryCapacity: string;
  realWorldRange: string;
  numericRange: number;
  chargingTime: string;
  motorOutput: string;
  topSpeed: string;
  warranty: string;
  isBestPrice?: boolean;
  isBestRange?: boolean;
}

export const COMPARISON_VEHICLES: Record<string, ComparisonVehicle> = {
  "byd-atto-3": {
    id: "byd-atto-3",
    name: "BYD Atto 3",
    brand: "BYD",
    imageUrl:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
    category: "Electric SUV",
    priceBdt: "৳ 4,950,000",
    numericPrice: 4950000,
    batteryCapacity: "60.4 kWh",
    realWorldRange: "420 km",
    numericRange: 420,
    chargingTime: "6.5h AC / 45m DC",
    motorOutput: "150 kW",
    topSpeed: "160 km/h",
    warranty: "8 Years Battery",
    isBestPrice: true,
    isBestRange: true,
  },
  "mg-zs-ev": {
    id: "mg-zs-ev",
    name: "MG ZS EV",
    brand: "MG",
    imageUrl:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80",
    category: "Electric SUV",
    priceBdt: "৳ 5,200,000",
    numericPrice: 5200000,
    batteryCapacity: "50.3 kWh",
    realWorldRange: "320 km",
    numericRange: 320,
    chargingTime: "7h AC / 54m DC",
    motorOutput: "130 kW",
    topSpeed: "150 km/h",
    warranty: "8 Years Battery",
  },
  "super-soco-tc": {
    id: "super-soco-tc",
    name: "Super Soco TC",
    brand: "SUPER SOCO",
    imageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    category: "Electric Bike",
    priceBdt: "৳ 290,000",
    numericPrice: 290000,
    batteryCapacity: "3.0 kWh",
    realWorldRange: "110 km",
    numericRange: 110,
    chargingTime: "5h AC",
    motorOutput: "3.0 kW",
    topSpeed: "75 km/h",
    warranty: "3 Years Battery",
  },
  "niu-nqi-gts": {
    id: "niu-nqi-gts",
    name: "NIU NQi GTS",
    brand: "NIU",
    imageUrl:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    category: "Electric Scooter",
    priceBdt: "৳ 325,000",
    numericPrice: 325000,
    batteryCapacity: "4.2 kWh",
    realWorldRange: "130 km",
    numericRange: 130,
    chargingTime: "5.5h AC",
    motorOutput: "3.5 kW",
    topSpeed: "80 km/h",
    warranty: "3 Years Battery",
  },
  "byd-seal": {
    id: "byd-seal",
    name: "BYD Seal",
    brand: "BYD",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    category: "Electric Sedan",
    priceBdt: "৳ 6,500,000",
    numericPrice: 6500000,
    batteryCapacity: "82.5 kWh",
    realWorldRange: "570 km",
    numericRange: 570,
    chargingTime: "7.5h AC / 37m DC",
    motorOutput: "230 kW",
    topSpeed: "200 km/h",
    warranty: "8 Years Battery",
  },
  "yadea-g5": {
    id: "yadea-g5",
    name: "Yadea G5",
    brand: "YADEA",
    imageUrl:
      "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=600&q=80",
    category: "Electric Scooter",
    priceBdt: "৳ 195,000",
    numericPrice: 195000,
    batteryCapacity: "1.92 kWh",
    realWorldRange: "80 km",
    numericRange: 80,
    chargingTime: "4-6h AC",
    motorOutput: "2.3 kW",
    topSpeed: "60 km/h",
    warranty: "2 Years Battery",
  },
};

export const COMPARISON_METRIC_ROWS = [
  { key: "category", label: "Category" },
  { key: "priceBdt", label: "Price BDT", isPrice: true },
  { key: "batteryCapacity", label: "Battery Capacity" },
  { key: "realWorldRange", label: "Real-world Range", isRange: true },
  { key: "chargingTime", label: "Charging Time" },
  { key: "motorOutput", label: "Motor Output" },
  { key: "topSpeed", label: "Top Speed" },
  { key: "warranty", label: "Warranty" },
] as const;
