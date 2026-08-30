import { useEffect, useRef } from 'react'
import './Wheel.css'

/* Барабан, как в выборе даты и времени на телефоне: выбрано то, что оказалось
   в подсвеченной полосе по центру. Работает прокруткой и обычным нажатием. */

export const ITEM = 42    // высота строки
export const VISIBLE = 5  // сколько строк видно: выбранная и по две сверху и снизу

export default function Wheel({ values, value, onChange, label, render = (v) => v, minWidth = 76 }) {
  const box = useRef(null)
  const timer = useRef(null)
  // пока крутят этот барабан, чужие перерисовки не должны сбивать его прокрутку
  const busy = useRef(false)

  useEffect(() => {
    const el = box.current
    if (!el || busy.current) return
    const index = Math.max(0, values.indexOf(value))
    if (Math.abs(el.scrollTop - index * ITEM) > 2) el.scrollTop = index * ITEM
  }, [value, values])

  const onScroll = () => {
    busy.current = true
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      const el = box.current
      busy.current = false
      if (!el) return
      const index = Math.min(values.length - 1, Math.max(0, Math.round(el.scrollTop / ITEM)))
      if (values[index] !== value) onChange(values[index])
    }, 90)
  }

  return (
    <div
      className="wheel"
      role="listbox"
      aria-label={label}
      ref={box}
      onScroll={onScroll}
      style={{ height: ITEM * VISIBLE, paddingBlock: ITEM * ((VISIBLE - 1) / 2), minWidth }}
    >
      {values.map((v) => (
        <button
          type="button"
          key={v}
          role="option"
          aria-selected={v === value}
          className={`wheel__item ${v === value ? 'is-active' : ''}`}
          onClick={() => onChange(v)}
        >
          {render(v)}
        </button>
      ))}
    </div>
  )
}
