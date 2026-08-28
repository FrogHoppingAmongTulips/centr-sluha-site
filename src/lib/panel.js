/* Связь с панелью управления.

   Сайт работает и без панели: если она недоступна (выключена, идут работы,
   нет сети), показывается встроенный контент из data/site.js. Панель, когда
   отвечает, эти данные замещает. Заявки при недоступной панели уходят
   прежним путём — сообщением или письмом. */

const URL_BASE = import.meta.env.VITE_PANEL_URL || ''

export const panelEnabled = Boolean(URL_BASE)

const get = async (path) => {
  const res = await fetch(`${URL_BASE}${path}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`панель ответила ${res.status}`)
  const body = await res.json()
  return body.data
}

const fileUrl = (id) => (id ? `${URL_BASE}/assets/${id}` : null)

/* ——— приведение к тем же формам, что и во встроенных данных ——— */

/* Списки из панели приходят строкой JSON — приводим к массиву */
const toList = (value) => {
  if (Array.isArray(value)) return value
  if (typeof value !== 'string' || !value.trim()) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : [String(parsed)]
  } catch {
    return value.split('\n').map((v) => v.trim()).filter(Boolean)
  }
}

const toSpecs = (rows) =>
  toList(rows)
    .map((row) => {
      const [k, ...rest] = String(row).split(':')
      return { k: k.trim(), v: rest.join(':').trim() }
    })
    .filter((s) => s.k && s.v)

const toProduct = (p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  brand: p.brand,
  price: p.price,
  old: p.old_price || null,
  tag: p.tag || null,
  short: p.short || '',
  img: fileUrl(p.image),
  points: toList(p.points),
  specs: toSpecs(p.specs),
  desc: (p.description || '').split('\n\n').filter(Boolean),
  terms: [],
  unit: 'шт',
  stock: p.stock,
  onHome: !!p.on_home,
})

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const toRuDate = (iso) => {
  if (!iso) return ''
  const [y, m, d] = String(iso).split('T')[0].split('-')
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`
}

const toPost = (n) => ({
  slug: n.slug,
  type: n.type,
  tag: n.tag,
  date: toRuDate(n.date),
  title: n.title,
  excerpt: n.excerpt || '',
  cover: fileUrl(n.cover),
  body: (n.body || '').split('\n\n').filter(Boolean),
})

const toPromo = (a) => ({
  title: a.title,
  text: a.text || '',
  note: a.benefit || '',
  until: toRuDate(a.date_end),
  cover: fileUrl(a.image),
  inSlider: !!a.in_slider,
})

const toCenter = (c) => ({
  slug: c.slug,
  title: c.title,
  address: c.address,
  metro: c.metro,
  hours: c.hours,
  phone: c.phone,
  coords: String(c.coords || '')
    .split(',')
    .map((n) => Number(n.trim()))
    .filter((n) => !Number.isNaN(n)),
  note: c.note || '',
  desc: (c.desc || '').split('\n\n').filter(Boolean),
  features: toList(c.features),
  cover: fileUrl(c.photo),
  gallery: [],
  route: [],
  district: '',
})

/* ——— загрузка всего содержимого одним заходом ——— */
export async function loadContent() {
  const [tovary, uslugi, akcii, novosti, centry, nastroyki] = await Promise.all([
    get('/items/tovary?limit=-1&sort=sort'),
    get('/items/uslugi?limit=-1&sort=sort'),
    get('/items/akcii?limit=-1&sort=sort'),
    get('/items/novosti?limit=-1&sort=-date'),
    get('/items/centry?limit=-1'),
    get('/items/nastroyki'),
  ])

  const products = tovary.map(toProduct)

  return {
    CATALOG: products,
    HOME_PRODUCTS: products.filter((p) => p.onHome),
    SERVICES: uslugi.map((s) => ({ title: s.title, price: s.price, text: s.text || '', icon: 'wave' })),
    PROMOS: akcii.map(toPromo),
    NEWS: novosti.map(toPost),
    CENTERS: centry.map(toCenter),
    SITE_OVERRIDES: nastroyki
      ? {
          phone: nastroyki.phone,
          phoneHref: `tel:${String(nastroyki.phone || '').replace(/[^\d+]/g, '')}`,
          email: nastroyki.email,
          address: nastroyki.address,
          hours: nastroyki.hours,
          requisites: nastroyki.requisites,
        }
      : null,
  }
}

/* ——— отправка заявки ——— */
export async function sendRequest(payload) {
  const res = await fetch(`${URL_BASE}/items/zayavki`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`заявка не принята: ${res.status}`)
  return true
}
