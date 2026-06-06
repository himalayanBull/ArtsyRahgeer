"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { Artwork, Collection, Tag } from "@/types";

interface ArtworkFormProps {
  artwork?: Artwork;
  collections: Collection[];
  tags: Tag[];
}

export function ArtworkForm({ artwork, collections, tags }: ArtworkFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const isEditing = !!artwork;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  }

  function removePreview(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadFiles(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) return [];
    const { urls } = await res.json();
    return urls || [];
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const artworkData = {
      title,
      slug: slugify(title),
      description: formData.get("description") as string,
      story: formData.get("story") as string,
      price: parseFloat(formData.get("price") as string) || 0,
      currency: (formData.get("currency") as string) || "USD",
      medium: formData.get("medium") as string,
      height: parseFloat(formData.get("height") as string) || 0,
      width: parseFloat(formData.get("width") as string) || 0,
      depth: parseFloat(formData.get("depth") as string) || null,
      year_created: parseInt(formData.get("year_created") as string) || new Date().getFullYear(),
      status: formData.get("status") as string,
      featured: formData.get("featured") === "on",
      collection_id: (formData.get("collection_id") as string) || null,
    };

    let imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      imageUrls = await uploadFiles(imageFiles);
    }

    const supabase = createClient();
    let artworkId = artwork?.id;

    if (isEditing) {
      const { error } = await supabase.from("artworks").update(artworkData).eq("id", artworkId);
      if (error) {
        alert(`Failed to update: ${error.message}`);
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("artworks")
        .insert(artworkData)
        .select("id")
        .single();
      if (error) {
        alert(`Failed to create: ${error.message}`);
        setSaving(false);
        return;
      }
      artworkId = data?.id;
    }

    if (artworkId && imageUrls.length > 0) {
      const { error: deleteError } = await supabase
        .from("artwork_images")
        .delete()
        .eq("artwork_id", artworkId);

      if (deleteError) {
        console.error("Failed to delete old images:", deleteError.message);
      }

      for (let i = 0; i < imageUrls.length; i++) {
        const { error } = await supabase.from("artwork_images").insert({
          artwork_id: artworkId,
          image_url: imageUrls[i],
          display_order: i,
        });
        if (error) {
          alert(`Failed to save image: ${error.message}`);
        }
      }
    }

    setSaving(false);
    router.push("/admin/artworks");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Input
        id="title"
        name="title"
        label="Title"
        defaultValue={artwork?.title}
        required
      />

      <Textarea
        id="description"
        name="description"
        label="Description"
        defaultValue={artwork?.description}
      />

      <Textarea
        id="story"
        name="story"
        label="Story Behind The Piece"
        defaultValue={artwork?.story}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="price"
          name="price"
          label="Price"
          type="number"
          defaultValue={artwork?.price}
          required
        />
        <div className="space-y-2">
          <label htmlFor="currency" className="text-sm font-medium text-muted-foreground">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            defaultValue={artwork?.currency || "USD"}
            className="flex h-11 w-full rounded-md border border-border bg-transparent px-4 py-2 text-sm focus:border-foreground focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>

      <Input
        id="medium"
        name="medium"
        label="Medium"
        placeholder="e.g. Oil on Canvas"
        defaultValue={artwork?.medium}
        required
      />

      <div className="grid grid-cols-3 gap-4">
        <Input
          id="width"
          name="width"
          label="Width (cm)"
          type="number"
          defaultValue={artwork?.width}
          required
        />
        <Input
          id="height"
          name="height"
          label="Height (cm)"
          type="number"
          defaultValue={artwork?.height}
          required
        />
        <Input
          id="depth"
          name="depth"
          label="Depth (cm)"
          type="number"
          defaultValue={artwork?.depth || undefined}
        />
      </div>

      <Input
        id="year_created"
        name="year_created"
        label="Year Created"
        type="number"
        defaultValue={artwork?.year_created}
        required
      />

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium text-muted-foreground">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={artwork?.status || "available"}
          className="flex h-11 w-full rounded-md border border-border bg-transparent px-4 py-2 text-sm focus:border-foreground focus:outline-none"
        >
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="collection_id" className="text-sm font-medium text-muted-foreground">
          Collection
        </label>
        <select
          id="collection_id"
          name="collection_id"
          defaultValue={artwork?.collection_id || ""}
          className="flex h-11 w-full rounded-md border border-border bg-transparent px-4 py-2 text-sm focus:border-foreground focus:outline-none"
        >
          <option value="">None</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={artwork?.featured}
          className="h-4 w-4 rounded border-border"
        />
        <label htmlFor="featured" className="text-sm">
          Featured artwork (shown on homepage)
        </label>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">
          Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium file:cursor-pointer cursor-pointer"
        />
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {previews.map((url, i) => (
              <div key={i} className="relative w-24 h-24 rounded-md overflow-hidden bg-muted">
                <Image
                  src={url}
                  alt={`Preview ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                <button
                  type="button"
                  onClick={() => removePreview(i)}
                  className="absolute top-1 right-1 p-0.5 bg-black/60 rounded-full text-white hover:bg-black/80"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        {artwork?.images && artwork.images.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Current images:</p>
            <div className="flex flex-wrap gap-3">
              {artwork.images.map((img) => (
                <div key={img.id} className="relative w-24 h-24 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={img.image_url}
                    alt="Current"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Saving..." : isEditing ? "Update Artwork" : "Create Artwork"}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
