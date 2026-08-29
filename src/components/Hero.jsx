import Icon from './Icon'
import { useRequestForm } from './RequestModal'
import { useContent } from './ContentContext'
import './Hero.css'

/* Первый экран: кто мы, что делаем и что сделать дальше. Без картинки —
   человек сразу читает текст и видит кнопку, а не разглядывает снимок. */
export default function Hero() {
  const { SITE } = useContent()
  const openForm = useRequestForm()

  return (
    <section className="hero">
      <div className="container hero__inner">
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
    </section>
  )
}
