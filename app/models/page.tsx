"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample model data
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
  {
    id: 3,
    name: "NexBot Industrial",
    image: "/placeholder.svg?height=400&width=400",
    description: "Heavy-duty model for industrial applications with enhanced strength and durability.",
    specs: {
      height: "2.1m",
      weight: "150kg",
      battery: "72 hours",
      processor: "Industrial Processing Unit",
      sensors: "Environmental Analysis, Structural Integrity, Hazard Detection",
    },
  },
  {
    id: 4,
    name: "NexBot Explorer",
    image: "/placeholder.svg?height=400&width=400",
    description: "Specialized for exploration in extreme environments with advanced navigation systems.",
    specs: {
      height: "1.7m",
      weight: "90kg",
      battery: "60 hours",
      processor: "Terrain Adaptive Processor",
      sensors: "Geological Analysis, Weather Prediction, Navigation Suite",
    },
  },
  {
    id: 5,
    name: "NexBot Micro",
    image: "/placeholder.svg?height=400&width=400",
    description: "Compact model for precision tasks and confined space operations.",
    specs: {
      height: "0.8m",
      weight: "30kg",
      battery: "24 hours",
      processor: "Compact Neural Engine",
      sensors: "Precision Optics, Micro-movement Detection",
    },
  },
  {
    id: 6,
    name: "NexBot Medical",
    image: "/placeholder.svg?height=400&width=400",
    description: "Specialized for healthcare with diagnostic capabilities and patient monitoring.",
    specs: {
      height: "1.6m",
      weight: "75kg",
      battery: "48 hours",
      processor: "Medical Analysis Core",
      sensors: "Vital Signs Monitoring, Diagnostic Imaging, Sterilization Verification",
    },
  },
]

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<(typeof models)[0] | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#050A1A] py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">Our Models</h1>
          <p className="mx-auto max-w-2xl text-xl text-[#D1D1D1]">
            Explore our range of advanced robotic models designed for various applications and environments.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
                className="group relative overflow-hidden border-[#66BFFF]/20 bg-[#0F2A5C]/30 backdrop-blur-sm transition-all hover:border-[#66BFFF] hover:shadow-[0_0_15px_rgba(102,191,255,0.3)]"
                onClick={() => setSelectedModel(model)}
              >
                <div className="aspect-square w-full overflow-hidden bg-[#0A1F44]/50 p-6">
                  <motion.img
                    src={model.image}
                    alt={model.name}
                    className="h-full w-full object-contain transition-transform group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A5C] to-transparent opacity-70"></div>
                </div>
                <CardContent className="relative z-10 p-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{model.name}</h3>
                  <p className="mb-4 text-[#D1D1D1]">{model.description}</p>
                  <Button
                    className="relative overflow-hidden bg-transparent text-[#66BFFF] before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#66BFFF] before:transition-transform hover:text-[#0A1F44] hover:before:translate-y-0"
                    onClick={() => setSelectedModel(model)}
                  >
                    View Details
                  </Button>
                </CardContent>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute inset-0 -z-10 bg-[#66BFFF] opacity-5 blur-xl"></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for model details */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            onClick={() => setSelectedModel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl border border-[#66BFFF]/30 bg-[#0F2A5C]/80 p-0 shadow-[0_0_25px_rgba(102,191,255,0.2)] backdrop-blur-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10 rounded-full bg-[#0A1F44]/50 p-2 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0A1F44]/80 hover:text-[#66BFFF]"
                onClick={() => setSelectedModel(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square bg-[#0A1F44]/50 p-8">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={selectedModel.image}
                    alt={selectedModel.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col p-8">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 text-3xl font-bold text-white"
                  >
                    {selectedModel.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 text-[#D1D1D1]"
                  >
                    {selectedModel.description}
                  </motion.p>

                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-3 text-xl font-semibold text-[#66BFFF]"
                  >
                    Specifications
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-6 space-y-3"
                  >
                    {Object.entries(selectedModel.specs).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex justify-between border-b border-[#66BFFF]/20 pb-2"
                      >
                        <span className="font-medium capitalize text-[#66BFFF]">{key}</span>
                        <span className="text-[#D1D1D1]">{value}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-auto"
                  >
                    <Button className="w-full bg-[#66BFFF] text-[#0A1F44] hover:bg-[#66BFFF]/80">Request Demo</Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

