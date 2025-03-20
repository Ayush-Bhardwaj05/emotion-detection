"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Sample team data
const team = [
  {
    id: 1,
    name: "Ayush Bhardwaj",
    image: "/team/ayush.png",
    bio: "Upcoming Intern at Mimecast.",
    social: {
      linkedin: "https://www.linkedin.com/in/ayush-bhardwaj-ayush0505/",
      github: "#",
      email: "ayush.is22@bmsce.ac.inbmsce.ac.in",
    },
  },
  {
    id: 2,
    name: "Harsh Daftari",
    image: "/team/ayush.jpg",
    bio: "Current Research Intern at HPE.",
    social: {
      linkedin: "https://www.linkedin.com/in/harsh-daftari-571568253/",
      github: "#",
      email: "harshdaftari.is22@bmsce.ac.in",
    },
  },
  {
    id: 3,
    name: "Nikhil Singh",
    image: "/team/nikhil.jpg",
    bio: "Currently working as a Product Associate Developer at BMC Software (Intern).",
    social: {
      linkedin: "https://www.linkedin.com/in/nikhil-singh-a77b4325a/",
      github: "https://leetcode.com/u/Nikhil_Singh_zer0/",
      email: "nikhilsingh.is22@bmsce.ac.in",
    },
  },
  {
    id: 4,
    name: "Yash Singh",
    image: "/team/ayush.jpg",
    bio: "Runner up in TechThon Hackathon, powered by Visionet Systems Inc.",
    social: {
      linkedin: "https://www.linkedin.com/in/yash-singh-988aa525a/",
      github: "#",
      email: "yashsingh.is22@bmsce.ac.in",
    },
  },
];

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#050A1A] py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            About Us
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-[#D1D1D1]">
            We are a group of friends studying in ISE at BMSCE, driven by a
            passion for innovation. We specialize in building production-level
            web applications that solve real-life problems with cutting-edge
            technology.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-24"
        >
          <h2 className="mb-12 text-center text-4xl font-bold text-[#66BFFF]">
            Our Team
          </h2>
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
                      <p className="mb-6 text-[#D1D1D1]">{member.bio}</p>
                      <div className="flex space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-[#0A1F44]/50 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0A1F44]/80 hover:text-[#66BFFF]"
                        >
                          <a
                            href={member.social.linkedin}
                            aria-label="LinkedIn"
                          >
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
                          <a
                            href={`mailto:${member.social.email}`}
                            aria-label="Email"
                          >
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
      </div>
    </div>
  );
}
