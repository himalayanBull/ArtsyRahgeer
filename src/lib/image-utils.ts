const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export function getOptimizedUrl(
  url: string,
  options?: { width?: number; quality?: number }
): string {
  if (!url) return "/images/placeholder.svg";

  if (!url.includes("supabase.co/storage")) return url;

  const { width = 800, quality = 75 } = options || {};

  return url.replace(
    "/storage/v1/object/public/",
    `/storage/v1/render/image/public/`
  ) + `?width=${width}&quality=${quality}`;
}

export function getThumbnailUrl(url: string): string {
  return getOptimizedUrl(url, { width: 400, quality: 60 });
}

export function getFullUrl(url: string): string {
  return getOptimizedUrl(url, { width: 1200, quality: 80 });
}

export function getHeroUrl(url: string): string {
  return getOptimizedUrl(url, { width: 1920, quality: 80 });
}
