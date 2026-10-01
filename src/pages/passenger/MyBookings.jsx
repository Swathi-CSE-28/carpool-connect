import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarX } from 'lucide-react'
import TopBar from '../../components/TopBar'
import EmptyState from '../../components/EmptyState'
import StatusBadge from '../../components/StatusBadge'
import { bookings } from '../../data/mock'
import { formatDate, formatTime, formatCurrency } from '../../utils/format'
import BottomNav from '../../components/BottomNav'
import { passengerNavItems } from '../../utils/navItems'

const TABS = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

export default function MyBookings() {
  const [tab, setTab] = useState('Confirmed')
  const filtered = useMemo(() => bookings.filter((b) => b.status === tab.toLowerCase()), [tab])

  return (
    <div className="phone-shell">
      <TopBar title="My Bookings" />
      <div className="px-5 pt-3 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${tab === t ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="screen-scroll px-5 pt-3 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState icon={CalendarX} title={`No ${tab.toLowerCase()} bookings`} description="Rides you book will show up here." />
        ) : (
          filtered.map((b) => (
            <div key={b.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-ink-900 dark:text-ink-50 text-sm">{b.driverName}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{b.from} → {b.to}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{formatDate(b.date)} · {formatTime(b.time)} · {formatCurrency(b.price)}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
              <div className="flex gap-2 mt-3">
                <Link to={`/passenger/ride/${b.rideId}`} className="flex-1 btn-secondary py-1.5 text-xs">View Ride</Link>
                <Link to={`/passenger/pin/${b.id}`} className="flex-1 btn-primary py-1.5 text-xs">View PIN</Link>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNav items={passengerNavItems} />
    </div>
  )
}
