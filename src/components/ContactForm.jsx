import { useState } from 'react'
import Icon from './Icon'
import './ContactForm.css'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="cform cform--done">
        <span className="cform__check"><Icon name="check" size={30} /></span>
        <h3>Заявка отправлена</h3>
        <p>Спасибо! Наш координатор свяжется с вами в течение рабочего дня, чтобы подобрать удобное время.</p>
      </div>
    )
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <div className="cform__row">
        <label>Имя
          <input type="text" name="name" required placeholder="Как к вам обращаться" />
        </label>
        <label>Телефон
          <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__" />
        </label>
      </div>
      <label>Кто обращается
        <select name="role" defaultValue="patient">
          <option value="patient">Пациент</option>
          <option value="relative">Родственник</option>
          <option value="doctor">Лечащий врач</option>
          <option value="other">Другое</option>
        </select>
      </label>
      <label>Коротко о ситуации
        <textarea name="message" rows="4" placeholder="Что беспокоит со слухом, есть ли аппарат, нужна ли льгота" />
      </label>
      <label className="cform__consent">
        <input type="checkbox" required />
        <span>Согласен(а) на обработку персональных данных</span>
      </label>
      <button type="submit" className="btn btn-primary cform__submit">
        Отправить заявку <Icon name="arrow" size={18} />
      </button>
    </form>
  )
}
