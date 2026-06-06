import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CollectionActions } from "@/components/admin/collection-actions";

export default async function AdminCollectionsPage() {
  const supabase = await createClient();
  const { data: collections } = await supabase
    .from("collections")
    .select("*, artworks:artworks(count)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Collections</h1>
        <Link href="/admin/collections/new">
          <Button className="gap-2">
            <Plus size={16} /> New Collection
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(collections || []).map((collection: any) => (
          <div key={collection.id} className="border rounded-lg overflow-hidden">
            <div className="relative aspect-video bg-muted">
              {collection.cover_image && (
                <Image
                  src={collection.cover_image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium">{collection.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {collection.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {collection.artworks?.[0]?.count || 0} artworks
                </span>
                <CollectionActions collectionId={collection.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
