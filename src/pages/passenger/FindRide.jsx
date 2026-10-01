import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Navigation, Users, DollarSign, MapPinned, Clock, Star } from 'lucide-react'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import { rides } from '../../data/mock'
import { initials } from '../../utils/format'
import BottomNav from '../../components/BottomNav'
import { passengerNavItems } from '../../utils/navItems'

const FILTERS = [
  { key: 'price', label: 'Price', icon: DollarSign },
  { key: 'distance', label: 'Distance', icon: MapPinned },
  { key: 'time', label: 'Time', icon: Clock },
  { key: 'rating', label: 'Rating', icon: Star },
]

export default function FindRide() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ from: '', to: 'Kovilpatti', date: '2026-09-25', seats: 1 })
  const [activeFilter, setActiveFilter] = useState(null)

  const handleChange = useCallback((key, val) => setValues((prev) => ({ ...prev, [key]: val })), [])

  function handleSearch(e) {
    e.preventDefault()
    navigate('/passenger/results', { state: values })
  }

  const recommended = rides.filter((r) => r.status === 'upcoming')

  return (
    <div className="phone-shell">
      <TopBar title="Find a Ride" />
      <div className="screen-scroll px-5 pt-4 space-y-5">
        <form onSubmit={handleSearch} className="card p-4 space-y-3">
          <div>
            <label htmlFor="from" className="label flex items-center justify-between">From <button type="button" className="text-brand-600 dark:text-brand-400 flex items-center gap-1 text-[11px]"><Navigation className="w-3 h-3" /> Use Current Location</button></label>
            <div className="relative"><MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="from" className="input pl-10" value={values.from} onChange={(e) => handleChange('from', e.target.value)} /></div>
          </div>
          <div>
            <label htmlFor="to" className="label">To</label>
            <div className="relative"><MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="to" className="input pl-10" value={values.to} onChange={(e) => handleChange('to', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="date" className="label">Date</label>
              <input id="date" type="date" className="input" value={values.date} onChange={(e) => handleChange('date', e.target.value)} />
            </div>
            <div>
              <label htmlFor="seats" className="label">Seats</label>
              <div className="relative"><Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="seats" type="number" min={1} max={6} className="input pl-10" value={values.seats} onChange={(e) => handleChange('seats', e.target.value)} /></div>
            </div>
          </div>
          <Button type="submit" className="w-full">Search Rides</Button>
        </form>

        <div>
          <p className="label mb-2">Filters</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button key={f.key} onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)} className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap ${activeFilter === f.key ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300'}`}>
                <f.icon className="w-3.5 h-3.5" /> {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="label mb-2">Recommended Rides</p>
          <div className="space-y-3">
            {recommended.map((r) => (
              <button key={r.id} onClick={() => navigate(`/passenger/ride/${r.id}`)} className="card p-4 w-full text-left flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xs font-semibold text-brand-700 dark:text-brand-300 flex-shrink-0">{initials(r.driverName)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{r.driverName}</p>
                  <p className="text-xs text-ink-400">{r.from} → {r.to} · {r.availableSeats} Seats</p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-ink-500"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {r.driverRating}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav items={passengerNavItems} />
    </div>
  )
}
