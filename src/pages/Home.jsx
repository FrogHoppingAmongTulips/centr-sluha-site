import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import { SERVICES, STEPS, STATS, ADVANTAGES, LOCATIONS, TESTIMONIALS, SITE, IMAGES } from '../data/site'
import './Home.css'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">Центр слуха · 30 лет опыта</span>
            <h1>Возвращаем радость&nbsp;слышать</h1>
            <p className="lead">Диагностика слуха, подбор и настройка слуховых аппаратов, детская сурдология. Бережно помогаем людям с инвалидностью по слуху — со всеми льготами и сертификатами.</p>
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
              <div><strong>5 брендов</strong><small>слуховых аппаратов</small></div>
            </div>
            <div className="hero__badge hero__badge--bottom">
              <span className="hero__badge-ic"><Icon name="target" size={22} /></span>
              <div><strong>50 000+</strong><small>вернули слух</small></div>
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
            <span className="eyebrow">Наши центры</span>
            <h2>Рядом с домом — три центра слуха</h2>
          </Reveal>
          <div className="grid grid-3">
            {LOCATIONS.map((l, i) => (
              <Reveal className="card loc-card" key={l.name} delay={i * 60}>
                <span className="loc-card__tag">{l.tag}</span>
                <span className="loc-card__city"><Icon name="pin" size={17} /> {l.city}</span>
                <h3>{l.name}</h3>
                <p>{l.desc}</p>
                <span className="loc-card__addr">{l.address}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testi">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Истории пациентов</span>
            <h2>Их результат — наша главная награда</h2>
          </Reveal>
          <div className="grid grid-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal className="card testi__card" key={t.author} delay={i * 70}>
                <div className="testi__quote">“</div>
                <p>{t.text}</p>
                <div className="testi__author">
                  <span className="testi__avatar">{t.author[0]}</span>
                  <div><strong>{t.author}</strong><small>{t.role}</small></div>
                </div>
              </Reveal>
            ))}
          </div>
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
