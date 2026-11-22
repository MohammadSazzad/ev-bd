import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { MediaType, VehicleMediaRole, ShowroomMediaRole, ArticleMediaRole } from "../src/generated/prisma/enums";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type SeedImage = {
  url: string;
  name: string;
  mediaType: MediaType;
  altText: string;
};

async function upsertSeedMedia(image: SeedImage) {
  const existing = await prisma.mediaFile.findFirst({ where: { filePath: image.url } });
  if (existing) {
    return prisma.mediaFile.update({
      where: { id: existing.id },
      data: { originalName: image.name, fileName: image.name, mediaType: image.mediaType, mimeType: "image/jpeg", extension: "jpg", altText: image.altText, disk: "remote" },
    });
  }
  return prisma.mediaFile.create({
    data: { originalName: image.name, fileName: image.name, filePath: image.url, mediaType: image.mediaType, mimeType: "image/jpeg", extension: "jpg", size: BigInt(0), altText: image.altText, disk: "remote" },
  });
}

async function attachVehicleImages(vehicleId: bigint, slug: string, images: readonly string[]) {
  for (const [sortOrder, url] of images.entries()) {
    const media = await upsertSeedMedia({ url, name: `${slug}-${sortOrder + 1}.jpg`, mediaType: MediaType.VEHICLE_IMAGE, altText: `${slug} electric vehicle image ${sortOrder + 1}` });
    await prisma.vehicleMedia.upsert({
      where: { vehicleId_mediaId: { vehicleId, mediaId: media.id } },
      update: { role: sortOrder === 0 ? VehicleMediaRole.MAIN : VehicleMediaRole.GALLERY, sortOrder, altText: media.altText },
      create: { vehicleId, mediaId: media.id, role: sortOrder === 0 ? VehicleMediaRole.MAIN : VehicleMediaRole.GALLERY, sortOrder, altText: media.altText },
    });
  }
}

async function attachShowroomImage(showroomId: bigint, slug: string, url: string) {
  const media = await upsertSeedMedia({ url, name: `${slug}.jpg`, mediaType: MediaType.SHOWROOM_IMAGE, altText: `${slug} showroom image` });
  await prisma.showroomMedia.upsert({
    where: { showroomId_mediaId: { showroomId, mediaId: media.id } },
    update: { role: ShowroomMediaRole.COVER, sortOrder: 0 },
    create: { showroomId, mediaId: media.id, role: ShowroomMediaRole.COVER, sortOrder: 0 },
  });
}

