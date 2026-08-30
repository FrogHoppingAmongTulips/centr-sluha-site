import { useEffect, useState } from 'react'
import Icon from './Icon'
import './DateInput.css'

/* Выбор даты календарём, как на компьютере Apple: месяц таблицей, стрелки для
   перехода по месяцам, год отдельным списком.

   Записаться можно только на рабочий день не раньше сегодняшнего: прошедшие
   дни и воскресенья показаны бледным и не нажимаются. Дальше 2100 года
   календарь не листается. */

const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const MONTHS_OF = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WEEK = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const LAST_YEAR = 2100
const DAY = 86400000

const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()
const pad = (n) => String(n).padStart(2, '0')
const same = (a, b) => Boolean(a && b) && +a === +b

export function formatDate(y, m, d) {
  return `${pad(d)}.${pad(m + 1)}.${y}`
}

/* Ближайший день, на который можно записаться: не в прошлом и не воскресенье */
function firstWorkday(from) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  while (d.getDay() === 0) d.setTime(d.getTime() + DAY)
  return d
}

export default function DateInput({ name = 'date', required = false, id }) {
  const [start] = useState(() => firstWorkday(new Date()))
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState(null)
  // какой месяц сейчас открыт в календаре
  const [view, setView] = useState({ year: start.getFullYear(), month: start.getMonth() })

  const value = picked ? formatDate(picked.getFullYear(), picked.getMonth(), picked.getDate()) : ''

  // клик мимо и Escape закрывают календарь
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!e.target.closest?.('.datepick')) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const { year, month } = view
  const offset = (new Date(year, month, 1).getDay() + 6) % 7   // неделя начинается с понедельника
  const total = daysInMonth(year, month)
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - offset + 1
    return d >= 1 && d <= total ? d : null
  })
  // шестая строка нужна не каждому месяцу — лишнюю не рисуем
  const rows = cells.slice(35).some(Boolean) ? 6 : 5

  const closed = (d) => {
    const date = new Date(year, month, d)
    return date < start || date.getDay() === 0
  }

  const prevOk = year > start.getFullYear() || month > start.getMonth()
  const nextOk = year < LAST_YEAR || month < 11
  const step = (n) => {
    const m = month + n
    setView({ year: year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 })
  }

  const choose = (d) => {
    setPicked(new Date(year, month, d))
    setOpen(false)
  }

  const toStart = () => {
    setView({ year: start.getFullYear(), month: start.getMonth() })
    setPicked(new Date(+start))
    setOpen(false)
  }

  return (
    <div className="datepick">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        className={`datepick__field ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-required={required}
      >
        <span className={value ? '' : 'datepick__placeholder'}>{value || 'Выберите дату'}</span>
        <Icon name="calendar" size={18} />
      </button>

      {open && (
        <div className="datepick__drop">
          <div className="cal__head">
            <button type="button" className="cal__nav" onClick={() => step(-1)} disabled={!prevOk} aria-label="Предыдущий месяц">
              <Icon name="arrow" size={18} />
            </button>
            <strong className="cal__title">{MONTHS[month]}</strong>
            <select
              className="cal__year"
              aria-label="Год"
              value={year}
              onChange={(e) => {
                const y = Number(e.target.value)
                setView({ year: y, month: y === start.getFullYear() ? Math.max(month, start.getMonth()) : month })
              }}
            >
              {Array.from({ length: LAST_YEAR - start.getFullYear() + 1 }, (_, i) => start.getFullYear() + i)
                .map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <button type="button" className="cal__nav cal__nav--next" onClick={() => step(1)} disabled={!nextOk} aria-label="Следующий месяц">
              <Icon name="arrow" size={18} />
            </button>
          </div>

          <div className="cal__week">
            {WEEK.map((d) => <span key={d}>{d}</span>)}
          </div>

          <div className="cal__grid">
            {cells.slice(0, rows * 7).map((d, i) => (
              d === null
                ? <span key={i} className="cal__day cal__day--empty" />
                : (
                  <button
                    type="button"
                    key={i}
                    className={`cal__day ${closed(d) ? 'is-off' : ''} ${same(picked, new Date(year, month, d)) ? 'is-active' : ''} ${same(start, new Date(year, month, d)) ? 'is-start' : ''}`}
                    disabled={closed(d)}
                    onClick={() => choose(d)}
                  >
                    {d}
                  </button>
                )
            ))}
          </div>

          <div className="datepick__foot">
            <span>
              {picked
                ? `${picked.getDate()} ${MONTHS_OF[picked.getMonth()]} ${picked.getFullYear()}`
                : 'вс — выходной'}
            </span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={toStart}>
              Ближайший день
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
