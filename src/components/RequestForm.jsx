import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import PhoneInput from './PhoneInput'
import DateInput from './DateInput'
import { CATALOG, SERVICES, SITE } from '../data/site'
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

const LABELS = {
  name: 'Имя', phone: 'Телефон', email: 'Почта', subject: 'Услуга',
  date: 'Дата', time: 'Время', message: 'Комментарий',
}

export default function RequestForm({ variant = 'visit', subject, id }) {
  const [sent, setSent] = useState(null)
  const v = FORM_VARIANTS[variant] || FORM_VARIANTS.visit

  /* Сервера у сайта нет, поэтому заявку не «проглатываем»: собираем текст
     и отдаём человеку готовые способы отправки — сообщение или письмо.
     Когда появится CRM, здесь останется один запрос на сервер. */
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const lines = [`Заявка с сайта: ${v.title.toLowerCase()}`]
    for (const [key, value] of data.entries()) {
      if (LABELS[key] && String(value).trim()) lines.push(`${LABELS[key]}: ${value}`)
    }
    const text = lines.join('\n')
    setSent({
      text,
      whatsapp: `https://wa.me/${SITE.phoneHref.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`,
      mail: `mailto:${SITE.email}?subject=${encodeURIComponent(lines[0])}&body=${encodeURIComponent(text)}`,
    })
  }

  if (sent) {
    return (
      <div className="rform rform--done">
        <span className="rform__check"><Icon name="check" size={30} /></span>
        <h3>Заявка готова</h3>
        <p>Отправьте её удобным способом — ответим в рабочее время. Или просто позвоните.</p>
        <div className="rform__send">
          <a className="btn btn-primary" href={sent.whatsapp} target="_blank" rel="noreferrer">
            <Icon name="chat" size={18} /> Отправить сообщением
          </a>
          <a className="btn btn-ghost" href={sent.mail}>
            <Icon name="mail" size={18} /> Письмом
          </a>
          <a className="btn btn-ghost" href={SITE.phoneHref}>
            <Icon name="phone" size={18} /> {SITE.phone}
          </a>
        </div>
        <pre className="rform__preview">{sent.text}</pre>
        <button className="btn btn-ghost btn-sm" onClick={() => setSent(null)}>Заполнить заново</button>
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
