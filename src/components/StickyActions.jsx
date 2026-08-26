import { useEffect, useState } from 'react'
import Icon from './Icon'
import { useRequestForm } from './RequestModal'
import './StickyActions.css'

/* Липкие кнопки у правого края: запись, обратный звонок, вопрос и «наверх».
   Кнопка «наверх» присутствует всегда — иначе её появление сдвигало бы остальные. */
export default function StickyActions() {
  const openForm = useRequestForm()
  const [up, setUp] = useState(false)

  useEffect(() => {
    const onScroll = () => setUp(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky-actions">
      <button onClick={() => openForm('visit')} aria-label="Записаться на приём"><Icon name="calendar" size={20} /></button>
      <button onClick={() => openForm('call')} aria-label="Заказать звонок"><Icon name="phone" size={20} /></button>
      <button onClick={() => openForm('ask')} aria-label="Задать вопрос"><Icon name="chat" size={20} /></button>
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
