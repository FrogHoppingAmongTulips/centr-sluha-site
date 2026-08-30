import { useLayoutEffect, useRef } from 'react'
import './Wheel.css'

/* Барабан, как в выборе даты и времени на телефоне: выбрано то, что оказалось
   в подсвеченной полосе по центру.

   С loop барабан бесконечный: список повторяется много раз, а когда прокрутка
   подходит к краю, содержимое незаметно сдвигается обратно к середине. Строки
   одинаковые, поэтому сдвиг не виден и прокрутку не прерывает — после 31-го
   снова идёт 1-е, после декабря январь, и так без конца.

   Подсветку строки меняем напрямую в разметке, без перерисовки всего списка:
   иначе на каждое движение пальца пришлось бы пересобирать сотни строк
   и прокрутка дёргалась бы. */

export const ITEM = 42    // высота строки
export const VISIBLE = 5  // сколько строк видно: выбранная и по две сверху и снизу
const COPIES = 21         // сколько раз повторяем список ради бесконечной прокрутки
const EDGE = 3            // за сколько списков до края возвращаемся в середину

export default function Wheel({
  values, value, onChange, label,
  render = (v) => v, minWidth = 76, loop = false, isOff = () => false,
}) {
  const box = useRef(null)
  const timer = useRef(null)
  // пока крутят этот барабан, чужие перерисовки не должны сбивать его прокрутку
  const busy = useRef(false)
  const shift = useRef(0)   // на сколько строк сдвинули содержимое при возврате в середину
  const own = useRef(false) // прокрутку сделали мы сами, а не человек
  const pos = useRef(0)     // какая строка сейчас в полосе
  const anchor = useRef(0)  // от какой строки считаем пройденные круги

  const len = values.length
  const list = loop ? Array.from({ length: COPIES * len }, (_, i) => values[i % len]) : values
  const base = loop ? Math.floor(COPIES / 2) * len : 0
  const home = base + Math.max(0, values.indexOf(value))

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
    shift.current = 0
    anchor.current = home
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

    if (loop) {
      // подошли к краю — переставляем прокрутку на такую же строку в середине
      const jump = (COPIES - 2 * EDGE) * len
      if (index < EDGE * len) {
        el.scrollTop += jump * ITEM
        shift.current -= jump
        index += jump
      } else if (index > (COPIES - EDGE) * len) {
        el.scrollTop -= jump * ITEM
        shift.current += jump
        index -= jump
      }
    }

    highlight(index)

    const line = index + shift.current   // строка без учёта сдвигов
    const shown = loop
      ? values[((line % len) + len) % len]
      : values[Math.min(len - 1, Math.max(0, line))]
    const cycles = loop ? Math.floor(line / len) - Math.floor(anchor.current / len) : 0

    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      busy.current = false
      anchor.current = line
      if (shown !== value || cycles !== 0) onChange(shown, cycles)
    }, 120)
  }

  /* По нажатию доезжаем до строки плавно, а значение ставится, когда барабан
     остановится, — так же, как при обычной прокрутке. В бесконечном барабане
     едем до ближайшей такой же строки: одно и то же значение повторяется много
     раз, и незачем прокручивать полсписка. */
  const goTo = (index) => {
    const el = box.current
    if (!el) return
    let target = index
    if (loop) {
      const want = index % len
      const now = ((pos.current % len) + len) % len
      let step = want - now
      if (step > len / 2) step -= len
      if (step < -len / 2) step += len
      target = pos.current + step
    }
    busy.current = true
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ top: target * ITEM, behavior: still ? 'auto' : 'smooth' })
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
          aria-selected={false}
          className={`wheel__item ${isOff(v) ? 'is-off' : ''}`}
          onClick={() => goTo(i)}
        >
          {render(v)}
        </button>
      ))}
    </div>
  )
}
