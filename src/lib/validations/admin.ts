import { z } from "zod";

export const vehicleAdminSchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  brandSlug: z.string().trim().min(1),
  categorySlug: z.string().trim().min(1),
  priceBdt: z.coerce.number().nonnegative(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  specs: z.object({
    batteryCapacityKwh: z.coerce.number().optional(),
    realWorldRangeKm: z.coerce.number().optional(),
    motorPowerKw: z.coerce.number().optional(),
    topSpeedKmh: z.coerce.number().optional(),
    acChargingHours: z.coerce.number().optional(),
    dcChargingMinutes: z.coerce.number().optional(),
    batteryChemistry: z.string().max(120).optional(),
    reliabilityScore: z.coerce.number().int().min(0).max(100).optional(),
    reliabilityRating: z.string().max(120).optional(),
    reliabilityNote: z.string().optional(),
  }).optional(),
});

export type VehicleAdminInput = z.infer<typeof vehicleAdminSchema>;

export const brandAdminSchema = z.object({
  name: z.string().trim().min(2).max(120), slug: z.string().trim().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  origin: z.string().trim().max(120).optional(), category: z.string().trim().max(160).optional(), description: z.string().optional(), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export const categoryAdminSchema = z.object({
  name: z.string().trim().min(2).max(100), slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), description: z.string().optional(), icon: z.enum(["CAR", "BIKE", "SCOOTER", "CYCLE"]), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export const showroomAdminSchema = z.object({
  name: z.string().trim().min(2).max(180), slug: z.string().trim().min(2).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), type: z.enum(["SHOWROOM", "IMPORTER", "DEALERSHIP", "SERVICE_CENTER"]).default("SHOWROOM"), address: z.string().trim().min(5).max(300), area: z.string().trim().max(100).optional(), division: z.string().trim().max(100).optional(), phone: z.string().trim().max(40).optional(), email: z.string().email().optional().or(z.literal("")), latitude: z.coerce.number().min(-90).max(90).optional(), longitude: z.coerce.number().min(-180).max(180).optional(), isVerified: z.boolean().default(false), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"), brandSlugs: z.array(z.string()).default([]),
});

export const articleAdminSchema = z.object({
  title: z.string().trim().min(3).max(240), slug: z.string().trim().min(2).max(260).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), excerpt: z.string().optional(), body: z.string().optional(), readTimeMin: z.coerce.number().int().positive().max(180).optional(), categorySlug: z.string().min(1), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"), isFeatured: z.boolean().default(false),
});

export const userStatusSchema = z.object({ status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]) });
export const userRolesSchema = z.object({ roleNames: z.array(z.enum(["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM", "USER"])).min(1) });
