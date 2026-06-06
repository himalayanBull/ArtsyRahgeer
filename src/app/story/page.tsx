import type { Metadata } from "next";
import { StoryContent } from "@/components/story/story-content";
import { getSiteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Artist Story",
  description:
    "The journey of a canvas painter — from childhood curiosity to professional artist. Discover the inspirations, philosophy, and creative process behind each painting.",
};

export default async function StoryPage() {
  const siteImages = await getSiteImages();
  return <StoryContent siteImages={siteImages} />;
}
