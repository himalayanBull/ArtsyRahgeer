"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";

const siteImages = [
  { key: "hero-painting", label: "Homepage Hero", description: "Full-screen background on the landing page" },
  { key: "artist-portrait", label: "Artist Portrait", description: "Story page hero and about sections" },
  { key: "artist-studio", label: "Artist Studio", description: "Homepage about section" },
  { key: "childhood", label: "Childhood Photo", description: "Story page childhood section" },
  { key: "studio-process", label: "Studio Process", description: "Story page studio section" },
];

export default function SiteImagesPage() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetch("/api/site-images")
      .then((r) => r.json())
      .then(setImages);
  }, []);

  async function handleUpload(key: string, file: File) {
    setUploading(key);
    setSuccess(null);

    const formData = new FormData();
    formData.append("files", file);
    formData.append("key", key);

    const res = await fetch("/api/site-images", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setImages((prev) => ({ ...prev, [key]: data.url }));
      setSuccess(key);
      setTimeout(() => setSuccess(null), 3000);
    }
    setUploading(null);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl mb-2">Site Images</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Upload images for the homepage hero, artist story, and about sections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {siteImages.map((img) => (
          <div key={img.key} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-sm">{img.label}</h3>
                <p className="text-xs text-muted-foreground">{img.description}</p>
              </div>
              {success === img.key && (
                <span className="text-xs text-emerald-600 flex items-center gap-1">
                  <Check size={12} /> Updated
                </span>
              )}
            </div>

            <div className="relative aspect-video rounded-md overflow-hidden bg-muted mb-3">
              <Image
                src={images[img.key] || `/images/${img.key}.svg`}
                alt={img.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={(el) => { fileInputRefs.current[img.key] = el; }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(img.key, file);
                e.target.value = "";
              }}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={uploading === img.key}
              onClick={() => fileInputRefs.current[img.key]?.click()}
            >
              <Upload size={14} />
              {uploading === img.key ? "Uploading..." : "Replace Image"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
