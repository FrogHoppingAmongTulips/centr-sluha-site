import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import Reveal from '../components/Reveal'
import { useRequestForm } from '../components/RequestModal'
import { CENTERS } from '../data/site'
import './Pages.css'

/* Адреса центров: поиск, карта и карточки со ссылкой на страницу центра */
export default function Locations() {
  const openForm = useRequestForm()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Центры' }]}
        eyebrow="Адреса"
        title="Наш центр в Томске"
        text="Кабинет для теста слуха, подбор аппаратов и мастерская — всё в одном месте, в Октябрьском районе."
      />

      <section className="section">
        <div className="container">
          <form className="addr-search" onSubmit={(e) => e.preventDefault()}>
            <Icon name="search" size={18} />
            <input type="search" placeholder="Улица или станция метро" aria-label="Поиск по адресу" />
            <button className="btn btn-primary btn-sm" type="submit">Найти</button>
          </form>

          <div className="map-split" style={{ marginTop: 24 }}>
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
              <Ph h="100%" className="ph--flat" />
              <span className="map-note">Карта проезда</span>
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
