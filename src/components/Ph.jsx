import { useState } from 'react'

/* Слот изображения.
   Есть src и файл загрузился — показываем фото.
   Нет src или файла — чёрный блок на месте будущего снимка. */
export default function Ph({ ratio = '4 / 3', h, className = '', style, onDark = false, src, alt = '', fit = 'contain' }) {
  const [failed, setFailed] = useState(false)
  const box = h ? { height: h, ...style } : { aspectRatio: ratio, ...style }

  if (src && !failed) {
    return (
      <div className={`ph ph--img ${className}`} style={box}>
        <img src={src} alt={alt} loading="lazy" style={{ objectFit: fit }} onError={() => setFailed(true)} />
      </div>
    )
  }

  return (
    <div
      className={`ph ${onDark ? 'ph--on-dark' : ''} ${className}`}
      style={box}
      role="img"
      aria-label={alt || 'Фото'}
    />
  )
}
