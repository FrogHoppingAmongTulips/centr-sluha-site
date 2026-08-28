import './Messengers.css'

/* Кнопки мессенджеров в их фирменных цветах.
   Значки нарисованы здесь же: чужие файлы с логотипами не подгружаем,
   чтобы кнопки работали даже без интернета и не зависели от чужих серверов. */

const LINE = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }

/* Значки белые на цветной кнопке: узнаваемый силуэт, без чужих файлов с логотипами */
const GLYPHS = {
  whatsapp: (
    <>
      <path {...LINE} d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.4 20.6l4.2-1.1A8.8 8.8 0 1 0 12 3.2Z" />
      <path {...LINE} d="M9.2 8.1c.2 1.2.8 2.3 1.7 3.2.9.9 2 1.5 3.2 1.7l.7-1 1.6.8c-.2 1-1.1 1.6-2.1 1.5a7.7 7.7 0 0 1-6.4-6.4c-.1-1 .5-1.9 1.5-2.1l.8 1.6-1 .7Z" />
    </>
  ),
  telegram: (
    <path
      fill="currentColor"
      d="M21.7 4.5 2.9 11.6c-1 .4-1 1 0 1.3l4.6 1.4 1.8 5.4c.2.5.5.6.9.2l2.4-2.3 4.8 3.5c.8.5 1.4.2 1.6-.8l3-14.6c.2-1.1-.5-1.6-1.3-1.2ZM8.7 14.1l9.2-5.8c.4-.3.8.1.4.4l-7.5 6.8-.3 3-1.8-4.4Z"
    />
  ),
  viber: (
    <>
      <path {...LINE} d="M12 3c-4.7 0-8.3 3.2-8.3 7.3 0 2.3 1.1 4.4 3 5.7v3.4l3-1.9c.7.1 1.5.2 2.3.2 4.7 0 8.3-3.2 8.3-7.4C20.3 6.2 16.7 3 12 3Z" />
      <path {...LINE} d="M9.4 7.6c.2 1 .7 2 1.5 2.7.7.8 1.7 1.3 2.7 1.5l.6-.9 1.5.8c-.2.9-1 1.4-1.9 1.3a6.8 6.8 0 0 1-5.6-5.6c-.1-.9.4-1.7 1.3-1.9l.8 1.5-.9.6Z" />
      <path {...LINE} strokeWidth="1.5" d="M13.3 5.9c1.4.3 2.5 1.4 2.8 2.8" />
    </>
  ),
  vk: (
    <text
      x="12"
      y="16.6"
      textAnchor="middle"
      fontSize="11.5"
      fontWeight="800"
      fontFamily="inherit"
      fill="currentColor"
      letterSpacing="-0.5"
    >
      VK
    </text>
  ),
  mail: (
    <>
      <rect {...LINE} x="3" y="5" width="18" height="14" rx="3" />
      <path {...LINE} d="m4.5 8 7.5 5 7.5-5" />
    </>
  ),
}

const NAMES = {
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  viber: 'Viber',
  vk: 'ВКонтакте',
  mail: 'Письмом',
}

function Glyph({ kind }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      {GLYPHS[kind]}
    </svg>
  )
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
          <Glyph kind={kind} />
          <span>{NAMES[kind]}</span>
        </a>
      ))}
    </div>
  )
}
