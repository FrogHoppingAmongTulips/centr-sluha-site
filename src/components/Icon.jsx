const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const PB = { ...P, strokeWidth: 2.4 } // потолще: стрелки и галочки

const PATHS = {
  wave: <path {...P} d="M3 12h2l2-5 3 10 3-12 3 9 2-2h3" />,
  ear: <path {...P} d="M8 8a4 4 0 0 1 8 0c0 2.2-1.6 3.2-2.6 4.2-.8.8-1.4 1.5-1.4 2.8a2 2 0 1 1-4 0M6 16a3 3 0 0 0 1 4" />,
  heart: <path {...P} d="M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.6 12 20 12 20Z" />,
  chat: <path {...P} d="M4 5h16v10H9l-5 4V5Z" />,
  team: <><circle {...P} cx="9" cy="8" r="3" /><path {...P} d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 5.8M16.5 14.5a5.5 5.5 0 0 1 4 4.5" /></>,
  target: <><circle {...P} cx="12" cy="12" r="8" /><circle {...P} cx="12" cy="12" r="3.5" /><path {...P} d="M12 4v3M12 17v3M4 12h3M17 12h3" /></>,
  home: <path {...P} d="M4 11 12 4l8 7M6 10v9h12v-9" />,
  shield: <path {...P} d="M12 3 5 6v6c0 4 3 7 7 8 4-1 7-4 7-8V6Zm-2 9 1.5 1.5L15 10" />,
  phone: <path {...P} d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L17 12l4 1.5V17a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2Z" />,
  pin: <><path {...P} d="M12 21c4-4.5 7-8 7-11a7 7 0 0 0-14 0c0 3 3 6.5 7 11Z" /><circle {...P} cx="12" cy="10" r="2.5" /></>,
  mail: <><rect {...P} x="3" y="5" width="18" height="14" rx="2" /><path {...P} d="m3 7 9 6 9-6" /></>,
  clock: <><circle {...P} cx="12" cy="12" r="8" /><path {...P} d="M12 8v4l3 2" /></>,
  calendar: <><rect {...P} x="3.5" y="5" width="17" height="15" rx="2" /><path {...P} d="M3.5 10h17M8 3.5v3M16 3.5v3" /></>,
  doc: <><path {...P} d="M6 3h7l5 5v13H6Z" /><path {...P} d="M13 3v5h5M9 13h6M9 17h6" /></>,
  filter: <path {...P} d="M4 6h16l-6 7v6l-4-2v-4Z" />,
  search: <><circle {...P} cx="11" cy="11" r="6" /><path {...PB} d="m16 16 4 4" /></>,
  cart: <><path {...P} d="M4 5h2l2 10h9l2-7H7" /><circle {...P} cx="10" cy="19" r="1.4" /><circle {...P} cx="17" cy="19" r="1.4" /></>,
  close: <path {...PB} d="M6 6 18 18M18 6 6 18" />,
  arrow: <path {...PB} d="M4 12h15M13 6l6 6-6 6" />,
  arrowLeft: <path {...PB} d="M20 12H5M11 6l-6 6 6 6" />,
  check: <path {...PB} d="m5 13 4 4L19 7" />,
  star: <path {...P} fill="currentColor" stroke="none" d="m12 3 2.7 5.9 6.3.7-4.7 4.5 1.2 6.4L12 17.3 6.5 20.5l1.2-6.4L3 9.6l6.3-.7Z" />,
}

export default function Icon({ name, size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      {PATHS[name] || null}
    </svg>
  )
}
