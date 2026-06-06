"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import type { Collection } from "@/types";

interface CollectionsPreviewProps {
  collections: Collection[];
}

export function CollectionsPreview({ collections }: CollectionsPreviewProps) {
  return (
    <Section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Curated Collections
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">
            Explore by Theme
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group block relative aspect-[16/9] rounded-lg overflow-hidden"
              >
                <Image
                  src={collection.cover_image || "/images/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="text-white">
                    <h3 className="font-serif text-2xl md:text-3xl">
                      {collection.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
