import { Link } from 'react-router-dom'
import { SITE, NAV, CATEGORIES } from '../data/site'
import Icon from './Icon'
import Mail from './Mail'
import InstallApp from './InstallApp'
import Logo from './Logo'
import { useRequestForm } from './RequestModal'
import './Footer.css'

export default function Footer() {
  const openForm = useRequestForm()
  return (
    <footer className="ftr">
      <div className="container ftr__grid">
        <div className="ftr__brand">
          <div className="logo">
            <span className="logo__mark logo__mark--light"><Logo size={36} /></span>
            <span className="logo__text" style={{ color: '#fff' }}>
              {SITE.name}<small style={{ color: 'rgba(255,255,255,.6)' }}>{SITE.tagline}</small>
            </span>
          </div>
          <p className="ftr__about">Проверяем слух, подбираем и настраиваем слуховые аппараты. Центр в Октябрьском районе Томска, своя мастерская.</p>
          <button className="btn btn-light btn-sm" onClick={() => openForm('call')}>Заказать звонок</button>
        </div>

        <div className="ftr__col">
          <h4>Разделы</h4>
          <Link to="/">Главная</Link>
          {NAV.map((i) => <Link key={i.to} to={i.to}>{i.label}</Link>)}
        </div>

        <div className="ftr__col">
          <h4>Каталог</h4>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/catalog?cat=${c.slug}`}>{c.title}</Link>
          ))}
        </div>

        <div className="ftr__col">
          <h4>Контакты</h4>
          <a href={SITE.phoneHref}><Icon name="phone" size={17} /> {SITE.phone}</a>
          <span className="ftr__mail"><Icon name="mail" size={17} /> <Mail address={SITE.email} /></span>
          <span><Icon name="pin" size={17} /> {SITE.address}</span>
          <span><Icon name="clock" size={17} /> {SITE.hours}</span>
          <InstallApp />
          <div className="ftr__chats">
            <a href={SITE.phoneHref} aria-label="Мессенджер"><Icon name="chat" size={18} /></a>
            <a href={SITE.phoneHref} aria-label="Позвонить"><Icon name="phone" size={18} /></a>
            <a href={`mailto:${SITE.email}`} aria-label="Написать письмо"><Icon name="mail" size={18} /></a>
          </div>
        </div>
      </div>

      <div className="container ftr__extra">
        <Link to="/promo">Акции</Link>
        <Link to="/catalog">Прайс-лист</Link>
        <Link to="/locations">Как доехать</Link>
        <Link to="/news">Полезные статьи</Link>
        <button onClick={() => openForm('ask')}>Задать вопрос</button>
      </div>

      <div className="container ftr__note">Имеются противопоказания. Необходима консультация специалиста.</div>

      <div className="container ftr__bottom">
        <span className="ftr__legal">
          <Link to="/privacy">Политика конфиденциальности</Link>
          <Link to="/consent">Согласие на обработку данных</Link>
        </span>
        <span>{SITE.license}</span>
      </div>
    </footer>
  )
}
