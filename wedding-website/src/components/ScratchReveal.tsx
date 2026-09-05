import { useCallback, useEffect, useRef, useState } from 'react'

interface ScratchRevealProps {
  label: string
  revealLabel: string
  revealValue: string
  onRevealed?: () => void
}

const REVEAL_THRESHOLD = 0.45
const BRUSH_RADIUS = 28

export function ScratchReveal({
  label,
  revealLabel,
  revealValue,
  onRevealed,
}: ScratchRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const scratchedRatio = useRef(0)

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

    ctx.scale(dpr, dpr)
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
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    checkRevealProgress(canvas)
  }

  const checkRevealProgress = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    const total = pixels.length / 4

    for (let i = 3; i < pixels.length; i += 4 * 8) {
      if (pixels[i] === 0) transparent++
    }

    const ratio = transparent / (total / 8)
    scratchedRatio.current = ratio

    if (ratio >= REVEAL_THRESHOLD && !revealed) {
      setRevealed(true)
      onRevealed?.()
    }
  }

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    isDrawing.current = true
    const { x, y } = getPos(e)
    scratch(x, y)
  }

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing.current || revealed) return
    e.preventDefault()
    const { x, y } = getPos(e)
    scratch(x, y)
  }

  const handleEnd = () => {
    isDrawing.current = false
  }

  useEffect(() => {
    initCanvas()
    window.addEventListener('resize', initCanvas)
    return () => window.removeEventListener('resize', initCanvas)
  }, [initCanvas])

  return (
    <div className="section-padding py-8">
      <div
        ref={containerRef}
        className="relative mx-auto h-36 w-full max-w-sm overflow-hidden rounded-2xl shadow-md"
        style={{ touchAction: 'none' }}
      >
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
            revealed ? 'opacity-100' : 'opacity-90'
          }`}
          style={{ backgroundColor: 'var(--wedding-bg)' }}
        >
          <p className="section-label mb-1" style={{ color: 'var(--wedding-accent)' }}>
            {revealLabel}
          </p>
          <p className="font-script text-3xl md:text-4xl" style={{ color: 'var(--wedding-primary)' }}>
            {revealValue}
          </p>
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 cursor-crosshair"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        )}

        {revealed && (
          <div className="pointer-events-none absolute inset-0 z-20 animate-fade-in-up" />
        )}
      </div>

      {!revealed && (
        <p className="mt-3 text-center text-xs tracking-widest opacity-50 animate-pulse-soft">
          {label}
        </p>
      )}
    </div>
  )
}
