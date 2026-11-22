import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@/generated/prisma/client";

const publicVehicleInclude = {
  brand: true,
  category: true,
  specs: true,
  media: { include: { media: true }, orderBy: { sortOrder: "asc" as const } },
  details: { orderBy: [{ section: "asc" as const }, { sortOrder: "asc" as const }] },
};

export async function listVehicles(input: {
  page: number; pageSize: number; q?: string; brand?: string; category?: string;
  minPrice?: number; maxPrice?: number; minRange?: number; sort?: string;
}) {
  const where: Prisma.VehicleWhereInput = { status: "PUBLISHED" };
  if (input.q) where.OR = [{ name: { contains: input.q, mode: "insensitive" } }, { brand: { name: { contains: input.q, mode: "insensitive" } } }];
  if (input.brand) where.brand = { slug: input.brand };
  if (input.category) where.category = { slug: input.category };
  if (input.minPrice !== undefined || input.maxPrice !== undefined) where.priceBdt = { gte: input.minPrice, lte: input.maxPrice };
  if (input.minRange !== undefined) where.specs = { is: { realWorldRangeKm: { gte: input.minRange } } };
  const orderBy: Prisma.VehicleOrderByWithRelationInput = input.sort === "price-asc" ? { priceBdt: "asc" } : input.sort === "price-desc" ? { priceBdt: "desc" } : input.sort === "range" ? { specs: { realWorldRangeKm: "desc" } } : { createdAt: "desc" };
  const [items, total] = await prisma.$transaction([
    prisma.vehicle.findMany({ where, include: publicVehicleInclude, orderBy, skip: (input.page - 1) * input.pageSize, take: input.pageSize }),
    prisma.vehicle.count({ where }),
  ]);
  return { items, pagination: { page: input.page, pageSize: input.pageSize, total, totalPages: Math.ceil(total / input.pageSize) } };
}

export function getVehicle(slug: string) {
  return prisma.vehicle.findFirst({ where: { slug, status: "PUBLISHED" }, include: publicVehicleInclude });
}

export function listBrands() {
  return prisma.brand.findMany({ where: { status: "PUBLISHED" }, include: { logoMedia: true, _count: { select: { vehicles: { where: { status: "PUBLISHED" } } } } }, orderBy: { name: "asc" } });
}

export function getBrand(slug: string) {
  return prisma.brand.findFirst({ where: { slug, status: "PUBLISHED" }, include: { logoMedia: true, vehicles: { where: { status: "PUBLISHED" }, include: publicVehicleInclude } } });
}

export function listCategories() {
  return prisma.vehicleCategory.findMany({ where: { status: "PUBLISHED" }, include: { _count: { select: { vehicles: { where: { status: "PUBLISHED" } } } } }, orderBy: { name: "asc" } });
}

export async function listShowrooms(input: { page: number; pageSize: number; q?: string; division?: string; area?: string; brand?: string; type?: "SHOWROOM" | "IMPORTER" | "DEALERSHIP" | "SERVICE_CENTER" }) {
  const where: Prisma.ShowroomWhereInput = { status: "PUBLISHED", isVerified: true };
  if (input.q) where.OR = [{ name: { contains: input.q, mode: "insensitive" } }, { address: { contains: input.q, mode: "insensitive" } }];
  if (input.division) where.division = input.division;
  if (input.area) where.area = input.area;
  if (input.type) where.type = input.type;
  if (input.brand) where.brands = { some: { brand: { slug: input.brand } } };
  const [items, total] = await prisma.$transaction([
    prisma.showroom.findMany({ where, include: { brands: { include: { brand: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { name: "asc" }, skip: (input.page - 1) * input.pageSize, take: input.pageSize }),
    prisma.showroom.count({ where }),
  ]);
  return { items, pagination: { page: input.page, pageSize: input.pageSize, total, totalPages: Math.ceil(total / input.pageSize) } };
}

export function getShowroom(slug: string) {
  return prisma.showroom.findFirst({ where: { slug, status: "PUBLISHED", isVerified: true }, include: { brands: { include: { brand: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } } });
}

export async function listArticles(input: { page: number; pageSize: number; q?: string; category?: string; featured?: boolean }) {
  const where: Prisma.ArticleWhereInput = { status: "PUBLISHED" };
  if (input.q) where.OR = [{ title: { contains: input.q, mode: "insensitive" } }, { excerpt: { contains: input.q, mode: "insensitive" } }];
  if (input.category) where.category = { slug: input.category };
  if (input.featured !== undefined) where.isFeatured = input.featured;
  const [items, total] = await prisma.$transaction([
    prisma.article.findMany({ where, include: { category: true, author: { select: { name: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { publishedAt: "desc" }, skip: (input.page - 1) * input.pageSize, take: input.pageSize }),
    prisma.article.count({ where }),
  ]);
  return { items, pagination: { page: input.page, pageSize: input.pageSize, total, totalPages: Math.ceil(total / input.pageSize) } };
}

export function getArticle(slug: string) {
  return prisma.article.findFirst({ where: { slug, status: "PUBLISHED" }, include: { category: true, author: { select: { name: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } } });
}
