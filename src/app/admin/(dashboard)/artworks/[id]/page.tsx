import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArtworkForm } from "@/components/admin/artwork-form";
import { placeholderArtworks, placeholderCollections, placeholderTags } from "@/lib/placeholder-data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArtworkPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: artwork } = await supabase
    .from("artworks")
    .select("*, images:artwork_images(*), tags:artwork_tag_mapping(tag:artwork_tags(*))")
    .eq("id", id)
    .single();

  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .order("name");

  const { data: tags } = await supabase
    .from("artwork_tags")
    .select("*")
    .order("name");

  let processedArtwork;
  if (artwork) {
    processedArtwork = {
      ...artwork,
      tags: artwork.tags?.map((t: { tag: { id: string; name: string } }) => t.tag) || [],
    };
  } else {
    const placeholder = placeholderArtworks.find((a) => a.id === id);
    if (!placeholder) notFound();
    processedArtwork = placeholder;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Edit Artwork</h1>
      <ArtworkForm
        artwork={processedArtwork}
        collections={collections || placeholderCollections}
        tags={tags || placeholderTags}
      />
    </div>
  );
}
