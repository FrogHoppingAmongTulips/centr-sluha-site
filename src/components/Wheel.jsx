import { useEffect, useRef } from 'react'
import './Wheel.css'

/* Барабан, как в выборе даты и времени на телефоне: выбрано то, что оказалось
   в подсвеченной полосе по центру. Работает прокруткой и обычным нажатием.

   С loop барабан кажется бесконечным: список повторяется много раз, а когда
   прокрутка останавливается, мы незаметно возвращаем её в середину. Поэтому
   после 31-го снова идёт 1-е, после декабря — январь, и так без конца. */

export const ITEM = 42    // высота строки
export const VISIBLE = 5  // сколько строк видно: выбранная и по две сверху и снизу
const COPIES = 9          // сколько раз повторяем список ради бесконечной прокрутки

export default function Wheel({
  values, value, onChange, label,
  render = (v) => v, minWidth = 76, loop = false, isOff = () => false,
}) {
  const box = useRef(null)
  const timer = useRef(null)
  // пока крутят этот барабан, чужие перерисовки не должны сбивать его прокрутку
  const busy = useRef(false)

  const len = values.length
  const list = loop ? Array.from({ length: COPIES * len }, (_, i) => values[i % len]) : values
  const base = loop ? Math.floor(COPIES / 2) * len : 0

  useEffect(() => {
    const el = box.current
    if (!el || busy.current) return
    const index = base + Math.max(0, values.indexOf(value))
    if (Math.abs(el.scrollTop - index * ITEM) > 2) el.scrollTop = index * ITEM
  }, [value, values, base])

  const onScroll = () => {
    busy.current = true
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      const el = box.current
      busy.current = false
      if (!el) return
      const index = Math.min(list.length - 1, Math.max(0, Math.round(el.scrollTop / ITEM)))
      const picked = list[index]
      // сколько раз список успел прокрутиться по кругу: месяц так тянет за собой год
      const cycles = loop ? Math.floor(index / len) - Math.floor(base / len) : 0
      if (loop) {
        // круг замкнулся — возвращаемся к той же строке в середине списка
        const home = base + values.indexOf(picked)
        if (home !== index) el.scrollTop = home * ITEM
      }
      if (picked !== value || cycles !== 0) onChange(picked, cycles)
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
      {list.map((v, i) => (
        <button
          type="button"
          key={i}
          role="option"
          aria-selected={v === value}
          className={`wheel__item ${v === value ? 'is-active' : ''} ${isOff(v) ? 'is-off' : ''}`}
          onClick={() => onChange(v)}
        >
          {render(v)}
        </button>
      ))}
    </div>
  )
}
