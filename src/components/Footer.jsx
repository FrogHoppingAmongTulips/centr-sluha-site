import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import Icon from './Icon'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container ftr__grid">
        <div className="ftr__brand">
          <div className="logo">
            <span className="logo__mark"><Icon name="wave" size={20} /></span>
            <span className="logo__text" style={{ color: '#fff' }}>{SITE.name}<small style={{ color: 'rgba(255,255,255,.6)' }}>{SITE.tagline}</small></span>
          </div>
          <p className="ftr__about">Возвращаем людей к полноценной жизни после травм, операций и тяжёлых заболеваний. Каждая программа — индивидуальна.</p>
        </div>

        <div className="ftr__col">
          <h4>Навигация</h4>
          <Link to="/services">Услуги</Link>
          <Link to="/about">О центре</Link>
          <Link to="/locations">Клиники</Link>
          <Link to="/contacts">Контакты</Link>
        </div>

        <div className="ftr__col">
          <h4>Направления</h4>
          <Link to="/services">Неврология</Link>
          <Link to="/services">Ортопедия</Link>
          <Link to="/services">Физиотерапия</Link>
          <Link to="/services">Кардиореабилитация</Link>
        </div>

        <div className="ftr__col">
          <h4>Контакты</h4>
          <a href={SITE.phoneHref}><Icon name="phone" size={17} /> {SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}><Icon name="mail" size={17} /> {SITE.email}</a>
          <span><Icon name="pin" size={17} /> {SITE.address}</span>
          <span><Icon name="clock" size={17} /> Ежедневно 8:00–21:00</span>
        </div>
      </div>

      <div className="container ftr__bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</span>
        <span>Лицензия на медицинскую деятельность № ЛО-77-01-000000</span>
      </div>
    </footer>
  )
}
