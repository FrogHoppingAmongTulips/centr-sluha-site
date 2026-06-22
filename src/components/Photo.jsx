import { useState } from 'react'

// Картинка с мягким фолбэком: если фото не загрузилось,
// остаётся декоративный градиент родителя (класс .has-fallback).
export default function Photo({ src, alt = '', className = '' }) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setOk(false)}
    />
  )
}
