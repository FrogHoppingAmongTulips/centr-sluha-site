import './Messengers.css'

/* Кнопки мессенджеров в их фирменных цветах.
   Значки нарисованы здесь: белый силуэт, внутренняя деталь — цветом кнопки
   (переменная --brand), поэтому логотипы выглядят как настоящие, но чужие
   файлы с чужих серверов не подгружаются. */

const GLYPHS = {
  whatsapp: (
    <>
      <path
        fill="currentColor"
        d="M12 2.1c-5.5 0-9.9 4.4-9.9 9.9 0 1.7.5 3.4 1.3 4.9L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 9.9-4.4 9.9-9.9S17.5 2.1 12 2.1Z"
      />
      <path
        fill="var(--brand)"
        d="M9.4 7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.7 2.7 4.2 3.7 2 .8 2.5.7 2.9.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3-1.7-.8c-.2-.1-.4-.2-.6.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.2-.3 0-.4.1-.5l.4-.5.3-.5c.1-.2 0-.3 0-.4L9.4 7Z"
      />
    </>
  ),
  telegram: (
    <path
      fill="currentColor"
      d="M21.7 4.4 2.8 11.7c-1 .4-1 1 0 1.3l4.8 1.5 1.8 5.6c.2.6.4.7.8.3l2.6-2.5 5 3.7c.9.5 1.5.2 1.7-.8l3.1-14.6c.2-1.1-.4-1.6-1.1-1.3ZM8.9 14.3l9.2-5.8c.4-.3.8.1.4.4L11 15.4l-.3 3.2-1.8-4.3Z"
    />
  ),
  viber: (
    <>
      <path
        fill="currentColor"
        d="M12 2.4c-5 0-9 3.5-9 7.9 0 2.4 1.2 4.6 3.1 6.1v4l3.4-2.2c.8.2 1.6.2 2.5.2 5 0 9-3.5 9-8s-4-8-9-8Z"
      />
      <path
        fill="var(--brand)"
        d="M9.6 6.8c-.2-.3-.5-.4-.8-.3-.6.2-1.1.7-1.2 1.3-.1.7.1 1.4.5 2.2.7 1.5 2.1 2.9 3.7 3.6.8.4 1.6.5 2.2.3.6-.2 1-.7 1.2-1.3.1-.3 0-.5-.3-.7l-1.6-.8c-.2-.1-.4-.1-.6.1l-.6.8c-.7-.3-1.3-.7-1.8-1.2-.5-.5-.9-1.1-1.2-1.8l.8-.6c.2-.2.2-.4.1-.6l-.4-1Z"
      />
      <path fill="none" stroke="var(--brand)" strokeWidth="1.2" strokeLinecap="round" d="M12.9 5.9c1.5.3 2.6 1.4 2.9 2.9" />
    </>
  ),
  vk: (
    <path
      fill="currentColor"
      d="M12.7 16.4c-5 0-7.9-3.5-8-9.2h2.5c.1 4.2 1.9 6 3.4 6.4V7.2h2.4v3.6c1.4-.2 2.9-1.8 3.4-3.6h2.4c-.4 2.2-2 3.8-3.1 4.5 1.1.5 3 1.9 3.7 4.7h-2.7c-.6-1.7-1.9-3.1-3.7-3.3v3.3h-.3Z"
    />
  ),
  mail: (
    <path
      fill="currentColor"
      d="M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Zm8 8.1 7.4-4.9c-.2-.1-.3-.2-.5-.2H5.1c-.2 0-.4.1-.5.2L12 13.1Z"
    />
  ),
}

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
          <svg width={size === 'big' ? 20 : 18} height={size === 'big' ? 20 : 18} viewBox="0 0 24 24" aria-hidden="true">
            {GLYPHS[kind]}
          </svg>
          <span>{NAMES[kind]}</span>
        </a>
      ))}
    </div>
  )
}
