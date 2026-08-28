import Icon from './Icon'
import { useRequestForm } from './RequestModal'
import './Hero.css'

/* Первый экран: только суть — кто мы и кнопка записи.
   Рисунки уха стоят по краям экрана, фона за ними нет. */
export default function Hero() {
  const openForm = useRequestForm()

  return (
    <section className="hero">
      <div className="container hero__inner">
        <img className="hero__ear" src="/img/ear-aid.svg" alt="" aria-hidden="true" />

        <div className="hero__text">
          <span className="eyebrow">Центр слуха в Томске</span>
          <h1>Слышать - это просто</h1>
          <p>
            Мы проверяем слух, подбираем и настраиваем слуховые аппараты и обслуживаем их в своей
            мастерской. Тест слуха бесплатный: сначала разбираемся, что со слухом, и только потом
            говорим об аппарате.
          </p>
          <button className="btn btn-primary" onClick={() => openForm('visit')}>
            Записаться на приём <Icon name="arrow" size={18} />
          </button>
        </div>

        <img className="hero__ear hero__ear--flip" src="/img/ear-aid.svg" alt="" aria-hidden="true" />
      </div>
    </section>
  )
}
