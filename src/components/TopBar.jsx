import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function TopBar({ title, subtitle, onBack, right, transparent = false }) {
  const navigate = useNavigate()
  return (
    <header className={`sticky top-0 z-20 ${transparent ? '' : 'bg-white/90 dark:bg-ink-900/90 backdrop-blur border-b border-ink-100 dark:border-ink-800'}`}>
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2 min-w-0">
          {onBack !== null && (
            <button
              onClick={() => (onBack ? onBack() : navigate(-1))}
              aria-label="Go back"
              className="p-1.5 -ml-1.5 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="font-display font-semibold text-base text-ink-900 dark:text-ink-50 truncate">{title}</h1>
            {subtitle && <p className="text-xs text-ink-500 dark:text-ink-400 truncate">{subtitle}</p>}
          </div>
        </div>
        {right && <div className="flex-shrink-0">{right}</div>}
      </div>
    </header>
  )
}
