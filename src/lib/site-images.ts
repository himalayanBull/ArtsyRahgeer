import { createClient } from "@/lib/supabase/server";

export async function getSiteImages(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_images").select("key, image_url");

  const images: Record<string, string> = {};
  if (data) {
    data.forEach((row: { key: string; image_url: string }) => {
      images[row.key] = row.image_url;
    });
  }
  return images;
}
