import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, MapPin } from 'lucide-react'
import TopBar from '../../components/TopBar'
import EmptyState from '../../components/EmptyState'
import StatusBadge from '../../components/StatusBadge'
import { rides } from '../../data/mock'
import { formatDate, formatTime, formatCurrency } from '../../utils/format'
import BottomNav from '../../components/BottomNav'
import { driverNavItems } from '../../utils/navItems'

const TABS = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
]

export default function ManageRides() {
  const [tab, setTab] = useState('upcoming')
  const filtered = useMemo(() => rides.filter((r) => r.status === tab), [tab])

  return (
    <div className="phone-shell">
      <TopBar
        title="My Rides"
        subtitle="Tirunelveli · Kovilpatti"
        right={<Link to="/driver/create-ride" className="p-2 rounded-full bg-brand-600 text-white" aria-label="Create ride"><Plus className="w-4 h-4" /></Link>}
      />
      <div className="px-5 pt-3">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${tab === t.key ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-300'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="screen-scroll px-5 pt-2 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState icon={MapPin} title={`No ${tab} rides`} description="Rides in this category will show up here." />
        ) : (
          filtered.map((r) => (
            <div key={r.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-ink-900 dark:text-ink-50 text-sm">{r.from} → {r.to}</p>
                  <p className="text-xs text-ink-400 mt-1">{formatDate(r.date)} · {formatTime(r.time)}</p>
                </div>
                <StatusBadge status={tab} label={tab === 'upcoming' ? 'Upcoming' : undefined} />
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-100 dark:border-ink-800 text-xs text-ink-500 dark:text-ink-400">
                <span>{r.totalSeats - r.availableSeats}/{r.totalSeats} seats booked</span>
                <span className="font-medium text-ink-900 dark:text-ink-50">{formatCurrency(r.price)}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNav items={driverNavItems} />
    </div>
  )
}
