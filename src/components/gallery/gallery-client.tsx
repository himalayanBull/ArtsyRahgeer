"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { getThumbnailUrl } from "@/lib/image-utils";
import type { Artwork, Collection, Tag } from "@/types";

interface GalleryClientProps {
  artworks: Artwork[];
  collections: Collection[];
  tags: Tag[];
}

export function GalleryClient({
  artworks,
  collections,
  tags,
}: GalleryClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedMedium, setSelectedMedium] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const mediums = useMemo(
    () => [...new Set(artworks.map((a) => a.medium))].sort(),
    [artworks]
  );

  const filtered = useMemo(() => {
    return artworks.filter((artwork) => {
      if (
        search &&
        !artwork.title.toLowerCase().includes(search.toLowerCase()) &&
        !artwork.description?.toLowerCase().includes(search.toLowerCase()) &&
        !artwork.tags?.some((t) =>
          t.name.toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return false;
      }
      if (selectedCollection && artwork.collection_id !== selectedCollection)
        return false;
      if (selectedMedium && artwork.medium !== selectedMedium) return false;
      if (selectedStatus && artwork.status !== selectedStatus) return false;
      return true;
    });
  }, [artworks, search, selectedCollection, selectedMedium, selectedStatus]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCollection(null);
    setSelectedMedium(null);
    setSelectedStatus(null);
  };

  const hasActiveFilters =
    search || selectedCollection || selectedMedium || selectedStatus;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-md border border-border bg-transparent text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
        </Button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="p-6 rounded-lg border bg-card space-y-6">
              <div>
                <p className="text-sm font-medium mb-3">Collection</p>
                <div className="flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <button
                      key={c.id}
                      onClick={() =>
                        setSelectedCollection(
                          selectedCollection === c.id ? null : c.id
                        )
                      }
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                        selectedCollection === c.id
                          ? "bg-foreground text-background border-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Medium</p>
                <div className="flex flex-wrap gap-2">
                  {mediums.map((m) => (
                    <button
                      key={m}
                      onClick={() =>
                        setSelectedMedium(selectedMedium === m ? null : m)
                      }
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                        selectedMedium === m
                          ? "bg-foreground text-background border-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Availability</p>
                <div className="flex flex-wrap gap-2">
                  {["available", "sold", "reserved"].map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        setSelectedStatus(selectedStatus === s ? null : s)
                      }
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors capitalize ${
                        selectedStatus === s
                          ? "bg-foreground text-background border-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 ml-2"
          >
            <X size={12} /> Clear filters
          </button>
        </div>
      )}

      <div className="masonry-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((artwork) => (
            <motion.div
              key={artwork.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/artwork/${artwork.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={getThumbnailUrl(
                      artwork.images[0]?.image_url || "/images/placeholder.svg"
                    )}
                    alt={artwork.title}
                    width={600}
                    height={
                      600 *
                      ((artwork.height || 4) / (artwork.width || 3))
                    }
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {artwork.status !== "available" && (
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          artwork.status as "sold" | "reserved" | "available"
                        }
                      >
                        {artwork.status}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-medium group-hover:opacity-70 transition-opacity">
                    {artwork.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {artwork.medium} &middot; {artwork.width}&times;
                    {artwork.height} cm
                  </p>
                  <p className="text-sm">
                    {formatPrice(artwork.price, artwork.currency)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-muted-foreground">
            No artworks match your filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
