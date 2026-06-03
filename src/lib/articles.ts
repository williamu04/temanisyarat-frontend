import type { SanityArticle } from "@/lib/sanity";

export function excerptFromArticle(article: SanityArticle, fallback: string) {
  const textBlocks =
    article.content?.flatMap((block) => block.children?.map((child) => child.text ?? "") ?? []) ?? [];
  const text = textBlocks.join(" ").trim();

  if (!text) {
    return fallback;
  }

  return text.length > 120 ? `${text.slice(0, 117).trimEnd()}...` : text;
}

export function blocksToParagraphs(blocks: Array<{ children?: Array<{ text?: string }> }>) {
  return blocks
    .map((block) => block.children?.map((child) => child.text ?? "").join(" ").trim())
    .filter((value): value is string => Boolean(value));
}
