import './Messengers.css'

/* Кнопки мессенджеров: подпись на фирменном цвете, без значков. */

const NAMES = {
  max: 'MAX',
  mail: 'Почта',
}

/* links — набор из панели: { max }, mail — почта центра */
export default function Messengers({ links, mail, size = 'normal' }) {
  const items = [
    ['max', links?.max],
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
