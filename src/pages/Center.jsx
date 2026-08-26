import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import MapEmbed from '../components/MapEmbed'
import Reveal from '../components/Reveal'
import RequestForm from '../components/RequestForm'
import NotFound from './NotFound'
import { CENTERS, SCHEDULE } from '../data/site'
import './Pages.css'

/* Страница отдельного центра: фото, адрес, график, как добраться, врачи, форма */
export default function Center() {
  const { slug } = useParams()
  const c = CENTERS.find((x) => x.slug === slug)
  if (!c) return <NotFound />

  return (
    <>
      <section className="section section--tight" style={{ paddingTop: 'clamp(28px, 4vw, 44px)' }}>
        <div className="container">
          <Breadcrumbs items={[{ to: '/locations', label: 'Центры' }, { label: c.title }]} />

          <div className="center__top">
            <div className="center__gallery">
              <Ph ratio="16 / 10" className="center__shot" src={c.gallery?.[0] || c.cover} alt={c.title} fit="cover" />
              <div className="center__thumbs">
                {(c.gallery || []).map((g, i) => <Ph key={i} ratio="1 / 1" src={g} alt={c.title} fit="cover" />)}
              </div>
            </div>

            <div className="center__info">
              <span className="tag">Приём по записи</span>
              <h1>{c.title}</h1>
              <ul className="center__meta">
                <li><Icon name="pin" size={18} /> {c.address}</li>
                <li><Icon name="wave" size={18} /> {c.metro}</li>
                <li><Icon name="clock" size={18} /> {c.hours}</li>
                <li><Icon name="phone" size={18} /> <a href={`tel:${c.phone}`}>{c.phone}</a></li>
              </ul>
              <ul className="center__features">
                {c.features.map((f, i) => <li key={i}><Icon name="check" size={16} /> {f}</li>)}
              </ul>
              <p className="center__note">{c.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Карта и как добраться */}
      <section className="section section--sand">
        <div className="container map-split">
          <Reveal className="map-split__list">
            <div className="acard">
              <h3>Как добраться</h3>
              {c.route.map((r, i) => (
                <span className="acard__row" key={i}><span className="terms__n">{i + 1}</span> {r}</span>
              ))}
            </div>
            <div className="acard">
              <h3>Часы работы</h3>
              <table className="sched" style={{ width: '100%' }}>
                <tbody>
                  {SCHEDULE.slice(0, 4).map((s, i) => <tr key={i}><th>{s.d}</th><td>{s.h}</td></tr>)}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal className="map-split__map" delay={100}>
            <MapEmbed coords={c.coords} address={c.address} />
          </Reveal>
        </div>
      </section>

      {/* О центре + врачи */}
      <section className="section">
        <div className="container">
          <div className="prose" style={{ maxWidth: 820 }}>
            <h2>О центре</h2>
            {c.desc.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container form-split">
          <Reveal>
            <span className="eyebrow">Запись</span>
            <h2 style={{ margin: '14px 0 16px' }}>Приходите на тест слуха</h2>
            <p className="lead">Тест слуха и консультация сурдолога — бесплатно, без обязательства покупать аппарат.</p>
          </Reveal>
          <Reveal className="form-card" delay={100}>
            <div className="form-card__head">
              <h3>Запись в этот центр</h3>
              <p>Перезвоним и подтвердим время приёма.</p>
            </div>
            <RequestForm variant="visit" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
