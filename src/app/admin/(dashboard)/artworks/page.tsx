import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ArtworkActions } from "@/components/admin/artwork-actions";
import { placeholderArtworks } from "@/lib/placeholder-data";

export default async function AdminArtworksPage() {
  const supabase = await createClient();
  const { data: dbArtworks } = await supabase
    .from("artworks")
    .select("*, images:artwork_images(*), collection:collections(name)")
    .order("created_at", { ascending: false });

  const artworks = dbArtworks || placeholderArtworks.map((a) => ({
    ...a,
    collection: a.collection ? { name: a.collection.name } : null,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Artworks</h1>
        <Link href="/admin/artworks/new">
          <Button className="gap-2">
            <Plus size={16} /> Add Artwork
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium">Artwork</th>
              <th className="text-left p-4 font-medium hidden md:table-cell">Collection</th>
              <th className="text-left p-4 font-medium hidden sm:table-cell">Price</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(artworks || []).map((artwork) => (
              <tr key={artwork.id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-muted shrink-0">
                      {artwork.images?.[0] && (
                        <Image
                          src={artwork.images[0].image_url}
                          alt={artwork.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{artwork.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {artwork.medium}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-muted-foreground">
                  {artwork.collection?.name || "—"}
                </td>
                <td className="p-4 hidden sm:table-cell">
                  {formatPrice(artwork.price, artwork.currency)}
                </td>
                <td className="p-4">
                  <Badge variant={artwork.status as "sold" | "reserved" | "available"}>
                    {artwork.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <ArtworkActions artworkId={artwork.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
