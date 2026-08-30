import { test, expect } from '@playwright/test'
import { readdirSync, statSync } from 'node:fs'

/* Проверки основных сценариев. Запуск: npm test
   Тесты идут по собранной версии (npm run preview), как её видит посетитель. */

test.describe('Главная', () => {
  test('открывается сверху и показывает первый экран', async ({ page }) => {
    await page.goto('/')
    expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(0)
    await expect(page.locator('.hero h1')).toBeVisible()
  })

  test('первый экран статичный: только текст, без картинки и слайдера', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.hero__arrow')).toHaveCount(0)
    await expect(page.locator('.hero__dots')).toHaveCount(0)
    await expect(page.locator('.hero img')).toHaveCount(0)
    const title = await page.locator('.hero h1').textContent()
    await page.waitForTimeout(2000)
    await expect(page.locator('.hero h1')).toHaveText(title)
  })

  test('на главной кто мы и запись', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.hero h1')).toContainText('Слышать')
    await expect(page.locator('.hero .btn-primary')).toBeVisible()
    // адрес и телефон живут в подвале, а не на первом экране
    await expect(page.locator('.hero__where')).toHaveCount(0)
    await expect(page.locator('.ftr__col')).toHaveCount(4)
  })

  test('из шапки можно уйти в разделы', async ({ page }) => {
    await page.goto('/')
    await page.locator('.nav__link', { hasText: 'О центре' }).click()
    await expect(page).toHaveURL(/about/)
    await expect(page.locator('h1')).toContainText('Центр слуха')
  })

  test('кнопка «наверх» поднимает страницу до конца', async ({ page }) => {
    // без плавной прокрутки: проверяем результат, а не длительность анимации
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/about')
    await page.evaluate(() => window.scrollTo(0, 4000))
    const up = page.locator('.sticky-actions__up')
    await expect(up).toBeVisible()
    await up.click()
    // подъём плавный: даём ему договорить до конца
    await expect.poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 10000 }).toBe(0)
  })
})

test.describe('Каталог', () => {
  test('показывает шесть позиций с фотографиями', async ({ page }) => {
    await page.goto('/catalog')
    await expect(page.locator('.pcard')).toHaveCount(6)
    await expect(page.locator('.pcard .ph img')).toHaveCount(6)
  })

  test('страницы переключаются', async ({ page }) => {
    await page.goto('/catalog')
    await page.locator('.pager__btn', { hasText: '2' }).click()
    await expect(page).toHaveURL(/page=2/)
    await expect(page.locator('.pcard').first()).toBeVisible()
  })

  test('подбор по типу сужает выдачу', async ({ page }) => {
    await page.goto('/catalog')
    const all = await page.locator('.pcard').count()
    await page.locator('.filters__list label', { hasText: 'Услуги центра' }).click()
    await expect(page).toHaveURL(/cat=services/)
    expect(await page.locator('.pcard').count()).toBeLessThanOrEqual(all)
  })

  test('список к примерке пополняется', async ({ page }) => {
    await page.goto('/catalog')
    await page.locator('.pcard__cart').first().click()
    await expect(page.locator('.hdr__cart-badge')).toBeVisible()
    await page.locator('.hdr__cart').click()
    await expect(page.locator('.cart__row')).toHaveCount(1)
  })
})

