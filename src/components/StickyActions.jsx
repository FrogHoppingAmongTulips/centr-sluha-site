import { useEffect, useState } from 'react'
import Icon from './Icon'
import './StickyActions.css'

/* У правого края осталась одна кнопка — «наверх».
   Запись и звонок и так есть в шапке, в подвале и в нижней панели на телефоне. */
export default function StickyActions() {
  const [up, setUp] = useState(false)

  useEffect(() => {
    const onScroll = () => setUp(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky-actions">
      <button
        className={`sticky-actions__up ${up ? 'is-visible' : ''}`}
        onClick={() => {
          // плавно и до упора: у части браузеров scrollTo на sticky-шапке останавливается раньше
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          window.setTimeout(() => {
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
          }, 600)
        }}
        aria-label="Наверх"
        tabIndex={up ? 0 : -1}
      >
        <Icon name="arrow" size={20} />
      </button>
    </div>
  )
}
