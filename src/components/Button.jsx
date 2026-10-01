import { Loader2 } from 'lucide-react'

const VARIANTS = { primary: 'btn-primary', secondary: 'btn-secondary', ghost: 'btn-ghost' }

export default function Button({ children, variant = 'primary', loading = false, icon: Icon, className = '', type = 'button', ...rest }) {
  return (
    <button type={type} className={`${VARIANTS[variant]} ${className}`} disabled={loading || rest.disabled} {...rest}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </button>
  )
}