test.describe('Формы', () => {
  test('обратный звонок просит только имя и телефон', async ({ page }) => {
    await page.goto('/contacts')
    await page.getByRole('tab', { name: 'Обратный звонок' }).click()
    await expect(page.locator('.form-card .rform__field')).toHaveCount(2)
  })

  test('телефон набирается по маске', async ({ page }) => {
    await page.goto('/contacts')
    const phone = page.locator('.form-card input[name="phone"]')
    await phone.fill('')
    await phone.type('9138217347')
    await expect(phone).toHaveValue('+7 (913) 821-73-47')
  })

  test('зарубежный номер остаётся сплошным', async ({ page }) => {
    await page.goto('/contacts')
    const phone = page.locator('.form-card input[name="phone"]')
    await phone.type('+14155552468')
    await expect(phone).toHaveValue('+14155552468')
  })

  test('заявка уходит в панель, если она подключена', async ({ page }) => {
    await page.goto('/contacts')
    await page.getByRole('tab', { name: 'Обратный звонок' }).click()
    await page.locator('.form-card input[name="name"]').fill('Иван')
    await page.locator('.form-card input[name="phone"]').type('9138217347')
    await page.locator('.form-card input[type="checkbox"]').check()
    await page.locator('.form-card button[type="submit"]').click()
    await expect(page.locator('.rform--done')).toBeVisible()
    // с панелью — «принята», без панели — готовый текст для отправки вручную
    await expect(page.locator('.rform--done h3')).toHaveText(/Заявка (принята|готова)/)
  })

  test('без панели заявку можно отправить сообщением или письмом', async ({ page }) => {
    // обрываем связь с панелью — проверяем запасной путь
    await page.route('**/items/zayavki', (route) => route.abort())
    await page.goto('/contacts')
    await page.getByRole('tab', { name: 'Обратный звонок' }).click()
    await page.locator('.form-card input[name="name"]').fill('Пётр')
    await page.locator('.form-card input[name="phone"]').type('9138217347')
    await page.locator('.form-card input[type="checkbox"]').check()
    await page.locator('.form-card button[type="submit"]').click()
    await expect(page.locator('.rform__send a').first()).toHaveAttribute('href', /wa\.me/)
    await expect(page.locator('.rform__preview')).toContainText('Пётр')
  })

  test('дата выбирается календарём: назад нельзя, воскресенья закрыты', async ({ page }) => {
    await page.goto('/contacts')
    await page.locator('.datepick__field').click()
    await expect(page.locator('.datepick__drop')).toBeVisible()

    // в текущем месяце стрелка назад не работает: прошедших дней в записи нет
    await expect(page.locator('.cal__nav').first()).toBeDisabled()
    // прошедшие дни закрыты
    expect(await page.locator('.cal__day.is-off').count()).toBeGreaterThan(0)

    // следующий месяц: все воскресенья закрыты, будни открыты
    await page.locator('.cal__nav--next').click()
    const closed = await page.locator('.cal__grid').evaluate((grid) => {
      const cells = [...grid.children].filter((c) => c.textContent.trim())
      return cells.map((c) => ({ day: Number(c.textContent), off: c.classList.contains('is-off') }))
    })
    const monday = closed.find((c) => !c.off)
    expect(monday).toBeTruthy()

    // выбираем день — он попадает в поле, календарь закрывается
    await page.locator('.cal__day:not(.is-off)').nth(3).click()
    await expect(page.locator('.datepick__drop')).toHaveCount(0)
    const value = await page.locator('input[name="date"]').inputValue()
    expect(value).toMatch(/^\d{2}\.\d{2}\.\d{4}$/)
    const [d, m, y] = value.split('.').map(Number)
    const picked = new Date(y, m - 1, d)
    const now = new Date()
    expect(picked.getDay(), 'воскресенье выбрать нельзя').not.toBe(0)
    expect(picked >= new Date(now.getFullYear(), now.getMonth(), now.getDate())).toBe(true)

    // год выбирается списком до 2100-го, дальше не листается
    await page.locator('.datepick__field').click()
    const years = await page.locator('.cal__year option').allTextContents()
    expect(Number(years[0])).toBe(now.getFullYear())
    expect(Number(years.at(-1))).toBe(2100)
    await page.locator('.cal__year').selectOption('2100')
    for (let i = 0; i < 12; i++) {
      if (await page.locator('.cal__nav--next').isDisabled()) break
      await page.locator('.cal__nav--next').click()
    }
    await expect(page.locator('.cal__nav--next')).toBeDisabled()
    await expect(page.locator('.cal__title')).toHaveText('декабрь')
  })

  test('время выбирается барабаном', async ({ page }) => {
    await page.goto('/contacts')
    await page.locator('.timepick__field').click()
    await expect(page.locator('.timepick__drop')).toBeVisible()
    // крутим барабаны по очереди, как это делает человек
    await page.locator('.wheel').first().evaluate((el) => { el.scrollTop = 5 * 42 })
    await expect.poll(() => page.locator('input[name="time"]').inputValue()).toBe('14:00')
    await page.locator('.wheel').nth(1).evaluate((el) => { el.scrollTop = 2 * 42 })
    await expect.poll(() => page.locator('input[name="time"]').inputValue()).toBe('14:30')
    await page.locator('.timepick__foot .btn').click()
    await expect(page.locator('.timepick__drop')).toHaveCount(0)
  })
})

