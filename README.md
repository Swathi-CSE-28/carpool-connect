# CarPool Connect — Mobile App Frontend

A mobile-first React frontend (21 screens) for a car-pooling platform, matching the provided UI design: splash, onboarding, driver/passenger auth, dashboards, ride creation & search, bookings, waiting/PIN verification, live tracking, SOS, recurring rides, smart pickup, messaging, settings, and an admin dashboard.

## Tech stack
React 18 + Vite, Tailwind CSS, React Router DOM, Framer Motion, Lucide icons.

## React Hooks used
- **useState** — every form, tab, and toggle across all 21 screens
- **useEffect** — splash auto-redirect timer, live trip-status/tracking simulation, persisting settings & auth to localStorage, auto-scrolling chat
- **useContext** — `AuthContext` (login/register/logout, current user) and `SettingsContext` (font size, brightness, background theme, dark mode)
- **useMemo** — filtered/sorted ride results, request tab counts, dashboard stat derivations
- **useCallback** — form field handlers, day-toggle, message send, request accept/reject
- Custom hooks — `useAuth`, `useSettings`

## Running
```bash
npm install
npm run dev
npm run build
```

## Demo accounts (password: `password`)
- `arun@example.com` — driver
- `priya@example.com` — passenger
- `divya@example.com` — admin

## Settings
The Settings screen (accessible from Profile) controls font size (small/medium/large), brightness (CSS filter), background theme (Light / Dark / Forest Green / Sunset), and dark mode — all persisted to `localStorage` via `SettingsContext`.

## Future backend integration
Auth and data calls currently simulate network latency with `setTimeout`-wrapped Promises in `AuthContext` and inline in pages. Replace these with real `fetch()` calls to a Node.js + Express.js + MongoDB backend, keeping the same function signatures.
