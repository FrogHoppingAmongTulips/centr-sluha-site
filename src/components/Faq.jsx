import { useState } from 'react'
import Icon from './Icon'
import './Faq.css'

export default function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={it.q}>
            <button className="faq__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              <span>{it.q}</span>
              <span className="faq__plus"><Icon name="arrow" size={20} /></span>
            </button>
            <div className="faq__a" hidden={!isOpen}><p>{it.a}</p></div>
          </div>
        )
      })}
    </div>
  )
}
