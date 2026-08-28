import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import './TimeInput.css'

/* Выбор времени барабаном, как на телефоне: два столбца — часы и минуты.
   Показываем только часы приёма, чтобы человек не выбрал время, когда центр закрыт. */

const HOURS = Array.from({ length: 12 }, (_, i) => String(9 + i).padStart(2, '0')) // 09…20
const MINUTES = ['00', '15', '30', '45']

const ITEM = 42       // высота строки
const VISIBLE = 5     // сколько строк видно: выбранная и по две сверху и снизу

/* Барабан: выбранное — то, что оказалось в подсвеченной полосе по центру.
   Работает и прокруткой (как на телефоне), и обычным нажатием на строку. */
function Wheel({ values, value, onChange, label }) {
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
      style={{ height: ITEM * VISIBLE, paddingBlock: ITEM * ((VISIBLE - 1) / 2) }}
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
          {v}
        </button>
      ))}
    </div>
  )
}

export default function TimeInput({ name = 'time', required = false, id }) {
  const [open, setOpen] = useState(false)
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const root = useRef(null)

  const value = hour && minute ? `${hour}:${minute}` : ''

  // клик мимо и Escape закрывают барабан
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!e.target.closest?.('.timepick')) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  /* выбрали часы — минуты сами встают на «00», и наоборот: время всегда полное */
  const pickHour = (h) => { setHour(h); if (!minute) setMinute(MINUTES[0]) }
  const pickMinute = (m) => { setMinute(m); if (!hour) setHour(HOURS[0]) }
  const confirm = () => {
    if (!hour) setHour(HOURS[0])
    if (!minute) setMinute(MINUTES[0])
    setOpen(false)
  }

  return (
    <div className="timepick" ref={root}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        className={`timepick__field ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-required={required}
      >
        <span className={value ? '' : 'timepick__placeholder'}>{value || 'Выберите время'}</span>
        <Icon name="clock" size={18} />
      </button>

      {open && (
        <div className="timepick__drop">
          <div className="timepick__wheels">
            <span className="timepick__band" aria-hidden="true" />
            <Wheel values={HOURS} value={hour || HOURS[0]} onChange={pickHour} label="Часы" />
            <span className="timepick__colon">:</span>
            <Wheel values={MINUTES} value={minute || MINUTES[0]} onChange={pickMinute} label="Минуты" />
          </div>
          <div className="timepick__foot">
            <span>с 9:00 до 20:00</span>
            <button type="button" className="btn btn-primary btn-sm" onClick={confirm}>
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
