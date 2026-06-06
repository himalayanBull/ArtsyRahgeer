import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { GalleryClient } from "@/components/gallery/gallery-client";
import { placeholderArtworks, placeholderCollections, placeholderTags } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the complete collection of original canvas paintings. Filter by medium, collection, size, and price.",
};

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: artworks } = await supabase
    .from("artworks")
    .select(
      "*, images:artwork_images(*), tags:artwork_tag_mapping(tag:artwork_tags(*)), collection:collections(*)"
    )
    .order("created_at", { ascending: false });

  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .order("name");

  const { data: tags } = await supabase
    .from("artwork_tags")
    .select("*")
    .order("name");

  const processedArtworks = artworks
    ? artworks.map((a) => ({
        ...a,
        tags:
          a.tags?.map((t: { tag: { id: string; name: string } }) => t.tag) || [],
      }))
    : placeholderArtworks;

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Gallery
          </p>
          <h1 className="font-serif text-4xl md:text-6xl">All Works</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Explore the complete collection. Each painting is an original,
            one-of-a-kind creation.
          </p>
        </div>

        <GalleryClient
          artworks={processedArtworks}
          collections={collections || placeholderCollections}
          tags={tags || placeholderTags}
        />
      </div>
    </div>
  );
}
