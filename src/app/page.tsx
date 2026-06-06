import { Hero } from "@/components/home/hero";
import { FeaturedWorks } from "@/components/home/featured-works";
import { AboutPreview } from "@/components/home/about-preview";
import { CollectionsPreview } from "@/components/home/collections-preview";
import { Testimonials } from "@/components/home/testimonials";
import { CTA } from "@/components/home/cta";
import { createClient } from "@/lib/supabase/server";
import { getSiteImages } from "@/lib/site-images";
import { placeholderArtworks, placeholderCollections } from "@/lib/placeholder-data";

export default async function HomePage() {
  const supabase = await createClient();
  const siteImages = await getSiteImages();

  const { data: featuredArtworks } = await supabase
    .from("artworks")
    .select("*, images:artwork_images(*), tags:artwork_tag_mapping(tag:artwork_tags(*))")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  const artworks = featuredArtworks
    ? featuredArtworks.map((a) => ({
        ...a,
        tags: a.tags?.map((t: { tag: { id: string; name: string } }) => t.tag) || [],
      }))
    : placeholderArtworks.filter((a) => a.featured);

  return (
    <>
      <Hero siteImages={siteImages} />
      <FeaturedWorks artworks={artworks} />
      <CollectionsPreview collections={collections || placeholderCollections} />
      <AboutPreview siteImages={siteImages} />
      <Testimonials />
      <CTA />
    </>
  );
}
