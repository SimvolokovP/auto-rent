export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (diffDays === -2) return `2 days ago`;
  if (diffDays === -1) return `Yesterday`;
  if (diffDays === 0) return `Today at ${hours}:${minutes}`;
  if (diffDays === 1) return `Tomorrow at ${hours}:${minutes}`;

  return `${day}.${month}.${year} at ${hours}:${minutes}`;
}