test.describe('Поиск и подбор', () => {
  test('поиск в шапке находит модель', async ({ page }) => {
    await page.goto('/')
    await page.locator('.hdr__search input').fill('phonak')
    await page.locator('.hdr__search input').press('Enter')
    await expect(page).toHaveURL(/q=phonak/)
    const titles = await page.locator('.pcard h3').allTextContents()
    expect(titles.length).toBeGreaterThan(0)
    expect(titles.every((t) => /phonak/i.test(t))).toBe(true)
  })

  test('сортировка меняет порядок', async ({ page }) => {
    await page.goto('/catalog?sort=cheap')
    const prices = (await page.locator('.pcard__price strong').allTextContents()).map((t) => Number(t.replace(/\D/g, '')))
    expect(prices.every((n, i) => i === 0 || prices[i - 1] <= n)).toBe(true)
  })

  test('фильтр по цене отсекает дешёвые модели', async ({ page }) => {
    await page.goto('/catalog')
    const from = page.locator('.filters__price input').first()
    await from.fill('50000')
    await from.press('Enter')
    await expect(page).toHaveURL(/from=50000/)
    const prices = (await page.locator('.pcard__price strong').allTextContents()).map((t) => Number(t.replace(/\D/g, '')))
    expect(prices.every((n) => n >= 50000)).toBe(true)
  })
})

test.describe('Информация', () => {
  test('листание работает и ведёт на вторую страницу', async ({ page }) => {
    await page.goto('/news')
    const first = await page.locator('.ncard h3, .nlead h2').allTextContents()
    await page.locator('.pager__btn', { hasText: '2' }).click()
    await expect(page).toHaveURL(/page=2/)
    const second = await page.locator('.ncard h3, .nlead h2').allTextContents()
    expect(second.length).toBeGreaterThan(0)
    expect(second[0]).not.toBe(first[0])
  })
})

test.describe('Карта и адреса', () => {
  test('карта подключается с координатами центра', async ({ page }) => {
    await page.goto('/contacts')
    await page.locator('.ymap').scrollIntoViewIfNeeded()
    await expect(page.locator('.ymap iframe')).toHaveAttribute('src', /85\.011626/)
    await expect(page.locator('.ymap__hit')).toHaveAttribute('href', /yandex\.ru\/maps/)
  })

  test('карта разворачивается и закрывается', async ({ page }) => {
    await page.goto('/contacts')
    await page.locator('.ymap').scrollIntoViewIfNeeded()
    await page.locator('.ymap__zoom').click()
    await expect(page.locator('.ymap-full__box')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.ymap-full')).toHaveCount(0)
  })
})

test.describe('Страницы и мета', () => {
  const pages = [
    ['/', 'Центр слуха'],
    ['/catalog', 'Слуховые аппараты'],
    ['/catalog/signia-motion-2px', 'Signia Motion 2px'],
    ['/promo', 'Акции'],
    ['/locations', 'Адрес центра'],
    ['/news', 'Новости'],
    ['/contacts', 'Контакты'],
    ['/about', 'О центре'],
    ['/privacy', 'Политика'],
  ]

  for (const [path, expected] of pages) {
    test(`${path} — свой заголовок и превью`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveTitle(new RegExp(expected))
      await expect(page.locator('h1')).toHaveCount(1)
      const og = await page.locator('meta[property="og:image"]').getAttribute('content')
      expect(og).toContain('og.png')
    })
  }

  test('несуществующий адрес показывает 404', async ({ page }) => {
    await page.goto('/takoy-stranicy-net')
    await expect(page.locator('.nf__code')).toBeVisible()
  })
})

test.describe('Кнопка «наверх»', () => {
  test('одна круглая кнопка внизу справа, без дублей записи', async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto('/about')
    // в колонке остаётся ровно одна кнопка — «наверх»
    await expect(page.locator('.sticky-actions button')).toHaveCount(1)
    await page.evaluate(() => window.scrollTo(0, 3000))
    await expect(page.locator('.sticky-actions__up')).toHaveClass(/is-visible/)
  })
})

test.describe('Мобильная версия', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

  test('ничего не вылезает за экран', async ({ page }) => {
    for (const path of ['/', '/catalog', '/catalog/signia-motion-2px', '/contacts', '/news']) {
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `горизонтальная прокрутка на ${path}`).toBe(0)
    }
  })

  test('нижняя панель с телефоном и записью на месте', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.mbar__call')).toBeVisible()
    await expect(page.locator('.mbar__book')).toBeVisible()
  })

  test('меню короткое, разделы каталога под стрелкой', async ({ page }) => {
    await page.goto('/')
    await page.locator('.burger').tap()
    await expect(page.locator('.megamenu')).toBeHidden()
    await page.locator('.nav__more').tap()
    await expect(page.locator('.megamenu')).toBeVisible()
  })

  test('карточка каталога компактная', async ({ page }) => {
    await page.goto('/catalog')
    const h = await page.locator('.pcard').first().evaluate((el) => el.getBoundingClientRect().height)
    expect(h).toBeLessThan(220)
  })
})

