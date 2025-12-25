"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface Firework {
  id: number
  x: number
  y: number
  color: string
  delay: number
  size: number
}

export function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([])

  useEffect(() => {
    const colors = [
      "#FFD700", // Gold
      "#FFA500", // Orange
      "#FF6347", // Red
      "#87CEEB", // Sky Blue
      "#98FB98", // Pale Green
      "#DDA0DD", // Plum
      "#F0E68C", // Khaki
      "#FF69B4", // Hot Pink
      "#00CED1", // Dark Turquoise
    ]

    const createFirework = () => {
      const newFirework: Firework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 60 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        size: 0.8 + Math.random() * 0.7,
      }

      setFireworks((prev) => [...prev, newFirework])

      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id))
      }, 3000)
    }

    const interval = setInterval(createFirework, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
            animationDelay: `${fw.delay}s`,
            transform: `scale(${fw.size})`,
          }}
        >
          {/* Center burst */}
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: fw.color,
              boxShadow: `0 0 20px ${fw.color}`,
            }}
          />

          {/* Particles */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i * 360) / 30
            const distance = 50 + Math.random() * 60
            const tx = Math.cos((angle * Math.PI) / 180) * distance
            const ty = Math.sin((angle * Math.PI) / 180) * distance

            return (
              <div
                key={i}
                className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full"
                style={
                  {
                    backgroundColor: fw.color,
                    boxShadow: `0 0 10px ${fw.color}`,
                    animation: "particle-explosion 1s ease-out forwards",
                    animationDelay: `${fw.delay}s`,
                    "--tx": `${tx}px`,
                    "--ty": `${ty}px`,
                  } as React.CSSProperties
                }
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
