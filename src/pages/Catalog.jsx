import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { useRequestForm } from '../components/RequestModal'
import { CATEGORIES, CATALOG, FILTERS, SORTS } from '../data/site'
import './Pages.css'
import Seo from '../components/Seo'

/* Цена в данных — строка вида «от 7 890 ₽», берём из неё число */
const priceValue = (s) => Number((s.match(/[\d\s]+/) || [''])[0].replace(/\s/g, '')) || 0

const PRICE_TIERS = {
  low: { label: 'Недорогие', test: (v) => v > 0 && v < 15000 },
  mid: { label: 'Средняя цена', test: (v) => v >= 15000 && v <= 60000 },
  premium: { label: 'Премиум', test: (v) => v > 60000 },
}

/* «Особенности» и «Тип корпуса» ищем по характеристикам и описанию позиции */
const matchesFeature = (i, q) => {
  const hay = [i.title, i.short, ...(i.points || []), ...(i.specs || []).map((sp) => `${sp.k} ${sp.v}`)].join(' ').toLowerCase()
  return hay.includes(q.toLowerCase())
}

const PER_PAGE = 6

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat')
  const brand = params.get('brand')
  const price = params.get('price')
  const feature = params.get('feature')
  const openForm = useRequestForm()
  // на телефоне подбор закрыт: иначе до первого товара пришлось бы листать целый экран
  const [filtersOpen, setFiltersOpen] = useState(false)

  const items = CATALOG.filter((i) => {
    if (cat && i.category !== cat) return false
    if (brand && !matchesFeature(i, brand)) return false
    if (feature && !matchesFeature(i, feature)) return false
    if (price && PRICE_TIERS[price] && !PRICE_TIERS[price].test(priceValue(i.price))) return false
    return true
  })

  const active = CATEGORIES.find((c) => c.slug === cat)
  const extra = brand || feature || (price && PRICE_TIERS[price] ? PRICE_TIERS[price].label : null)

  /* Постраничный вывод: номер страницы живёт в адресе, фильтр сбрасывает его на первую */
  const pages = Math.max(1, Math.ceil(items.length / PER_PAGE))
  const page = Math.min(Math.max(1, Number(params.get('page')) || 1), pages)
  const shown = items.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const setCat = (slug) => {
    if (slug) setParams({ cat: slug })
    else setParams({})
  }

  const goToPage = (n) => {
    const next = new URLSearchParams(params)
    if (n > 1) next.set('page', String(n))
    else next.delete('page')
    setParams(next)
    document.getElementById('catalog-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Seo title={"Слуховые аппараты"} description={"Заушные, внутриушные и внутриканальные аппараты от 7 890 ₽. Подбор сурдолога после теста слуха."} path={"/catalog"} />
      <PageHero
        crumbs={[{ label: active ? active.title : extra || 'Каталог' }]}
        eyebrow="Каталог"
        title={active ? active.title : extra || 'Слуховые аппараты'}
        text="Заушные, внутриушные и внутриканальные модели от 7 890 ₽. Точную модель подбирает сурдолог после теста слуха — приходите с результатами или проверьте слух у нас."
      />

      {/* Категории плиткой */}
      <section className="section section--tight" style={{ paddingTop: 'clamp(32px, 4vw, 48px)' }}>
        <div className="container">
          <div className="cat-chips">
            <button className={`chip ${!cat ? 'is-active' : ''}`} onClick={() => setCat(null)}>
              Все <small>{CATALOG.length}</small>
            </button>
            {CATEGORIES.map((c) => (
              <button key={c.slug} className={`chip ${cat === c.slug ? 'is-active' : ''}`} onClick={() => setCat(c.slug)}>
                {c.title} <small>{c.count}</small>
              </button>
            ))}
            {extra && (
              <button className="chip is-active" onClick={() => setParams({})}>
                {extra} <Icon name="close" size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ paddingTop: 32 }}>
        <div className="container catalog">
          {/* Фильтры */}
          <aside className={`filters ${filtersOpen ? 'is-open' : ''}`}>
            <button className="filters__head" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen}>
              <Icon name="filter" size={18} /> Подбор
              <span className="filters__toggle"><Icon name="arrow" size={18} /></span>
            </button>
            <div className="filters__body">

            <div className="filters__group">
              <h4>Тип аппарата</h4>
              <ul className="filters__list">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <label>
                      <input type="radio" name="cat" checked={cat === c.slug} onChange={() => setCat(c.slug)} />
                      <span>{c.title}</span>
                      <small>{c.count}</small>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filters__group">
              <h4>Цена, ₽</h4>
              <div className="filters__price">
                <input type="text" defaultValue="7 000" aria-label="Цена от" />
                <span>—</span>
                <input type="text" defaultValue="120 000" aria-label="Цена до" />
              </div>
            </div>

            {FILTERS.map((f) => (
              <div className="filters__group" key={f.title}>
                <h4>{f.title}</h4>
                <ul className="filters__list">
                  {f.options.map((o, i) => (
                    <li key={i}>
                      <label>
                        <input type="checkbox" />
                        <span>{o}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <button className="btn btn-ghost btn-sm btn-block" onClick={() => setCat(null)}>Сбросить фильтры</button>
            <div className="filters__help">
              <h4>Не знаете, что выбрать?</h4>
              <p>Опишите ситуацию — сурдолог подскажет подходящий тип аппарата.</p>
              <button className="btn btn-primary btn-sm btn-block" onClick={() => openForm('ask')}>Задать вопрос</button>
            </div>
            </div>
          </aside>

          {/* Список товаров */}
          <div className="catalog__main">
            <div className="catalog__bar" id="catalog-list">
              <span>Найдено: <strong>{items.length}</strong>{pages > 1 && <> · страница {page} из {pages}</>}</span>
              <label className="catalog__sort">
                Сортировка
                <select defaultValue={SORTS[0]}>
                  {SORTS.map((s, i) => <option key={i}>{s}</option>)}
                </select>
              </label>
            </div>

            {items.length > 0 ? (
              <div className="grid grid-3 catalog__grid">
                {shown.map((item, i) => (
                  <Reveal key={item.slug} delay={(i % 3) * 60}><ProductCard item={item} /></Reveal>
                ))}
              </div>
            ) : (
              <div className="cart-empty">
                <span className="cart-empty__ic"><Icon name="search" size={30} /></span>
                <h3>Под этот фильтр ничего не нашлось</h3>
                <p>Сбросьте фильтр или спросите у сурдолога — подберём модель под ваш случай.</p>
                <button className="btn btn-primary" onClick={() => setParams({})}>Показать все модели</button>
              </div>
            )}

            {pages > 1 && (
              <div className="pager">
                <button
                  className="pager__btn pager__btn--prev"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Предыдущая страница"
                >
                  <Icon name="arrowLeft" size={16} />
                </button>
                {Array.from({ length: pages }, (_, n) => (
                  <button
                    key={n}
                    className={`pager__btn ${page === n + 1 ? 'is-active' : ''}`}
                    onClick={() => goToPage(n + 1)}
                  >
                    {n + 1}
                  </button>
                ))}
                <button
                  className="pager__btn pager__btn--next"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === pages}
                >
                  Дальше <Icon name="arrow" size={16} />
                </button>
              </div>
            )}

            <div className="seo-note">
              <h2>Как выбрать слуховой аппарат</h2>
              <p>Тип аппарата зависит от степени снижения слуха: при тяжёлой потере нужен заушный с запасом мощности, при лёгкой и средней подойдёт внутриушной или внутриканальный. Число каналов отвечает за то, насколько точно аппарат подстроится под вашу аудиограмму.</p>
              <p>Цена складывается из класса обработки звука, количества программ и дополнительных функций — Bluetooth, аккумулятора, шумоподавления. Разницу проще услышать на примерке, чем понять по характеристикам.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container band">
          <div>
            <h2>Сомневаетесь в выборе?</h2>
            <p className="lead">Позвоним, зададим несколько вопросов и предложим 2–3 модели в вашем бюджете.</p>
          </div>
          <button className="btn btn-primary" onClick={() => openForm('call')}>Заказать звонок <Icon name="arrow" size={18} /></button>
        </div>
      </section>
    </>
  )
}
