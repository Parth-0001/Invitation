import { useCallback, useEffect, useRef, useState } from 'react'
import { RevealCelebration } from './RevealCelebration'

interface ScratchRevealProps {
  label: string
  revealLabel: string
  revealValue: string
  onRevealed?: () => void
}

const REVEAL_THRESHOLD = 0.45
const BRUSH_RADIUS = 28
const IDLE_AUTO_SCRATCH_MS = 5000

export function ScratchReveal({ label, revealLabel, revealValue, onRevealed }: ScratchRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const revealedRef = useRef(false)
  const hasScratchedRef = useRef(false)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoScratchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [canvasVisible, setCanvasVisible] = useState(true)

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [])

  const stopAutoScratch = useCallback(() => {
    if (autoScratchTimerRef.current !== null) {
      window.clearInterval(autoScratchTimerRef.current)
      autoScratchTimerRef.current = null
    }
  }, [])

  const initCanvas = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = 'var(--wedding-accent)'
    ctx.globalAlpha = 0.92
    ctx.fillRect(0, 0, rect.width, rect.height)

    ctx.globalAlpha = 1
    ctx.fillStyle = '#faf7f4'
    ctx.font = '500 11px Montserrat, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, rect.width / 2, rect.height / 2)
  }, [label])

  const completeReveal = useCallback(() => {
    if (revealedRef.current) return
    revealedRef.current = true
    clearIdleTimer()
    stopAutoScratch()
    setRevealed(true)
    onRevealed?.()
    window.setTimeout(() => setCanvasVisible(false), 480)
  }, [clearIdleTimer, onRevealed, stopAutoScratch])

  const checkRevealProgress = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')
      if (!ctx || revealedRef.current) return false

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      let transparent = 0
      const total = pixels.length / 4

      for (let i = 3; i < pixels.length; i += 4 * 8) {
        if (pixels[i] === 0) transparent++
      }

      const ratio = transparent / (total / 8)

      if (ratio >= REVEAL_THRESHOLD) {
        completeReveal()
        return true
      }
      return false
    },
    [completeReveal],
  )

  const eraseAt = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2)
    ctx.fill()
  }

  const autoCompleteScratch = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || revealedRef.current) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const step = 22
    const points: { x: number; y: number }[] = []

    for (let y = step / 2; y < height; y += step) {
      for (let x = step / 2; x < width; x += step) {
        points.push({ x, y })
      }
    }

    for (let i = points.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[points[i], points[j]] = [points[j], points[i]]
    }

    let index = 0
    stopAutoScratch()

    autoScratchTimerRef.current = window.setInterval(() => {
      const c = canvasRef.current
      if (!c || revealedRef.current) {
        stopAutoScratch()
        return
      }
      const context = c.getContext('2d')
      if (!context) return

      for (let n = 0; n < 6 && index < points.length; n++, index++) {
        eraseAt(context, points[index].x, points[index].y)
      }

      if (checkRevealProgress(c)) {
        stopAutoScratch()
        return
      }

      if (index >= points.length) {
        context.globalCompositeOperation = 'destination-out'
        context.fillRect(0, 0, width, height)
        stopAutoScratch()
        completeReveal()
      }
    }, 45)
  }, [checkRevealProgress, completeReveal, stopAutoScratch])

  const scheduleAutoComplete = useCallback(() => {
    clearIdleTimer()
    if (revealedRef.current || !hasScratchedRef.current) return

    idleTimerRef.current = window.setTimeout(() => {
      autoCompleteScratch()
    }, IDLE_AUTO_SCRATCH_MS)
  }, [autoCompleteScratch, clearIdleTimer])

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      const touch = e.touches[0] ?? e.changedTouches[0]
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas || revealedRef.current) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    hasScratchedRef.current = true
    eraseAt(ctx, x, y)
    checkRevealProgress(canvas)
  }

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    clearIdleTimer()
    stopAutoScratch()
    isDrawing.current = true
    const { x, y } = getPos(e)
    scratch(x, y)
  }

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing.current || revealedRef.current) return
    e.preventDefault()
    const { x, y } = getPos(e)
    scratch(x, y)
  }

  const handleEnd = () => {
    isDrawing.current = false
    scheduleAutoComplete()
  }

  useEffect(() => {
    initCanvas()
    window.addEventListener('resize', initCanvas)
    return () => {
      window.removeEventListener('resize', initCanvas)
      clearIdleTimer()
      stopAutoScratch()
    }
  }, [initCanvas, clearIdleTimer, stopAutoScratch])

  return (
    <div className="section-padding py-8">
      <div
        ref={containerRef}
        className={`scratch-reveal-card relative mx-auto h-36 w-full max-w-sm overflow-visible rounded-2xl shadow-md ${
          revealed ? 'scratch-reveal-card--celebrate' : ''
        }`}
        style={{ touchAction: 'none' }}
      >
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl transition-transform duration-500 ${
            revealed ? 'scratch-reveal-card__content--shown' : ''
          }`}
          style={{ backgroundColor: 'var(--wedding-bg)' }}
        >
          <p className="section-label mb-1" style={{ color: 'var(--wedding-accent)' }}>
            {revealLabel}
          </p>
          <p
            className={`font-script text-3xl md:text-4xl ${revealed ? 'scratch-reveal-date-pop' : ''}`}
            style={{ color: 'var(--wedding-primary)' }}
          >
            {revealValue}
          </p>
        </div>

        {canvasVisible && (
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-10 cursor-crosshair rounded-2xl transition-opacity duration-500 ${
              revealed ? 'opacity-0' : 'opacity-100'
            }`}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        )}

        {revealed && <RevealCelebration />}
      </div>

      {!revealed && (
        <p className="mt-3 text-center text-xs tracking-widest opacity-50 animate-pulse-soft">
          {label}
        </p>
      )}
    </div>
  )
}
