import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { SITE, NAV, CATALOG_MENU, CERT_LINK } from '../data/site'
import Icon from './Icon'
import Logo from './Logo'
import Mail from './Mail'
import { useRequestForm } from './RequestModal'
import { useCart } from './CartContext'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const openForm = useRequestForm()
  const cart = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`hdr ${scrolled ? 'hdr--scrolled' : ''}`}>
      <div className="hdr__top">
        <div className="container hdr__top-inner">
          <Link to="/locations" className="hdr__city"><Icon name="pin" size={15} /> {SITE.city} <Icon name="arrow" size={13} /></Link>
          <span><Icon name="clock" size={15} /> {SITE.hours}</span>
          <span className="hdr__mail"><Icon name="mail" size={15} /> <Mail address={SITE.email} /></span>
          <a href={SITE.phoneHref} className="hdr__top-phone"><Icon name="phone" size={15} /> {SITE.phone}</a>
        </div>
      </div>

      <div className="container hdr__inner">
        <Link to="/" className="logo" aria-label={SITE.name}>
          <span className="logo__mark"><Logo size={36} /></span>
          <span className="logo__text">{SITE.name}<small>{SITE.tagline}</small></span>
        </Link>

        <nav className={`nav ${open ? 'nav--open' : ''}`}>
          <div className="nav__item nav__item--drop">
            <NavLink to="/catalog" className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {NAV[0].label}
            </NavLink>

            {/* Меню каталога: бренд, тип корпуса, особенности, стоимость */}
            <div className="megamenu">
              <div className="megamenu__cols">
                {CATALOG_MENU.map((col) => (
                  <div className="megamenu__col" key={col.title}>
                    <h4>{col.title}</h4>
                    {col.items.map((i) => <Link key={i.label} to={i.to}>{i.label}</Link>)}
                  </div>
                ))}
              </div>
              <div className="megamenu__foot">
                <Link to={CERT_LINK.to} className="megamenu__cert">
                  <Icon name="doc" size={17} /> {CERT_LINK.label}
                </Link>
                <button className="btn btn-primary btn-sm" onClick={() => openForm('visit')}>Записаться на приём</button>
              </div>
            </div>
          </div>

          {NAV.slice(1).map((i) => (
            <NavLink key={i.to} to={i.to} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {i.label}
            </NavLink>
          ))}
          <a href={SITE.phoneHref} className="nav__phone">{SITE.phone}</a>
          <button className="btn btn-primary nav__cta" onClick={() => openForm('visit')}>Записаться</button>
        </nav>

        <form className="hdr__search" onSubmit={(e) => { e.preventDefault(); navigate('/catalog') }}>
          <Icon name="search" size={17} />
          <input type="search" placeholder="Поиск" aria-label="Поиск по сайту" />
        </form>

        <div className="hdr__actions">
          <Link to="/cart" className="hdr__cart" aria-label="Корзина">
            <Icon name="cart" size={22} />
            {cart.slugs.length > 0 && <span className="hdr__cart-badge" />}
          </Link>
          <button className="btn btn-primary hdr__cta" onClick={() => openForm('visit')}>Записаться</button>
          <button className={`burger ${open ? 'burger--x' : ''}`} onClick={() => setOpen((v) => !v)} aria-label="Меню">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
