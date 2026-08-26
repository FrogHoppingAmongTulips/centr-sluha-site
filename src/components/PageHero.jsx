import { Link } from 'react-router-dom'
import './PageHero.css'

/* crumbs: [{ to, label }] — последний элемент без ссылки */
export default function PageHero({ eyebrow, title, text, crumbs = [], children }) {
  return (
    <section className="phero">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  )
}

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="crumbs" aria-label="Хлебные крошки">
      <Link to="/">Главная</Link>
      {items.map((c, i) => (
        <span key={i} className="crumbs__item">
          <span className="crumbs__sep">/</span>
          {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
        </span>
      ))}
    </nav>
  )
}
