"use client";

import { useState, useMemo } from "react";
import { BlogCategory, BLOG_POSTS } from "@/lib/data/blog";
import { BlogHeader } from "./blog-header";
import { FeaturedCard } from "./featured-card";
import { BlogImporterCallout } from "./blog-importer-callout";
import { PostCard } from "./post-card";
import { Pagination } from "./pagination";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

export function BlogView() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All Posts") {
      return BLOG_POSTS;
    }
    return BLOG_POSTS.filter((post) => post.category === activeCategory);
  }, [activeCategory]);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
      <FeaturedCard />

      {/* Importer Callout Banner */}
      <BlogImporterCallout />

      {/* 3-Column Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
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
          paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
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
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
