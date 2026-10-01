import { Link } from 'react-router-dom'
import { Users, Car, UserCheck, Activity, ShieldAlert, LayoutDashboard } from 'lucide-react'
import TopBar from '../../components/TopBar'
import StatCard from '../../components/StatCard'
import { adminStats, sosAlerts } from '../../data/mock'

export default function AdminDashboard() {
  return (
    <div className="phone-shell">
      <TopBar title="Admin Dashboard" />
      <div className="screen-scroll px-5 pt-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Users" value={adminStats.totalUsers} color="brand" />
          <StatCard label="Drivers" value={adminStats.drivers} color="dark" />
          <StatCard label="Passengers" value={adminStats.passengers} color="slate" />
          <StatCard label="Active Rides" value={adminStats.activeRides} color="amber" />
          <StatCard label="Total Bookings" value={adminStats.totalBookings} color="slate" />
          <StatCard label="SOS Alerts" value={adminStats.sosAlerts} color="dark" />
        </div>

        <div>
          <p className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-3">Recent SOS Alerts</p>
          <div className="space-y-2">
            {sosAlerts.map((a) => (
              <div key={a.id} className="card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center"><ShieldAlert className="w-4 h-4 text-red-600" /></span>
                  <div>
                    <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{a.id}</p>
                    <p className="text-xs text-ink-400">{a.route}</p>
                  </div>
                </div>
                <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">View</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 dark:bg-ink-900/95 backdrop-blur border-t border-ink-100 dark:border-ink-800 flex items-center justify-around py-2 z-30">
        <span className="flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium text-brand-600 dark:text-brand-400"><LayoutDashboard className="w-5 h-5" />Dashboard</span>
        <Link to="/profile" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium text-ink-400"><Users className="w-5 h-5" />Users</Link>
        <Link to="/driver/rides" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium text-ink-400"><Car className="w-5 h-5" />Rides</Link>
        <Link to="/sos" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium text-ink-400"><ShieldAlert className="w-5 h-5" />SOS</Link>
        <Link to="/profile" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium text-ink-400"><UserCheck className="w-5 h-5" />More</Link>
      </nav>
    </div>
  )
}
