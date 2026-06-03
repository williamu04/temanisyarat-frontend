import Image from "next/image";

import defaultArticleImage from "../../assets/web/images/mobile-ui-artikel.webp";
import { formatArticleDate, formatReadTime } from "@/lib/format";
import { InlineImage, SmartLink } from "@/components/page-chrome";

export type ArticleCardProps = {
  title: string;
  excerpt: string;
  href: string;
  highlighted?: boolean;
  imageUrl?: string;
  date?: string;
  readingTime?: number;
};

export function ArticleCard({
  title,
  excerpt,
  href,
  highlighted = false,
  imageUrl,
  date,
  readingTime,
}: ArticleCardProps) {
  const cardClassName = highlighted
    ? "bg-[#05059e] text-[#eeeeee]"
    : "bg-[#e5e8fa] text-[#111111] hover:-translate-y-1";
  const descriptionClassName = highlighted ? "text-[#eeeeee]" : "text-[#111111]";

  return (
    <SmartLink
      href={href}
      className={`block rounded-[32px] p-8 transition-transform ${cardClassName}`}
    >
      <article className="space-y-6">
        <h3 className="text-[32px] font-semibold leading-none">{title}</h3>

        <div className="relative h-[213px] overflow-hidden rounded-[24px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="rounded-[24px] object-cover"
              sizes="(max-width: 768px) 100vw, 358px"
            />
          ) : (
            <InlineImage
              src={defaultArticleImage}
              alt={title}
              className="h-full w-full rounded-[24px] object-cover"
            />
          )}
        </div>

        <p className={`text-[14px] leading-[1.5] ${descriptionClassName}`}>{excerpt}</p>

        <div
          className={`flex items-center gap-1 text-[16px] leading-[1.5] tracking-[0.6px] ${descriptionClassName}`}
        >
          <span>{formatArticleDate(date)}</span>
          <span>•</span>
          <span>{formatReadTime(readingTime)}</span>
        </div>
      </article>
    </SmartLink>
  );
}
