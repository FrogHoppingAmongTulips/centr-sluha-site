import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import Reveal from '../components/Reveal'
import { useRequestForm } from '../components/RequestModal'
import { NEWS_TYPES } from '../data/site'
import { useContent } from '../components/ContentContext'
import './Pages.css'
import Seo from '../components/Seo'

/* Два раздела в одной ленте: новости центра и полезные материалы */
const PER_PAGE = 6 // считая крупный материал сверху

export default function News() {
  const { NEWS } = useContent()
  const [params, setParams] = useSearchParams()
  const type = params.get('type')
  const openForm = useRequestForm()

  const items = type ? NEWS.filter((n) => n.type === type) : NEWS

  /* Листание появляется, только когда материалов действительно больше одной страницы */
  const pages = Math.max(1, Math.ceil(items.length / PER_PAGE))
  const page = Math.min(Math.max(1, Number(params.get('page')) || 1), pages)
  const shown = items.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const [lead, ...rest] = shown

  const setType = (t) => (t ? setParams({ type: t }) : setParams({}))

  const goToPage = (n) => {
    const next = new URLSearchParams(params)
    if (n > 1) next.set('page', String(n))
    else next.delete('page')
    setParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Seo title={"Новости и статьи"} description={"Новости центра и полезные материалы о слухе: когда проверять слух, какой аппарат выбрать, как ухаживать."} path={"/news"} />
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
                <Ph ratio="16 / 10" className="nlead__ph" src={lead.cover} alt={lead.title} fit="cover" />
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
                  <Ph ratio="16 / 9" className="ncard__ph" src={n.cover} alt={n.title} fit="cover" />
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

          {pages > 1 && (
            <div className="pager">
              <button
                className="pager__btn pager__btn--prev"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Предыдущая страница"
              >
                <Icon name="arrowLeft" size={16} />
              </button>
              {Array.from({ length: pages }, (_, n) => (
                <button
                  key={n}
                  className={`pager__btn ${page === n + 1 ? 'is-active' : ''}`}
                  onClick={() => goToPage(n + 1)}
                >
                  {n + 1}
                </button>
              ))}
              <button
                className="pager__btn pager__btn--next"
                onClick={() => goToPage(page + 1)}
                disabled={page === pages}
              >
                Дальше <Icon name="arrow" size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="band">
            <div>
              <h2>Не нашли ответ?</h2>
              <p className="lead">Напишите вопрос — сурдолог ответит в течение рабочего дня.</p>
            </div>
            <button className="btn btn-primary" onClick={() => openForm('ask')}>Задать вопрос <Icon name="arrow" size={18} /></button>
          </div>
        </div>
      </section>
    </>
  )
}
