"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RoadmapSection from "@/components/roadmap-section";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative flex flex-col">
      {/* Hero Section with 3D Robot */}
      <section className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ opacity, scale }}
          className="absolute inset-0 z-10"
        >
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-5e50b3339fddca3d56a0a0e7943ef3c0/"
            frameBorder="0"
            width="100%"
            height="100%"
            title="VibeSense"
            className="h-full w-full"
          ></iframe>
        </motion.div>

        {/* Overlay text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-16 left-0 z-20 w-full px-6 text-center md:bottom-24 md:px-12"
        >
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Meet Vibe
            <span className="ml-2 text-[#66BFFF]">Sense</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#66BFFF] text-[#66BFFF] hover:bg-[#66BFFF]/10"
            >
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] shadow-xl transition-all duration-300"
              >
                <Link href="/explore">Try Voice AI</Link>
              </motion.button>
            </Button>
          </div>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A1A] to-transparent opacity-80"></div>
      </section>

      {/* Roadmap Section */}
      <RoadmapSection />
    </div>
  );
}
