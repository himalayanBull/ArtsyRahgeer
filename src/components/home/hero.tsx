"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  siteImages?: Record<string, string>;
}

export function Hero({ siteImages }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={siteImages?.["hero-painting"] || "/images/hero-painting.svg"}
          alt="Featured artwork"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase mb-6 text-white/80"
        >
          Artsy Rahgeer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight"
        >
          Where Color
          <br />
          Meets Soul
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Each brushstroke carries a piece of my heart. Explore original
          paintings that tell stories of nature, emotion, and the invisible
          threads that connect us all.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/gallery">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 min-w-[200px]"
            >
              View Gallery
            </Button>
          </Link>
          <Link href="/story">
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 hover:text-white min-w-[200px]"
            >
              My Story
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-white/60" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
