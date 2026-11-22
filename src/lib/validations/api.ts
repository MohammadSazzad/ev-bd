import { z } from "zod";

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
  q: z.string().trim().optional(),
  sort: z.string().trim().optional(),
});

export const vehicleListQuerySchema = listQuerySchema.extend({
  brand: z.string().trim().optional(),
  category: z.string().trim().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  minRange: z.coerce.number().nonnegative().optional(),
});

export const showroomListQuerySchema = listQuerySchema.extend({
  division: z.string().trim().optional(),
  area: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  type: z.enum(["SHOWROOM", "IMPORTER", "DEALERSHIP", "SERVICE_CENTER"]).optional(),
});

export const articleListQuerySchema = listQuerySchema.extend({
  category: z.string().trim().optional(),
  featured: z.enum(["true", "false"]).optional(),
});

export const savedComparisonSchema = z.object({
  name: z.string().trim().min(1).max(160),
  vehicleIds: z.array(z.string().regex(/^\d+$/, "Vehicle IDs must be numeric")).min(1).max(3),
});
