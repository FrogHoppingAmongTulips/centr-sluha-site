import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import { LOCATIONS, SITE } from '../data/site'
import './Pages.css'

export default function Locations() {
  return (
    <>
      <PageHero
        crumb="Клиники"
        eyebrow="Наши центры"
        title="Три современных центра слуха"
        text="Каждый центр «Вектор» — это безбарьерная среда, точное оборудование для диагностики и команда сурдологов рядом с вами."
      />

      <section className="section">
        <div className="container loc-grid">
          {LOCATIONS.map((l, i) => (
            <Reveal className="loc-full" key={l.name} delay={(i % 2) * 80}>
              <div className="loc-full__map">
                <Photo src={l.img} alt={l.name} className="loc-full__img" />
                <Icon name="pin" size={34} />
              </div>
              <div className="loc-full__body">
                <span className="loc-card__tag" style={{ position: 'static' }}>{l.tag}</span>
                <h3>{l.name}</h3>
                <span className="loc-full__city"><Icon name="pin" size={16} /> {l.city}, {l.address}</span>
                <p>{l.desc}</p>
                <div className="loc-full__meta">
                  <span><Icon name="clock" size={16} /> Ежедневно 8:00–21:00</span>
                  <a href={SITE.phoneHref}><Icon name="phone" size={16} /> {SITE.phone}</a>
                </div>
                <Link to="/contacts" className="btn btn-ghost">Записаться в этот центр <Icon name="arrow" size={17} /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container band">
          <div>
            <h2>Не нашли центр в своём городе?</h2>
            <p className="lead">Мы развиваем сеть и проводим онлайн-консультации сурдолога. Напишите нам — подскажем ближайший центр.</p>
          </div>
          <Link to="/contacts" className="btn btn-primary">Связаться <Icon name="arrow" size={18} /></Link>
        </div>
      </section>
    </>
  )
}
