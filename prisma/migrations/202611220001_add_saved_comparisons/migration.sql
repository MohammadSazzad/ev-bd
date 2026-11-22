CREATE TABLE "saved_comparisons" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "saved_comparisons_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "saved_comparison_vehicles" (
    "comparison_id" BIGINT NOT NULL,
    "vehicle_id" BIGINT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "saved_comparison_vehicles_pkey" PRIMARY KEY ("comparison_id", "vehicle_id")
);

CREATE INDEX "saved_comparisons_user_id_updated_at_idx" ON "saved_comparisons"("user_id", "updated_at");
CREATE INDEX "saved_comparison_vehicles_vehicle_id_idx" ON "saved_comparison_vehicles"("vehicle_id");

ALTER TABLE "saved_comparisons" ADD CONSTRAINT "saved_comparisons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "saved_comparison_vehicles" ADD CONSTRAINT "saved_comparison_vehicles_comparison_id_fkey" FOREIGN KEY ("comparison_id") REFERENCES "saved_comparisons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "saved_comparison_vehicles" ADD CONSTRAINT "saved_comparison_vehicles_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
