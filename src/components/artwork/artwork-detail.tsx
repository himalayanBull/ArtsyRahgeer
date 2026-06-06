"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Share2, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import type { Artwork } from "@/types";

interface ArtworkDetailProps {
  artwork: Artwork;
  similarArtworks: Artwork[];
}

export function ArtworkDetail({ artwork, similarArtworks }: ArtworkDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [liked, setLiked] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const inCart = items.some((i) => i.artwork.id === artwork.id);

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: artwork.title, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  }

  const currentImage =
    artwork.images[selectedImage]?.image_url || "/images/placeholder.svg";

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted cursor-zoom-in"
              onClick={() => setZoomed(true)}
            >
              <Image
                src={currentImage}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/80 rounded-full backdrop-blur-sm">
                <ZoomIn size={16} />
              </div>
            </div>

            {artwork.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {artwork.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      i === selectedImage
                        ? "border-foreground"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.image_url}
                      alt={`${artwork.title} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="flex items-start justify-between">
              <div>
                {artwork.collection && (
                  <Link
                    href={`/collections/${artwork.collection.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {artwork.collection.name}
                  </Link>
                )}
                <h1 className="font-serif text-3xl md:text-4xl mt-2">
                  {artwork.title}
                </h1>
              </div>
              <Badge variant={artwork.status as "sold" | "reserved" | "available"}>
                {artwork.status}
              </Badge>
            </div>

            <p className="mt-6 text-2xl font-light">
              {formatPrice(artwork.price, artwork.currency)}
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground">Medium</p>
                  <p>{artwork.medium}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Year</p>
                  <p>{artwork.year_created}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Dimensions</p>
                  <p>
                    {artwork.width} &times; {artwork.height}
                    {artwork.depth ? ` × ${artwork.depth}` : ""} cm
                  </p>
                </div>
              </div>
            </div>

            {artwork.description && (
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-2">About This Piece</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}

            {artwork.story && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">
                  Story Behind The Piece
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {artwork.story}
                </p>
              </div>
            )}

            {artwork.tags && artwork.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <Badge key={tag.id}>{tag.name}</Badge>
                ))}
              </div>
            )}

            <div className="mt-10 flex gap-3">
              {artwork.status === "available" && (
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={() => addItem(artwork)}
                  disabled={inCart}
                >
                  <ShoppingBag size={18} />
                  {inCart ? "In Cart" : "Add to Cart"}
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                aria-label="Add to wishlist"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-500 border-red-200" : ""}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </Button>
              <Button size="lg" variant="outline" aria-label="Share" onClick={handleShare}>
                <Share2 size={18} />
              </Button>
            </div>

            {artwork.status !== "available" && (
              <div className="mt-4">
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full">
                    Inquire About This Piece
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {similarArtworks.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-2xl mb-8">Similar Works</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarArtworks.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/artwork/${similar.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={
                        similar.images?.[0]?.image_url ||
                        "/images/placeholder.svg"
                      }
                      alt={similar.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium group-hover:opacity-70 transition-opacity">
                    {similar.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <Image
            src={currentImage}
            alt={artwork.title}
            fill
            className="object-contain p-8"
            sizes="100vw"
          />
        </div>
      )}
    </div>
  );
}
