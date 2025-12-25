"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ChampagneProps {
  onComplete: () => void
}

export function Champagne({ onComplete }: ChampagneProps) {
  const [particles, setParticles] = useState<{ id: number; angle: number; distance: number; color: string }[]>([])
  const [showBottle, setShowBottle] = useState(true)
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    // Create champagne particles
    const colors = ["#FFD700", "#FFF8DC", "#FFFFE0", "#FAFAD2", "#F0E68C"]
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 50 + Math.random() * 20,
      distance: 150 + Math.random() * 150,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)

    setTimeout(() => {
      setShowBottle(false)
      setShowTransition(true)
    }, 1200)

    setTimeout(onComplete, 2500)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {showTransition && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 animate-fade-out" />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Champagne bottle */}
        {showBottle && (
          <div className="relative animate-bounce-twice">
            <div className="w-12 h-32 md:w-16 md:h-40 bg-gradient-to-b from-green-700 to-green-900 rounded-t-lg relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-yellow-600 rounded-full shadow-lg" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-4 md:w-10 md:h-5 bg-yellow-100 rounded-full opacity-70" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-6 md:w-12 md:h-8 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-sm">
                <div className="text-[8px] md:text-[10px] text-center text-white font-bold pt-1">CHAMPAGNE</div>
              </div>
            </div>
          </div>
        )}

        {/* Champagne particles explosion */}
        {particles.map((particle) => {
          const tx = Math.cos((particle.angle * Math.PI) / 180) * particle.distance
          const ty = Math.sin((particle.angle * Math.PI) / 180) * particle.distance - 120

          return (
            <div
              key={particle.id}
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full"
              style={
                {
                  backgroundColor: particle.color,
                  boxShadow: `0 0 15px ${particle.color}, 0 0 30px ${particle.color}`,
                  animation: "champagne-burst 2s ease-out forwards",
                  "--tx": `${tx}px`,
                  "--ty": `${ty}px`,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>
    </div>
  )
}
