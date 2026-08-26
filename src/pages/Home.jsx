import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import MapEmbed from '../components/MapEmbed'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import RequestForm from '../components/RequestForm'
import Seo from '../components/Seo'
import { useRequestForm } from '../components/RequestModal'
import {
  SITE, OFFERS, PICKER, BRANDS, SERVICES, ADVANTAGES, STEPS, STATS,
  CATEGORIES, CATALOG, NEWS, NEWS_TYPES, CENTERS, FAQ,
} from '../data/site'
import './Pages.css'
import './Home.css'

export default function Home() {
  const openForm = useRequestForm()
  const [shelf, setShelf] = useState('goods')    // товары / услуги
  const [feed, setFeed] = useState('news')       // новости / полезные материалы
  const [seoOpen, setSeoOpen] = useState(false)

  const posts = NEWS.filter((n) => n.type === feed).slice(0, 3)

  return (
    <>
      <Seo description="Тест слуха бесплатно, подбор и настройка слуховых аппаратов ReSound, Phonak, Oticon, Signia и Widex. Томск, Иркутский тракт, 33." />

      {/* СЛАЙДЕР АКЦИЙ + ПЛИТКА БЫСТРЫХ ССЫЛОК */}
      <HeroSlider />

      {/* КЛЮЧЕВЫЕ ОФФЕРЫ — компактной строкой */}
      <section className="offers">
        <div className="container offers__row">
          {OFFERS.map((o, i) => (
            <button className="offer" key={i} onClick={() => openForm('visit')}>
              <span className="offer__ic"><Icon name={o.icon} size={22} /></span>
              <span className="offer__text">
                <strong>{o.title}</strong>
                <small>{o.text}</small>
              </span>
              <span className="offer__note">{o.note}</span>
            </button>
          ))}
        </div>
      </section>

      {/* КАТЕГОРИИ И БЫСТРЫЙ ПОДБОР — одной строкой */}
      <section className="section section--tight" style={{ paddingTop: 24, paddingBottom: 'clamp(32px, 4vw, 52px)' }}>
        <div className="container picker">
          <div>
            <span className="eyebrow">Каталог</span>
            <h2>С чего начнём подбор?</h2>
          </div>
          <div className="cat-chips">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to={`/catalog?cat=${c.slug}`} className="chip">{c.title} <small>{c.count}</small></Link>
            ))}
            {PICKER.slice(0, 3).map((p, i) => (
              <Link key={i} to={`/catalog?cat=${p.cat}`} className="chip">{p.label}</Link>
            ))}
            <Link to="/catalog" className="chip chip--all">Весь каталог <Icon name="arrow" size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ТОВАРЫ / УСЛУГИ — в одном блоке + бренды */}
      <section className="section section--sand">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Что мы предлагаем</span>
              <h2>Аппараты и услуги центра</h2>
            </div>
            <div className="feed-head">
              <div className="form-tabs" style={{ margin: 0 }} role="tablist" aria-label="Аппараты или услуги">
                <button role="tab" aria-selected={shelf === 'goods'} className={shelf === 'goods' ? 'is-active' : ''} onClick={() => setShelf('goods')}>Аппараты</button>
                <button role="tab" aria-selected={shelf === 'services'} className={shelf === 'services' ? 'is-active' : ''} onClick={() => setShelf('services')}>Услуги</button>
              </div>
              <Link to="/catalog" className="link-more">Весь каталог <Icon name="arrow" size={18} /></Link>
            </div>
          </Reveal>

          {shelf === 'goods' ? (
            <div className="grid grid-4 grid--swipe">
              {CATALOG.slice(0, 4).map((item) => <ProductCard key={item.slug} item={item} compact />)}
            </div>
          ) : (
            <div className="grid grid-3 grid--swipe">
              {SERVICES.slice(0, 3).map((sv, i) => (
                <div className="srv" key={i}>
                  <span className="srv__ic"><Icon name={sv.icon} size={24} /></span>
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
          )}

          <Reveal className="brands">
            {BRANDS.map((b) => <span key={b} className="brands__logo">{b}</span>)}
          </Reveal>
        </div>
      </section>

      {/* ЦИФРЫ */}
      <section className="stats">
        <div className="container stats__grid">
          {STATS.map((s, i) => (
            <Reveal className="stats__item" key={i}>
              <div className="stats__value">{s.value}<span>{s.suffix}</span></div>
              <div className="stats__label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА + ЭТАПЫ */}
      <section className="section">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Почему к нам</span>
              <h2>Как мы работаем</h2>
            </div>
            <button className="link-more" onClick={() => openForm('ask')}>Задать вопрос <Icon name="arrow" size={18} /></button>
          </Reveal>
          <div className="adv__grid">
            {ADVANTAGES.map((a, i) => (
              <Reveal className="adv__item" key={i} delay={i * 60}>
                <span className="adv__ic"><Icon name={a.icon} size={22} /></span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="container steps">
          {STEPS.map((s, i) => (
            <Reveal className="step" key={i} delay={i * 60}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* АДРЕСА И КАРТА */}
      <section className="section">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head">
              <span className="eyebrow">Адреса</span>
              <h2>Где нас найти</h2>
            </div>
            <Link to="/locations" className="link-more">Все центры <Icon name="arrow" size={18} /></Link>
          </Reveal>

          <div className="map-split">
            <Reveal className="map-split__list">
              {CENTERS.map((c) => (
                <div className="acard" key={c.slug}>
                  <h3>{c.title}</h3>
                  <span className="acard__row"><Icon name="pin" size={17} /> {c.address}</span>
                  <span className="acard__row"><Icon name="clock" size={17} /> {c.hours}</span>
                  <a className="acard__row" href={`tel:${c.phone}`}><Icon name="phone" size={17} /> {c.phone}</a>
                  <div className="acard__actions">
                    <Link to={`/locations/${c.slug}`} className="btn btn-ghost btn-sm">О центре</Link>
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

      {/* НОВОСТИ / ПОЛЕЗНЫЕ МАТЕРИАЛЫ — одна лента с переключателем */}
      <section className="section section--sand">
        <div className="container">
          <Reveal className="head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Информация</span>
              <h2>Новости и статьи</h2>
            </div>
            <div className="feed-head">
              <div className="form-tabs" style={{ margin: 0 }} role="tablist" aria-label="Новости или статьи">
                {NEWS_TYPES.map((t) => (
                  <button key={t.key} role="tab" aria-selected={feed === t.key} className={feed === t.key ? 'is-active' : ''} onClick={() => setFeed(t.key)}>{t.label}</button>
                ))}
              </div>
              <Link to={`/news?type=${feed}`} className="link-more">Все материалы <Icon name="arrow" size={18} /></Link>
            </div>
          </Reveal>
          <div className="grid grid-3 grid--swipe">
            {posts.map((n) => (
              <Link key={n.slug} to={`/news/${n.slug}`} className="ncard">
                <Ph ratio="16 / 9" className="ncard__ph" src={n.cover} alt={n.title} fit="cover" />
                <div className="ncard__body">
                  <div className="ncard__meta"><span className="tag">{n.tag}</span><time>{n.date}</time></div>
                  <h3>{n.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head" style={{ textAlign: 'center', marginInline: 'auto' }}>
            <span className="eyebrow">Вопросы</span>
            <h2>Коротко о главном</h2>
          </Reveal>
          <Reveal><Faq items={FAQ.slice(0, 4)} /></Reveal>
        </div>
      </section>

      {/* CTA + ФОРМА */}
      <section className="cta">
        <div className="container cta__inner">
          <Reveal className="cta__copy">
            <span className="eyebrow eyebrow--light">Первый шаг</span>
            <h2>Проверьте слух бесплатно</h2>
            <p>Тест слуха, разбор результатов и честная рекомендация — без обязательств что-то покупать.</p>
            <a href={SITE.phoneHref} className="cta__phone"><Icon name="phone" size={20} /> {SITE.phone}</a>
            <span className="cta__hours"><Icon name="clock" size={17} /> {SITE.hours}</span>
          </Reveal>
          <Reveal className="cta__form" delay={100}>
            <div className="form-card">
              <div className="form-card__head">
                <h3>Заказать звонок</h3>
                <p>Перезвоним в рабочее время и подберём удобный день.</p>
              </div>
              <RequestForm variant="call" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEO-ТЕКСТ — свёрнут */}
      <section className="section section--tight" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
        <div className="container">
          <div className={`seo ${seoOpen ? 'is-open' : ''}`}>
            <h2>Слуховые аппараты в Томске</h2>
            <p>В центре на Иркутском тракте можно проверить слух, подобрать слуховой аппарат и настроить его под свою аудиограмму. В каталоге — заушные, внутриушные и внутриканальные модели ReSound, Phonak, Oticon, Signia, Widex и «Исток-Аудио» в диапазоне от 7 890 до 116 900 ₽.</p>
            <p>Подбор начинается с теста слуха: без него аппарат настроить нельзя. Тест слуха и консультация занимают 40 минут и ничего не стоят, заключение остаётся у вас.</p>
            <p>Если приехать в центр сложно, специалист выезжает на дом — назначаем дату и время заранее. После покупки приходите на донастройки и чистку.</p>
          </div>
          <button className="link-more" onClick={() => setSeoOpen((v) => !v)}>
            {seoOpen ? 'Свернуть' : 'Читать дальше'} <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>
    </>
  )
}
