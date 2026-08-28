import Icon from './Icon'
import { useRequestForm } from './RequestModal'
import { useContent } from './ContentContext'
import './MobileBar.css'

/* Нижняя панель для телефона: два главных действия всегда под рукой.
   На широких экранах её заменяют липкие кнопки справа. */
export default function MobileBar() {
  const { SITE } = useContent()
  const openForm = useRequestForm()
  return (
    <div className="mbar">
      <a className="mbar__call" href={SITE.phoneHref}>
        <Icon name="phone" size={19} /> Позвонить
      </a>
      <button className="mbar__book" onClick={() => openForm('visit')}>
        <Icon name="calendar" size={19} /> Записаться
      </button>
    </div>
  )
}
