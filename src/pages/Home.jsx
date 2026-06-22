import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import Faq from '../components/Faq'
import { SERVICES, STEPS, STATS, ADVANTAGES, LOCATIONS, FAQ, SITE, IMAGES } from '../data/site'
import './Home.css'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">Новый центр слуха в Москве</span>
            <h1>Возвращаем радость&nbsp;слышать</h1>
            <p className="lead">Диагностика слуха, подбор и настройка слуховых аппаратов, детская сурдология. Опытные сурдологи, честный подбор и бесплатная первая проверка слуха.</p>
            <div className="hero__cta">
              <Link to="/contacts" className="btn btn-primary">Бесплатная проверка слуха <Icon name="arrow" size={18} /></Link>
              <Link to="/services" className="btn btn-ghost">Наши услуги</Link>
            </div>
            <div className="hero__trust">
              <a href={SITE.phoneHref} className="hero__phone"><Icon name="phone" size={18} /> {SITE.phone}</a>
              <span>Ежедневно 8:00–21:00</span>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__photo">
              <Photo src={IMAGES.hero} alt="Специалист центра слуха «Вектор»" className="hero__img" />
              <figcaption className="hero__caption">
                <strong>Анна Соколова</strong>
                <span>главный врач-сурдолог · 22 года практики</span>
              </figcaption>
            </div>
            <div className="hero__badge hero__badge--top">
              <span className="hero__badge-ic"><Icon name="ear" size={22} /></span>
              <div><strong>Бесплатно</strong><small>проверка слуха</small></div>
            </div>
            <div className="hero__badge hero__badge--bottom">
              <span className="hero__badge-ic"><Icon name="shield" size={22} /></span>
              <div><strong>14 дней</strong><small>тест-драйв аппарата</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats__grid">
          {STATS.map((s) => (
            <Reveal className="stats__item" key={s.label}>
              <div className="stats__value">{s.value}<span>{s.suffix}</span></div>
              <div className="stats__label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Услуги</span>
            <h2>Всё для вашего слуха — в одном центре</h2>
            <p className="lead">От бесплатной проверки слуха до подбора, настройки и сервиса аппарата — мы рядом на каждом этапе.</p>
          </Reveal>
          <div className="grid grid-3">
            {SERVICES.map((s, i) => (
              <Reveal className="card svc" key={s.slug} delay={i * 60}>
                <span className="svc__ic"><Icon name={s.icon} size={26} /></span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <ul className="svc__points">
                  {s.points.map((p) => <li key={p}><Icon name="check" size={16} /> {p}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="section adv">
        <div className="container adv__inner">
          <Reveal className="adv__head">
            <span className="eyebrow">Почему «Вектор»</span>
            <h2>Центр, которому доверяют семьи</h2>
            <p className="lead">Мы соединяем точную диагностику, аппараты ведущих брендов и человеческую заботу — особенно к пожилым людям и пациентам с инвалидностью по слуху.</p>
            <Link to="/about" className="btn btn-ghost">Подробнее о центре <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <div className="adv__grid">
            {ADVANTAGES.map((a, i) => (
              <Reveal className="adv__item" key={a.title} delay={i * 60}>
                <span className="adv__ic"><Icon name={a.icon} size={22} /></span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Как мы работаем</span>
            <h2>Путь к хорошему слуху — четыре шага</h2>
          </Reveal>
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal className="step" key={s.n} delay={i * 70}>
                <span className="step__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS preview */}
      <section className="section loc-pre">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Где нас найти</span>
            <h2>Приходите в наш центр слуха</h2>
          </Reveal>
          {LOCATIONS.map((l) => (
            <Reveal className="visit" key={l.name}>
              <div className="visit__photo"><Photo src={l.img} alt={l.name} className="visit__img" /></div>
              <div className="visit__body">
                <span className="loc-card__tag">{l.tag}</span>
                <h3>{l.name}</h3>
                <p>{l.desc}</p>
                <div className="visit__meta">
                  <span><Icon name="pin" size={18} /> {l.city}, {l.address}</span>
                  <span><Icon name="clock" size={18} /> Ежедневно 9:00–20:00</span>
                  <a href={SITE.phoneHref}><Icon name="phone" size={18} /> {SITE.phone}</a>
                </div>
                <Link to="/contacts" className="btn btn-primary">Записаться на приём <Icon name="arrow" size={18} /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section testi">
        <div className="container">
          <Reveal className="section-head" style={{ textAlign: 'center', marginInline: 'auto' }}>
            <span className="eyebrow">Частые вопросы</span>
            <h2>Отвечаем честно и понятно</h2>
          </Reveal>
          <Reveal><Faq items={FAQ} /></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <Reveal>
            <span className="eyebrow eyebrow--light">Первый шаг — самый важный</span>
            <h2>Запишитесь на бесплатную проверку слуха</h2>
            <p>Проверим слух, ответим на вопросы и подберём аппарат, если он нужен. Это бесплатно и ни к чему не обязывает.</p>
            <div className="cta__actions">
              <Link to="/contacts" className="btn btn-light">Записаться <Icon name="arrow" size={18} /></Link>
              <a href={SITE.phoneHref} className="cta__phone"><Icon name="phone" size={20} /> {SITE.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
