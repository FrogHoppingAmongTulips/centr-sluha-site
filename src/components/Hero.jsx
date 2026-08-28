import Icon from './Icon'
import Ph from './Ph'
import { useRequestForm } from './RequestModal'
import { useContent } from './ContentContext'
import './Hero.css'

/* Первый экран: снимок во всю ширину и одна карточка — кто мы и где нас найти.
   Смены слайдов нет: человек должен сразу понять, куда попал. */
export default function Hero() {
  const { SITE, CENTERS } = useContent()
  const openForm = useRequestForm()
  const main = CENTERS[0]

  return (
    <section className="hero">
      <div className="hero__media">
        <Ph ratio="12 / 5" className="hero__ph" src="/cover/room.svg" alt="Кабинет центра слуха" fit="cover" />
        <span className="hero__veil" aria-hidden="true" />
      </div>

      <div className="container">
        <div className="hero__card">
          <span className="eyebrow">Центр слуха в Томске</span>

          <div className="hero__title">
            <img className="hero__ear" src="/img/ear-aid.svg" alt="" aria-hidden="true" />
            <h1>Слышать - это просто</h1>
            <img className="hero__ear hero__ear--flip" src="/img/ear-aid.svg" alt="" aria-hidden="true" />
          </div>

          <p>
            Мы проверяем слух, подбираем и настраиваем слуховые аппараты и обслуживаем их в своей
            мастерской. Тест слуха бесплатный: сначала разбираемся, что со слухом, и только потом
            говорим об аппарате.
          </p>

          <div className="hero__where">
            <span><Icon name="pin" size={18} /> {main.address}</span>
            <span><Icon name="clock" size={18} /> {main.hours}</span>
            <a href={SITE.phoneHref}><Icon name="phone" size={18} /> {SITE.phone}</a>
          </div>

          <div className="hero__cta">
            <button className="btn btn-primary" onClick={() => openForm('visit')}>
              Записаться на приём <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
