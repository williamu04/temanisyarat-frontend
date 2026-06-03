export function formatArticleDate(date?: string) {
  if (!date) {
    return "Today";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Today";
  }

  const today = new Date();
  const isSameDay =
    parsed.getFullYear() === today.getFullYear() &&
    parsed.getMonth() === today.getMonth() &&
    parsed.getDate() === today.getDate();

  if (isSameDay) {
    return "Today";
  }

  return parsed.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatReadTime(minutes?: number) {
  const value = minutes && minutes > 0 ? minutes : 3;
  return `${value} min read`;
}
