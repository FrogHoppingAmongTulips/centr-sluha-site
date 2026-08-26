import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import RequestForm from '../components/RequestForm'
import { useRequestForm } from '../components/RequestModal'
import NotFound from './NotFound'
import { CATALOG, CATEGORIES, SITE } from '../data/site'
import './Pages.css'

const TABS = [
  { key: 'desc', label: 'Описание' },
  { key: 'specs', label: 'Характеристики' },
  { key: 'terms', label: 'Условия' },
]

export default function Product() {
  const { slug } = useParams()
  const [tab, setTab] = useState('desc')
  const [shot, setShot] = useState(0)
  const openForm = useRequestForm()

  const item = CATALOG.find((i) => i.slug === slug)
  if (!item) return <NotFound />

  const cat = CATEGORIES.find((c) => c.slug === item.category)
  const related = CATALOG.filter((i) => i.slug !== item.slug).slice(0, 4)

  return (
    <>
      <Seo title={item.title} description={`${item.short} Цена ${item.price}. Подбор и настройка в центре слуха, Томск.`} path={`/catalog/${item.slug}`} />

      <section className="prod">
        <div className="container">
          <Breadcrumbs items={[{ to: '/catalog', label: 'Каталог' }, { to: `/catalog?cat=${cat.slug}`, label: cat.title }, { label: item.title }]} />

          <div className="prod__top">
            {/* Фото */}
            <div className="prod__gallery">
              <Ph ratio="4 / 3" className="prod__shot" key={shot} src={item.img} alt={item.title} />
              <div className="prod__thumbs">
                {[0, 1, 2, 3].map((i) => (
                  <button key={i} className={`prod__thumb ${shot === i ? 'is-active' : ''}`} onClick={() => setShot(i)} aria-label={`Фото ${i + 1}`}>
                    <Ph ratio="1 / 1" src={item.img} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* Цена и условия */}
            <div className="prod__info">
              {item.tag && <span className="tag tag--accent">{item.tag}</span>}
              <h1>{item.title}</h1>
              <div className="prod__sku">Артикул: <strong>{item.slug.toUpperCase().slice(0, 8)}</strong> · Наличие: <strong>в центре</strong></div>
              <p className="prod__short">{item.short}</p>

              <div className="prod__pricebox">
                <div className="prod__price">
                  <strong>{item.price}</strong>
                  {item.old && <s>{item.old}</s>}
                  <small>/ {item.unit}</small>
                </div>
                <ul className="prod__points">
                  {item.points.map((p, i) => <li key={i}><Icon name="check" size={16} /> {p}</li>)}
                </ul>
                <div className="prod__actions">
                  <button className="btn btn-primary" onClick={() => openForm('visit', item.slug)}>Записаться на примерку <Icon name="arrow" size={18} /></button>
                  <button className="btn btn-ghost" onClick={() => openForm('call')}>Заказать звонок</button>
                </div>
                <a href={SITE.phoneHref} className="prod__phone"><Icon name="phone" size={18} /> {SITE.phone}</a>
              </div>

              <ul className="prod__meta">
                <li><Icon name="home" size={18} /> <span>Выезд на дом<small>по записи</small></span></li>
                <li><Icon name="shield" size={18} /> <span>Гарантия<small>до 2 лет</small></span></li>
                <li><Icon name="doc" size={18} /> <span>Настройка<small>входит в цену</small></span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Описание / характеристики / условия */}
      <section className="section section--sand">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Описание товара">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                id={`ptab-${t.key}`}
                aria-selected={tab === t.key}
                aria-controls="ppanel"
                className={`tabs__btn ${tab === t.key ? 'is-active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="tabs__panel" role="tabpanel" id="ppanel" aria-labelledby={`ptab-${tab}`}>
            {tab === 'desc' && (
              <div className="prose">
                {item.desc.map((p, i) => <p key={i}>{p}</p>)}
                <Ph ratio="21 / 9" className="prose__ph" src={item.img} alt={item.title} />
                <span className="prose__cap">Фото аппарата в комплекте поставки</span>
              </div>
            )}

            {tab === 'specs' && (
              <table className="spec">
                <tbody>
                  {item.specs.map((s, i) => (
                    <tr key={i}><th>{s.k}</th><td>{s.v}</td></tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'terms' && (
              <ul className="terms">
                {item.terms.map((t, i) => (
                  <li key={i}><span className="terms__n">{i + 1}</span><div><h3>{t}</h3><p>Условие входит в обслуживание и не требует отдельной оплаты.</p></div></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Форма заявки на этот товар/услугу */}
      <section className="section">
        <div className="container form-split">
          <Reveal>
            <span className="eyebrow">Примерка</span>
            <h2 style={{ margin: '14px 0 16px' }}>Послушайте аппарат вживую</h2>
            <p className="lead">Настроим модель под вашу аудиограмму прямо на приёме, чтобы вы сравнили звук до покупки.</p>
            <ul className="form-split__list">
              <li><Icon name="check" size={16} /> Примерка и настройка — бесплатно</li>
              <li><Icon name="check" size={16} /> Сравним с 1–2 другими моделями</li>
              <li><Icon name="check" size={16} /> Без обязательства покупать</li>
            </ul>
          </Reveal>
          <Reveal className="form-card" delay={100}>
            <div className="form-card__head">
              <h3>Записаться на примерку</h3>
              <p>Перезвоним и подтвердим удобное время.</p>
            </div>
            <RequestForm variant="visit" subject={item.slug} />
          </Reveal>
        </div>
      </section>

      {/* Похожие */}
      <section className="section section--sand">
        <div className="container">
          <div className="head-row">
            <div className="section-head">
              <span className="eyebrow">Ещё варианты</span>
              <h2>Похожие аппараты</h2>
            </div>
            <Link to="/catalog" className="link-more">Весь каталог <Icon name="arrow" size={18} /></Link>
          </div>
          <div className="grid grid-4">
            {related.map((r, i) => <Reveal key={r.slug} delay={i * 60}><ProductCard item={r} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  )
}
