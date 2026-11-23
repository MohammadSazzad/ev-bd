export interface VehicleDetail {
  id: string;
  name: string;
  brand: string;
  brandSubtitle: string;
  category: string;
  price: number;
  formattedPrice: string;
  images: {
    main: string;
    interior: string;
    rear: string;
    battery: string;
  };
  reliabilityIndex: {
    score: number;
    rating: string;
    note: string;
    subtitle: string;
  };
  keySpecs: {
    battery: string;
    realRange: string;
    chargeTime: string;
    motorPower: string;
  };
  detailedParameters: {
    performance: { label: string; value: string }[];
    batteryRange: { label: string; value: string }[];
    dimensionsWarranty: { label: string; value: string }[];
  };
}

export const VEHICLE_DETAILS: Record<string, VehicleDetail> = {
  "byd-atto-3": {
    id: "byd-atto-3",
    name: "BYD Atto 3",
    brand: "BYD",
    brandSubtitle: "BYD BANGLADESH",
    category: "Electric Cars",
    price: 4950000,
    formattedPrice: "৳ 4,950,000",
    images: {
      main: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 94,
      rating: "Excellent Durability",
      note: "Minimal degradation expected over 150,000 km.",
      subtitle: "Calculated durability score based on LFP tech parameters",
    },
    keySpecs: {
      battery: "60.4 kWh",
      realRange: "420 km",
      chargeTime: "45 mins DC",
      motorPower: "150 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "150 kW (201 hp)" },
        { label: "Top Speed", value: "160 km/h" },
        { label: "Acceleration (0-100 km/h)", value: "7.3 seconds" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "60.4 kWh" },
        { label: "Battery Chemistry", value: "Lithium Iron Phosphate (LFP) Blade" },
        { label: "Real-world Range", value: "420 km (NEDC estimated)" },
        { label: "AC Charging Time", value: "6.5 hours (7kW)" },
        { label: "DC Fast Charge Time", value: "45 mins (80kW)" },
      ],
      dimensionsWarranty: [
        { label: "Dimensions (L x W x H)", value: "4,455 × 1,875 × 1,615 mm" },
        { label: "Wheelbase", value: "2,720 mm" },
        { label: "Vehicle Warranty", value: "6 Years / 150,000 km" },
        { label: "Battery Warranty", value: "8 Years / 160,000 km" },
      ],
    },
  },

  "mg-zs-ev": {
    id: "mg-zs-ev",
    name: "MG ZS EV",
    brand: "MG",
    brandSubtitle: "MG BANGLADESH",
    category: "Electric Cars",
    price: 5200000,
    formattedPrice: "৳ 5,200,000",
    images: {
      main: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 89,
      rating: "Very Good Durability",
      note: "Standard degradation profile expected over 120,000 km.",
      subtitle: "Calculated durability score based on NMC tech parameters",
    },
    keySpecs: {
      battery: "50.3 kWh",
      realRange: "320 km",
      chargeTime: "54 mins DC",
      motorPower: "130 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "130 kW (174 hp)" },
        { label: "Top Speed", value: "150 km/h" },
        { label: "Acceleration (0-100 km/h)", value: "8.2 seconds" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "50.3 kWh" },
        { label: "Battery Chemistry", value: "Nickel Manganese Cobalt (NMC)" },
        { label: "Real-world Range", value: "320 km (WLTP estimated)" },
        { label: "AC Charging Time", value: "7.0 hours (7kW)" },
        { label: "DC Fast Charge Time", value: "54 mins (50kW)" },
      ],
      dimensionsWarranty: [
        { label: "Dimensions (L x W x H)", value: "4,323 × 1,809 × 1,649 mm" },
        { label: "Wheelbase", value: "2,585 mm" },
        { label: "Vehicle Warranty", value: "5 Years / 100,000 km" },
        { label: "Battery Warranty", value: "8 Years / 150,000 km" },
      ],
    },
  },

  "byd-seal": {
    id: "byd-seal",
    name: "BYD Seal",
    brand: "BYD",
    brandSubtitle: "BYD BANGLADESH",
    category: "Electric Cars",
    price: 6800000,
    formattedPrice: "৳ 6,800,000",
    images: {
      main: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 96,
      rating: "Flagship Cell-to-Body Durability",
      note: "CTB structural battery pack with exceptional torsional rigidity.",
      subtitle: "Calculated durability score based on 82.5 kWh Blade battery",
    },
    keySpecs: {
      battery: "82.5 kWh",
      realRange: "570 km",
      chargeTime: "37 mins DC",
      motorPower: "230 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "230 kW (313 hp)" },
        { label: "Top Speed", value: "200 km/h" },
        { label: "Acceleration (0-100 km/h)", value: "3.8 seconds" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "82.5 kWh" },
        { label: "Battery Chemistry", value: "BYD CTB LFP Blade Battery" },
        { label: "Real-world Range", value: "570 km (WLTP)" },
        { label: "AC Charging Time", value: "7.5 hours (11kW)" },
        { label: "DC Fast Charge Time", value: "37 mins (150kW)" },
      ],
      dimensionsWarranty: [
        { label: "Dimensions (L x W x H)", value: "4,800 × 1,875 × 1,460 mm" },
        { label: "Wheelbase", value: "2,920 mm" },
        { label: "Vehicle Warranty", value: "6 Years / 150,000 km" },
        { label: "Battery Warranty", value: "8 Years / 160,000 km" },
      ],
    },
  },

  "super-soco-tc": {
    id: "super-soco-tc",
    name: "Super Soco TC",
    brand: "SUPER SOCO",
    brandSubtitle: "SUPER SOCO BANGLADESH",
    category: "Electric Bikes",
    price: 290000,
    formattedPrice: "৳ 290,000",
    images: {
      main: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 92,
      rating: "High Commuter Durability",
      note: "Robust swappable pack durability with 1,500+ rated full cycles.",
      subtitle: "Calculated durability score based on LFP pouch cells",
    },
    keySpecs: {
      battery: "3.0 kWh",
      realRange: "110 km",
      chargeTime: "3.5 hrs AC",
      motorPower: "3.0 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "3.0 kW (Bosch Hub Motor)" },
        { label: "Top Speed", value: "75 km/h" },
        { label: "Acceleration (0-50 km/h)", value: "4.8 seconds" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "3.0 kWh (60V 30Ah Dual)" },
        { label: "Battery Chemistry", value: "Lithium-Ion (ATL/Samsung)" },
        { label: "Real-world Range", value: "110 km (City commute mode)" },
        { label: "AC Charging Time", value: "3.5 hours per pack" },
        { label: "DC Fast Charge Time", value: "N/A (Portable AC Charger)" },
      ],
      dimensionsWarranty: [
        { label: "Dimensions (L x W x H)", value: "1,926 × 710 × 1,100 mm" },
        { label: "Seat Height", value: "770 mm" },
        { label: "Vehicle Warranty", value: "2 Years Official" },
        { label: "Battery Warranty", value: "3 Years / 40,000 km" },
      ],
    },
  },

  "super-soco-ts": {
    id: "super-soco-ts",
    name: "Super Soco TS Street Hunter",
    brand: "SUPER SOCO",
    brandSubtitle: "SUPER SOCO BANGLADESH",
    category: "Electric Bikes",
    price: 315000,
    formattedPrice: "৳ 315,000",
    images: {
      main: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 92,
      rating: "High Performance Commuter",
      note: "Strong city durability with a swappable lithium battery system.",
      subtitle: "Calculated durability score based on commuter battery parameters",
    },
    keySpecs: {
      battery: "3.24 kWh",
      realRange: "120 km",
      chargeTime: "4 hrs AC",
      motorPower: "3.5 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "3.5 kW" },
        { label: "Top Speed", value: "80 km/h" },
        { label: "Acceleration", value: "Sport mode optimized" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "3.24 kWh" },
        { label: "Battery Chemistry", value: "Lithium-Ion" },
        { label: "Real-world Range", value: "120 km" },
        { label: "AC Charging Time", value: "Approximately 4 hours" },
      ],
      dimensionsWarranty: [
        { label: "Category", value: "Electric Street Motorcycle" },
        { label: "Vehicle Warranty", value: "2 Years Official" },
        { label: "Battery Warranty", value: "3 Years / 40,000 km" },
      ],
    },
  },

  "niu-nqi-gts": {
    id: "niu-nqi-gts",
    name: "NIU NQi GTS",
    brand: "NIU",
    brandSubtitle: "NIU BANGLADESH",
    category: "Electric Scooters",
    price: 325000,
    formattedPrice: "৳ 325,000",
    images: {
      main: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 93,
      rating: "NIU Energy AI Verified",
      note: "Cloud-connected 4th-gen BMS managing dual Panasonic lithium packs.",
      subtitle: "Calculated durability score based on Dual 60V 35Ah packs",
    },
    keySpecs: {
      battery: "4.2 kWh",
      realRange: "130 km",
      chargeTime: "5.5 hrs AC",
      motorPower: "3.1 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "3.1 kW (Bosch Motor)" },
        { label: "Top Speed", value: "80 km/h" },
        { label: "Drive Modes", value: "E-Save / Dynamic / Sport" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "4.2 kWh (Dual 60V 35Ah)" },
        { label: "Battery Chemistry", value: "Panasonic 18650 Lithium-ion" },
        { label: "Real-world Range", value: "130 km (Estimated city range)" },
        { label: "AC Charging Time", value: "5.5 hours" },
        { label: "BMS System", value: "NIU Energy AI 4.0 Cloud Connected" },
      ],
      dimensionsWarranty: [
        { label: "Dimensions (L x W x H)", value: "1,800 × 740 × 1,130 mm" },
        { label: "Weight", value: "109 kg (including dual batteries)" },
        { label: "Vehicle Warranty", value: "2 Years Official Dealership" },
        { label: "Battery Warranty", value: "3 Years / 45,000 km" },
      ],
    },
  },

  "yadea-g5": {
    id: "yadea-g5",
    name: "Yadea G5",
    brand: "YADEA",
    brandSubtitle: "YADEA BANGLADESH",
    category: "Electric Scooters",
    price: 245000,
    formattedPrice: "৳ 245,000",
    images: {
      main: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 91,
      rating: "High Urban Reliability",
      note: "Panasonic high-density cells with short-circuit and thermal protection.",
      subtitle: "Calculated durability score based on GTR 3.0 power system",
    },
    keySpecs: {
      battery: "1.92 kWh",
      realRange: "80 km",
      chargeTime: "4.5 hrs AC",
      motorPower: "2.3 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "2.3 kW (GTR 3.0 Motor)" },
        { label: "Top Speed", value: "60 km/h" },
        { label: "Max Torque", value: "120 Nm" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "1.92 kWh (60V 32Ah)" },
        { label: "Battery Chemistry", value: "Panasonic Lithium Iron" },
        { label: "Real-world Range", value: "80 km (Eco mode)" },
        { label: "AC Charging Time", value: "4-5 hours" },
        { label: "Fast Charging", value: "Supported with smart home charger" },
      ],
      dimensionsWarranty: [
        { label: "Dimensions (L x W x H)", value: "1,810 × 700 × 1,150 mm" },
        { label: "Display", value: "7-inch Digital VA LCD Screen" },
        { label: "Vehicle Warranty", value: "2 Years Official" },
        { label: "Battery Warranty", value: "3 Years Official Warranty" },
      ],
    },
  },

  "niu-mqi-gt": {
    id: "niu-mqi-gt",
    name: "NIU MQi GT",
    brand: "NIU",
    brandSubtitle: "NIU BANGLADESH",
    category: "Electric Scooters",
    price: 280000,
    formattedPrice: "৳ 280,000",
    images: {
      main: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 91,
      rating: "Very Good Durability",
      note: "Optimized for daily urban transit with 14-inch large wheels.",
      subtitle: "Calculated durability score based on Dual 48V 31Ah packs",
    },
    keySpecs: {
      battery: "2.9 kWh",
      realRange: "100 km",
      chargeTime: "4.5 hrs AC",
      motorPower: "3.0 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "3.0 kW" },
        { label: "Top Speed", value: "70 km/h" },
        { label: "Wheel Diameter", value: "14 inches" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "2.9 kWh (Dual 48V 31Ah)" },
        { label: "Battery Chemistry", value: "Lithium-Ion" },
        { label: "Real-world Range", value: "100 km" },
        { label: "AC Charging Time", value: "4.5 hours" },
        { label: "BMS System", value: "NIU Smart Battery Management" },
      ],
      dimensionsWarranty: [
        { label: "Dimensions (L x W x H)", value: "1,949 × 700 × 1,171 mm" },
        { label: "Vehicle Warranty", value: "2 Years Official Dealership" },
        { label: "Battery Warranty", value: "3 Years Official Warranty" },
      ],
    },
  },

  "trek-fx-plus-2": {
    id: "trek-fx-plus-2",
    name: "Trek FX+ 2 Stagger",
    brand: "TREK",
    brandSubtitle: "TREK BANGLADESH",
    category: "Electric Cycles",
    price: 175000,
    formattedPrice: "৳ 175,000",
    images: {
      main: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1400&q=80",
      interior: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
      rear: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
      battery: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    },
    reliabilityIndex: {
      score: 95,
      rating: "Ultra-Light Durability",
      note: "Internal downtube battery with minimal degradation over commuter life.",
      subtitle: "Calculated durability score based on Hyena e-bike drive system",
    },
    keySpecs: {
      battery: "0.25 kWh",
      realRange: "65 km",
      chargeTime: "2.0 hrs AC",
      motorPower: "0.25 kW",
    },
    detailedParameters: {
      performance: [
        { label: "Motor Power", value: "250W Hyena Rear Hub Motor" },
        { label: "Assisted Top Speed", value: "32 km/h" },
        { label: "Gears", value: "Shimano 9-speed drivetrain" },
      ],
      batteryRange: [
        { label: "Battery Capacity", value: "250 Wh Internal Downtube" },
        { label: "Battery Chemistry", value: "Lithium-Ion" },
        { label: "Real-world Range", value: "65 km (Up to 110 km with Range Extender)" },
        { label: "AC Charging Time", value: "2 hours" },
        { label: "Controller", value: "Handlebar Bluetooth Remote LED" },
      ],
      dimensionsWarranty: [
        { label: "Frame", value: "Alpha Gold Aluminum" },
        { label: "Total Weight", value: "17.69 kg" },
        { label: "Brakes", value: "Promax Hydraulic Disc" },
        { label: "Warranty", value: "Lifetime Frame / 2 Years Battery" },
      ],
    },
  },
};

export function getVehicleDetail(id: string): VehicleDetail | undefined {
  return VEHICLE_DETAILS[id];
}
