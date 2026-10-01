import { Sun, Moon, Type, Palette } from 'lucide-react'
import TopBar from '../../components/TopBar'
import { useSettings } from '../../hooks/useSettings'
import { useAuth } from '../../hooks/useAuth'
import BottomNav from '../../components/BottomNav'
import { passengerNavItems, driverNavItems } from '../../utils/navItems'

const FONT_SIZES = [
  { key: 'sm', label: 'Small' },
  { key: 'md', label: 'Medium' },
  { key: 'lg', label: 'Large' },
]

export default function Settings() {
  const { settings, setFontSize, setBrightness, setTheme, toggleDarkMode, THEMES } = useSettings()
  const { user } = useAuth()
  const navItems = user?.role === 'driver' ? driverNavItems : passengerNavItems

  return (
    <div className="phone-shell">
      <TopBar title="Settings" />
      <div className="screen-scroll px-5 pt-4 space-y-6">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-900 dark:text-ink-50 flex items-center gap-2">{settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Dark Mode</p>
            <button
              onClick={toggleDarkMode}
              role="switch"
              aria-checked={settings.darkMode}
              className={`relative w-12 h-7 rounded-full transition-colors ${settings.darkMode ? 'bg-brand-600' : 'bg-ink-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-soft transition-transform ${settings.darkMode ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        </div>

        <div>
          <p className="label flex items-center gap-1.5 mb-2"><Type className="w-3.5 h-3.5" /> Font size</p>
          <div className="grid grid-cols-3 gap-2">
            {FONT_SIZES.map((f) => (
              <button key={f.key} onClick={() => setFontSize(f.key)} className={`py-2.5 rounded-xl text-sm font-medium border ${settings.fontSize === f.key ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' : 'border-ink-200 dark:border-ink-700 text-ink-500'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="brightness" className="label mb-2">Brightness</label>
          <input id="brightness" type="range" min={0.6} max={1.2} step={0.05} value={settings.brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full accent-brand-600" />
          <div className="flex justify-between text-[11px] text-ink-400 mt-1"><span>Dim</span><span>Bright</span></div>
        </div>

        <div>
          <p className="label flex items-center gap-1.5 mb-2"><Palette className="w-3.5 h-3.5" /> Background theme</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(THEMES).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium ${settings.theme === key ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' : 'border-ink-200 dark:border-ink-700 text-ink-500'}`}
              >
                <span className="w-4 h-4 rounded-full border border-ink-300" style={{ background: theme.bg }} />
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav items={navItems} />
    </div>
  )
}
