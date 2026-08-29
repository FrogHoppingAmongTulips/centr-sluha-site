import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Hero from '../components/Hero'
import MapEmbed from '../components/MapEmbed'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import Messengers from '../components/Messengers'
import Seo from '../components/Seo'
import { useRequestForm } from '../components/RequestModal'
import { useContent } from '../components/ContentContext'
import './Pages.css'
import './Sections.css'

/* Главная: короткое вступление, потом то, ради чего приходят —
   аппараты с ценами, услуги с ценами и адрес. Подробности о центре,
   акции и статьи живут на своих страницах. */
export default function Home() {
  const { SITE, LINKS, CATALOG, HOME_PRODUCTS, SERVICES, CENTERS } = useContent()
  const openForm = useRequestForm()
  const main = CENTERS[0]
  const products = (HOME_PRODUCTS.length ? HOME_PRODUCTS : CATALOG).slice(0, 4)

  return (
    <>
      <Seo description="Центр слуха в Томске: тест слуха бесплатно, подбор и настройка слуховых аппаратов. Иркутский тракт, 33." />

      <Hero />

      {/* АППАРАТЫ */}
      <section className="section section--sand">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Каталог</span>
              <h2>Слуховые аппараты</h2>
            </div>
            <Link to="/catalog" className="link-more">Весь каталог <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <div className="grid grid-4 grid--swipe">
            {products.map((item) => <ProductCard key={item.slug} item={item} compact />)}
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section className="section">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Услуги</span>
              <h2>Сколько стоит приём</h2>
            </div>
            <Link to="/catalog?cat=services" className="link-more">Все услуги <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <div className="grid grid-3 grid--swipe">
            {SERVICES.slice(0, 3).map((sv, i) => (
              <div className="srv" key={i}>
                <span className="srv__ic"><Icon name={sv.icon || 'wave'} size={24} /></span>
                <div className="srv__body">
                  <h3>{sv.title}</h3>
                  <p>{sv.text}</p>
                </div>
                <div className="srv__foot">
                  <strong>{sv.price}</strong>
                  <button className="btn btn-ghost btn-sm" onClick={() => openForm('visit')}>Записаться</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* АДРЕС */}
      <section className="section section--sand">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Адрес</span>
              <h2>{main.title}</h2>
            </div>
            <Link to={`/locations/${main.slug}`} className="link-more">Как доехать <Icon name="arrow" size={18} /></Link>
          </Reveal>

          <div className="map-split">
            <Reveal className="map-split__list">
              <div className="acard">
                <span className="acard__row"><Icon name="pin" size={17} /> {main.address}</span>
                <span className="acard__row"><Icon name="wave" size={17} /> {main.metro}</span>
                <span className="acard__row"><Icon name="clock" size={17} /> {main.hours}</span>
                <a className="acard__row" href={SITE.phoneHref}><Icon name="phone" size={17} /> {SITE.phone}</a>
                <div className="acard__actions">
                  <button className="btn btn-primary btn-sm" onClick={() => openForm('visit')}>Записаться</button>
                  <Link to="/about" className="btn btn-ghost btn-sm">О центре</Link>
                </div>
              </div>

              <div className="acard">
                <h3>Написать</h3>
                <p className="acard__note">Если звонить неудобно — ответим в мессенджере в рабочее время.</p>
                <Messengers links={LINKS} mail={SITE.email} />
              </div>
            </Reveal>

            <Reveal className="map-split__map" delay={100}>
              <MapEmbed coords={main.coords} address={main.address} className="ph--flat" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
