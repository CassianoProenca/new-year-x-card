"use client"

import { useEffect, useState } from "react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const newYear = new Date(2026, 0, 1, 0, 0, 0)
      const difference = newYear.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-6 md:mb-10 text-center space-y-3 animate-fade-in px-4">
      <h2 className="text-lg md:text-2xl font-serif text-foreground">Contagem regressiva para 2026</h2>

      <div className="flex items-center justify-center gap-2 md:gap-4">
        <TimeUnit value={timeLeft.days} label="Dias" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary/20 backdrop-blur-sm border-2 border-primary/40 rounded-lg p-2 md:p-4 min-w-[50px] md:min-w-[70px] shadow-lg">
        <div className="text-2xl md:text-4xl font-bold text-foreground tabular-nums">
          {value.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="text-[10px] md:text-sm text-muted-foreground mt-1.5 font-medium">{label}</div>
    </div>
  )
}

function Separator() {
  return <div className="text-xl md:text-3xl text-primary font-bold animate-pulse">:</div>
}