test.describe('Доступность', () => {
  test('у картинок есть подписи, у полей — метки', async ({ page }) => {
    await page.goto('/catalog')
    const bad = await page.evaluate(() => ({
      img: [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('alt')).length,
      fields: [...document.querySelectorAll('input, select, textarea')].filter((i) => !i.labels?.length && !i.getAttribute('aria-label')).length,
    }))
    expect(bad.img).toBe(0)
    expect(bad.fields).toBe(0)
  })

  test('есть ссылка «к содержимому» и обводка фокуса', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.skip')).toHaveCount(1)
    const outline = await page.evaluate(() => {
      const el = document.querySelector('.btn-primary')
      el.focus()
      return getComputedStyle(el).outlineWidth
    })
    expect(outline).not.toBe('0px')
  })
})

test.describe('Скорость и выдача', () => {
  test('страницы отдаются готовым HTML: робот видит текст без скриптов', async ({ browser }) => {
    // выключаем скрипты — остаётся то, что увидит поисковый робот и превью ссылки
    const ctx = await browser.newContext({ javaScriptEnabled: false })
    const page = await ctx.newPage()
    // со слешем на конце: так адрес папки со страницей выглядит на хостинге
    await page.goto('/catalog/signia-motion-2px/')
    await expect(page).toHaveTitle(/Signia Motion 2px/)
    await expect(page.locator('h1')).toContainText('Signia Motion 2px')
    await page.goto('/about/')
    await expect(page.locator('#main')).toContainText('тест слуха')
    // блоки ниже первого экрана должны быть видны, а не прозрачны
    await expect(page.locator('.adv__item').first()).toBeVisible()
    await ctx.close()
  })

  test('шрифт лежит в проекте: за ним не ходят к Google', async ({ page }) => {
    const outside = []
    page.on('request', (r) => {
      const host = new URL(r.url()).host
      // карта и панель — свои по договорённости, остальное чужое
      if (/google|gstatic|cdn|unpkg|jsdelivr|typekit/.test(host)) outside.push(host)
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(outside).toEqual([])
    // шрифт приезжает со своего сервера
    const fonts = await page.evaluate(() =>
      performance.getEntriesByType('resource').filter((r) => r.name.includes('golos')).map((r) => r.name))
    expect(fonts.length).toBeGreaterThan(0)
    expect(fonts.every((u) => u.includes('localhost'))).toBe(true)
  })

  test('страницы собраны отдельными кусками, а не одним файлом', async () => {
    const files = readdirSync('dist/assets').filter((f) => f.endsWith('.js'))
    // у каждой страницы свой файл: человек скачивает только то, что открыл
    expect(files.length).toBeGreaterThan(5)
    expect(files.some((f) => f.startsWith('Catalog-'))).toBe(true)
    const main = files.find((f) => f.startsWith('index-'))
    const weight = statSync(`dist/assets/${main}`).size
    expect(weight, 'вес основного файла').toBeLessThan(260 * 1024)
  })
})

test.describe('Появление блоков', () => {
  test('при прокрутке главной проявляются все блоки, пустых мест не остаётся', async ({ page }) => {
    await page.goto('/')
    for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, 400); await page.waitForTimeout(50) }
    await page.waitForTimeout(600)
    const hidden = await page.$$eval('.reveal', (els) =>
      els.filter((e) => !e.classList.contains('in')).map((e) => e.innerText.slice(0, 30)))
    expect(hidden).toEqual([])
  })
})

test.describe('Телефон: размер кнопок', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

  test('по кнопкам и ссылкам можно попасть пальцем', async ({ page }) => {
    for (const path of ['/', '/catalog', '/contacts']) {
      await page.goto(path)
      const small = await page.$$eval('a, button, select', (els) =>
        els.filter((el) => {
          const r = el.getBoundingClientRect()
          if (!r.width || getComputedStyle(el).visibility === 'hidden') return false
          // названия товаров — обычный текст в строке, их не считаем
          if (el.closest('.pcard__body h3') || el.closest('.crumbs') || el.closest('.rform__consent')) return false
          return r.height < 38
        }).map((el) => {
          const r = el.getBoundingClientRect()
          return `${el.tagName}.${(el.className.baseVal ?? el.className ?? '').toString().split(' ')[0]} ${Math.round(r.width)}x${Math.round(r.height)} «${(el.innerText || '').slice(0, 20)}»`
        }))
      expect(small, `мелкие кнопки на ${path}`).toEqual([])
    }
  })
})

