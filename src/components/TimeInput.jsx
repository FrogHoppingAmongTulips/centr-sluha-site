import { useState } from 'react'

/* Время в виде ЧЧ:ММ — человек сам решает, во сколько ему удобно.
   Часы больше 23 и минуты больше 59 не пропускаем. */

export function formatTime(value) {
  const d = value.replace(/\D/g, '').slice(0, 4)
  if (!d) return ''

  let hh = d.slice(0, 2)
  if (hh.length === 1 && Number(hh) > 2) hh = `0${hh}`
  if (hh.length === 2 && Number(hh) > 23) hh = '23'

  if (d.length <= 2) return hh

  let mm = d.slice(2, 4)
  if (mm.length === 2 && Number(mm) > 59) mm = '59'
  return `${hh}:${mm}`
}

export default function TimeInput({ name = 'time', required = false, id }) {
  const [value, setValue] = useState('')

  return (
    <input
      type="text"
      inputMode="numeric"
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={(e) => setValue(formatTime(e.target.value))}
      placeholder="ЧЧ:ММ"
      maxLength={5}
      autoComplete="off"
    />
  )
}
