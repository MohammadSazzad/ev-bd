import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const roles = [
  ["ADMIN", "Full access to platform administration"],
  ["EDITOR", "Can manage vehicle, showroom, and media content"],
  ["MODERATOR", "Can manage vehicle, showroom, and media content"],
  ["SHOWROOM", "Can manage vehicle"],
  ["USER", "Standard platform user"],
] as const;

const categories = [
  ["Electric Cars", "electric-cars", "Premium electric sedans and SUVs", "CAR"],
  ["Electric Bikes", "electric-bikes", "High-performance commuter bikes", "BIKE"],
  ["Electric Scooters", "electric-scooters", "Smart city commuter scooters", "SCOOTER"],
  ["Electric Cycles", "electric-cycles", "Pedal-assist urban cycles", "CYCLE"],
] as const;

const brands = [
  ["Haval", "haval", "China", "Electric SUVs & Hybrids", "Great Wall Motor's specialized SUV marque."],
  ["BYD", "byd", "China", "Electric Cars & SUVs", "Global pioneer in Blade Battery technology."],
  ["MG", "mg", "UK / SAIC", "Electric Sedans & SUVs", "British automotive heritage with modern EVs."],
  ["NIU", "niu", "Global", "Smart Electric Scooters", "Smart urban mobility with connected batteries."],
  ["Yadea", "yadea", "China", "Electric Commuter Scooters", "High-volume commuter electric two-wheelers."],
  ["Super Soco", "super-soco", "Australia / VMoto", "Electric Street Bikes", "Performance electric street motorcycles."],
  ["Tesla", "tesla", "USA", "Premium Electric Cars", "High-performance electric vehicles."],
  ["Audi", "audi", "Germany", "Luxury Electric Vehicles", "Luxury electric performance with quattro."],
  ["Hyundai", "hyundai", "South Korea", "Electric Crossovers", "E-GMP electric crossover platform."],
  ["Trek", "trek", "USA", "Electric Pedal-Assist Cycles", "Premium pedal-assist city and trekking cycles."],
] as const;

const vehicles = [
  { name: "Super Soco TC", slug: "super-soco-tc", brand: "super-soco", category: "electric-bikes", price: 290000, battery: 3, range: 110, motor: 3, speed: 75, ac: 3.5, dc: null, status: "PUBLISHED", popular: false },
  { name: "NIU NQi GTS", slug: "niu-nqi-gts", brand: "niu", category: "electric-scooters", price: 325000, battery: 4.2, range: 130, motor: 3.1, speed: 80, ac: 5.5, dc: null, status: "PUBLISHED", popular: true },
  { name: "BYD Atto 3", slug: "byd-atto-3", brand: "byd", category: "electric-cars", price: 4850000, battery: 60.48, range: 420, motor: 150, speed: 160, ac: 6.5, dc: 45, status: "PUBLISHED", popular: true },
  { name: "MG ZS EV", slug: "mg-zs-ev", brand: "mg", category: "electric-cars", price: 4200000, battery: 50.3, range: 320, motor: 130, speed: 175, ac: 7, dc: 40, status: "PUBLISHED", popular: true },
  { name: "Yadea G5", slug: "yadea-g5", brand: "yadea", category: "electric-scooters", price: 195000, battery: 1.92, range: 80, motor: 2.3, speed: 60, ac: 4.5, dc: null, status: "PUBLISHED", popular: false },
  { name: "Super Soco TS Street Hunter", slug: "super-soco-ts", brand: "super-soco", category: "electric-bikes", price: 315000, battery: 3.24, range: 120, motor: 3, speed: 80, ac: 4, dc: null, status: "PUBLISHED", popular: false },
  { name: "BYD Seal", slug: "byd-seal", brand: "byd", category: "electric-cars", price: 6500000, battery: 82.5, range: 570, motor: 230, speed: 200, ac: 7.5, dc: 37, status: "PUBLISHED", popular: false },
  { name: "NIU MQi GT", slug: "niu-mqi-gt", brand: "niu", category: "electric-scooters", price: 280000, battery: 2.9, range: 100, motor: 3, speed: 70, ac: 4.5, dc: null, status: "PUBLISHED", popular: false },
  { name: "Trek FX+ 2 Stagger", slug: "trek-fx-plus-2", brand: "trek", category: "electric-cycles", price: 175000, battery: 0.25, range: 65, motor: 0.25, speed: 32, ac: 2, dc: null, status: "PUBLISHED", popular: false },
] as const;

const showrooms = [
  { name: "BYD Tejgaon Showroom", slug: "byd-tejgaon", address: "Tejgaon Industrial Area, Dhaka 1208", phone: "+880 1711-223344", division: "Dhaka Division", area: "Tejgaon", brands: ["byd"] },
  { name: "Yadea Flagship Dhaka", slug: "yadea-flagship", address: "Progoti Sarani, Gulshan, Dhaka 1212", phone: "+880 1822-556677", division: "Dhaka Division", area: "Gulshan", brands: ["yadea"] },
  { name: "Niu Bangladesh Central", slug: "niu-bangladesh-central", address: "Mirpur Road, Dhanmondi, Dhaka 1209", phone: "+880 1933-889900", division: "Dhaka Division", area: "Gulshan", brands: ["niu"] },
  { name: "MG Bangladesh (Tejgaon)", slug: "mg-bangladesh-tejgaon", address: "Shaheed Tajuddin Ahmad Ave, Dhaka 1215", phone: "+880 1644-112233", division: "Dhaka Division", area: "Banani", brands: ["mg"] },
] as const;

