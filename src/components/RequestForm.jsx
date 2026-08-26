import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import PhoneInput from './PhoneInput'
import DateInput from './DateInput'
import { CATALOG, SERVICES } from '../data/site'
import './RequestForm.css'

/* Три типа форм: запись на приём, вопрос специалисту, обратный звонок */
export const FORM_VARIANTS = {
  visit: {
    key: 'visit',
    tab: 'Запись на приём',
    title: 'Записаться на приём',
    text: 'Выберите удобный день — перезвоним и подтвердим время',
    submit: 'Записаться',
  },
  ask: {
    key: 'ask',
    tab: 'Вопрос',
    title: 'Задать вопрос сурдологу',
    text: 'Ответим в течение рабочего дня',
    submit: 'Отправить вопрос',
  },
  call: {
    key: 'call',
    tab: 'Обратный звонок',
    title: 'Заказать звонок',
    text: 'Оставьте имя и телефон — перезвоним',
    submit: 'Жду звонка',
  },
}

function Field({ label, children }) {
  return <label className="rform__field"><span>{label}</span>{children}</label>
}

export default function RequestForm({ variant = 'visit', subject, id }) {
  const [sent, setSent] = useState(false)
  const v = FORM_VARIANTS[variant] || FORM_VARIANTS.visit

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rform rform--done">
        <span className="rform__check"><Icon name="check" size={30} /></span>
        <h3>Заявка отправлена</h3>
        <p>Перезвоним в рабочее время и подтвердим детали.</p>
        <button className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>Отправить ещё одну</button>
      </div>
    )
  }

  return (
    <form className="rform" onSubmit={onSubmit} id={id}>
      <div className="rform__row">
        <Field label="Имя"><input type="text" name="name" required /></Field>
        <Field label="Телефон"><PhoneInput name="phone" required /></Field>
      </div>

      {variant === 'ask' && (
        <Field label="Почта, если удобнее письмом"><input type="email" name="email" placeholder="you@mail.ru" /></Field>
      )}

      {variant === 'visit' && (
        <>
          <Field label="Цель визита">
            <select name="subject" defaultValue={subject || 'checkup'}>
              <option value="checkup">Тест слуха — бесплатно</option>
              {SERVICES.slice(1).map((s) => <option key={s.title} value={s.title}>{s.title} — {s.price}</option>)}
              {CATALOG.map((i) => <option key={i.slug} value={i.slug}>Примерка: {i.title}</option>)}
            </select>
          </Field>
          <div className="rform__row">
            <Field label="Дата"><DateInput name="date" /></Field>
            {/* время приёма пока не выбирается — подтверждаем по телефону */}
            <Field label="Время">
              <input type="text" name="time" value="1:00" readOnly disabled />
            </Field>
          </div>
        </>
      )}

      {variant !== 'call' && (
        <Field label={variant === 'ask' ? 'Вопрос' : 'Комментарий'}>
          <textarea name="message" rows={variant === 'ask' ? 5 : 3} />
        </Field>
      )}

      <label className="rform__consent">
        <input type="checkbox" required />
        <span>
          Согласен на <Link to="/consent">обработку персональных данных</Link> и принимаю <Link to="/privacy">политику конфиденциальности</Link>.
        </span>
      </label>

      <button type="submit" className="btn btn-primary btn-block">
        {v.submit} <Icon name="arrow" size={18} />
      </button>
    </form>
  )
}
