import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import PhoneInput from './PhoneInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import { useContent } from './ContentContext'
import { panelEnabled, sendRequest } from '../lib/panel'
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

const REQUEST_TYPE = { visit: 'zapis', ask: 'vopros', call: 'zvonok' }

export default function RequestForm({ variant = 'visit', subject, id, items }) {
  const { CATALOG, SERVICES, SITE } = useContent()
  const [sent, setSent] = useState(null)
  const [sending, setSending] = useState(false)
  const v = FORM_VARIANTS[variant] || FORM_VARIANTS.visit

  /* Заявка уходит в панель управления — владелец видит её в разделе «Заявки».
     Если панель недоступна, показываем готовый текст и способы отправить
     его вручную: сообщением или письмом. Заявка не теряется в любом случае. */
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const values = Object.fromEntries([...data.entries()].filter(([, val]) => String(val).trim()))

    const lines = [`Заявка с сайта: ${v.title.toLowerCase()}`]
    for (const [key, value] of Object.entries(values)) {
      if (LABELS[key]) lines.push(`${LABELS[key]}: ${value}`)
    }
    if (items) lines.push(`Выбрано: ${items}`)
    const text = lines.join('\n')

    if (panelEnabled) {
      setSending(true)
      try {
        await sendRequest({
          type: items ? 'zakaz' : REQUEST_TYPE[variant],
          name: values.name || '',
          phone: values.phone || '',
          email: values.email || '',
          preferred: [values.date, values.time].filter(Boolean).join(' '),
          items: items || (values.subject ? `Услуга: ${values.subject}` : ''),
          comment: values.message || '',
          page: window.location.pathname,
        })
        setSending(false)
        setSent({ accepted: true })
        return
      } catch {
        setSending(false) // панель не ответила — уходим на запасной путь
      }
    }

    setSent({
      text,
      whatsapp: `https://wa.me/${SITE.phoneHref.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`,
      mail: `mailto:${SITE.email}?subject=${encodeURIComponent(lines[0])}&body=${encodeURIComponent(text)}`,
    })
  }

  if (sent?.accepted) {
    return (
      <div className="rform rform--done">
        <span className="rform__check"><Icon name="check" size={30} /></span>
        <h3>Заявка принята</h3>
        <p>Перезвоним в рабочее время и подтвердим детали. Если нужно срочно — звоните: {SITE.phone}.</p>
        <div className="rform__send">
          <a className="btn btn-ghost" href={SITE.phoneHref}><Icon name="phone" size={18} /> {SITE.phone}</a>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setSent(null)}>Отправить ещё одну</button>
      </div>
    )
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
              <TimeInput name="time" />
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

      <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
        {sending ? 'Отправляем…' : v.submit} <Icon name="arrow" size={18} />
      </button>

      {/* Человек должен понимать, что будет дальше: кто позвонит, когда и чем это его обязывает */}
      <p className="rform__after">
        Перезвоним в рабочее время ({SITE.hours}) и подтвердим время визита.
        Запись ничего не стоит и ни к чему не обязывает.
      </p>
    </form>
  )
}
