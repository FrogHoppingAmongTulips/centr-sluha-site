import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import StickyActions from './components/StickyActions'
import MobileBar from './components/MobileBar'
import ErrorBoundary from './components/ErrorBoundary'
import { RequestProvider } from './components/RequestModal'
import { CartProvider } from './components/CartContext'
import { ContentProvider } from './components/ContentContext'
import Home from './pages/Home'

/* Главная загружается сразу, остальные страницы — отдельными кусками по мере перехода:
   человек на медленном интернете скачивает только то, что открыл. */
const About = lazy(() => import('./pages/About'))
const Catalog = lazy(() => import('./pages/Catalog'))
const Product = lazy(() => import('./pages/Product'))
const Promo = lazy(() => import('./pages/Promo'))
const PromoItem = lazy(() => import('./pages/PromoItem'))
const Locations = lazy(() => import('./pages/Locations'))
const Center = lazy(() => import('./pages/Center'))
const News = lazy(() => import('./pages/News'))
const NewsItem = lazy(() => import('./pages/NewsItem'))
const Contacts = lazy(() => import('./pages/Contacts'))
const Cart = lazy(() => import('./pages/Cart'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()

  // браузер запоминает, где стояла прокрутка, и возвращает туда при открытии ссылки —
  // отключаем это, иначе человек попадает в середину страницы
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <ContentProvider>
      <CartProvider>
        <RequestProvider>
          <ScrollToTop />
          <a className="skip" href="#main">К содержимому</a>
          <Header />
          <main id="main">
            <ErrorBoundary>
              <Suspense fallback={<div className="route-wait" aria-live="polite">Загружаем…</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/catalog/:slug" element={<Product />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/promo" element={<Promo />} />
                  <Route path="/promo/:slug" element={<PromoItem />} />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/locations/:slug" element={<Center />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/:slug" element={<NewsItem />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/privacy" element={<Legal doc="privacy" />} />
                  <Route path="/consent" element={<Legal doc="consent" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <StickyActions />
          <MobileBar />
          <Footer />
        </RequestProvider>
      </CartProvider>
    </ContentProvider>
  )
}
