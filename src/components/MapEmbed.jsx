import { SITE } from '../data/site'
import Icon from './Icon'
import './MapEmbed.css'

/* Карта Яндекса без ключа и без счётчиков: подгружается только когда доехали до блока.
   coords — [широта, долгота]; подпись и ссылка ведут на полноразмерную карту. */
export default function MapEmbed({ coords = SITE.coords, address = SITE.address, zoom = 16, className = '' }) {
  const [lat, lon] = coords
  const point = `${lon},${lat}`
  const src = `https://yandex.ru/map-widget/v1/?ll=${point}&z=${zoom}&pt=${point},pm2rdm`
  const full = `https://yandex.ru/maps/?ll=${point}&z=${zoom}&pt=${point}`

  return (
    <div className={`ymap ${className}`}>
      <iframe src={src} title={`Карта: ${address}`} loading="lazy" allowFullScreen />
      <a className="ymap__note" href={full} target="_blank" rel="noreferrer">
        <Icon name="pin" size={15} /> {address}
      </a>
    </div>
  )
}
