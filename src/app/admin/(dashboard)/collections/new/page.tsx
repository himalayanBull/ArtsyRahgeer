"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";

export default function NewCollectionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const supabase = createClient();

    const coverFile = (formData.get("cover_image") as File);
    let coverUrl = "";

    if (coverFile && coverFile.size > 0) {
      const path = `collections/${Date.now()}-${coverFile.name}`;
      const { data } = await supabase.storage
        .from("artwork-images")
        .upload(path, coverFile);
      if (data) {
        const { data: urlData } = supabase.storage
          .from("artwork-images")
          .getPublicUrl(path);
        coverUrl = urlData.publicUrl;
      }
    }

    await supabase.from("collections").insert({
      name,
      slug: slugify(name),
      description: formData.get("description") as string,
      cover_image: coverUrl || null,
    });

    setSaving(false);
    router.push("/admin/collections");
    router.refresh();
  }

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">New Collection</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <Input id="name" name="name" label="Collection Name" required />
        <Textarea
          id="description"
          name="description"
          label="Description"
          placeholder="Describe this collection..."
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Cover Image
          </label>
          <input
            type="file"
            name="cover_image"
            accept="image/*"
            className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? "Creating..." : "Create Collection"}
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
    </div>
  );
}
