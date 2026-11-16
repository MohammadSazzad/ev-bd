import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/data/blog";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] shadow-md dark:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl">
      <div>
        {/* Thumbnail Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-[#0e1628]/60" />
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          {/* Category & Read Time Row */}
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-[#00DF8F]">
              {post.category}
            </span>
            <span className="text-slate-500 dark:text-slate-500 font-medium">
              {post.readTime}
            </span>
          </div>

          {/* Post Title */}
          <Link href={`/blog/${post.slug}`} className="block group">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00DF8F] transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          {/* Post Description */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>

      {/* Footer Date & Read Article Action */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-500 font-medium">
          {post.date}
        </span>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-[#00DF8F] hover:translate-x-0.5 transition-transform"
        >
          <span>Read Article</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
