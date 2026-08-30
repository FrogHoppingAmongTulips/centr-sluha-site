import { useState } from 'react'

/* Поле телефона.
   Пустое до первого символа: «+» подставляется, как только человек ввёл цифру.

   Российский номер набирается под маской +7 (931) 859-53-24 — неважно,
   начали с 7, 8 или сразу с 9.
   Если ввод начали со знака «+», номер считается зарубежным и остаётся
   сплошным числом: чужую разбивку по разрядам мы не угадываем. */

const RU_LENGTH = 10 // цифр после кода страны

export function formatPhone(value, foreign = false) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return value.trim().startsWith('+') ? '+' : ''
  if (foreign) return `+${digits}`

  const first = digits[0]
  const withCode = first === '7' || first === '8' // код страны ввели сами
  const ruMobile = first === '9'                  // мобильный без кода
  if (!withCode && !ruMobile) return `+${digits}`

  const d = withCode ? digits.slice(1) : digits
  if (d.length > RU_LENGTH) return `+7${d}` // цифр больше нужного — сплошным числом

  let out = '+7'
  if (d.length > 0) out += ` (${d.slice(0, 3)}`
  if (d.length >= 3) out += ')'
  if (d.length > 3) out += ` ${d.slice(3, 6)}`
  if (d.length > 6) out += `-${d.slice(6, 8)}`
  if (d.length > 8) out += `-${d.slice(8, 10)}`
  return out
}

export default function PhoneInput({ name = 'phone', required = false, id }) {
  const [value, setValue] = useState('')
  // режим определяется первым символом: «+» — зарубежный номер
  const [foreign, setForeign] = useState(false)

  const onChange = (e) => {
    const raw = e.target.value
    if (!raw) {
      setForeign(false)
      setValue('')
      return
    }
    let mode = foreign
    if (!value) {
      mode = raw.trim().startsWith('+')
      setForeign(mode)
    }
    setValue(formatPhone(raw, mode))
  }

  return (
    <input
      type="tel"
      inputMode="tel"
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={onChange}
      autoComplete="tel"
    />
  )
}
