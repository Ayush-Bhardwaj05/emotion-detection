// "use client"

// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Mic, MicOff, ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import VoiceWaveform from "@/components/voice-waveform"

// type Message = {
//   role: "user" | "ai"
//   content: string
// }

// // Declare SpeechRecognition
// declare var SpeechRecognition: any
// declare var webkitSpeechRecognition: any

// export default function ExplorePage() {
//   const [isListening, setIsListening] = useState(false)
//   const [transcript, setTranscript] = useState("")
//   const [messages, setMessages] = useState<Message[]>([])
//   const [isProcessing, setIsProcessing] = useState(false)
//   const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null)

//   // Mock AI responses - in a real app, this would be an API call
//   const mockAIResponses = [
//     "I'm NexBot, your advanced AI assistant. How can I help you today?",
//     "Our latest model features enhanced natural language processing capabilities.",
//     "I can assist with various tasks including data analysis, creative content generation, and answering questions.",
//     "The NexBot Alpha model includes advanced sensors and a quantum neural network processor.",
//     "Voice interaction is just one of many ways you can communicate with our AI systems.",
//   ]

//   useEffect(() => {
//     // Initialize speech recognition
//     if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = true
//       recognitionRef.current.interimResults = true

//       recognitionRef.current.onresult = (event) => {
//         const current = event.resultIndex
//         const transcriptResult = event.results[current][0].transcript
//         setTranscript(transcriptResult)
//       }

//       recognitionRef.current.onend = () => {
//         if (isListening) {
//           recognitionRef.current?.start()
//         }
//       }
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop()
//       }
//     }
//   }, [isListening])

//   useEffect(() => {
//     // Scroll to bottom when messages change
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
//     }
//   }, [messages])

//   const toggleListening = () => {
//     if (isListening) {
//       stopListening()
//     } else {
//       startListening()
//     }
//   }

//   const startListening = () => {
//     setIsListening(true)
//     setTranscript("")
//     recognitionRef.current?.start()
//   }

//   const stopListening = async () => {
//     setIsListening(false)
//     recognitionRef.current?.stop()

//     if (transcript.trim()) {
//       // Add user message
//       setMessages((prev) => [...prev, { role: "user", content: transcript }])

//       // Simulate AI processing
//       setIsProcessing(true)
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // Add AI response
//       const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]
//       setMessages((prev) => [...prev, { role: "ai", content: randomResponse }])
//       setIsProcessing(false)

//       // Clear transcript
//       setTranscript("")
//     }
//   }

//   return (
//     <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-24">
//       {/* Background gradient */}
//       <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A1F44] to-[#050A1A]"></div>

//       {/* Animated background elements */}
//       <div className="absolute bottom-0 left-0 -z-5 h-96 w-96 opacity-20">
//         <VoiceWaveform isActive={isListening} />
//       </div>

//       <div className="absolute right-0 top-0 -z-5 h-96 w-96 rotate-180 opacity-20">
//         <VoiceWaveform isActive={isListening} />
//       </div>

//       {/* Back button */}
//       <div className="absolute left-4 top-24 z-10 md:left-8">
//         <Button
//           variant="ghost"
//           size="icon"
//           asChild
//           className="rounded-full bg-[#0F2A5C]/50 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0F2A5C]/80"
//         >
//           <Link href="/">
//             <ArrowLeft className="h-5 w-5" />
//             <span className="sr-only">Back to Home</span>
//           </Link>
//         </Button>
//       </div>

//       <div className="container mx-auto flex max-w-3xl flex-col items-center px-4">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-12 text-center text-4xl font-bold text-white md:text-5xl"
//         >
//           Voice Interaction <span className="text-[#66BFFF]">Explorer</span>
//         </motion.h1>

//         {/* Chat container */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mb-8 w-full"
//         >
//           <div
//             ref={chatContainerRef}
//             className="h-[300px] w-full overflow-y-auto rounded-xl border border-[#66BFFF]/20 bg-[#0F2A5C]/30 p-6 backdrop-blur-md md:h-[400px]"
//           >
//             <AnimatePresence mode="popLayout">
//               {messages.length === 0 ? (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex h-full items-center justify-center text-center text-[#D1D1D1]/70"
//                 >
//                   <p>Start speaking to interact with NexBot AI</p>
//                 </motion.div>
//               ) : (
//                 messages.map((message, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
//                   >
//                     <div
//                       className={`inline-block max-w-[80%] rounded-xl px-4 py-3 ${
//                         message.role === "user" ? "bg-[#66BFFF] text-[#0A1F44]" : "bg-[#0A1F44]/80 text-[#F5F5F5]"
//                       }`}
//                     >
//                       <p>{message.content}</p>
//                     </div>
//                   </motion.div>
//                 ))
//               )}

//               {/* Live transcript */}
//               {isListening && transcript && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="mb-4 text-right"
//                 >
//                   <div className="inline-block max-w-[80%] rounded-xl bg-[#66BFFF]/30 px-4 py-3 text-[#F5F5F5]">
//                     <p>{transcript}</p>
//                   </div>
//                 </motion.div>
//               )}

