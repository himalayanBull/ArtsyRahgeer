"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import type { Artwork } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getThumbnailUrl } from "@/lib/image-utils";

interface FeaturedWorksProps {
  artworks: Artwork[];
}

export function FeaturedWorks({ artworks }: FeaturedWorksProps) {
  return (
    <Section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Featured Works
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Selected Pieces
            </h2>
          </div>
          <Link
            href="/gallery"
            className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, i) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/artwork/${artwork.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={getThumbnailUrl(artwork.images[0]?.image_url || "/images/placeholder.svg")}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {artwork.status === "sold" && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                      Sold
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
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
