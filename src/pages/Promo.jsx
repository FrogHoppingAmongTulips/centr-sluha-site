import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Ph from '../components/Ph'
import Reveal from '../components/Reveal'
import RequestForm from '../components/RequestForm'
import { useRequestForm } from '../components/RequestModal'
import { TILES } from '../data/site'
import { useContent } from '../components/ContentContext'
import './Pages.css'
import Seo from '../components/Seo'

/* Акции и спецпредложения — отдельный раздел, как у референсов */
export default function Promo() {
  const { PROMOS } = useContent()
  const openForm = useRequestForm()

  return (
    <>
      <Seo title={"Акции и рассрочка"} description={"Рассрочка 0%, скидка на второй аппарат, батарейки в подарок. Действующие предложения центра слуха в Томске."} path={"/promo"} />
      <PageHero
        crumbs={[{ label: 'Акции' }]}
        eyebrow="Выгода"
        title="Акции и рассрочка"
        text="Действующие предложения центра. Условия можно совмещать — уточните на приёме."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {PROMOS.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <article className="promo">
                  <div className="promo__media">
                    <Ph ratio="16 / 9" src={p.cover} alt={p.title} fit="cover" />
                    <span className="promo__badge">{p.note}</span>
                  </div>
                  <div className="promo__body">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="promo__foot">
                      <span><Icon name="calendar" size={16} /> до {p.until}</span>
                      <button className="link-more" onClick={() => openForm('visit')}>Записаться <Icon name="arrow" size={16} /></button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="tiles" style={{ marginTop: 32 }}>
            {TILES.map((t, i) => (
              <button key={i} className="tile" onClick={() => openForm('ask')}>
                <span className="tile__ic"><Icon name={t.icon} size={22} /></span>
                <span className="tile__label">{t.label}</span>
                <Icon name="arrow" size={17} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container form-split">
          <Reveal>
            <span className="eyebrow">Рассрочка</span>
            <h2 style={{ margin: '14px 0 16px' }}>Как оформить рассрочку</h2>
            <p className="lead">Оформляем прямо в центре: нужен только паспорт, решение приходит за несколько минут.</p>
            <ul className="form-split__list">
              <li><Icon name="check" size={16} /> Без первого взноса и переплаты</li>
              <li><Icon name="check" size={16} /> Срок 3, 6 или 12 месяцев</li>
              <li><Icon name="check" size={16} /> Аппарат забираете в день оформления</li>
            </ul>
          </Reveal>
          <Reveal className="form-card" delay={100}>
            <div className="form-card__head">
              <h3>Спросить об условиях</h3>
              <p>Расскажем, что подойдёт в вашем случае.</p>
            </div>
            <RequestForm variant="ask" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
