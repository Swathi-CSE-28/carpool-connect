import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Plus, MapPin, Users, ListChecks, Car } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { rides, notifications } from '../../data/mock'
import StatCard from '../../components/StatCard'
import { initials, formatTime } from '../../utils/format'
import BottomNav from '../../components/BottomNav'
import { driverNavItems } from '../../utils/navItems'

export default function DriverDashboard() {
  const { user } = useAuth()
  const myRides = useMemo(() => rides.filter((r) => r.driverId === user?.id || r.driverId === 'd1'), [user])
  const todayRide = myRides.find((r) => r.status === 'upcoming') || myRides[0]
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="phone-shell">
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-500 dark:text-ink-400">Hello, {user?.name?.split(' ')[0]}</p>
          <p className="font-display font-semibold text-ink-900 dark:text-ink-50">Driver</p>
        </div>
        <Link to="/messages" className="relative p-2 rounded-full bg-ink-100 dark:bg-ink-800" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />}
        </Link>
      </header>

      <div className="screen-scroll px-5 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Active Rides" value={myRides.filter((r) => r.status === 'active' || r.status === 'upcoming').length} color="brand" />
          <StatCard label="Pending Requests" value={3} color="dark" />
          <StatCard label="Completed Rides" value={myRides.filter((r) => r.status === 'completed').length} color="slate" />
          <StatCard label="Average Rating" value={`${user?.rating || 4.8}★`} color="amber" />
        </div>

        {todayRide && (
          <div className="card p-4">
            <p className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-2">Today's Ride</p>
            <p className="font-display font-semibold text-ink-900 dark:text-ink-50">{todayRide.from} → {todayRide.to}</p>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{formatTime(todayRide.time)} · {todayRide.totalSeats - todayRide.availableSeats} Seats</p>
            <Link to="/driver/rides" className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-2 inline-block">View</Link>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-3">Quick Actions</p>
          <div className="grid grid-cols-4 gap-3 text-center">
            <Link to="/driver/create-ride" className="flex flex-col items-center gap-1.5">
              <span className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center"><Plus className="w-5 h-5" /></span>
              <span className="text-[11px] text-ink-500 dark:text-ink-400">Create Ride</span>
            </Link>
            <Link to="/driver/rides" className="flex flex-col items-center gap-1.5">
              <span className="w-12 h-12 rounded-2xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center"><Car className="w-5 h-5" /></span>
              <span className="text-[11px] text-ink-500 dark:text-ink-400">My Rides</span>
            </Link>
            <Link to="/driver/requests" className="flex flex-col items-center gap-1.5">
              <span className="w-12 h-12 rounded-2xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center"><ListChecks className="w-5 h-5" /></span>
              <span className="text-[11px] text-ink-500 dark:text-ink-400">Requests</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1.5">
              <span className="w-12 h-12 rounded-2xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center"><Users className="w-5 h-5" /></span>
              <span className="text-[11px] text-ink-500 dark:text-ink-400">Messages</span>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-ink-500 dark:text-ink-400">Upcoming rides</p>
            <Link to="/driver/rides" className="text-xs font-semibold text-brand-600 dark:text-brand-400">See all</Link>
          </div>
          <div className="space-y-3">
            {myRides.slice(0, 3).map((r) => (
              <div key={r.id} className="card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-ink-50 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-500" /> {r.from} → {r.to}</p>
                  <p className="text-xs text-ink-400 mt-1">{formatTime(r.time)} · {r.availableSeats} seats left</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xs font-semibold text-brand-700 dark:text-brand-300">{initials(r.driverName)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav items={driverNavItems} />
    </div>
  )
}
