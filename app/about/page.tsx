"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Sample team data
const team = [
  {
    id: 1,
    name: "Dr. Alex Morgan",
    role: "Chief Robotics Engineer",
    image: "/placeholder.svg?height=500&width=500",
    bio: "With over 15 years of experience in robotics and AI, Dr. Morgan leads our technical development team.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "alex@nexbot.com",
    },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "AI Research Director",
    image: "/placeholder.svg?height=500&width=500",
    bio: "Sarah specializes in neural networks and machine learning algorithms that power our robots' decision-making capabilities.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "sarah@nexbot.com",
    },
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Hardware Design Lead",
    image: "/placeholder.svg?height=500&width=500",
    bio: "James brings expertise in mechanical engineering and industrial design to create our robots' physical forms.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "james@nexbot.com",
    },
  },
  {
    id: 4,
    name: "Maya Patel",
    role: "UX/UI Designer",
    image: "/placeholder.svg?height=500&width=500",
    bio: "Maya ensures our robots' interfaces are intuitive and accessible for all users, regardless of technical background.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "maya@nexbot.com",
    },
  },
]

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#050A1A] py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">About Us</h1>
          <p className="mx-auto max-w-3xl text-xl text-[#D1D1D1]">
            We are a team of passionate engineers, designers, and AI specialists dedicated to creating the next
            generation of advanced robotics solutions.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="mb-24">
          <h2 className="mb-12 text-center text-4xl font-bold text-[#66BFFF]">Our Team</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <motion.div
                key={member.id}
                variants={item}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card className="relative h-full overflow-hidden border-[#66BFFF]/20 bg-[#0F2A5C]/30 backdrop-blur-sm transition-all hover:border-[#66BFFF] hover:shadow-[0_0_20px_rgba(102,191,255,0.3)]">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A5C] via-[#0F2A5C]/70 to-transparent opacity-80"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <h3 className="mb-1 text-2xl font-bold">{member.name}</h3>
                      <p className="mb-4 text-[#66BFFF]">{member.role}</p>
                      <p className="mb-6 text-[#D1D1D1]">{member.bio}</p>
                      <div className="flex space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-[#0A1F44]/50 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0A1F44]/80 hover:text-[#66BFFF]"
                        >
                          <a href={member.social.twitter} aria-label="Twitter">
                            <Twitter className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-[#0A1F44]/50 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0A1F44]/80 hover:text-[#66BFFF]"
                        >
                          <a href={member.social.linkedin} aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-[#0A1F44]/50 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0A1F44]/80 hover:text-[#66BFFF]"
                        >
                          <a href={member.social.github} aria-label="GitHub">
                            <Github className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-[#0A1F44]/50 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0A1F44]/80 hover:text-[#66BFFF]"
                        >
                          <a href={`mailto:${member.social.email}`} aria-label="Email">
                            <Mail className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 -z-10 bg-[#66BFFF] opacity-5 blur-xl"></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-xl border border-[#66BFFF]/20 bg-[#0F2A5C]/30 p-10 shadow-[0_0_30px_rgba(102,191,255,0.1)] backdrop-blur-md"
        >
          <h2 className="mb-8 text-center text-4xl font-bold text-white">Our Mission</h2>
          <p className="mb-6 text-xl text-[#D1D1D1]">
            At NexBot, we believe in creating robotics technology that enhances human potential rather than replacing
            it. Our robots are designed to work alongside humans, augmenting their capabilities and improving quality of
            life across various domains including healthcare, education, industry, and home assistance.
          </p>
          <p className="mb-10 text-xl text-[#D1D1D1]">
            We are committed to ethical AI development and ensuring our technology is accessible, safe, and beneficial
            for all. Our research is conducted with transparency and a focus on addressing real-world challenges.
          </p>
          <div className="text-center">
            <Button className="relative overflow-hidden bg-transparent text-[#66BFFF] before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#66BFFF] before:transition-transform hover:text-[#0A1F44] hover:before:translate-y-0">
              Join Our Team
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

