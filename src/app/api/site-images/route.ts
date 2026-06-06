import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), ".data", "site-images.json");

async function getImageMap(): Promise<Record<string, string>> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveImageMap(map: Record<string, string>) {
  const dir = path.dirname(DATA_FILE);
  await mkdir(dir, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(map, null, 2));
}

export async function GET() {
  const images = await getImageMap();
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

    const uploadDir = path.join(process.cwd(), "public", "uploads", "site");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${key}-${Date.now()}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const url = `/uploads/site/${filename}`;

    const images = await getImageMap();
    images[key] = url;
    await saveImageMap(images);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Site image upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
