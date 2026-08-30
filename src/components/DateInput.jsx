import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Wheel from './Wheel'
import './DateInput.css'

/* Выбор даты барабаном, как на телефоне: число, месяц, год.

   Числа и месяцы крутятся по кругу: после 31-го снова 1-е, после декабря —
   январь. Но выбрать можно только рабочий день не раньше сегодняшнего:
   прошедшие дни и воскресенья показаны бледным, и барабан на них не встаёт —
   переходит к ближайшему подходящему дню. Годы идут списком до 2100-го. */

const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const MONTHS_OF = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WEEKDAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const LAST_YEAR = 2100
const DAY = 86400000

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
const pad = (n) => String(n).padStart(2, '0')

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
  const today = useRef(new Date()).current
  const start = useRef(firstWorkday(today)).current

  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState(false)
  const [date, setDate] = useState(start)
  // почему барабан не встал туда, куда его крутили
  const [note, setNote] = useState('')

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const value = picked ? formatDate(year, month, day) : ''

  const days = range(1, daysInMonth(year, month))
  const months = range(0, 11)
  const years = range(start.getFullYear(), LAST_YEAR)

  // день недоступен, если он уже прошёл или это воскресенье
  const offDay = (d) => {
    const test = new Date(year, month, d)
    return test < start || test.getDay() === 0
  }
  const offMonth = (m) => new Date(year, m, daysInMonth(year, m)) < start

  /* Собираем дату из того, что выбрали в барабанах. Если такой даты нет
     (31 апреля) или на неё нельзя записаться — берём ближайшую подходящую. */
  const move = (y, m, d) => {
    const yy = Math.min(Math.max(y, start.getFullYear()), LAST_YEAR)
    const wanted = new Date(yy, m, Math.min(d, daysInMonth(yy, m)))
    const next = wanted < start ? start : firstWorkday(wanted)
    // каждый раз новый объект: иначе при возврате к той же дате барабан
    // не перерисуется и останется стоять на недоступном дне
    setDate(new Date(+next))
    setPicked(true)
    // объясняем перескок, иначе выглядит как будто барабан не слушается
    if (+next === +wanted) setNote('')
    else if (wanted < start) setNote('этот день уже прошёл')
    else setNote('воскресенье — выходной')
  }

  // клик мимо и Escape закрывают барабан
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

  const isToday = +date === +firstWorkday(today) && date.getDate() === today.getDate()

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
          <div className="datepick__wheels">
            <span className="datepick__band" aria-hidden="true" />
            <Wheel
              loop
              values={days}
              value={day}
              onChange={(d) => move(year, month, d)}
              isOff={offDay}
              label="Число"
              minWidth={86}
              render={(d) => `${d} ${WEEKDAYS[new Date(year, month, d).getDay()]}`}
            />
            <Wheel
              loop
              values={months}
              value={month}
              /* прокрутили месяцы дальше декабря — год сам переходит на следующий */
              onChange={(m, cycles) => move(year + cycles, m, day)}
              isOff={offMonth}
              label="Месяц"
              minWidth={112}
              render={(m) => MONTHS[m]}
            />
            <Wheel
              values={years}
              value={year}
              onChange={(y) => move(y, month, day)}
              label="Год"
              minWidth={72}
            />
          </div>
          <div className="datepick__foot">
            <span className={note ? 'datepick__note' : ''}>
              {note || (isToday ? 'сегодня' : `${WEEKDAYS[date.getDay()]}, ${day} ${MONTHS_OF[month]}`)}
            </span>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => { setPicked(true); setOpen(false) }}>
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
