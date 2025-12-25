"use client"

import { useState } from "react"
import { Fireworks } from "@/components/fireworks"
import { NewYearCard } from "@/components/new-year-card"
import { EnvelopeOpener } from "@/components/envelope-opener"

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [showCard, setShowCard] = useState(false)

  const handleOpen = () => {
    setIsOpened(true)
    // Delay showing the card to allow for opening animation
    setTimeout(() => {
      setShowCard(true)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {!isOpened && <EnvelopeOpener onOpen={handleOpen} />}

      {showCard && (
        <div className="animate-fade-in">
          {/* Starry background effect */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
            {Array.from({ length: 100 }).map((_, i) => (
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

          {/* Fireworks */}
          <Fireworks />

          {/* Main card */}
          <NewYearCard />
        </div>
      )}
    </main>
  )
}
