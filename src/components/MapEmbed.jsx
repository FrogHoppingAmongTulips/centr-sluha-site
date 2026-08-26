import { useEffect, useState } from 'react'
import { SITE } from '../data/site'
import Icon from './Icon'
import './MapEmbed.css'

/* Карта Яндекса без ключа и счётчиков.
   Поверх карты лежит прозрачный слой: клик по нему открывает Яндекс.Карты
   в новой вкладке. Кнопка «развернуть» увеличивает карту прямо на странице —
   там ею уже можно двигать и приближать.
   coords — [широта, долгота]. */
export default function MapEmbed({ coords = SITE.coords, address = SITE.address, zoom = 16, className = '' }) {
  const [big, setBig] = useState(false)
  const [lat, lon] = coords
  const point = `${lon},${lat}`
  const src = (z) => `https://yandex.ru/map-widget/v1/?ll=${point}&z=${z}&pt=${point},pm2rdm`
  const full = `https://yandex.ru/maps/?ll=${point}&z=${zoom}&pt=${point}`

  useEffect(() => {
    if (!big) return
    const onKey = (e) => { if (e.key === 'Escape') setBig(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [big])

  return (
    <>
      <div className={`ymap ${className}`}>
        <iframe src={src(zoom)} title={`Карта: ${address}`} loading="lazy" />

        <a className="ymap__hit" href={full} target="_blank" rel="noreferrer" aria-label="Открыть на Яндекс.Картах">
          <span className="ymap__hint">Открыть на Яндекс.Картах <Icon name="arrow" size={16} /></span>
        </a>

        <span className="ymap__addr"><Icon name="pin" size={15} /> {address}</span>

        <button className="ymap__zoom" onClick={() => setBig(true)} aria-label="Развернуть карту">
          <Icon name="search" size={18} />
        </button>
      </div>

      {big && (
        <div className="ymap-full" onMouseDown={(e) => { if (e.target === e.currentTarget) setBig(false) }}>
          <div className="ymap-full__box" role="dialog" aria-modal="true" aria-label={`Карта: ${address}`}>
            <div className="ymap-full__head">
              <span><Icon name="pin" size={17} /> {address}</span>
              <div className="ymap-full__actions">
                <a href={full} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">Яндекс.Карты</a>
                <button className="ymap-full__close" onClick={() => setBig(false)} aria-label="Закрыть">
                  <Icon name="close" size={20} />
                </button>
              </div>
            </div>
            <iframe src={src(zoom + 1)} title={`Карта крупнее: ${address}`} />
          </div>
        </div>
      )}
    </>
  )
}
