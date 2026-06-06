import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export async function GET() {
  const supabase = supabaseAdmin();
  const { data } = await supabase.from("site_images").select("key, image_url");

  const images: Record<string, string> = {};
  if (data) {
    data.forEach((row) => {
      images[row.key] = row.image_url;
    });
  }
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("files") as File;
    const key = formData.get("key") as string;

    if (!file || !key) {
      return NextResponse.json({ error: "Missing file or key" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    const ext = file.name.split(".").pop() || "jpg";
    const filePath = `site/${key}-${Date.now()}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("artwork-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("artwork-images")
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    await supabase.from("site_images").upsert(
      { key, image_url: imageUrl, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Site image upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
