export interface AdSlotConfig {
  slotId?: string;
  format: "horizontal-banner" | "sidebar-rect" | "in-feed" | "billboard";
  label?: string;
}

export const ADS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED !== "false",
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
  testMode:
    process.env.NODE_ENV !== "production" ||
    !process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  slots: {
    homeLeaderboard: "1000000001",
    catalogSidebar: "1000000002",
    compareBottom: "1000000003",
    estimatorBottom: "1000000004",
    blogInFeed: "1000000005",
    brandsBottom: "1000000006",
  },
};
