import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import MapEmbed from '../components/MapEmbed'
import Reveal from '../components/Reveal'
import HeroSlider from '../components/HeroSlider'
import RequestForm from '../components/RequestForm'
import Messengers from '../components/Messengers'
import Seo from '../components/Seo'
import { useRequestForm } from '../components/RequestModal'
import { useContent } from '../components/ContentContext'
import { STATS } from '../data/site'
import './Pages.css'
import './Home.css'

/* Главная — визитка центра: кто мы, где находимся, как связаться и куда идти
   дальше. Подробности живут на своих страницах: каталог, услуги, акции,
   информация, о центре. */

const SECTIONS = [
  { to: '/catalog', icon: 'ear', title: 'Каталог аппаратов', text: 'Заушные, внутриушные и внутриканальные модели с ценами' },
  { to: '/catalog?cat=services', icon: 'wave', title: 'Услуги и цены', text: 'Тест слуха, настройка, вкладыши, ремонт' },
  { to: '/promo', icon: 'star', title: 'Акции и рассрочка', text: 'Действующие предложения и оплата частями' },
  { to: '/news', icon: 'doc', title: 'Информация', text: 'Новости центра и статьи о слухе простым языком' },
]

export default function Home() {
  const { SITE, LINKS, CENTERS } = useContent()
  const openForm = useRequestForm()
  const main = CENTERS[0]

  return (
    <>
      <Seo description="Центр слуха в Томске: тест слуха бесплатно, подбор и настройка слуховых аппаратов. Иркутский тракт, 33." />

      {/* ПЕРВЫЙ ЭКРАН: снимок и карточка поверх */}
      <HeroSlider />

      {/* КТО МЫ */}
      <section className="section">
        <div className="container card-split">
          <Reveal className="card-split__text">
            <span className="eyebrow">Кто мы</span>
            <h2>Центр слуха в Октябрьском районе Томска</h2>
            <p className="lead">
              Проверяем слух, подбираем и настраиваем аппараты, ремонтируем их в своей мастерской.
              Тест слуха бесплатный: сначала смотрим, что со слухом, и только потом говорим об аппарате.
            </p>
            <div className="acard__actions" style={{ marginTop: 22 }}>
              <button className="btn btn-primary" onClick={() => openForm('visit')}>Записаться на тест слуха</button>
              <Link to="/about" className="btn btn-ghost">Подробнее о центре</Link>
            </div>
          </Reveal>

          <Reveal className="card-split__stats" delay={100}>
            {STATS.map((s, i) => (
              <div className="ministat" key={i}>
                <strong>{s.value}<span>{s.suffix}</span></strong>
                <small>{s.label}</small>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* КУДА ДАЛЬШЕ */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Разделы</span>
            <h2>Что есть на сайте</h2>
          </Reveal>
          <div className="grid grid-4">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.to} delay={i * 60}>
                <Link to={s.to} className="navcard">
                  <span className="navcard__ic"><Icon name={s.icon} size={24} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="link-more">Открыть <Icon name="arrow" size={16} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ГДЕ МЫ И КАК СВЯЗАТЬСЯ */}
      <section className="section">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Где мы</span>
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
                  <button className="btn btn-ghost btn-sm" onClick={() => openForm('call')}>Заказать звонок</button>
                </div>
              </div>

              <div className="acard">
                <h3>Связь</h3>
                <p className="acard__note">Если звонить неудобно — напишите, ответим в рабочее время.</p>
                <Messengers links={LINKS} mail={SITE.email} />
              </div>
            </Reveal>

            <Reveal className="map-split__map" delay={100}>
              <MapEmbed coords={main.coords} address={main.address} className="ph--flat" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ЗАПИСЬ */}
      <section className="cta">
        <div className="container cta__inner">
          <Reveal className="cta__copy">
            <span className="eyebrow eyebrow--light">Первый визит</span>
            <h2>Проверим слух бесплатно</h2>
            <p>Тест слуха и консультация — 40 минут, заключение отдаём на руки. Без обязательств что-то покупать.</p>
            <a href={SITE.phoneHref} className="cta__phone"><Icon name="phone" size={20} /> {SITE.phone}</a>
            <span className="cta__hours"><Icon name="clock" size={17} /> {SITE.hours}</span>
          </Reveal>
          <Reveal className="cta__form" delay={100}>
            <div className="form-card">
              <div className="form-card__head">
                <h3>Заказать звонок</h3>
                <p>Перезвоним и подберём удобное время.</p>
              </div>
              <RequestForm variant="call" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
