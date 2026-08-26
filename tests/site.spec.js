import { test, expect } from '@playwright/test'

/* Проверки основных сценариев. Запуск: npm test
   Тесты идут по собранной версии (npm run preview), как её видит посетитель. */

test.describe('Главная', () => {
  test('открывается сверху и показывает первый экран', async ({ page }) => {
    await page.goto('/')
    expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(0)
    await expect(page.locator('.hslider__copy h1')).toBeVisible()
    await expect(page.locator('.hslider__ph img')).toBeVisible()
  })

  test('слайдер листается стрелками и точками', async ({ page }) => {
    await page.goto('/')
    const first = await page.locator('.hslider__copy h1').textContent()
    await page.locator('.hslider__arrow--next').click()
    await expect(page.locator('.hslider__copy h1')).not.toHaveText(first)
    await page.locator('.hslider__dots button').first().click()
    await expect(page.locator('.hslider__copy h1')).toHaveText(first)
  })

  test('переключатель «Аппараты / Услуги» работает', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: 'Услуги' }).click()
    await expect(page.locator('.srv')).toHaveCount(3)
  })

  test('кнопка «наверх» поднимает страницу до конца', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 4000))
    await page.locator('.sticky-actions__up').click()
    await expect.poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 4000 }).toBe(0)
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

  test('фильтр по категории сужает выдачу', async ({ page }) => {
    await page.goto('/catalog')
    const all = await page.locator('.pcard').count()
    await page.locator('.chip', { hasText: 'Услуги центра' }).click()
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

  test('заявка собирается и предлагает способы отправки', async ({ page }) => {
    await page.goto('/contacts')
    await page.getByRole('tab', { name: 'Обратный звонок' }).click()
    await page.locator('.form-card input[name="name"]').fill('Иван')
    await page.locator('.form-card input[name="phone"]').type('9138217347')
    await page.locator('.form-card input[type="checkbox"]').check()
    await page.locator('.form-card button[type="submit"]').click()
    await expect(page.locator('.rform--done')).toBeVisible()
    await expect(page.locator('.rform__send a').first()).toHaveAttribute('href', /wa\.me/)
    await expect(page.locator('.rform__preview')).toContainText('Иван')
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
