import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArtworkDetail } from "@/components/artwork/artwork-detail";
import { placeholderArtworks } from "@/lib/placeholder-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: artwork } = await supabase
    .from("artworks")
    .select("title, description, images:artwork_images(image_url)")
    .eq("slug", slug)
    .single();

  const found = artwork || placeholderArtworks.find((a) => a.slug === slug);
  if (!found) return { title: "Artwork Not Found" };

  return {
    title: found.title,
    description: found.description,
    openGraph: {
      title: found.title,
      description: found.description,
    },
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: artwork } = await supabase
    .from("artworks")
    .select(
      "*, images:artwork_images(*), tags:artwork_tag_mapping(tag:artwork_tags(*)), collection:collections(*)"
    )
    .eq("slug", slug)
    .single();

  if (artwork) {
    const processedArtwork = {
      ...artwork,
      tags:
        artwork.tags?.map((t: { tag: { id: string; name: string } }) => t.tag) || [],
    };

    const { data: similarArtworks } = await supabase
      .from("artworks")
      .select("*, images:artwork_images(*)")
      .neq("id", artwork.id)
      .eq("collection_id", artwork.collection_id)
      .limit(4);

    return (
      <ArtworkDetail
        artwork={processedArtwork}
        similarArtworks={similarArtworks || []}
      />
    );
  }

  const placeholder = placeholderArtworks.find((a) => a.slug === slug);
  if (!placeholder) notFound();

  const similar = placeholderArtworks
    .filter((a) => a.collection_id === placeholder.collection_id && a.id !== placeholder.id)
    .slice(0, 4);

  return <ArtworkDetail artwork={placeholder} similarArtworks={similar} />;
}
