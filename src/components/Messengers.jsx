import './Messengers.css'

/* Кнопки мессенджеров в их фирменных цветах.
   Значки нарисованы здесь: белый силуэт, внутренняя деталь — цветом кнопки
   (переменная --brand), поэтому логотипы выглядят как настоящие, но чужие
   файлы с чужих серверов не подгружаются. */

const GLYPHS = {
  /* пузырь с хвостом слева-внизу и трубка внутри */
  whatsapp: (
    <>
      <path
        fill="none" stroke="currentColor" strokeWidth="1.7"
        d="M12 3.6a8.4 8.4 0 0 0-7.2 12.8l.2.3-.9 3.2 3.3-.9.3.2A8.4 8.4 0 1 0 12 3.6Z"
      />
      <path
        fill="currentColor"
        d="M9.5 7.9c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.5 2.4 3.7 3.3 1.8.7 2.2.6 2.6.5.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.4-.2-1.5-.7c-.2-.1-.3-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.8-1.1-.7-.6-1.1-1.3-1.3-1.6-.1-.2 0-.3.1-.4l.4-.4.2-.4c.1-.1 0-.3 0-.4L9.5 7.9Z"
      />
    </>
  ),

  /* самолётик с загнутым крылом */
  telegram: (
    <path
      fill="currentColor"
      d="m9.8 14.9-.2 3.2c.3 0 .5-.2.7-.4l1.7-1.7 3.6 2.6c.7.4 1.1.2 1.3-.6l2.3-10.9c.2-1-.3-1.4-1-1.1L4.8 11.2c-.9.4-.9.9-.2 1.1l3.5 1.1L16.3 8c.4-.2.7-.1.4.2l-6.9 6.7Z"
    />
  ),

  /* скруглённый пузырь, трубка и три дужки сигнала */
  viber: (
    <>
      <path
        fill="none" stroke="currentColor" strokeWidth="1.7"
        d="M12 3.6c-4.6 0-8.3 3.3-8.3 7.5 0 2.4 1.2 4.5 3.1 5.9v3l2.6-2c.8.2 1.7.3 2.6.3 4.6 0 8.3-3.3 8.3-7.4S16.6 3.6 12 3.6Z"
      />
      <path
        fill="currentColor"
        d="M9.6 7.4c-.3-.3-.6-.3-.9-.1-.5.3-.9.8-.9 1.4 0 .7.3 1.4.7 2.1.7 1.2 1.8 2.3 3 2.9.7.3 1.4.4 1.9.1.5-.3.9-.8 1-1.3.1-.3 0-.5-.3-.7l-1.4-.7c-.2-.1-.4-.1-.6.1l-.5.7c-.6-.3-1.1-.7-1.6-1.2-.4-.5-.7-1-.9-1.5l.7-.5c.2-.2.2-.4.1-.6l-.3-.7Z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" d="M13.4 7c.9.2 1.6.9 1.8 1.8M13.1 8.6c.5.1.9.5 1 1" />
    </>
  ),

  /* фирменная «VK» с загнутой ножкой */
  vk: (
    <path
      fill="currentColor"
      d="M12.9 16.5c-5.3 0-8.4-3.6-8.5-9.7h2.7c.1 4.4 2 6.3 3.6 6.7V6.8h2.5v3.8c1.5-.2 3.2-1.9 3.7-3.8h2.5c-.4 2.3-2.1 4-3.3 4.7 1.2.6 3.1 2.1 3.9 4.5h-2.8c-.6-1.8-2.1-3.3-4-3.5v3.5h-.3Z"
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
