"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  duration: number
  color: string
  rotation: number
  scale: number
}

export function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = ["#FFD700", "#FFA500", "#FF69B4", "#87CEEB", "#98FB98", "#DDA0DD", "#FF6347"]

    const createConfetti = () => {
      const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      }))

      setConfetti((prev) => [...prev, ...pieces])

      setTimeout(() => {
        setConfetti((prev) => prev.filter((p) => !pieces.find((piece) => piece.id === p.id)))
      }, 6000)
    }

    // Initial burst
    createConfetti()

    // Periodic bursts
    const interval = setInterval(createConfetti, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute -top-4 w-2 h-3 md:w-3 md:h-4"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration}s linear forwards`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
          }}
        />
      ))}
    </div>
  )
}
