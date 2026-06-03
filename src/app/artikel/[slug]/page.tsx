import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import detailIllustration from "../../../../assets/illustrations/illustration-medium.svg";
import {
  ActionButton,
  ArticleDetailFooter,
  InlineImage,
  SiteHeader,
} from "@/components/page-chrome";
import { blocksToParagraphs, excerptFromArticle } from "@/lib/articles";
import { formatArticleDate, formatReadTime } from "@/lib/format";
import { getArticleBySlug } from "@/lib/sanity";

export const dynamic = "force-dynamic";

const fallbackParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
];

const fallbackExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const title = article?.article ?? (slug === "tentang-gerkatin" ? "Tentang GERKATIN" : "Artikel");

  return {
    title,
    description: article ? excerptFromArticle(article, fallbackExcerpt) : fallbackExcerpt,
  };
}

export default async function ArticleInstancePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article && slug !== "tentang-gerkatin") {
    notFound();
  }

  const title = article?.article ?? "Tentang GERKATIN";
  const subtitle = article?.categoryName ?? "Artikel";
  const description = article ? excerptFromArticle(article, fallbackExcerpt) : fallbackExcerpt;
  const bodyParagraphs = blocksToParagraphs(article?.content ?? []);
  const contentParagraphs = bodyParagraphs.length > 0 ? bodyParagraphs : fallbackParagraphs;
  const heroImageUrl = article?.imageUrl;

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-8 sm:px-10 lg:px-[300px]">
        <article className="space-y-6 p-2">
          <header className="space-y-3">
            <p className="px-2 text-[16px] leading-none text-[#7c7c7c]">{subtitle}</p>
            <h1 className="px-1 text-[48px] font-bold leading-none tracking-tight text-[#111111]">
              {title}
            </h1>
            <p className="max-w-[760px] px-2 text-[14px] leading-[1.43] text-[#7c7c7c]">
              {description}
            </p>
            <p className="flex items-center gap-1 px-2 text-[12px] leading-none text-[#0000cc]">
              <span>{formatArticleDate(article?.date)}</span>
              <span>•</span>
              <span>{formatReadTime(article?.readingTime)}</span>
            </p>
          </header>

          <div className="relative h-[272px] overflow-hidden rounded-[32px] bg-[#0000cc]">
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 680px"
                priority
              />
            ) : (
              <InlineImage
                src={detailIllustration}
                alt={title}
                className="absolute right-0 top-[18px] h-[236px] w-auto max-w-[85%] object-contain pr-4"
              />
            )}
          </div>

          <div className="space-y-4">
            {contentParagraphs.slice(0, 3).map((paragraph, index) => (
              <p
                key={`${paragraph.slice(0, 24)}-${index}`}
                className="max-w-[760px] p-1 text-justify text-[16px] leading-[1.5] text-black"
              >
                {paragraph}
              </p>
            ))}

            <div className="h-[281px] w-full rounded-[16px] bg-[#c6c6c6]" aria-hidden />

            {contentParagraphs.slice(3).map((paragraph, index) => (
              <p
                key={`${paragraph.slice(0, 24)}-tail-${index}`}
                className="max-w-[760px] p-1 text-justify text-[16px] leading-[1.5] text-black"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-8 flex justify-end p-2.5">
          <ActionButton href="/" tone="dark" arrow>
            Kembali ke Beranda
          </ActionButton>
        </div>
      </main>

      <ArticleDetailFooter />
    </div>
  );
}