const articleCategories = [
  ["News", "news"],
  ["Reviews", "reviews"],
  ["Guides", "guides"],
  ["Battery Tips", "battery-tips"],
] as const;

const articles = [
  ["The Future of Electric Commuting in Bangladesh: A 5-Year Outlook", "future-of-electric-commuting-bangladesh-5-year-outlook", "news", "As battery assembly facilities establish operations in Chittagong and Dhaka, local prices are expected to drop.", 10, true],
  ["National EV Charging Policy 2026: Fast-Grid Expansion", "national-ev-charging-policy-2026-fast-grid-expansion", "news", "An in-depth look at Bangladesh's new framework for public fast-charging spots.", 5, false],
  ["How Extreme Heat Affects Lithium Ion Battery Packs", "how-extreme-heat-affects-lithium-ion-battery-packs", "battery-tips", "Prevent structural degradation of your electric scooter or car battery during dry summer periods.", 4, false],
  ["BYD Atto 3 Long-Term Review: Roads of Dhaka", "byd-atto-3-long-term-review-roads-of-dhaka", "reviews", "We test BYD's robust active blade battery on traffic-congested routes across Dhaka.", 8, false],
  ["How to Calculate Real Range Under Heavy Traffic", "how-to-calculate-real-range-under-heavy-traffic", "guides", "A step-by-step guide to predicting range degradation caused by heavy traffic.", 6, false],
  ["Yadea T5 Commuter Review: Price vs Range", "yadea-t5-commuter-review-price-vs-range", "reviews", "Is this high-performance scooter worth the price for daily commuting?", 5, false],
  ["Dhaka Metro EV Charging Station Blueprint Revealed", "dhaka-metro-ev-charging-station-blueprint-revealed", "news", "A complete layout of upcoming electric vehicle charging terminals near metro stations.", 3, false],
] as const;

async function main() {
  for (const [name, description] of roles) {
    await prisma.role.upsert({ where: { name }, update: { description }, create: { name, description } });
  }

  for (const [name, slug, description, icon] of categories) {
    await prisma.vehicleCategory.upsert({ where: { slug }, update: { name, description, icon, status: "PUBLISHED" }, create: { name, slug, description, icon, status: "PUBLISHED" } });
  }

  for (const [name, slug, origin, category, description] of brands) {
    await prisma.brand.upsert({ where: { slug }, update: { name, origin, category, description, status: "PUBLISHED" }, create: { name, slug, origin, category, description, status: "PUBLISHED" } });
  }

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: vehicle.slug },
      update: {
        name: vehicle.name, priceBdt: vehicle.price, status: vehicle.status, isPopular: vehicle.popular,
        brand: { connect: { slug: vehicle.brand } }, category: { connect: { slug: vehicle.category } },
        specs: { upsert: { update: { batteryCapacityKwh: vehicle.battery, realWorldRangeKm: vehicle.range, motorPowerKw: vehicle.motor, topSpeedKmh: vehicle.speed, acChargingHours: vehicle.ac, dcChargingMinutes: vehicle.dc }, create: { batteryCapacityKwh: vehicle.battery, realWorldRangeKm: vehicle.range, motorPowerKw: vehicle.motor, topSpeedKmh: vehicle.speed, acChargingHours: vehicle.ac, dcChargingMinutes: vehicle.dc } } },
      },
      create: {
        name: vehicle.name, slug: vehicle.slug, priceBdt: vehicle.price, status: vehicle.status, isPopular: vehicle.popular,
        brand: { connect: { slug: vehicle.brand } }, category: { connect: { slug: vehicle.category } },
        specs: { create: { batteryCapacityKwh: vehicle.battery, realWorldRangeKm: vehicle.range, motorPowerKw: vehicle.motor, topSpeedKmh: vehicle.speed, acChargingHours: vehicle.ac, dcChargingMinutes: vehicle.dc } },
      },
    });
  }

  for (const showroom of showrooms) {
    const saved = await prisma.showroom.upsert({
      where: { slug: showroom.slug },
      update: { name: showroom.name, address: showroom.address, phone: showroom.phone, division: showroom.division, area: showroom.area, isVerified: true, status: "PUBLISHED" },
      create: { name: showroom.name, slug: showroom.slug, address: showroom.address, phone: showroom.phone, division: showroom.division, area: showroom.area, isVerified: true, status: "PUBLISHED" },
    });
    for (const brandSlug of showroom.brands) {
      const brand = await prisma.brand.findUniqueOrThrow({ where: { slug: brandSlug } });
      await prisma.showroomBrand.upsert({ where: { showroomId_brandId: { showroomId: saved.id, brandId: brand.id } }, update: {}, create: { showroomId: saved.id, brandId: brand.id } });
    }
  }

  for (const [name, slug] of articleCategories) {
    await prisma.articleCategory.upsert({ where: { slug }, update: { name, status: "ACTIVE" }, create: { name, slug, status: "ACTIVE" } });
  }

  for (const [title, slug, categorySlug, excerpt, readTimeMin, isFeatured] of articles) {
    await prisma.article.upsert({ where: { slug }, update: { title, excerpt, readTimeMin, isFeatured, status: "PUBLISHED", publishedAt: new Date() }, create: { title, slug, excerpt, readTimeMin, isFeatured, status: "PUBLISHED", publishedAt: new Date(), category: { connect: { slug: categorySlug } } } });
  }

  console.log(`Seeded ${roles.length} roles, ${brands.length} brands, ${vehicles.length} vehicles, ${showrooms.length} showrooms, and ${articles.length} articles.`);
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
