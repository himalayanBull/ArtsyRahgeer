import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { placeholderCollections, placeholderArtworks } from "@/lib/placeholder-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("collections")
    .select("name, description")
    .eq("slug", slug)
    .single();

  const found = data || placeholderCollections.find((c) => c.slug === slug);
  if (!found) return { title: "Collection Not Found" };
  return { title: found.name, description: found.description };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: collection } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

  const resolvedCollection = collection || placeholderCollections.find((c) => c.slug === slug);
  if (!resolvedCollection) notFound();

  let artworks;
  if (collection) {
    const { data } = await supabase
      .from("artworks")
      .select("*, images:artwork_images(*)")
      .eq("collection_id", collection.id)
      .order("created_at", { ascending: false });
    artworks = data || [];
  } else {
    artworks = placeholderArtworks.filter(
      (a) => a.collection_id === resolvedCollection.id
    );
  }

  return (
    <div className="pt-20">
      <div className="relative h-[50vh] min-h-[400px] flex items-end">
        <Image
          src={resolvedCollection.cover_image || "/images/placeholder.svg"}
          alt={resolvedCollection.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-12 w-full">
          <p className="text-sm tracking-[0.2em] uppercase text-white/70 mb-2">
            Collection
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">
            {resolvedCollection.name}
          </h1>
          <p className="mt-4 text-white/80 max-w-xl">
            {resolvedCollection.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork: any) => (
            <Link
              key={artwork.id}
              href={`/artwork/${artwork.slug}`}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={
                    artwork.images?.[0]?.image_url || "/images/placeholder.svg"
                  }
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {artwork.status !== "available" && (
                  <div className="absolute top-3 left-3">
                    <Badge variant={artwork.status}>{artwork.status}</Badge>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-medium group-hover:opacity-70 transition-opacity">
                  {artwork.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {artwork.medium} &middot; {artwork.year_created}
                </p>
                <p className="text-sm font-medium">
                  {formatPrice(artwork.price, artwork.currency)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
