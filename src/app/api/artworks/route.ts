import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { placeholderArtworks } from "@/lib/placeholder-data";

const DATA_DIR = path.join(process.cwd(), ".data");
const ARTWORKS_FILE = path.join(DATA_DIR, "artworks.json");

async function getArtworks() {
  try {
    const data = await readFile(ARTWORKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [...placeholderArtworks];
  }
}

async function saveArtworks(artworks: any[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(ARTWORKS_FILE, JSON.stringify(artworks, null, 2));
}

export async function GET() {
  const artworks = await getArtworks();
  return NextResponse.json(artworks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const artworks = await getArtworks();

  const newArtwork = {
    ...body,
    id: `a${Date.now()}`,
    created_at: new Date().toISOString(),
    images: body.images || [],
    tags: body.tags || [],
  };

  artworks.unshift(newArtwork);
  await saveArtworks(artworks);
  return NextResponse.json(newArtwork);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const artworks = await getArtworks();

  const index = artworks.findIndex((a: any) => a.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  artworks[index] = { ...artworks[index], ...body };
  await saveArtworks(artworks);
  return NextResponse.json(artworks[index]);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let artworks = await getArtworks();
  artworks = artworks.filter((a: any) => a.id !== id);
  await saveArtworks(artworks);
  return NextResponse.json({ success: true });
}
