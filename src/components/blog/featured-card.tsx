import Image from "next/image";
import Link from "next/link";
import { FEATURED_POST } from "@/lib/data/blog";

export function FeaturedCard() {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] p-5 sm:p-7 shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-emerald-500/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: Featured Image */}
        <div className="lg:col-span-7 relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
          <Image
            src={FEATURED_POST.imageUrl}
            alt={FEATURED_POST.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent dark:from-[#0e1628]/40" />
        </div>

        {/* Right: Featured Content */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div>
            <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-[#00DF8F] border border-emerald-200 dark:border-emerald-500/30">
              FEATURED FEATURE
            </span>
          </div>

          <Link href={`/blog/${FEATURED_POST.slug}`} className="block mt-4 group">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00DF8F] transition-colors leading-tight">
              {FEATURED_POST.title}
            </h2>
          </Link>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {FEATURED_POST.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-500">
            <span>{FEATURED_POST.date}</span>
            <span>•</span>
            <span>{FEATURED_POST.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
