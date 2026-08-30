import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Wheel from './Wheel'
import './DateInput.css'

/* Выбор даты барабаном, как на телефоне: число, месяц, год.
   Назад листать нельзя — прошедшие дни в барабан не попадают, самый ранний
   вариант всегда сегодняшний. Верхняя граница — 2100 год. */

const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const MONTHS_OF = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WEEKDAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const LAST_YEAR = 2100

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
const pad = (n) => String(n).padStart(2, '0')

export function formatDate(y, m, d) {
  return `${pad(d)}.${pad(m + 1)}.${y}`
}

export default function DateInput({ name = 'date', required = false, id }) {
  const today = useRef(new Date()).current
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState(false)
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [day, setDay] = useState(today.getDate())

  const value = picked ? formatDate(year, month, day) : ''

  // что показывать в барабанах: раньше сегодняшнего дня выбрать нечего
  const years = range(today.getFullYear(), LAST_YEAR)
  const firstMonth = year === today.getFullYear() ? today.getMonth() : 0
  const months = range(firstMonth, 11)
  const firstDay = year === today.getFullYear() && month === today.getMonth() ? today.getDate() : 1
  // воскресенье центр не работает — такой день выбрать нельзя
  const days = range(firstDay, daysInMonth(year, month)).filter((d) => new Date(year, month, d).getDay() !== 0)

  /* сдвинули год или месяц назад — подтягиваем месяц и число вперёд,
     чтобы в поле не осталась вчерашняя дата */
  useEffect(() => {
    if (month < firstMonth) setMonth(firstMonth)
    else if (!days.includes(day)) setDay(days[0])
  }, [year, month, day, firstMonth, days])

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

  const pick = (setter) => (v) => { setter(v); setPicked(true) }
  const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate()

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
              values={days}
              value={day}
              onChange={pick(setDay)}
              label="Число"
              minWidth={86}
              render={(d) => `${d} ${WEEKDAYS[new Date(year, month, d).getDay()]}`}
            />
            <Wheel values={months} value={month} onChange={pick(setMonth)} label="Месяц" render={(m) => MONTHS[m]} minWidth={112} />
            <Wheel values={years} value={year} onChange={pick(setYear)} label="Год" minWidth={72} />
          </div>
          <div className="datepick__foot">
            <span>
              {isToday ? 'сегодня' : `${WEEKDAYS[new Date(year, month, day).getDay()]}, ${day} ${MONTHS_OF[month]}`}
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
