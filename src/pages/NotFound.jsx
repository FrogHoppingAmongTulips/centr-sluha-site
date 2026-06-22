import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import './Pages.css'

export default function NotFound() {
  return (
    <section className="section nf">
      <div className="container">
        <span className="nf__code">404</span>
        <h1>Страница не найдена</h1>
        <p className="lead" style={{ margin: '0 auto 28px' }}>Возможно, она была перемещена или вы ошиблись адресом.</p>
        <Link to="/" className="btn btn-primary">На главную <Icon name="arrow" size={18} /></Link>
      </div>
    </section>
  )
}
