/* Логотип: ухо со слуховым аппаратом (по картинке заказчика).
   Единственная не-заглушечная графика в прототипе. */
const OUTLINE = '#22407e'
const SKIN = '#f4c49f'
const BLUE = '#aecbf2'

export default function Logo({ size = 32, className }) {
  const line = { fill: 'none', stroke: OUTLINE, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const shape = { stroke: OUTLINE, strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' }

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="Центр слуха">
      {/* корпус заушного аппарата (за ухом) */}
      <path
        {...shape}
        fill={BLUE}
        d="M41 13c3.5-6 11.5-7.5 15-2 2.5 4 2.7 8.5 2.6 12.8l-.4 14.4c-.1 4.9-3.8 8.6-8.4 8.6s-8.3-3.9-8.3-8.8l.2-15c0-4.6-2.5-6.9-.7-10Z"
      />
      {/* светлая верхушка корпуса */}
      <path
        {...shape}
        fill="#fff"
        d="M41 13c3.5-6 11.5-7.5 15-2 1.8 2.8 2.4 6 2.5 9.2l-16.8 2.6c0-4.4-2.5-6.8-.7-9.8Z"
      />
      <circle cx="50.6" cy="31.5" r="1.2" fill={OUTLINE} />
      <circle cx="49.2" cy="36" r="1.5" fill={OUTLINE} />
      <circle cx="47.8" cy="41" r="1.9" fill={OUTLINE} />

      {/* ухо */}
      <path
        {...shape}
        fill={SKIN}
        d="M30 6c9 0 15.5 7 15.5 17 0 8-4 13-7 18.5-3 5.5-4.5 13-11.5 15-7 2-16-3-16-11.5V20C11 12 21 6 30 6Z"
      />
      {/* завиток и складки */}
      <path {...line} d="M24.5 16c8-4 15 2 12.5 10-1 3.4-3 6-4.5 9" />
      <path {...line} d="M19.5 33.5c-1.6 4-1.8 8-1.6 12" />
      <path {...line} d="M26 33c1.4 4.2 1.2 8.4.6 12.6" />

      {/* трубка от аппарата к вкладышу */}
      <path {...line} d="M43 12c-7-2.5-14-.5-18 5.5" />

      {/* ушной вкладыш */}
      <circle cx="22" cy="27" r="7.2" fill={BLUE} {...shape} />
      <circle cx="22" cy="27" r="3.2" fill="#fff" stroke={OUTLINE} strokeWidth="2" />
    </svg>
  )
}
