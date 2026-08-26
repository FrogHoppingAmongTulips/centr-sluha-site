import { useEffect, useState } from 'react'
import Icon from './Icon'
import './InstallApp.css'

/* Кнопка «Установить приложение».
   Android и десктопный Chrome отдают событие beforeinstallprompt — показываем кнопку.
   На iPhone такого события нет, поэтому там выводим короткую инструкцию.
   Если сайт уже открыт как приложение, блок не показывается вовсе. */
export default function InstallApp() {
  const [prompt, setPrompt] = useState(null)
  const [ios, setIos] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
    if (standalone) return

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    if (isIos) setIos(true)

    const onPrompt = (e) => {
      e.preventDefault()
      setPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', () => setPrompt(null))
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  const install = async () => {
    if (!prompt) return
    prompt.prompt()
    await prompt.userChoice
    setPrompt(null)
  }

  if (!prompt && !ios) return null

  return (
    <div className="install">
      <span className="install__ic"><Icon name="ear" size={20} /></span>
      <div className="install__text">
        <strong>Приложение на телефон</strong>
        <small>
          {prompt
            ? 'Иконка на рабочем столе, запись и каталог без браузера'
            : 'Откройте «Поделиться» и выберите «На экран „Домой“»'}
        </small>
      </div>
      {prompt && (
        <button className="btn btn-light btn-sm" onClick={install}>
          Установить
        </button>
      )}
    </div>
  )
}
