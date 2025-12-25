"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Sparkles, Volume2, VolumeX } from "lucide-react"
import { Fireworks } from "./fireworks"
import { Confetti } from "./confetti"

const names = ["Marcia", "José Antônio", "Cassiano", "Fabiano"]

export function NewYearCard() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current && !userInteracted) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
            setUserInteracted(true)
          })
          .catch(() => {
            // Auto-play bloqueado, usuário precisa clicar no botão
            console.log("[v0] Auto-play bloqueado, aguardando interação do usuário")
          })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [userInteracted])

  // Garante que a música toque na primeira interação do usuário (necessário em alguns navegadores)
  useEffect(() => {
    const onFirstInteract = () => {
      if (audioRef.current && !userInteracted) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
            setUserInteracted(true)
          })
          .catch(() => {
            // Se ainda bloquear, o botão permitirá tocar manualmente
          })
      }
    }

    window.addEventListener("pointerdown", onFirstInteract, { once: true })
    window.addEventListener("keydown", onFirstInteract, { once: true })
    window.addEventListener("touchstart", onFirstInteract, { once: true })

    return () => {
      window.removeEventListener("pointerdown", onFirstInteract)
      window.removeEventListener("keydown", onFirstInteract)
      window.removeEventListener("touchstart", onFirstInteract)
    }
  }, [userInteracted])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
            setUserInteracted(true)
          })
          .catch((error) => {
            console.log("[v0] Erro ao tocar música:", error)
          })
      }
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        className="hidden"
        preload="auto"
        playsInline
        onError={() => setAudioError(true)}
      >
        <source src="/audio/miger-happy-dance-455632.mp3" type="audio/mpeg" />
      </audio>

      <Fireworks />
      <Confetti />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl p-6 md:p-12 relative overflow-hidden animate-scale-in">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 text-center space-y-8">
            {/* Year */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-primary tracking-tight">
                2026
              </h1>
              <Sparkles
                className="w-8 h-8 md:w-10 md:h-10 text-accent animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            {/* Main message */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-foreground leading-tight animate-fade-in text-balance">
                Nós te desejamos um
              </h2>
              <h3
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary leading-tight animate-fade-in text-balance"
                style={{ animationDelay: "0.3s" }}
              >
                Feliz Ano Novo
              </h3>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 py-6">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <Sparkles className="w-5 h-5 text-accent" />
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>

            {/* Signatures */}
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-serif text-muted-foreground italic">Com carinho de:</p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4">
                {names.map((name, index) => (
                  <div
                    key={name}
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-secondary animate-fade-in"
                    style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                  >
                    {name}
                    {index < names.length - 1 && <span className="text-muted-foreground mx-2">•</span>}
                  </div>
                ))}
              </div>
            </div>

            {audioError && (
              <div className="mt-6 text-sm md:text-base text-destructive/80">
                Arquivo de áudio não encontrado em /audio/new-year.mp3. Coloque seu MP3 em public/audio/new-year.mp3.
              </div>
            )}

            <button
              onClick={toggleMusic}
              className="mt-8 px-6 py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary text-sm md:text-base font-sans transition-all border border-primary/30 flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Pausar música" : audioError ? "Arquivo de áudio não encontrado" : "Reproduzir música"}
              disabled={audioError}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span>Música tocando</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span>{audioError ? "Arquivo ausente" : "Clique para música"}</span>
                </>
              )}
            </button>
          </div>
        </Card>
      </div>
    </>
  )
}
