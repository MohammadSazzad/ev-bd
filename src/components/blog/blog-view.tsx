"use client";

import { useState, useMemo, useEffect } from "react";
import type { BlogCategory, BlogPost } from "@/lib/data/blog";
import { BlogHeader } from "./blog-header";
import { FeaturedCard } from "./featured-card";
import { BlogImporterCallout } from "./blog-importer-callout";
import { PostCard } from "./post-card";
import { Pagination } from "./pagination";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

type ApiArticle = { id: string | number; title: string; excerpt?: string | null; slug: string; publishedAt?: string | null; readTimeMin?: number | null; isFeatured?: boolean; category: { name: string }; media?: Array<{ media?: { filePath?: string } }> };

export function BlogView() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All Posts");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams({ pageSize: "50" });
    if (activeCategory !== "All Posts") params.set("category", activeCategory.toLowerCase().replaceAll(" ", "-"));
    fetch(`/api/v1/articles?${params}`)
      .then((response) => response.json())
      .then((response) => setPosts((response.data?.items ?? []).map((post: ApiArticle) => ({
        id: post.id.toString(),
        title: post.title,
        description: post.excerpt ?? "",
        category: post.category.name,
        date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "",
        readTime: post.readTimeMin ? `${post.readTimeMin} min read` : "",
        imageUrl: post.media?.[0]?.media?.filePath ?? "",
        slug: post.slug,
        isFeatured: post.isFeatured,
      }))))
      .catch(() => setPosts([]))
      .finally(() => setIsLoading(false));
  }, [activeCategory]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All Posts") {
      return posts;
    }
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Title & Filter Pills */}
      <BlogHeader
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setCurrentPage(1);
        }}
      />

      {/* Featured Article Card */}
      {!isLoading && <FeaturedCard />}

      {/* Importer Callout Banner */}
      <BlogImporterCallout />

      {/* 3-Column Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-16 text-center text-slate-500">Loading articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-12 text-center shadow-sm">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              No articles found in this category yet.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All Posts")}
              className="mt-4 rounded-xl bg-[#00DF8F] px-4 py-2 text-xs sm:text-sm font-semibold text-[#070b14] hover:bg-[#00DF8F]/90 transition-all shadow-sm"
            >
              View All Posts
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* Editorial Leaderboard Ad Slot */}
      <div className="my-8">
        <GoogleAdSlot
          format="horizontal-banner"
          slotId={ADS_CONFIG.slots.blogInFeed}
        />
      </div>

      {/* Pagination Controls [ 1 ] [ 2 ] [ 3 ] */}
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
