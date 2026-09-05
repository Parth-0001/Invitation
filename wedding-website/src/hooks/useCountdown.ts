import { useEffect, useState } from 'react'

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
  totalMs: number
}

function calculateCountdown(targetDate: Date): CountdownValues {
  const now = Date.now()
  const target = targetDate.getTime()
  const totalMs = target - now

  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true, totalMs: 0 }
  }

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isComplete: false, totalMs }
}

export function useCountdown(dateTime: string): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(() =>
    calculateCountdown(new Date(dateTime)),
  )

  useEffect(() => {
    const target = new Date(dateTime)
    const tick = () => setValues(calculateCountdown(target))
    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [dateTime])

  return values
}

export function padCountdown(value: number): string {
  return value.toString().padStart(2, '0')
}
