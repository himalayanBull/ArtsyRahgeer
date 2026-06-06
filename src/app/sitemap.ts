import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atelier-art.com";

  const { data: artworks } = await supabase
    .from("artworks")
    .select("slug, created_at");

  const { data: collections } = await supabase
    .from("collections")
    .select("slug, created_at");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/story`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/commission`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const artworkRoutes: MetadataRoute.Sitemap = (artworks || []).map((a) => ({
    url: `${baseUrl}/artwork/${a.slug}`,
    lastModified: new Date(a.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = (collections || []).map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(c.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...artworkRoutes, ...collectionRoutes];
}
