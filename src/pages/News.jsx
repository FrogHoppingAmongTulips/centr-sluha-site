import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import Reveal from '../components/Reveal'
import { useRequestForm } from '../components/RequestModal'
import { NEWS, NEWS_TYPES } from '../data/site'
import './Pages.css'

/* Два раздела в одной ленте: новости центра и полезные материалы */
export default function News() {
  const [params, setParams] = useSearchParams()
  const type = params.get('type')
  const openForm = useRequestForm()

  const items = type ? NEWS.filter((n) => n.type === type) : NEWS
  const [lead, ...rest] = items

  const setType = (t) => (t ? setParams({ type: t }) : setParams({}))

  return (
    <>
      <PageHero
        crumbs={[{ label: type === 'article' ? NEWS_TYPES[1].label : 'Информация' }]}
        eyebrow="Информация"
        title="Новости и полезные статьи"
        text="Что происходит в центрах и что полезно знать о слухе до первого визита."
      />

      <section className="section">
        <div className="container">
          <div className="cat-chips" style={{ marginBottom: 36 }}>
            <button className={`chip ${!type ? 'is-active' : ''}`} onClick={() => setType(null)}>Всё подряд</button>
            {NEWS_TYPES.map((t) => (
              <button key={t.key} className={`chip ${type === t.key ? 'is-active' : ''}`} onClick={() => setType(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {lead && (
            <Reveal>
              <Link to={`/news/${lead.slug}`} className="nlead">
                <Ph ratio="16 / 10" className="nlead__ph" />
                <div className="nlead__body">
                  <div className="ncard__meta"><span className="tag">{lead.tag}</span><time>{lead.date}</time></div>
                  <h2>{lead.title}</h2>
                  <p>{lead.excerpt}</p>
                  <span className="link-more">Читать <Icon name="arrow" size={18} /></span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid grid-3" style={{ marginTop: 28 }}>
            {rest.map((n, i) => (
              <Reveal key={n.slug} delay={(i % 3) * 60}>
                <Link to={`/news/${n.slug}`} className="ncard">
                  <Ph ratio="16 / 9" className="ncard__ph" />
                  <div className="ncard__body">
                    <div className="ncard__meta"><span className="tag">{n.tag}</span><time>{n.date}</time></div>
                    <h3>{n.title}</h3>
                    <p>{n.excerpt}</p>
                    <span className="link-more">Читать <Icon name="arrow" size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="pager">
            <button className="pager__btn is-active">1</button>
            <button className="pager__btn">2</button>
            <button className="pager__btn pager__btn--next">Дальше <Icon name="arrow" size={16} /></button>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container band">
          <div>
            <h2>Не нашли ответ?</h2>
            <p className="lead">Напишите вопрос — сурдолог ответит в течение рабочего дня.</p>
          </div>
          <button className="btn btn-primary" onClick={() => openForm('ask')}>Задать вопрос <Icon name="arrow" size={18} /></button>
        </div>
      </section>
    </>
  )
}
