import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { SERVICES, STEPS, STATS, ADVANTAGES, LOCATIONS, TESTIMONIALS, SITE } from '../data/site'
import './Home.css'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">Реабилитация мирового уровня</span>
            <h1>Возвращаем к жизни, движению и&nbsp;себе</h1>
            <p className="lead">Индивидуальные программы восстановления после травм, операций и тяжёлых заболеваний. Команда врачей рядом — на каждом шаге пути.</p>
            <div className="hero__cta">
              <Link to="/contacts" className="btn btn-primary">Записаться на консультацию <Icon name="arrow" size={18} /></Link>
              <Link to="/services" className="btn btn-ghost">Наши программы</Link>
            </div>
            <div className="hero__trust">
              <a href={SITE.phoneHref} className="hero__phone"><Icon name="phone" size={18} /> {SITE.phone}</a>
              <span>Ежедневно 8:00–21:00</span>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__photo">
              <div className="hero__photo-inner" />
            </div>
            <div className="hero__badge hero__badge--top">
              <span className="hero__badge-ic"><Icon name="team" size={22} /></span>
              <div><strong>40+ специалистов</strong><small>в одной команде</small></div>
            </div>
            <div className="hero__badge hero__badge--bottom">
              <span className="hero__badge-ic"><Icon name="target" size={22} /></span>
              <div><strong>94% пациентов</strong><small>улучшили показатели</small></div>
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
            <span className="eyebrow">Направления</span>
            <h2>Программы под вашу цель восстановления</h2>
            <p className="lead">От первых шагов после операции до полного возвращения к активной жизни — мы ведём пациента на всех этапах.</p>
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
            <h2>Подход, которому доверяют семьи</h2>
            <p className="lead">Мы соединяем доказательную медицину, передовое оборудование и человеческую заботу — чтобы результат был измеримым, а путь к нему спокойным.</p>
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
            <h2>Путь восстановления — четыре этапа</h2>
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
            <span className="eyebrow">Наши клиники</span>
            <h2>Рядом с домом — три современных центра</h2>
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
            <span className="eyebrow" style={{ color: 'var(--teal-300)' }}>Первый шаг — самый важный</span>
            <h2>Запишитесь на консультацию реабилитолога</h2>
            <p>Обсудим вашу ситуацию, ответим на вопросы и предложим программу. Это ни к чему не обязывает.</p>
            <div className="cta__actions">
              <Link to="/contacts" className="btn btn-light">Оставить заявку <Icon name="arrow" size={18} /></Link>
              <a href={SITE.phoneHref} className="cta__phone"><Icon name="phone" size={20} /> {SITE.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
