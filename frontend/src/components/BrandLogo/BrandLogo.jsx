import './BrandLogo.css'

export default function BrandLogo({ compact = false, className = '' }) {
  return (
    <span className={`brand-logo ${compact ? 'brand-logo--compact' : ''} ${className}`.trim()}>
      <span className="brand-logo__mark" aria-hidden="true">
        <span className="brand-logo__d">D</span>
        <span className="brand-logo__h">H</span>
      </span>

      <span className="brand-logo__name">DESIRÉE HONÓRIO</span>
      {!compact && <span className="brand-logo__sub">Designer de Sobrancelhas</span>}
    </span>
  )
}
