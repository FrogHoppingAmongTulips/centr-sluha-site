import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import { SITE } from '../data/site'
import './Pages.css'

export default function Contacts() {
  return (
    <>
      <PageHero
        crumb="Контакты"
        eyebrow="Связаться с нами"
        title="Запишитесь на консультацию"
        text="Оставьте заявку или позвоните — координатор поможет выбрать программу и удобное время. Консультация ни к чему не обязывает."
      />

      <section className="section">
        <div className="container contacts-grid">
          <Reveal className="contacts-info">
            <div className="contact-line">
              <span className="contact-line__ic"><Icon name="phone" size={20} /></span>
              <div><small>Телефон</small><a href={SITE.phoneHref}>{SITE.phone}</a></div>
            </div>
            <div className="contact-line">
              <span className="contact-line__ic"><Icon name="mail" size={20} /></span>
              <div><small>Почта</small><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
            </div>
            <div className="contact-line">
              <span className="contact-line__ic"><Icon name="pin" size={20} /></span>
              <div><small>Адрес</small><span>{SITE.address}</span></div>
            </div>
            <div className="contact-line">
              <span className="contact-line__ic"><Icon name="clock" size={20} /></span>
              <div><small>Часы работы</small><span>Ежедневно 8:00–21:00</span></div>
            </div>
            <div className="contacts-map" aria-hidden="true"><Icon name="pin" size={40} /></div>
          </Reveal>

          <Reveal className="contacts-form-wrap" delay={120}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: 6 }}>Оставить заявку</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Заполните форму — мы перезвоним в течение рабочего дня.</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
