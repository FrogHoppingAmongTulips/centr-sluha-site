import { Link } from 'react-router-dom'
import Icon from './Icon'
import Ph from './Ph'
import { useRequestForm } from './RequestModal'
import { useContent } from './ContentContext'
import './Hero.css'

/* Первый экран: слева — кто мы и что делать дальше, справа — фотография приёма.
   Живой снимок держит экран лучше любой заливки. */
export default function Hero() {
  const { SITE, CENTERS } = useContent()
  const openForm = useRequestForm()
  const main = CENTERS[0]

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="eyebrow">Центр слуха в Томске</span>
          <h1>Слышать - это просто</h1>
          <p>
            Проверяем слух, подбираем и настраиваем слуховые аппараты, обслуживаем их в своей
            мастерской. Тест слуха бесплатный: сначала разбираемся, что со слухом, и только потом
            говорим об аппарате.
          </p>

          <div className="hero__actions">
            <button className="btn btn-primary" onClick={() => openForm('visit')}>
              Записаться на тест слуха <Icon name="arrow" size={18} />
            </button>
            <a className="hero__phone" href={SITE.phoneHref}>
              <Icon name="phone" size={18} /> {SITE.phone}
            </a>
          </div>

          <div className="hero__facts">
            <span><Icon name="check" size={15} /> Тест слуха — бесплатно</span>
            <span><Icon name="check" size={15} /> Подбор без навязывания</span>
            <span><Icon name="check" size={15} /> Донастройки без доплат</span>
          </div>
        </div>

        <div className="hero__media">
          <Ph ratio="4 / 3" className="hero__ph" src="/photo/hero.webp" alt="Приём сурдолога в центре слуха" fit="cover" />
          <Link to={`/locations/${main.slug}`} className="hero__badge">
            <Icon name="pin" size={17} />
            <span>
              <strong>{main.address}</strong>
              <small>{main.hours}</small>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
