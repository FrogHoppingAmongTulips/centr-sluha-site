import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/* Простая корзина прототипа: список выбранных позиций без количеств.
   Итог считать нечем — цены это строки-заглушки, поэтому в корзине
   показывается цена каждой позиции, а «итого» остаётся заглушкой. */
const Ctx = createContext(null)

export const useCart = () => useContext(Ctx)

export function CartProvider({ children }) {
  /* список переживает перезагрузку страницы */
  const [slugs, setSlugs] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cart') || '[]')
      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(slugs)) } catch { /* приватный режим — не страшно */ }
  }, [slugs])

  const add = useCallback((slug) => setSlugs((v) => (v.includes(slug) ? v : [...v, slug])), [])
  const remove = useCallback((slug) => setSlugs((v) => v.filter((s) => s !== slug)), [])
  const clear = useCallback(() => setSlugs([]), [])

  const value = useMemo(() => ({ slugs, add, remove, clear, has: (s) => slugs.includes(s) }), [slugs, add, remove, clear])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
