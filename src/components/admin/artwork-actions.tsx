"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ArtworkActionsProps {
  artworkId: string;
}

export function ArtworkActions({ artworkId }: ArtworkActionsProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    const supabase = createClient();
    await supabase.from("artworks").delete().eq("id", artworkId);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() => router.push(`/admin/artworks/${artworkId}`)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Edit"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={handleDelete}
        className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
