"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The painting arrived and it took my breath away. The colors are even more vibrant in person. It transformed our entire living room.",
    author: "Sarah Mitchell",
    role: "Collector, New York",
  },
  {
    quote:
      "I commissioned a piece for our anniversary and the result was beyond anything I imagined. It perfectly captured the emotion I described.",
    author: "James Worthington",
    role: "Private Collector",
  },
  {
    quote:
      "Each brushstroke tells a story. Owning one of these originals feels like having a piece of pure emotion hanging on your wall.",
    author: "Elena Rodriguez",
    role: "Art Curator",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">
            Words from Collectors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-lg p-8 border"
            >
              <Quote className="text-muted-foreground/30 mb-4" size={32} />
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
