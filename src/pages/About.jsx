import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { ADVANTAGES, STATS } from '../data/site'
import './Pages.css'

const TEAM = [
  { name: 'Анна Соколова', role: 'Главный врач, сурдолог', exp: '22 года практики' },
  { name: 'Михаил Орлов', role: 'Сурдолог-оториноларинголог', exp: '18 лет практики' },
  { name: 'Ольга Лебедева', role: 'Сурдопедагог', exp: '15 лет практики' },
  { name: 'Игорь Власов', role: 'Аудиолог-настройщик', exp: '20 лет практики' },
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="О центре"
        eyebrow="О центре «Вектор»"
        title="30 лет возвращаем людям слух"
        text="«Вектор» — это команда сурдологов, аудиологов и сурдопедагогов, объединённых одной целью: вернуть человеку слух, общение и уверенность в себе."
      />

      <section className="section">
        <div className="container about-split">
          <Reveal className="about-split__text">
            <span className="eyebrow">Наша миссия</span>
            <h2>Слышать — значит жить полной жизнью</h2>
            <p>Мы убеждены: помощь со слухом — это не просто продажа аппарата, а поддержка, в которой нуждается каждый пациент и его семья.</p>
            <p>Поэтому мы строим работу вокруг конкретного человека: его слуха, образа жизни и бюджета. Честный подбор, точная настройка и забота на каждом этапе — основа нашего подхода. Помогаем оформить льготы людям с инвалидностью.</p>
            <div className="about-values">
              <span><Icon name="shield" size={18} /> Льготы и сертификаты по ИПРА</span>
              <span><Icon name="ear" size={18} /> Аппараты 5 ведущих брендов</span>
              <span><Icon name="home" size={18} /> Доступная безбарьерная среда</span>
            </div>
          </Reveal>
          <Reveal className="about-split__visual" delay={120}>
            <div className="about-art" />
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="stats-dark">
            {STATS.map((s) => (
              <Reveal className="stats-dark__item" key={s.label}>
                <div className="stats-dark__value">{s.value}<span>{s.suffix}</span></div>
                <div className="stats-dark__label">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Наши принципы</span>
            <h2>Что отличает «Вектор»</h2>
          </Reveal>
          <div className="grid grid-2">
            {ADVANTAGES.map((a, i) => (
              <Reveal className="card adv-row" key={a.title} delay={i * 60}>
                <span className="adv-row__ic"><Icon name={a.icon} size={22} /></span>
                <div><h3>{a.title}</h3><p>{a.text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Команда</span>
            <h2>Врачи, которым можно доверять</h2>
          </Reveal>
          <div className="grid grid-4">
            {TEAM.map((m, i) => (
              <Reveal className="card team-card" key={m.name} delay={i * 60}>
                <span className="team-card__avatar">{m.name.split(' ').map((w) => w[0]).join('')}</span>
                <h3>{m.name}</h3>
                <span className="team-card__role">{m.role}</span>
                <span className="team-card__exp">{m.exp}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container band">
          <div>
            <h2>Хотите познакомиться с центром лично?</h2>
            <p className="lead">Запишитесь на бесплатную проверку слуха или экскурсию по центру — покажем всё и ответим на вопросы.</p>
          </div>
          <Link to="/contacts" className="btn btn-primary">Записаться <Icon name="arrow" size={18} /></Link>
        </div>
      </section>
    </>
  )
}
