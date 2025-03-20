"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const models = [
  {
    id: 1,
    name: "NexBot Alpha",
    image: "/placeholder.svg?height=400&width=400",
    description: "Our flagship model with advanced AI capabilities and human-like interaction patterns.",
    specs: {
      height: "1.8m",
      weight: "85kg",
      battery: "48 hours",
      processor: "Quantum Neural Network",
      sensors: "Advanced LiDAR, Thermal, Proximity",
    },
  },
  {
    id: 2,
    name: "NexBot Companion",
    image: "/placeholder.svg?height=400&width=400",
    description: "Designed for home assistance with a focus on elderly care and daily task management.",
    specs: {
      height: "1.5m",
      weight: "65kg",
      battery: "36 hours",
      processor: "Adaptive Neural Core",
      sensors: "Facial Recognition, Voice Analysis, Touch",
    },
  },
]

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<(typeof models)[0] | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#050A1A] py-24 flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">Our Models</h1>
        <p className="mx-auto max-w-2xl text-xl text-[#D1D1D1]">Explore our range of advanced emotion detection models.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {models.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <Card
              className="group relative w-[320px] h-[450px] flex flex-col overflow-hidden border-[#66BFFF]/20 bg-[#0F2A5C]/30 backdrop-blur-sm transition-all hover:border-[#66BFFF] hover:shadow-[0_0_15px_rgba(102,191,255,0.3)]"
              onClick={() => setSelectedModel(model)}
            >
              <div className="aspect-square w-full bg-[#0A1F44]/50 p-4 flex items-center justify-center">
                <motion.img
                  src={model.image}
                  alt={model.name}
                  className="h-full w-full object-contain transition-transform group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <CardContent className="relative z-10 p-4 flex flex-col grow">
                <h3 className="mb-2 text-lg font-bold text-white">{model.name}</h3>
                <p className="mb-3 text-sm text-[#D1D1D1] line-clamp-3">{model.description}</p>
                {/* <div className="mt-auto">
                  <Button
                    className="relative overflow-hidden bg-transparent text-[#66BFFF] before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#66BFFF] before:transition-transform hover:text-[#0A1F44] hover:before:translate-y-0"
                    onClick={() => setSelectedModel(model)}
                  >
                    View Details
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
