import { createClient } from "@/lib/supabase/server";
import { ArtworkForm } from "@/components/admin/artwork-form";
import { placeholderCollections, placeholderTags } from "@/lib/placeholder-data";

export default async function NewArtworkPage() {
  const supabase = await createClient();
  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .order("name");

  const { data: tags } = await supabase
    .from("artwork_tags")
    .select("*")
    .order("name");

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Add New Artwork</h1>
      <ArtworkForm
        collections={collections || placeholderCollections}
        tags={tags || placeholderTags}
      />
    </div>
  );
}
