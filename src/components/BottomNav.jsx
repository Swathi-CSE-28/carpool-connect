import { NavLink } from 'react-router-dom'

export default function BottomNav({ items }) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 dark:bg-ink-900/95 backdrop-blur border-t border-ink-100 dark:border-ink-800 flex items-center justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] z-30"
      aria-label="Primary"
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-medium transition-colors ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-ink-400'
            }`
          }
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
