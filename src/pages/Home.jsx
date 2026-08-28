import Hero from '../components/Hero'
import Seo from '../components/Seo'

/* Главная: снимок во всю ширину и карточка — кто мы и где нас искать.
   Каталог, услуги и акции живут на своих страницах, сюда их не выносим. */
export default function Home() {
  return (
    <>
      <Seo description="Центр слуха в Томске: тест слуха бесплатно, подбор и настройка слуховых аппаратов. Иркутский тракт, 33." />
      <Hero />
    </>
  )
}
