"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import RoadmapSection from "@/components/roadmap-section"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

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
            title="NexBot 3D Model"
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
           Meet Echo
            <span className="ml-2 text-[#66BFFF]">Robotics</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            {/* <Button asChild size="lg" className="bg-[#66BFFF] text-[#0A1F44] hover:bg-[#66BFFF]/80">
              <Link href="/models">
                Explore Models <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#66BFFF] text-[#66BFFF] hover:bg-[#66BFFF]/10"
            >
              <Link href="/explore">Explore Voice AI</Link>
            </Button>
          </div>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A1A] to-transparent opacity-80"></div>
      </section>

      {/* Roadmap Section */}
      <RoadmapSection />
    </div>
  )
}

