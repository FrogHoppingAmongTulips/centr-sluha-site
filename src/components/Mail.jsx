/* Почта переносится только перед «собакой»: доменная часть остаётся целой,
   а не разрывается посередине. */
export default function Mail({ address, className = '' }) {
  const at = address.indexOf('@')
  if (at < 0) return <a className={className} href={`mailto:${address}`}>{address}</a>

  return (
    <a className={`mail ${className}`} href={`mailto:${address}`}>
      <span className="mail__name">{address.slice(0, at)}</span>
      <wbr />
      <span className="mail__domain">{address.slice(at)}</span>
    </a>
  )
}
