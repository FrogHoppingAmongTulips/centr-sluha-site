import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SITE } from '../data/site'
import Icon from './Icon'
import './Header.css'

const NAV = [
  { to: '/services', label: 'Услуги' },
  { to: '/about', label: 'О центре' },
  { to: '/locations', label: 'Клиники' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`hdr ${scrolled ? 'hdr--scrolled' : ''}`}>
      <div className="container hdr__inner">
        <Link to="/" className="logo" aria-label={SITE.name}>
          <span className="logo__mark"><Icon name="wave" size={20} /></span>
          <span className="logo__text">
            {SITE.name}<small>{SITE.tagline}</small>
          </span>
        </Link>

        <nav className={`nav ${open ? 'nav--open' : ''}`}>
          {NAV.map((i) => (
            <NavLink key={i.to} to={i.to} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {i.label}
            </NavLink>
          ))}
          <a href={SITE.phoneHref} className="nav__phone">{SITE.phone}</a>
        </nav>

        <div className="hdr__actions">
          <Link to="/contacts" className="btn btn-primary hdr__cta">Записаться</Link>
          <button className={`burger ${open ? 'burger--x' : ''}`} onClick={() => setOpen((v) => !v)} aria-label="Меню">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
