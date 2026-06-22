import { Link } from 'react-router-dom'
import './PageHero.css'

export default function PageHero({ eyebrow, title, text, crumb }) {
  return (
    <section className="phero">
      <div className="container">
        <nav className="phero__crumbs">
          <Link to="/">Главная</Link><span>/</span><span>{crumb}</span>
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  )
}
