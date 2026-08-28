import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import StickyActions from './components/StickyActions'
import MobileBar from './components/MobileBar'
import ErrorBoundary from './components/ErrorBoundary'
import { RequestProvider } from './components/RequestModal'
import { CartProvider } from './components/CartContext'
import { ContentProvider } from './components/ContentContext'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Promo from './pages/Promo'
import Locations from './pages/Locations'
import Center from './pages/Center'
import News from './pages/News'
import NewsItem from './pages/NewsItem'
import Contacts from './pages/Contacts'
import Cart from './pages/Cart'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:slug" element={<Product />} />
                <Route path="/promo" element={<Promo />} />
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
