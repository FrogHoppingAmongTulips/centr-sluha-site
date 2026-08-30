import { useLayoutEffect, useRef } from 'react'
import './Wheel.css'

/* Барабан выбора времени: выбрано то, что оказалось в подсвеченной полосе
   по центру. Крутится прокруткой и нажатием по строке.

   Подсветку меняем прямо в разметке, без перерисовки списка: так прокрутка
   остаётся плавной. */

export const ITEM = 42    // высота строки
export const VISIBLE = 5  // сколько строк видно: выбранная и по две сверху и снизу

export default function Wheel({ values, value, onChange, label, render = (v) => v, minWidth = 76 }) {
  const box = useRef(null)
  const timer = useRef(null)
  // пока крутят этот барабан, чужие перерисовки не должны сбивать его прокрутку
  const busy = useRef(false)
  const own = useRef(false) // прокрутку сделали мы сами, а не человек
  const pos = useRef(0)     // какая строка сейчас в полосе

  const home = Math.max(0, values.indexOf(value))

  const highlight = (index) => {
    const el = box.current
    if (!el) return
    const prev = el.children[pos.current]
    if (prev) { prev.classList.remove('is-active'); prev.setAttribute('aria-selected', 'false') }
    const next = el.children[index]
    if (next) { next.classList.add('is-active'); next.setAttribute('aria-selected', 'true') }
    pos.current = index
  }

  // ставим барабан на выбранное значение и подсвечиваем нужную строку
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    if (busy.current) { highlight(pos.current); return }
    if (Math.abs(el.scrollTop - home * ITEM) > 2) {
      own.current = true
      el.scrollTo({ top: el.scrollTop, behavior: 'auto' }) // обрываем начатую плавную доводку
      el.scrollTop = home * ITEM
    }
    highlight(home)
  })

  const onScroll = () => {
    const el = box.current
    if (!el) return
    let index = Math.round(el.scrollTop / ITEM)
    // это наша собственная перестановка барабана — значение от неё не меняем
    if (own.current) {
      if (index === home) { highlight(index); return }
      own.current = false
    }
    busy.current = true
    highlight(index)

    const shown = values[Math.min(values.length - 1, Math.max(0, index))]
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      busy.current = false
      if (shown !== value) onChange(shown)
    }, 120)
  }

  /* по нажатию доезжаем до строки плавно, а значение ставится, когда барабан
     остановится — так же, как при обычной прокрутке */
  const goTo = (index) => {
    const el = box.current
    if (!el) return
    busy.current = true
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ top: index * ITEM, behavior: still ? 'auto' : 'smooth' })
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
      {values.map((v, i) => (
        <button
          type="button"
          key={i}
          role="option"
          aria-selected={false}
          className="wheel__item"
          onClick={() => goTo(i)}
        >
          {render(v)}
        </button>
      ))}
    </div>
  )
}
