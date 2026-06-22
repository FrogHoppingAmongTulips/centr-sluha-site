import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { SERVICES, STEPS } from '../data/site'
import './Pages.css'

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Услуги"
        eyebrow="Услуги центра слуха"
        title="Всё для вашего слуха в одном месте"
        text="От бесплатной диагностики до подбора, настройки и сервиса слуховых аппаратов. Особое внимание — детям и людям с инвалидностью по слуху."
      />

      <section className="section">
        <div className="container">
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <Reveal className="svc-row" key={s.slug} delay={(i % 2) * 80}>
                <div className="svc-row__ic"><Icon name={s.icon} size={30} /></div>
                <div className="svc-row__body">
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                </div>
                <ul className="svc-row__points">
                  {s.points.map((p) => <li key={p}><Icon name="check" size={16} /> {p}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Как мы работаем</span>
            <h2>Путь к хорошему слуху — четыре шага</h2>
          </Reveal>
          <div className="grid grid-4">
            {STEPS.map((s, i) => (
              <Reveal className="card" key={s.n} delay={i * 60}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--teal-300)', fontWeight: 600 }}>{s.n}</span>
                <h3 style={{ margin: '8px 0 8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container band">
          <div>
            <h2>Не знаете, какой аппарат нужен?</h2>
            <p className="lead">Запишитесь на бесплатную проверку слуха — сурдолог всё проверит и честно подскажет решение.</p>
          </div>
          <Link to="/contacts" className="btn btn-primary">Проверить слух <Icon name="arrow" size={18} /></Link>
        </div>
      </section>
    </>
  )
}
