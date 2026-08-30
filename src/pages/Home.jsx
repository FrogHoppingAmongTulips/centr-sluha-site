import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Hero from '../components/Hero'
import MapEmbed from '../components/MapEmbed'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import Ph from '../components/Ph'
import Messengers from '../components/Messengers'
import RequestForm from '../components/RequestForm'
import Seo from '../components/Seo'
import { useRequestForm } from '../components/RequestModal'
import Faq from '../components/Faq'
import { useContent } from '../components/ContentContext'
import { STEPS, FAQ } from '../data/site'
import './Pages.css'
import './Sections.css'

/* Главная: короткое вступление, потом то, ради чего приходят —
   аппараты с ценами, услуги с ценами и адрес. Подробности о центре,
   акции и статьи живут на своих страницах. */
export default function Home() {
  const { SITE, LINKS, CATALOG, HOME_PRODUCTS, SERVICES, CENTERS, PROMOS } = useContent()
  const openForm = useRequestForm()
  const main = CENTERS[0]
  const products = (HOME_PRODUCTS.length ? HOME_PRODUCTS : CATALOG).slice(0, 4)

  return (
    <>
      <Seo description="Центр слуха в Краснодаре: тест слуха бесплатно, подбор и настройка слуховых аппаратов, выезд на дом." />

      <Hero />

      {/* С ЧЕГО НАЧАТЬ — для тех, кто пришёл без понимания, что делать */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">С чего начать</span>
            <h2>Как проходит первый визит</h2>
            <p className="lead">
              Не нужно заранее знать, какой аппарат вам нужен, — это работа сурдолога.
              От вас требуется только прийти.
            </p>
          </Reveal>
          <div className="steps steps--flat">
            {STEPS.map((s, i) => (
              <Reveal className="step" key={i} delay={i * 60}>
                <span className="step__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* АКЦИИ — три предложения в ряд, как просил центр */}
      <section className="section">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Выгода</span>
              <h2>Акции и специальные предложения</h2>
            </div>
          </Reveal>
          <div className="grid grid-3 grid--swipe">
            {PROMOS.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug || i} delay={i * 60}>
                <article className="promo">
                  <div className="promo__media">
                    <Ph ratio="16 / 9" src={p.cover} alt={p.title} fit="cover" />
                    <span className="promo__badge">{p.note}</span>
                  </div>
                  <div className="promo__body">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="promo__foot">
                      <Link to={`/promo/${p.slug}`} className="link-more">Подробнее <Icon name="arrow" size={16} /></Link>
                      <button className="btn btn-primary btn-sm" onClick={() => openForm('visit')}>Записаться</button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link to="/promo" className="btn btn-ghost">Показать все акции <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>

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

      {/* ЗАПИСЬ — форма прямо на главной, как просил центр */}
      <section className="section section--sand">
        <div className="container form-split">
          <Reveal>
            <span className="eyebrow">Запись</span>
            <h2 style={{ margin: '14px 0 16px' }}>Записаться на приём</h2>
            <p className="lead">
              Оставьте заявку — перезвоним в рабочее время, ответим на вопросы и согласуем день.
              Или позвоните сами: {SITE.phone}.
            </p>
            <ul className="form-split__list">
              <li><Icon name="check" size={16} /> Тест слуха и подбор — бесплатно</li>
              <li><Icon name="check" size={16} /> Выезд специалиста на дом по краю и Адыгее</li>
              <li><Icon name="check" size={16} /> Оплата электронным сертификатом СФР</li>
            </ul>
          </Reveal>
          <Reveal className="form-card" delay={100}>
            <div className="form-card__head">
              <h3>Заявка на приём</h3>
              <p>После заявки дождитесь подтверждения по телефону.</p>
            </div>
            <RequestForm variant="visit" />
          </Reveal>
        </div>
      </section>

      {/* ВОПРОСЫ — снимаем страх перед первым визитом */}
      <section className="section">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Частые вопросы</span>
              <h2>Отвечаем коротко</h2>
            </div>
            <Link to="/about" className="link-more">Все ответы <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <Reveal><Faq items={FAQ.slice(0, 4)} /></Reveal>
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