//               {/* AI is processing indicator */}
//               {isProcessing && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="mb-4 text-left"
//                 >
//                   <div className="inline-block rounded-xl bg-[#0A1F44]/80 px-6 py-4 text-[#F5F5F5]">
//                     <div className="flex space-x-2">
//                       <span className="animate-bounce">•</span>
//                       <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
//                         •
//                       </span>
//                       <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
//                         •
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         {/* Microphone button */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="relative mb-8"
//         >
//           <Button
//             onClick={toggleListening}
//             className={`group relative h-24 w-24 rounded-full ${
//               isListening ? "bg-[#66BFFF] text-[#0A1F44]" : "bg-[#0F2A5C] text-[#66BFFF] hover:bg-[#0F2A5C]/80"
//             } transition-colors duration-300`}
//           >
//             {isListening ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}

//             {/* Ripple effect when listening */}
//             <AnimatePresence>
//               {isListening && (
//                 <>
//                   <motion.span
//                     initial={{ width: "100%", height: "100%", opacity: 0.8 }}
//                     animate={{
//                       width: "150%",
//                       height: "150%",
//                       opacity: 0,
//                     }}
//                     exit={{ opacity: 0 }}
//                     transition={{
//                       repeat: Number.POSITIVE_INFINITY,
//                       duration: 1.5,
//                       ease: "easeOut",
//                     }}
//                     className="absolute inset-0 rounded-full bg-[#66BFFF]"
//                   />
//                   <motion.span
//                     initial={{ width: "100%", height: "100%", opacity: 0.8 }}
//                     animate={{
//                       width: "130%",
//                       height: "130%",
//                       opacity: 0,
//                     }}
//                     exit={{ opacity: 0 }}
//                     transition={{
//                       repeat: Number.POSITIVE_INFINITY,
//                       duration: 1.5,
//                       delay: 0.5,
//                       ease: "easeOut",
//                     }}
//                     className="absolute inset-0 rounded-full bg-[#66BFFF]"
//                   />
//                 </>
//               )}
//             </AnimatePresence>
//           </Button>
//         </motion.div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="text-center text-[#D1D1D1]"
//         >
//           {isListening ? "Listening... Click to stop" : "Click the microphone to start speaking"}
//         </motion.p>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import VoiceWaveform from "@/components/voice-waveform"

type Message = {
  role: "user" | "ai"
  content: string
}

// Ensure TypeScript recognizes these browser APIs
declare global {
  interface Window {
    SpeechRecognition: typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition | undefined;
    webkitSpeechRecognition: typeof SpeechRecognition | undefined;
  }
}

export default function ExplorePage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const mockAIResponses = [
    "I'm NexBot, your advanced AI assistant. How can I help you today?",
    "Our latest model features enhanced natural language processing capabilities.",
    "I can assist with various tasks including data analysis, creative content generation, and answering questions.",
    "The NexBot Alpha model includes advanced sensors and a quantum neural network processor.",
    "Voice interaction is just one of many ways you can communicate with our AI systems.",
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
  
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
  
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const transcriptResult = event.results[current][0].transcript;
          setTranscript(transcriptResult);
        };
  
        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current?.start();
          }
        };
      }
    }
  
    return () => {
      recognitionRef.current?.stop();
    };
  }, [isListening]);
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    setIsListening(true)
    setTranscript("")
    recognitionRef.current?.start()
  }

  const stopListening = async () => {
    setIsListening(false)
    recognitionRef.current?.stop()

    if (transcript.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: transcript }])

      setIsProcessing(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const randomResponse =
        mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]
      setMessages((prev) => [...prev, { role: "ai", content: randomResponse }])
      setIsProcessing(false)
      setTranscript("")
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A1F44] to-[#050A1A]"></div>

      <div className="absolute bottom-0 left-0 -z-5 h-96 w-96 opacity-20">
        <VoiceWaveform isActive={isListening} />
      </div>

      <div className="absolute right-0 top-0 -z-5 h-96 w-96 rotate-180 opacity-20">
        <VoiceWaveform isActive={isListening} />
      </div>

      <div className="absolute left-4 top-24 z-10 md:left-8">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-full bg-[#0F2A5C]/50 text-[#66BFFF] backdrop-blur-sm hover:bg-[#0F2A5C]/80"
        >
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
      </div>

      <div className="container mx-auto flex max-w-3xl flex-col items-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-4xl font-bold text-white md:text-5xl"
        >
          Voice Interaction <span className="text-[#66BFFF]">Explorer</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 w-full"
        >
          <div
            ref={chatContainerRef}
            className="h-[300px] w-full overflow-y-auto rounded-xl border border-[#66BFFF]/20 bg-[#0F2A5C]/30 p-6 backdrop-blur-md md:h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full items-center justify-center text-center text-[#D1D1D1]/70"
                >
                  <p>Start speaking to interact with NexBot AI</p>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`inline-block max-w-[80%] rounded-xl px-4 py-3 ${
                        message.role === "user" ? "bg-[#66BFFF] text-[#0A1F44]" : "bg-[#0A1F44]/80 text-[#F5F5F5]"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mb-8"
        >
          <Button
            onClick={toggleListening}
            className={`group relative h-24 w-24 rounded-full ${
              isListening ? "bg-[#66BFFF] text-[#0A1F44]" : "bg-[#0F2A5C] text-[#66BFFF] hover:bg-[#0F2A5C]/80"
            } transition-colors duration-300`}
          >
            {isListening ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-[#D1D1D1]"
        >
          {isListening ? "Listening... Click to stop" : "Click the microphone to start speaking"}
        </motion.p>
      </div>
    </div>
  )
}
