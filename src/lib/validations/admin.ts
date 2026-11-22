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
