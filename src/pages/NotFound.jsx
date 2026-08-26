import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { NAV } from '../data/site'
import './Pages.css'

/* Служебная страница 404 */
export default function NotFound() {
  return (
    <section className="section nf">
      <div className="container">
        <span className="nf__code">404</span>
        <h1>Страница не найдена</h1>
        <p className="lead">Возможно, страницу переместили или в адресе опечатка.</p>
        <div className="nf__actions">
          <Link to="/" className="btn btn-primary">На главную <Icon name="arrow" size={18} /></Link>
          <Link to="/contacts" className="btn btn-ghost">Контакты</Link>
        </div>
        <div className="nf__links">
          <span>Может быть, вам сюда:</span>
          {NAV.map((i) => <Link key={i.to} to={i.to}>{i.label}</Link>)}
        </div>
      </div>
    </section>
  )
}
