import { useState } from 'react'
import Icon from './Icon'
import Ph from './Ph'
import { useRequestForm } from './RequestModal'
import { SLIDES } from '../data/site'
import './HeroSlider.css'

/* Первый экран: снимок во всю ширину, поверх него — карточка с рассказом
   о центре. Так же устроена главная у сайта-образца. */
export default function HeroSlider() {
  const [i, setI] = useState(0)
  const openForm = useRequestForm()

  const go = (d) => setI((v) => (v + d + SLIDES.length) % SLIDES.length)
  const s = SLIDES[i]

  return (
    <section className="hero">
      <div className="hero__media">
        <Ph ratio="21 / 9" className="hero__ph" src={s.cover} alt={s.title} fit="cover" />
        <span className="hero__veil" aria-hidden="true" />

        <button className="hero__arrow hero__arrow--prev" onClick={() => go(-1)} aria-label="Предыдущий слайд">
          <Icon name="arrowLeft" size={20} />
        </button>
        <button className="hero__arrow hero__arrow--next" onClick={() => go(1)} aria-label="Следующий слайд">
          <Icon name="arrow" size={20} />
        </button>
      </div>

      <div className="container">
        <div className="hero__card" key={i}>
          <span className="eyebrow">{s.eyebrow}</span>
          <h1>{s.title}</h1>
          <p>{s.text}</p>
          {s.text2 && <p>{s.text2}</p>}
          <div className="hero__cta">
            <button className="btn btn-primary" onClick={() => openForm('visit')}>
              {s.cta} <Icon name="arrow" size={18} />
            </button>
            <span className="hero__note">{s.note}</span>
          </div>

          <div className="hero__dots">
            {SLIDES.map((_, n) => (
              <button
                key={n}
                className={n === i ? 'is-active' : ''}
                onClick={() => setI(n)}
                aria-label={`Слайд ${n + 1}`}
                aria-current={n === i}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
