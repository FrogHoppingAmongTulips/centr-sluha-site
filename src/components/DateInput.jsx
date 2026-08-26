import { useState } from 'react'

/* Дата в привычном для России виде: ДД.ММ.ГГГГ.
   Родное поле type="date" показывает формат по языку браузера
   (у многих это dd/mm/yyyy), поэтому маску набираем сами. */

export function formatDate(value) {
  const d = value.replace(/\D/g, '').slice(0, 8)
  const day = d.slice(0, 2)
  const month = d.slice(2, 4)
  const year = d.slice(4, 8)

  let out = day
  if (d.length > 2) out += `.${month}`
  if (d.length > 4) out += `.${year}`
  return out
}

export default function DateInput({ name = 'date', required = false, id }) {
  const [value, setValue] = useState('')

  return (
    <input
      type="text"
      inputMode="numeric"
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={(e) => setValue(formatDate(e.target.value))}
      placeholder="ДД.ММ.ГГГГ"
      maxLength={10}
      autoComplete="off"
    />
  )
}
