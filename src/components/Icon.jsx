const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const PB = { ...P, strokeWidth: 2.4 } // потолще: стрелки и галочки

const PATHS = {
  brain: <path {...P} d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 1 5 3 3 0 0 0 3 3c1 0 2-.5 2-1.5V5.5C11 4.5 10 4 9 4Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-1 5 3 3 0 0 1-3 3c-1 0-2-.5-2-1.5V5.5C13 4.5 14 4 15 4Z" />,
  bone: <path {...P} d="M7 17a2.2 2.2 0 1 1-2-2 2.2 2.2 0 1 1 3-3l6 6a2.2 2.2 0 1 1 3 3 2.2 2.2 0 1 1-2 2Z" />,
  wave: <path {...P} d="M3 12h2l2-5 3 10 3-12 3 9 2-2h3" />,
  ear: <path {...P} d="M8 8a4 4 0 0 1 8 0c0 2.2-1.6 3.2-2.6 4.2-.8.8-1.4 1.5-1.4 2.8a2 2 0 1 1-4 0M6 16a3 3 0 0 0 1 4" />,
  heart: <path {...P} d="M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.6 12 20 12 20Z" />,
  chat: <path {...P} d="M4 5h16v10H9l-5 4V5Z" />,
  leaf: <path {...P} d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13Zm0 0c2-4 5-6 9-7" />,
  team: <><circle {...P} cx="9" cy="8" r="3" /><path {...P} d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 5.8M16.5 14.5a5.5 5.5 0 0 1 4 4.5" /></>,
  target: <><circle {...P} cx="12" cy="12" r="8" /><circle {...P} cx="12" cy="12" r="3.5" /><path {...P} d="M12 4v3M12 17v3M4 12h3M17 12h3" /></>,
  home: <path {...P} d="M4 11 12 4l8 7M6 10v9h12v-9" />,
  shield: <path {...P} d="M12 3 5 6v6c0 4 3 7 7 8 4-1 7-4 7-8V6Zm-2 9 1.5 1.5L15 10" />,
  phone: <path {...P} d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L17 12l4 1.5V17a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2Z" />,
  pin: <><path {...P} d="M12 21c4-4.5 7-8 7-11a7 7 0 0 0-14 0c0 3 3 6.5 7 11Z" /><circle {...P} cx="12" cy="10" r="2.5" /></>,
  mail: <><rect {...P} x="3" y="5" width="18" height="14" rx="2" /><path {...P} d="m3 7 9 6 9-6" /></>,
  clock: <><circle {...P} cx="12" cy="12" r="8" /><path {...P} d="M12 8v4l3 2" /></>,
  arrow: <path {...PB} d="M4 12h15M13 6l6 6-6 6" />,
  check: <path {...PB} d="m5 13 4 4L19 7" />,
}

export default function Icon({ name, size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      {PATHS[name] || null}
    </svg>
  )
}
