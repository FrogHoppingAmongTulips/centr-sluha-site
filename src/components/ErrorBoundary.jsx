import { Component } from 'react'

/* Если что-то сломалось в разметке, человек видит понятное сообщение и телефон,
   а не белый экран. */
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: 14 }}>Страница не открылась</h1>
          <p className="lead" style={{ margin: '0 auto 26px' }}>
            Обновите её или позвоните — запишем на приём по телефону.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Обновить</button>
            <a className="btn btn-ghost" href="tel:+79138217347">+7 (913) 821-73-47</a>
          </div>
        </div>
      </section>
    )
  }
}
