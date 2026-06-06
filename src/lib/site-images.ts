import { readFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), ".data", "site-images.json");

export async function getSiteImages(): Promise<Record<string, string>> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function resolveSiteImage(
  images: Record<string, string>,
  key: string
): string {
  return images[key] || `/images/${key}.svg`;
}
