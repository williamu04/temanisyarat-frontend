import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { Pagination } from "@/components/pagination";
import { SectionTitle, SiteFooter, SiteHeader } from "@/components/page-chrome";
import { excerptFromArticle } from "@/lib/articles";
import { getArticles } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artikel",
};

const fallbackExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud";

type ArticleListItem = {
  title: string;
  excerpt: string;
  readTime: number;
  href: string;
  highlighted: boolean;
  imageUrl?: string;
  date?: string;
};

const fallbackCards: ArticleListItem[] = Array.from({ length: 6 }, (_, index) => ({
  title: "Headline",
  excerpt: fallbackExcerpt,
  readTime: 3,
  href: "/artikel/tentang-gerkatin",
  highlighted: index === 0,
}));

export default async function ArticlesPage() {
  const articles = await getArticles(6);

  const cards: ArticleListItem[] =
    articles.length > 0
      ? articles.map((article, index) => ({
          title: article.article || "Headline",
          excerpt: excerptFromArticle(article, fallbackExcerpt),
          readTime: article.readingTime ?? 3,
          href: `/artikel/${article.slug ?? "tentang-gerkatin"}`,
          highlighted: index === 0,
          imageUrl: article.imageUrl,
          date: article.date,
        }))
      : fallbackCards;

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-[1440px] px-6 pb-8 pt-16 sm:px-10 lg:px-[120px] lg:pt-16">
          <SectionTitle>Artikel</SectionTitle>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <ArticleCard
                key={`${card.href}-${card.highlighted ? "featured" : "default"}`}
                title={card.title}
                excerpt={card.excerpt}
                href={card.href}
                highlighted={card.highlighted}
                imageUrl={card.imageUrl}
                date={card.date}
                readingTime={card.readTime}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
