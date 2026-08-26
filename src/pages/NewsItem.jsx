import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import Reveal from '../components/Reveal'
import RequestForm from '../components/RequestForm'
import NotFound from './NotFound'
import { NEWS } from '../data/site'
import './Pages.css'

export default function NewsItem() {
  const { slug } = useParams()
  const item = NEWS.find((n) => n.slug === slug)
  if (!item) return <NotFound />

  const other = NEWS.filter((n) => n.slug !== item.slug).slice(0, 3)

  return (
    <>
      <section className="section section--tight" style={{ paddingTop: 'clamp(28px, 4vw, 44px)' }}>
        <div className="container">
          <Breadcrumbs items={[{ to: '/news', label: 'Информация' }, { label: item.title }]} />

          <div className="article">
            <header className="article__head">
              <div className="ncard__meta"><span className="tag">{item.tag}</span><time>{item.date}</time><span className="article__read">3 минуты чтения</span></div>
              <h1>{item.title}</h1>
              <p className="lead">{item.excerpt}</p>
            </header>

            <Ph ratio="16 / 9" className="article__cover" src={item.cover} alt={item.title} fit="cover" />

            <div className="prose">
              <p>{item.body[0]}</p>
              <h2>Что важно помнить</h2>
              <p>{item.body[1]}</p>
              <ul className="prose__list">
                <li>Тест слуха занимает 20–40 минут и не требует подготовки.</li>
                <li>Аппарат настраивают по аудиограмме, а не «на глаз».</li>
                <li>Привыкание к новому звуку занимает 2–4 недели.</li>
              </ul>
              <figure className="prose__figure">
                <Ph ratio="21 / 9" src="/cover/wave.svg" alt="Иллюстрация" fit="cover" />
                <figcaption>Приём сурдолога в центре на Профсоюзной</figcaption>
              </figure>
              <h2>Что делать дальше</h2>
              <p>{item.body[2]}</p>
              <blockquote className="prose__quote">Чем раньше начать пользоваться аппаратом, тем быстрее мозг вспоминает, как разбирать речь в шуме.</blockquote>
              <p>{item.body[3]}</p>
            </div>

            <div className="article__foot">
              <div className="article__tags"><span className="tag">Слух</span><span className="tag">Подбор аппарата</span><span className="tag">Советы</span></div>
              <Link to="/news" className="link-more"><Icon name="arrowLeft" size={18} /> Ко всем материалам</Link>
            </div>

            <div className="form-card article__form">
              <div className="form-card__head">
                <h3>Остались вопросы?</h3>
                <p>Напишите — ответит сурдолог, а не менеджер.</p>
              </div>
              <RequestForm variant="ask" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="head-row">
            <div className="section-head">
              <span className="eyebrow">Ещё по теме</span>
              <h2>Другие материалы</h2>
            </div>
            <Link to="/news" className="link-more">Все материалы <Icon name="arrow" size={18} /></Link>
          </div>
          <div className="grid grid-3">
            {other.map((n, i) => (
              <Reveal key={n.slug} delay={i * 60}>
                <Link to={`/news/${n.slug}`} className="ncard">
                  <Ph ratio="16 / 9" className="ncard__ph" src={n.cover} alt={n.title} fit="cover" />
                  <div className="ncard__body">
                    <div className="ncard__meta"><span className="tag">{n.tag}</span><time>{n.date}</time></div>
                    <h3>{n.title}</h3>
                    <p>{n.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