async function attachArticleImage(articleId: bigint, slug: string, url: string) {
  const media = await upsertSeedMedia({ url, name: `${slug}.jpg`, mediaType: MediaType.ARTICLE_IMAGE, altText: `${slug} article cover image` });
  await prisma.articleMedia.upsert({
    where: { articleId_mediaId: { articleId, mediaId: media.id } },
    update: { role: ArticleMediaRole.COVER, sortOrder: 0 },
    create: { articleId, mediaId: media.id, role: ArticleMediaRole.COVER, sortOrder: 0 },
  });
}

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
  { name: "Haval", slug: "haval", origin: "China", category: "Electric SUVs & Hybrids", description: "Great Wall Motor's specialized SUV marque.", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85" },
  { name: "BYD", slug: "byd", origin: "China", category: "Electric Cars & SUVs", description: "Global pioneer in Blade Battery technology.", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=85" },
  { name: "MG", slug: "mg", origin: "UK / SAIC", category: "Electric Sedans & SUVs", description: "British automotive heritage with modern EVs.", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85" },
  { name: "NIU", slug: "niu", origin: "Global", category: "Smart Electric Scooters", description: "Smart urban mobility with connected batteries.", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85" },
  { name: "Yadea", slug: "yadea", origin: "China", category: "Electric Commuter Scooters", description: "High-volume commuter electric two-wheelers.", image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=900&q=85" },
  { name: "Super Soco", slug: "super-soco", origin: "Australia / VMoto", category: "Electric Street Bikes", description: "Performance electric street motorcycles.", image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=900&q=85" },
  { name: "Tesla", slug: "tesla", origin: "USA", category: "Premium Electric Cars", description: "High-performance electric vehicles.", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=85&brand=tesla" },
  { name: "Audi", slug: "audi", origin: "Germany", category: "Luxury Electric Vehicles", description: "Luxury electric performance with quattro.", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85" },
  { name: "Hyundai", slug: "hyundai", origin: "South Korea", category: "Electric Crossovers", description: "E-GMP electric crossover platform.", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85" },
  { name: "Trek", slug: "trek", origin: "USA", category: "Electric Pedal-Assist Cycles", description: "Premium pedal-assist city and trekking cycles.", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=85" },
] as const;

const vehicles = [
  { name: "Super Soco TC", slug: "super-soco-tc", brand: "super-soco", category: "electric-bikes", price: 290000, battery: 3, range: 110, motor: 3, speed: 75, ac: 3.5, dc: null, status: "PUBLISHED", popular: false, images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=85"] },
  { name: "NIU NQi GTS", slug: "niu-nqi-gts", brand: "niu", category: "electric-scooters", price: 325000, battery: 4.2, range: 130, motor: 3.1, speed: 80, ac: 5.5, dc: null, status: "PUBLISHED", popular: true, images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=1400&q=85"] },
  { name: "BYD Atto 3", slug: "byd-atto-3", brand: "byd", category: "electric-cars", price: 4850000, battery: 60.48, range: 420, motor: 150, speed: 160, ac: 6.5, dc: 45, status: "PUBLISHED", popular: true, images: ["https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"] },
  { name: "MG ZS EV", slug: "mg-zs-ev", brand: "mg", category: "electric-cars", price: 4200000, battery: 50.3, range: 320, motor: 130, speed: 175, ac: 7, dc: 40, status: "PUBLISHED", popular: true, images: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=85"] },
  { name: "Yadea G5", slug: "yadea-g5", brand: "yadea", category: "electric-scooters", price: 195000, battery: 1.92, range: 80, motor: 2.3, speed: 60, ac: 4.5, dc: null, status: "PUBLISHED", popular: false, images: ["https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=85"] },
  { name: "Super Soco TS Street Hunter", slug: "super-soco-ts", brand: "super-soco", category: "electric-bikes", price: 315000, battery: 3.24, range: 120, motor: 3, speed: 80, ac: 4, dc: null, status: "PUBLISHED", popular: false, images: ["https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=85"] },
  { name: "BYD Seal", slug: "byd-seal", brand: "byd", category: "electric-cars", price: 6500000, battery: 82.5, range: 570, motor: 230, speed: 200, ac: 7.5, dc: 37, status: "PUBLISHED", popular: false, images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85"] },
  { name: "NIU MQi GT", slug: "niu-mqi-gt", brand: "niu", category: "electric-scooters", price: 280000, battery: 2.9, range: 100, motor: 3, speed: 70, ac: 4.5, dc: null, status: "PUBLISHED", popular: false, images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=1400&q=85"] },
  { name: "Trek FX+ 2 Stagger", slug: "trek-fx-plus-2", brand: "trek", category: "electric-cycles", price: 175000, battery: 0.25, range: 65, motor: 0.25, speed: 32, ac: 2, dc: null, status: "PUBLISHED", popular: false, images: ["https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1400&q=85"] },
] as const;

const showrooms = [
  { name: "BYD Tejgaon Showroom", slug: "byd-tejgaon", address: "Tejgaon Industrial Area, Dhaka 1208", phone: "+880 1711-223344", division: "Dhaka Division", area: "Tejgaon", brands: ["byd"], image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=85" },
  { name: "Yadea Flagship Dhaka", slug: "yadea-flagship", address: "Progoti Sarani, Gulshan, Dhaka 1212", phone: "+880 1822-556677", division: "Dhaka Division", area: "Gulshan", brands: ["yadea"], image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1400&q=85" },
  { name: "Niu Bangladesh Central", slug: "niu-bangladesh-central", address: "Mirpur Road, Dhanmondi, Dhaka 1209", phone: "+880 1933-889900", division: "Dhaka Division", area: "Gulshan", brands: ["niu"], image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=85" },
  { name: "MG Bangladesh (Tejgaon)", slug: "mg-bangladesh-tejgaon", address: "Shaheed Tajuddin Ahmad Ave, Dhaka 1215", phone: "+880 1644-112233", division: "Dhaka Division", area: "Banani", brands: ["mg"], image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=85" },
] as const;

const articleCategories = [
  ["News", "news"],
  ["Reviews", "reviews"],
  ["Guides", "guides"],
  ["Battery Tips", "battery-tips"],
] as const;

const articles = [
  ["The Future of Electric Commuting in Bangladesh: A 5-Year Outlook", "future-of-electric-commuting-bangladesh-5-year-outlook", "news", "As battery assembly facilities establish operations in Chittagong and Dhaka, local prices are expected to drop.", 10, true, "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=85"],
  ["National EV Charging Policy 2026: Fast-Grid Expansion", "national-ev-charging-policy-2026-fast-grid-expansion", "news", "An in-depth look at Bangladesh's new framework for public fast-charging spots.", 5, false, "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85"],
  ["How Extreme Heat Affects Lithium Ion Battery Packs", "how-extreme-heat-affects-lithium-ion-battery-packs", "battery-tips", "Prevent structural degradation of your electric scooter or car battery during dry summer periods.", 4, false, "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85"],
  ["BYD Atto 3 Long-Term Review: Roads of Dhaka", "byd-atto-3-long-term-review-roads-of-dhaka", "reviews", "We test BYD's robust active blade battery on traffic-congested routes across Dhaka.", 8, false, "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"],
  ["How to Calculate Real Range Under Heavy Traffic", "how-to-calculate-real-range-under-heavy-traffic", "guides", "A step-by-step guide to predicting range degradation caused by heavy traffic.", 6, false, "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"],
  ["Yadea T5 Commuter Review: Price vs Range", "yadea-t5-commuter-review-price-vs-range", "reviews", "Is this high-performance scooter worth the price for daily commuting?", 5, false, "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=85"],
  ["Dhaka Metro EV Charging Station Blueprint Revealed", "dhaka-metro-ev-charging-station-blueprint-revealed", "news", "A complete layout of upcoming electric vehicle charging terminals near metro stations.", 3, false, "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85"],
] as const;

async function main() {
  for (const [name, description] of roles) {
    await prisma.role.upsert({ where: { name }, update: { description }, create: { name, description } });
  }

  for (const [name, slug, description, icon] of categories) {
    await prisma.vehicleCategory.upsert({ where: { slug }, update: { name, description, icon, status: "PUBLISHED" }, create: { name, slug, description, icon, status: "PUBLISHED" } });
  }

  for (const brand of brands) {
    const saved = await prisma.brand.upsert({ where: { slug: brand.slug }, update: { name: brand.name, origin: brand.origin, category: brand.category, description: brand.description, status: "PUBLISHED" }, create: { name: brand.name, slug: brand.slug, origin: brand.origin, category: brand.category, description: brand.description, status: "PUBLISHED" } });
    const logo = await upsertSeedMedia({ url: brand.image, name: `${brand.slug}-logo.jpg`, mediaType: MediaType.BRAND_LOGO, altText: `${brand.name} brand image` });
    await prisma.brand.update({ where: { id: saved.id }, data: { logoMediaId: logo.id } });
  }

  for (const vehicle of vehicles) {
    const saved = await prisma.vehicle.upsert({
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
    await attachVehicleImages(saved.id, vehicle.slug, vehicle.images);
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
    await attachShowroomImage(saved.id, showroom.slug, showroom.image);
  }

  for (const [name, slug] of articleCategories) {
    await prisma.articleCategory.upsert({ where: { slug }, update: { name, status: "ACTIVE" }, create: { name, slug, status: "ACTIVE" } });
  }

  for (const [title, slug, categorySlug, excerpt, readTimeMin, isFeatured, image] of articles) {
    const saved = await prisma.article.upsert({ where: { slug }, update: { title, excerpt, readTimeMin, isFeatured, status: "PUBLISHED", publishedAt: new Date(), category: { connect: { slug: categorySlug } } }, create: { title, slug, excerpt, readTimeMin, isFeatured, status: "PUBLISHED", publishedAt: new Date(), category: { connect: { slug: categorySlug } } } });
    await attachArticleImage(saved.id, slug, image);
  }

  console.log(`Seeded ${roles.length} roles, ${brands.length} brands with logos, ${vehicles.length} vehicles with galleries, ${showrooms.length} showrooms with covers, and ${articles.length} articles with covers.`);
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
