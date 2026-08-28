import './Messengers.css'

/* Кнопки мессенджеров: подпись на фирменном цвете, без значков. */

const NAMES = {
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  viber: 'Viber',
  vk: 'ВКонтакте',
  mail: 'Почта',
}

/* links — набор из панели: { whatsapp, telegram, vk, viber }, mail — почта центра */
export default function Messengers({ links, mail, size = 'normal' }) {
  const items = [
    ['whatsapp', links?.whatsapp],
    ['telegram', links?.telegram],
    ['viber', links?.viber],
    ['vk', links?.vk],
    ['mail', mail ? `mailto:${mail}` : null],
  ].filter(([, href]) => href)

  if (!items.length) return null

  return (
    <div className={`msgr ${size === 'big' ? 'msgr--big' : ''}`}>
      {items.map(([kind, href]) => (
        <a
          key={kind}
          className={`msgr__btn msgr__btn--${kind}`}
          href={href}
          target={kind === 'mail' ? undefined : '_blank'}
          rel="noreferrer"
        >
          <span>{NAMES[kind]}</span>
        </a>
      ))}
    </div>
  )
}
