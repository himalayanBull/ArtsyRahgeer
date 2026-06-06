"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CollectionActionsProps {
  collectionId: string;
}

export function CollectionActions({ collectionId }: CollectionActionsProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    const supabase = createClient();
    await supabase.from("collections").delete().eq("id", collectionId);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => router.push(`/admin/collections/${collectionId}`)}
        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Edit"
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={handleDelete}
        className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
