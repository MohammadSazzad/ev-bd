export interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: "News" | "Reviews" | "Guides" | "Battery Tips";
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
  isFeatured?: boolean;
}

export const BLOG_CATEGORIES = [
  "All Posts",
  "News",
  "Reviews",
  "Guides",
  "Battery Tips",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const FEATURED_POST: BlogPost = {
  id: "future-of-electric-commuting",
  title: "The Future of Electric Commuting in Bangladesh: A 5-Year Outlook",
  description:
    "As battery assembly facilities establish operations in Chittagong and Dhaka, local prices are expected to drop by 15%. Learn how infrastructure policies plan to shape your next EV purchase.",
  category: "News",
  date: "March 15, 2026",
  readTime: "10 min read",
  imageUrl:
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=80",
  slug: "future-of-electric-commuting-bangladesh-5-year-outlook",
  isFeatured: true,
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "national-ev-charging-policy",
    title: "National EV Charging Policy 2026: Fast-Grid Expansion",
    description:
      "An in-depth look at Bangladesh's new framework setting up public fast-charging spots in major cities.",
    category: "News",
    date: "March 12, 2026",
    readTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    slug: "national-ev-charging-policy-2026-fast-grid-expansion",
  },
  {
    id: "extreme-heat-affects-batteries",
    title: "How Extreme Heat Affects Lithium Ion Battery Packs",
    description:
      "Prevent structural degradation of your electric scooter or car battery during dry summer periods in Dhaka.",
    category: "Battery Tips",
    date: "March 08, 2026",
    readTime: "4 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    slug: "how-extreme-heat-affects-lithium-ion-battery-packs",
  },
  {
    id: "byd-atto-3-review",
    title: "BYD Atto 3 Long-Term Review: Roads of Dhaka",
    description:
      "We test BYD's robust active blade battery on traffic-congested routes across Mohakhali and Banani.",
    category: "Reviews",
    date: "Feb 28, 2026",
    readTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    slug: "byd-atto-3-long-term-review-roads-of-dhaka",
  },
  {
    id: "calculate-real-range",
    title: "How to Calculate Real Range Under Heavy Traffic",
    description:
      "Our step-by-step mathematical guide to predicting range degradation caused by heavy bumper-to-traffic...",
    category: "Guides",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    slug: "how-to-calculate-real-range-under-heavy-traffic",
  },
  {
    id: "yadea-t5-review",
    title: "Yadea T5 Commuter Review: Price vs Range",
    description:
      "Is this high-performance scooter worth the BDT tag for daily university and workplace commuting?",
    category: "Reviews",
    date: "Jan 22, 2026",
    readTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    slug: "yadea-t5-commuter-review-price-vs-range",
  },
  {
    id: "dhaka-metro-charging-blueprint",
    title: "Dhaka Metro EV Charging Station Blueprint Revealed",
    description:
      "A complete layout of all upcoming electric vehicle charging terminals near transit metro rail stations.",
    category: "News",
    date: "Jan 10, 2026",
    readTime: "3 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    slug: "dhaka-metro-ev-charging-station-blueprint-revealed",
  },
];
