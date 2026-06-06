import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { placeholderCollections } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore curated collections of original paintings grouped by theme and inspiration.",
};

export default async function CollectionsPage() {
  const supabase = await createClient();
  const { data: collections } = await supabase
    .from("collections")
    .select("*, artworks:artworks(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Collections
          </p>
          <h1 className="font-serif text-4xl md:text-6xl">
            Curated Exhibitions
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Each collection is a journey through a theme — a curated experience
            that tells a story through carefully grouped paintings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(collections || placeholderCollections).map((collection: any) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={collection.cover_image || "/images/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h2 className="font-serif text-3xl text-white">
                    {collection.name}
                  </h2>
                  <p className="mt-2 text-sm text-white/80 max-w-md">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
