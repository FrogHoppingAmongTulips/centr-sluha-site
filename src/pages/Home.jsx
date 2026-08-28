import HeroSlider from '../components/HeroSlider'
import Seo from '../components/Seo'

/* Главная сделана по образцу premiumhealth.org: снимок во всю ширину,
   карточка с рассказом о центре — и всё. Адреса, разделы и контакты
   человек находит в меню и в подвале, а не на одной длинной странице. */
export default function Home() {
  return (
    <>
      <Seo description="Центр слуха в Томске: тест слуха бесплатно, подбор и настройка слуховых аппаратов. Иркутский тракт, 33." />
      <HeroSlider />
    </>
  )
}
