"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/layout/section";

interface StoryContentProps {
  siteImages?: Record<string, string>;
}

function img(siteImages: Record<string, string> | undefined, key: string) {
  return siteImages?.[key] || `/images/${key}.svg`;
}

const timeline = [
  { year: "1997", title: "Born in Uttarakhand", description: "Born amidst the breathtaking landscapes of Uttarakhand, surrounded by mountains, forests, and the raw beauty of nature that would shape my artistic vision." },
  { year: "2015", title: "Self-Taught Beginnings", description: "Started my journey as a self-taught visual artist, drawing deep inspiration from the natural rhythms and movements found in nature and animals." },
  { year: "2020", title: "Fine Arts at Subharti University", description: "Began my B.A. in Fine Arts at Swami Vivekanand Subharti University, formally training while continuing to develop my unique expressive style." },
  { year: "2023", title: "Graduated in Fine Arts", description: "Completed my B.A. in Fine Arts, alongside B.A. (Hons.) and M.A. in Political Science from Delhi University — blending art with a broader understanding of society." },
  { year: "2024", title: "Lalit Kala Akademi — First Place", description: "Earned first place at the Lalit Kala Akademi in Jaipur, Rajasthan for exceptional ink drawing. Participated in the PADAV Art Mentorship Program by Bangani Art Foundation." },
  { year: "2024", title: "Wall Murals & Public Art", description: "Completed wall mural projects centered on women's empowerment in Haldwani, Nainital, and Dehradun. Led the G20 Wall Mural project in Ramnagar." },
  { year: "2025", title: "Teaching & Growing", description: "Conducting workshops on printmaking and art literacy at Graphic Era Hill University and G.B. Pant University. Continuing to evolve and inspire through art." },
];

export function StoryContent({ siteImages }: StoryContentProps) {
  return (
    <div className="pt-20">
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={img(siteImages, "artist-portrait")}
          alt="Pragya Shah - Artsy Rahgeer"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-6"
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4 text-white/70">
            Pragya Shah
          </p>
          <h1 className="font-serif text-5xl md:text-7xl">Artsy Rahgeer</h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
            Capturing the essence of life, nature, and the dynamic world through art.
          </p>
        </motion.div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Rooted in Nature
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Growing up in Uttarakhand, I was surrounded by mountains,
                  rivers, and forests that spoke in color and movement. Nature
                  was my first teacher — showing me how light dances through
                  leaves, how animals move with purpose and grace.
                </p>
                <p>
                  As a self-taught visual artist, I draw deep inspiration from
                  the natural rhythms and movements found in my environment.
                  Every brushstroke carries the energy of the world I observe.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted"
            >
              <Image
                src={img(siteImages, "childhood")}
                alt="Early artistic beginnings in Uttarakhand"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-center">
            Creative Philosophy
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-center">
            <p>
              My work reflects a fascination with life&apos;s dynamism —
              conveyed through expressive poses, motion lines, and techniques
              that capture a sense of speed and direction. I seek to translate
              the energy I feel in nature onto canvas.
            </p>
            <p>
              I skillfully play with light and shadow, creating depth and the
              illusion of motion reminiscent of the changing light in a forest
              at sunset. Each piece is an attempt to freeze a moment of
              movement while keeping its energy alive.
            </p>
          </div>
          <div className="mt-12 text-center">
            <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground/80">
              &ldquo;Through my art, I hope to inspire others — capturing the
              essence of life, nature, and the dynamic world around us.&rdquo;
            </blockquote>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center">
            The Journey
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {timeline.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block flex-1" />
                <div className="relative z-10 w-8 h-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.year}
                  </p>
                  <h3 className="text-lg font-medium mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted"
            >
              <Image
                src={img(siteImages, "studio-process")}
                alt="Pragya at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Beyond the Canvas
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  My work extends beyond personal practice into public art and
                  education. I&apos;ve completed wall murals centered on
                  women&apos;s empowerment across Haldwani, Nainital, and
                  Dehradun — using public art as a vehicle for social change.
                </p>
                <p>
                  As an art educator, I conduct workshops on printmaking and art
                  literacy at institutions like Graphic Era Hill University and
                  G.B. Pant University. Teaching allows me to share the joy of
                  creation with the next generation.
                </p>
                <p>
                  My journey is one of continuous evolution — each piece infused
                  with the vibrancy and energy that inspire me every day.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
