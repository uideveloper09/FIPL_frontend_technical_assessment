import { Link } from 'react-router-dom'

type BrandLogoProps = {
  compact?: boolean
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link to="/" className="inline-flex items-center no-underline">
      <img
        src="/force-intellect-logo.png"
        alt="Force Intellect — adding value, enabling growth"
        className={compact ? 'h-8 w-auto' : 'h-12 w-auto sm:h-14'}
      />
    </Link>
  )
}
