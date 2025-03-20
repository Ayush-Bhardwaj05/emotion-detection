"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Database, FileText, Server, Users } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Data Collection",
    description: "Gathering data from college students and online datasets to train our AI models.",
    icon: FileText,
    color: "#66BFFF",
  },
  {
    id: 2,
    title: "Data Processing",
    description: "Cleaning and preprocessing data to ensure high quality training inputs.",
    icon: Database,
    color: "#66BFFF",
  },
  {
    id: 3,
    title: "Model Training",
    description: "Training advanced neural networks on our specialized hardware infrastructure.",
    icon: Server,
    color: "#66BFFF",
  },
  {
    id: 4,
    title: "User Testing",
    description: "Rigorous testing with real users to refine and improve our models.",
    icon: Users,
    color: "#66BFFF",
  },
]

export default function RoadmapSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="w-full py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Our Data Collection Process</h2>
          <p className="mx-auto max-w-2xl text-xl text-[#D1D1D1]">
            We follow a rigorous methodology to ensure our robots are trained on diverse, high-quality data.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="relative">
            {/* Connecting line */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#66BFFF]/80 via-[#66BFFF] to-[#66BFFF]/20"
            />

            {/* Steps */}
            <div className="space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                  className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 md:px-8">
                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(102, 191, 255, 0.2)" }}
                      transition={{ duration: 0.2 }}
                      className={`rounded-xl border border-[#66BFFF]/20 bg-[#0F2A5C]/30 p-8 backdrop-blur-sm ${
                        index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                      }`}
                    >
                      <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
                      <p className="text-lg text-[#D1D1D1]">{step.description}</p>
                    </motion.div>
                  </div>

                  <div className="absolute left-1/2 top-0 flex -translate-x-1/2 transform items-center justify-center md:relative md:left-auto md:top-auto md:translate-x-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.4 + index * 0.2 }}
                      className="relative flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="h-8 w-8 text-[#0A1F44]" />
                      {/* Glow effect */}
                      <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[#66BFFF] opacity-30 blur-md"></div>
                    </motion.div>
                  </div>

                  <div className="flex-1 md:px-8" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

