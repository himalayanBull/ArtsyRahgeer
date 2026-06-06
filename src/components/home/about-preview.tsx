"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

interface AboutPreviewProps {
  siteImages?: Record<string, string>;
}

export function AboutPreview({ siteImages }: AboutPreviewProps) {
  return (
    <Section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-lg overflow-hidden"
          >
            <Image
              src={siteImages?.["artist-studio"] || "/images/artist-studio.svg"}
              alt="Artist in studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Pragya Shah
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">
              Where Nature
              <br />
              Meets Canvas
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A self-taught visual artist from Uttarakhand, I draw deep
                inspiration from the natural rhythms and movements found in
                nature, animals, and my environment. My work reflects a
                fascination with life&apos;s dynamism.
              </p>
              <p>
                Through expressive poses, motion lines, and plays of light and
                shadow, I seek to capture the energy of the world around us —
                the changing light in a forest at sunset, the grace of animals
                in motion.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/story">
                <Button variant="outline" size="lg">
                  Read My Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
