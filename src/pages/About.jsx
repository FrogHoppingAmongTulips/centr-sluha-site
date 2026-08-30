import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import Seo from '../components/Seo'
import { useRequestForm } from '../components/RequestModal'
import { useContent } from '../components/ContentContext'
import { ADVANTAGES, STEPS, STATS, BRANDS, FAQ } from '../data/site'
import './Pages.css'
import './Sections.css'

/* Подробный рассказ о центре: почему к нам, как проходит подбор, вопросы.
   На главной остаётся короткая визитка со ссылкой сюда. */
export default function About() {
  const { SITE, CENTERS } = useContent()
  const openForm = useRequestForm()
  const main = CENTERS[0]

  return (
    <>
      <Seo
        title="О центре"
        description="Центр слуха в Краснодаре: как проходит подбор аппарата, почему к нам обращаются, ответы на частые вопросы."
        path="/about"
      />
      <PageHero
        crumbs={[{ label: 'О центре' }]}
        eyebrow="О нас"
        title="Центр слуха в Краснодаре"
        text="Проверяем слух, подбираем и настраиваем аппараты, обслуживаем их после покупки. Работаем с людьми, а не с диагнозами: объясняем понятным языком и не продаём лишнего."
      />

      {/* Кто мы */}
      <section className="section section--tight" style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
        <div className="container about-split">
          <Reveal>
            <Ph ratio="4 / 3" src="/photo/consult.webp" alt="Приём сурдолога" fit="cover" className="about-split__ph" />
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">Как мы работаем</span>
            <h2>Сначала слух, потом аппарат</h2>
            <p className="lead">
              Подбор начинается с теста слуха: без него аппарат настроить нельзя. Тест и консультация занимают
              около 40 минут и ничего не стоят — заключение остаётся у вас, даже если покупать вы ничего не станете.
            </p>
            <ul className="form-split__list">
              <li><Icon name="check" size={16} /> Сурдолог объясняет результат понятным языком</li>
              <li><Icon name="check" size={16} /> Предлагаем варианты в вашем бюджете, а не самый дорогой</li>
              <li><Icon name="check" size={16} /> Настраиваем и донастраиваем без доплат</li>
            </ul>
            <div className="acard__actions" style={{ marginTop: 20 }}>
              <button className="btn btn-primary" onClick={() => openForm('visit')}>Записаться на тест слуха</button>
              <Link to="/catalog" className="btn btn-ghost">Смотреть каталог</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Цифры */}
      <section className="stats">
        <div className="container stats__grid">
          {STATS.map((s, i) => (
            <Reveal className="stats__item" key={i}>
              <div className="stats__value">{s.value}<span>{s.suffix}</span></div>
              <div className="stats__label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Почему к нам */}
      <section className="section">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Почему к нам</span>
              <h2>Что важно знать до визита</h2>
            </div>
            <button className="link-more" onClick={() => openForm('ask')}>Задать вопрос <Icon name="arrow" size={18} /></button>
          </Reveal>
          <div className="adv__grid">
            {ADVANTAGES.map((a, i) => (
              <Reveal className="adv__item" key={i} delay={i * 60}>
                <span className="adv__ic"><Icon name={a.icon} size={22} /></span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="container steps">
          {STEPS.map((s, i) => (
            <Reveal className="step" key={i} delay={i * 60}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Бренды */}
      <section className="section section--sand">
        <div className="container">
          <Reveal className="section-head" style={{ textAlign: 'center', marginInline: 'auto' }}>
            <span className="eyebrow">Производители</span>
            <h2>С чем работаем</h2>
          </Reveal>
          <Reveal className="brands" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
            {BRANDS.map((b) => <span key={b} className="brands__logo">{b}</span>)}
          </Reveal>
        </div>
      </section>

      {/* Вопросы */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head" style={{ textAlign: 'center', marginInline: 'auto' }}>
            <span className="eyebrow">Частые вопросы</span>
            <h2>Отвечаем коротко</h2>
          </Reveal>
          <Reveal><Faq items={FAQ} /></Reveal>
        </div>
      </section>

      {/* Куда приходить */}
      <section className="section section--tight">
        <div className="container">
          <div className="band">
            <div>
              <h2>Приходите на тест слуха</h2>
              <p className="lead">{main.address}. Записаться можно по телефону {SITE.phone}.</p>
            </div>
            <button className="btn btn-primary" onClick={() => openForm('visit')}>Записаться <Icon name="arrow" size={18} /></button>
          </div>
        </div>
      </section>
    </>
  )
}
