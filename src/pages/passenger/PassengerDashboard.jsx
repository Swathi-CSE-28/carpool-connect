import { Link } from 'react-router-dom'
import { Bell, Star, MapPin } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { rides, notifications } from '../../data/mock'
import { formatTime, formatCurrency, initials } from '../../utils/format'
import BottomNav from '../../components/BottomNav'
import { passengerNavItems } from '../../utils/navItems'

export default function PassengerDashboard() {
  const { user } = useAuth()
  const recommended = rides.filter((r) => r.status === 'upcoming').slice(0, 3)
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="phone-shell">
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-500 dark:text-ink-400">Hello, {user?.name?.split(' ')[0]}</p>
          <p className="font-display font-semibold text-ink-900 dark:text-ink-50">Passenger</p>
        </div>
        <Link to="/messages" className="relative p-2 rounded-full bg-ink-100 dark:bg-ink-800" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />}
        </Link>
      </header>

      <div className="screen-scroll px-5 space-y-6">
        <Link to="/passenger/find" className="card p-5 block bg-brand-600 border-none text-white">
          <p className="font-display font-semibold text-lg">Find a Ride</p>
          <p className="text-xs text-brand-100 mt-1">Search by route, date & time</p>
        </Link>

        <div>
          <p className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-3">Recommended Rides</p>
          <div className="space-y-3">
            {recommended.map((r) => (
              <Link to={`/passenger/ride/${r.id}`} key={r.id} className="card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-ink-50 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-500" /> {r.from} → {r.to}</p>
                  <p className="text-xs text-ink-400 mt-1">{formatTime(r.time)} · {r.availableSeats} Seats · {formatCurrency(r.price)}</p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-ink-600 dark:text-ink-300"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {r.driverRating}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomNav items={passengerNavItems} />
    </div>
  )
}
