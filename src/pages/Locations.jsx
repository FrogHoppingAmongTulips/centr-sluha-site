import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import MapEmbed from '../components/MapEmbed'
import Reveal from '../components/Reveal'
import { useRequestForm } from '../components/RequestModal'
import { CENTERS } from '../data/site'
import './Pages.css'
import Seo from '../components/Seo'

/* Адреса центров: поиск, карта и карточки со ссылкой на страницу центра */
export default function Locations() {
  const openForm = useRequestForm()

  return (
    <>
      <Seo title={"Адрес центра"} description={"Томск, Иркутский тракт, 33, Октябрьский район. Часы приёма, как доехать, запись на тест слуха."} path={"/locations"} />
      <PageHero
        crumbs={[{ label: 'Центры' }]}
        eyebrow="Адреса"
        title="Наш центр в Томске"
        text="Кабинет для теста слуха, подбор аппаратов и мастерская — всё в одном месте, в Октябрьском районе."
      />

      <section className="section">
        <div className="container">
          <div className="map-split">
            <Reveal className="map-split__list">
              {CENTERS.map((c) => (
                <div className="acard" key={c.slug}>
                  <h3>{c.title}</h3>
                  <span className="acard__row"><Icon name="pin" size={17} /> {c.address}</span>
                  <span className="acard__row"><Icon name="wave" size={17} /> {c.metro}</span>
                  <span className="acard__row"><Icon name="clock" size={17} /> {c.hours}</span>
                  <a className="acard__row" href={`tel:${c.phone}`}><Icon name="phone" size={17} /> {c.phone}</a>
                  <div className="acard__actions">
                    <Link to={`/locations/${c.slug}`} className="btn btn-ghost btn-sm">Подробнее</Link>
                    <button className="btn btn-primary btn-sm" onClick={() => openForm('visit')}>Записаться</button>
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal className="map-split__map" delay={100}>
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container band">
          <div>
            <h2>Неудобно приехать?</h2>
            <p className="lead">Обсудим ситуацию по телефону и подскажем, что делать дальше.</p>
          </div>
          <button className="btn btn-primary" onClick={() => openForm('call')}>Заказать звонок <Icon name="arrow" size={18} /></button>
        </div>
      </section>
    </>
  )
}
