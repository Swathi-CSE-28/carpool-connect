import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const SettingsContext = createContext(null)

const THEMES = {
  light: { bg: '#f4f6f5', bgDark: '#f4f6f5', label: 'Light' },
  dark: { bg: '#0a0d11', bgDark: '#0a0d11', label: 'Dark' },
  forest: { bg: '#eafaf1', bgDark: '#08130f', label: 'Forest Green' },
  sunset: { bg: '#fff7ed', bgDark: '#1a1006', label: 'Sunset' },
}

const defaultSettings = { fontSize: 'md', brightness: 1, theme: 'light', darkMode: false }

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cpc-settings'))
      return { ...defaultSettings, ...saved }
    } catch {
      return defaultSettings
    }
  })

  useEffect(() => {
    localStorage.setItem('cpc-settings', JSON.stringify(settings))
    const root = document.documentElement
    root.setAttribute('data-font', settings.fontSize)
    root.classList.toggle('dark', settings.darkMode)
    const theme = THEMES[settings.theme] || THEMES.light
    root.style.setProperty('--screen-bg', theme.bg)
    root.style.setProperty('--screen-bg-dark', theme.bgDark)
    root.style.setProperty('--app-brightness', settings.brightness)
  }, [settings])

  const setFontSize = useCallback((fontSize) => setSettings((s) => ({ ...s, fontSize })), [])
  const setBrightness = useCallback((brightness) => setSettings((s) => ({ ...s, brightness })), [])
  const setTheme = useCallback((theme) => setSettings((s) => ({ ...s, theme })), [])
  const toggleDarkMode = useCallback(() => setSettings((s) => ({ ...s, darkMode: !s.darkMode })), [])

  return (
    <SettingsContext.Provider value={{ settings, setFontSize, setBrightness, setTheme, toggleDarkMode, THEMES }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettingsContext() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettingsContext must be used within SettingsProvider')
  return ctx
}
