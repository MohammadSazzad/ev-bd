import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FEATURED_POST, BLOG_POSTS, getBlogPost } from "@/lib/data/blog";
import { NEWS_ARTICLES } from "@/lib/data/homepage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: FEATURED_POST.slug },
    ...BLOG_POSTS.map((post) => ({ slug: post.slug })),
    ...NEWS_ARTICLES.map((article) => ({ slug: article.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const newsPost = NEWS_ARTICLES.find((article) => article.slug === slug);
  const title = post?.title || newsPost?.title;
  return title
    ? { title: `${title} - VoltBD`, description: post?.description || newsPost?.description }
    : { title: "Article Not Found - VoltBD" };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const newsPost = NEWS_ARTICLES.find((article) => article.slug === slug);
  if (!post && !newsPost) notFound();

  const article = post || {
    title: newsPost!.title,
    description: newsPost!.description,
    category: newsPost!.category,
    date: newsPost!.date,
    readTime: newsPost!.readTime,
    imageUrl: newsPost!.imageUrl,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <Link
            href="/blog"
            className="text-sm font-semibold text-emerald-600 dark:text-[#00DF8F] hover:underline"
          >
            &larr; Back to articles
          </Link>
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F]">
              {article.category}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              {article.date} · {article.readTime}
            </p>
          </div>
          <div className="relative mt-8 h-72 sm:h-[420px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          <div className="mt-8 space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
            <p>{article.description}</p>
            <p>
              Before making a purchase decision, compare real-world range,
              charging availability, warranty coverage, and total ownership cost.
              Local traffic, ambient temperature, terrain, charging habits, and
              maintenance all affect the performance reported by a manufacturer.
            </p>
            <p>
              VoltBD&apos;s vehicle directory, comparison tool, and battery estimator
              provide practical reference points for these factors. Always confirm
              current pricing and specifications with an authorized dealer or
              importer before placing an order.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/vehicles"
              className="rounded-xl bg-[#00DF8F] px-4 py-2.5 text-sm font-bold text-[#070b14]"
            >
              Browse Vehicles
            </Link>
            <Link
              href="/battery-estimator"
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              Try Battery Estimator
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
