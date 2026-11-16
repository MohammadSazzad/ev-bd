export interface Showroom {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  brands: string;
  division: string;
  area: string;
  mapLabel: string;
  mapCoords: {
    x: number; // percentage from left (0 - 100)
    y: number; // percentage from top (0 - 100)
  };
}

export const SHOWROOM_DIVISIONS = [
  "Dhaka Division",
  "Chittagong Division",
  "Sylhet Division",
  "Rajshahi Division",
  "Khulna Division",
] as const;

export const SHOWROOM_BRANDS = [
  "All Brands",
  "BYD",
  "Yadea",
  "Niu",
  "MG",
  "Super Soco",
] as const;

export const VERIFIED_SHOWROOMS: Showroom[] = [
  {
    id: "byd-tejgaon",
    name: "BYD Tejgaon Showroom",
    distance: "1.2 km",
    address: "Tejgaon Industrial Area, Dhaka 1208",
    phone: "+880 1711-223344",
    brands: "BYD",
    division: "Dhaka Division",
    area: "Tejgaon",
    mapLabel: "TEJGAON INDUSTRIAL AREA",
    mapCoords: { x: 26, y: 46 },
  },
  {
    id: "yadea-flagship",
    name: "Yadea Flagship Dhaka",
    distance: "3.5 km",
    address: "Progoti Sarani, Gulshan, Dhaka 1212",
    phone: "+880 1822-556677",
    brands: "Yadea",
    division: "Dhaka Division",
    area: "Gulshan",
    mapLabel: "GULSHAN 1",
    mapCoords: { x: 62, y: 40 },
  },
  {
    id: "niu-bangladesh-central",
    name: "Niu Bangladesh Central",
    distance: "4.1 km",
    address: "Mirpur Road, Dhanmondi, Dhaka 1209",
    phone: "+880 1933-889900",
    brands: "Niu",
    division: "Dhaka Division",
    area: "Gulshan",
    mapLabel: "GULSHAN",
    mapCoords: { x: 48, y: 60 },
  },
  {
    id: "mg-bangladesh-tejgaon",
    name: "MG Bangladesh (Tejgaon)",
    distance: "1.8 km",
    address: "Shaheed Tajuddin Ahmad Ave, Dhaka 1215",
    phone: "+880 1644-112233",
    brands: "MG",
    division: "Dhaka Division",
    area: "Banani",
    mapLabel: "BANANI",
    mapCoords: { x: 80, y: 32 },
  },
];
