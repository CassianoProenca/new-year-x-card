"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"
import { Champagne } from "./champagne"
import { Confetti } from "./confetti"
import { Fireworks } from "./fireworks"

interface EnvelopeOpenerProps {
  onOpen: () => void
}

export function EnvelopeOpener({ onOpen }: EnvelopeOpenerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showChampagne, setShowChampagne] = useState(false)

  const handleClick = () => {
    setShowChampagne(true)
  }

  const handleChampagneComplete = () => {
    onOpen()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background overflow-y-auto">
      <Confetti />

      <Fireworks />

      {showChampagne && <Champagne onComplete={handleChampagneComplete} />}

      {/* Starry background */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-foreground rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-8">
        <CountdownTimer />

        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group cursor-pointer"
          aria-label="Clique para abrir o cartão"
        >
          {/* Envelope container */}
          <div className="relative w-64 h-48 md:w-80 md:h-60 transition-transform duration-500 hover:scale-105">
            {/* Envelope back */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60 rounded-lg shadow-2xl border-2 border-primary/40" />

            {/* Envelope flap */}
            <div
              className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-br from-primary to-primary/80 origin-top transition-transform duration-700 ease-out rounded-t-lg border-2 border-primary/40"
              style={{
                clipPath: "polygon(0 0, 50% 60%, 100% 0)",
                transform: isHovered ? "rotateX(-30deg) translateY(-10px)" : "rotateX(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-accent/20 rounded-t-lg" />
            </div>

            {/* Sparkles around envelope */}
            <Sparkles
              className="absolute -top-4 -right-4 w-8 h-8 text-accent animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            <Sparkles
              className="absolute -bottom-4 -left-4 w-6 h-6 text-secondary animate-pulse"
              style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
            />

            {/* Content preview */}
            <div className="absolute inset-x-8 top-16 md:top-20 bottom-8 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground">2026</div>
                <div className="text-sm md:text-base font-serif text-primary-foreground/80">Feliz Ano Novo</div>
              </div>
            </div>

            {/* Wax seal */}
            <div className="absolute bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent border-4 border-accent/40 shadow-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-accent-foreground" />
            </div>
          </div>

          {/* Instruction text */}
          <div className="mt-8 text-center space-y-2 animate-fade-in">
            <p className="text-2xl md:text-3xl font-serif text-foreground">Clique para abrir</p>
            <p className="text-base md:text-lg text-muted-foreground">Você recebeu uma mensagem especial</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </button>
      </div>
    </div>
  )
}
