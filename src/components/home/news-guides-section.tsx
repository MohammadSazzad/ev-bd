import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NEWS_ARTICLES } from "@/lib/data/homepage";

export function NewsGuidesSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Latest EV News & Guides
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Keep up with EV infrastructure developments, policy updates, and expert battery maintenance tips
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00DF8F] hover:underline"
          >
            <span>View all articles</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2-Column Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NEWS_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0e1628] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-black/50"
            >
              {/* Article Thumbnail */}
              <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-slate-900">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-md bg-[#070b14]/80 px-2.5 py-1 text-xs font-semibold text-[#00DF8F] backdrop-blur-md border border-emerald-500/20">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00DF8F] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
