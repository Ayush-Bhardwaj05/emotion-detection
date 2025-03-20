"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle animation for background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
    }[] = []

    const createParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: "#66BFFF",
          alpha: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(102, 191, 255, ${p.alpha})`
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        else if (p.x < 0) p.x = canvas.width

        if (p.y > canvas.height) p.y = 0
        else if (p.y < 0) p.y = canvas.height
      }

      // Connect particles with lines if they are close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(102, 191, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animateParticles)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    window.addEventListener("resize", handleResize)
    createParticles()
    animateParticles()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-16">
      {/* Animated background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-[#0A1F44]/80 to-[#050A1A] opacity-90"></div>

      <div className="container max-w-md px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="overflow-hidden border-[#66BFFF]/20 bg-[#0F2A5C]/30 shadow-[0_0_30px_rgba(102,191,255,0.2)] backdrop-blur-xl">
            <div className="bg-gradient-to-r from-[#0A1F44] to-[#0F2A5C] p-6 text-white">
              <h2 className="text-3xl font-bold">Welcome to NexBot</h2>
              <p className="mt-2 text-[#D1D1D1]">Sign in to your account or create a new one</p>
            </div>
            <CardContent className="p-6">
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8 grid w-full grid-cols-2 bg-[#0A1F44]/50 p-1">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-[#66BFFF] data-[state=active]:text-[#0A1F44]"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-[#66BFFF] data-[state=active]:text-[#0A1F44]"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="login" className="mt-0">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#D1D1D1]">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-5 w-5 text-[#66BFFF]" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="border-[#66BFFF]/30 bg-[#0A1F44]/50 pl-10 text-[#D1D1D1] placeholder:text-[#D1D1D1]/50 focus:border-[#66BFFF] focus:ring-[#66BFFF]/20"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password" className="text-[#D1D1D1]">
                                Password
                              </Label>
                              <Link href="#" className="text-xs text-[#66BFFF] hover:text-[#66BFFF]/80">
                                Forgot password?
                              </Link>
                            </div>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-5 w-5 text-[#66BFFF]" />
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="border-[#66BFFF]/30 bg-[#0A1F44]/50 pl-10 pr-10 text-[#D1D1D1] placeholder:text-[#D1D1D1]/50 focus:border-[#66BFFF] focus:ring-[#66BFFF]/20"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-[#66BFFF] hover:text-[#66BFFF]/80"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                              </Button>
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="mt-2 w-full bg-[#66BFFF] text-[#0A1F44] hover:bg-[#66BFFF]/80"
                          >
                            Sign In
                          </Button>

                          <div className="text-center text-sm text-[#D1D1D1]">
                            Don&apos;t have an account?{" "}
                            <button
                              type="button"
                              className="text-[#66BFFF] hover:text-[#66BFFF]/80"
                              onClick={() => setActiveTab("register")}
                            >
                              Sign up
                            </button>
                          </div>
                        </div>
                      </form>
                    </TabsContent>

                    <TabsContent value="register" className="mt-0">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-[#D1D1D1]">
                              Full Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-5 w-5 text-[#66BFFF]" />
                              <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="border-[#66BFFF]/30 bg-[#0A1F44]/50 pl-10 text-[#D1D1D1] placeholder:text-[#D1D1D1]/50 focus:border-[#66BFFF] focus:ring-[#66BFFF]/20"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="register-email" className="text-[#D1D1D1]">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-5 w-5 text-[#66BFFF]" />
                              <Input
                                id="register-email"
                                type="email"
                                placeholder="name@example.com"
                                className="border-[#66BFFF]/30 bg-[#0A1F44]/50 pl-10 text-[#D1D1D1] placeholder:text-[#D1D1D1]/50 focus:border-[#66BFFF] focus:ring-[#66BFFF]/20"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="register-password" className="text-[#D1D1D1]">
                              Password
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-5 w-5 text-[#66BFFF]" />
                              <Input
                                id="register-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="border-[#66BFFF]/30 bg-[#0A1F44]/50 pl-10 pr-10 text-[#D1D1D1] placeholder:text-[#D1D1D1]/50 focus:border-[#66BFFF] focus:ring-[#66BFFF]/20"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-[#66BFFF] hover:text-[#66BFFF]/80"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                              </Button>
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="mt-2 w-full bg-[#66BFFF] text-[#0A1F44] hover:bg-[#66BFFF]/80"
                          >
                            Create Account
                          </Button>

                          <div className="text-center text-sm text-[#D1D1D1]">
                            Already have an account?{" "}
                            <button
                              type="button"
                              className="text-[#66BFFF] hover:text-[#66BFFF]/80"
                              onClick={() => setActiveTab("login")}
                            >
                              Sign in
                            </button>
                          </div>
                        </div>
                      </form>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

