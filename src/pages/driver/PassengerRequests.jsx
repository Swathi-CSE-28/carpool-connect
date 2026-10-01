import { useState, useCallback, useMemo } from 'react'
import { Check, X, MapPin } from 'lucide-react'
import TopBar from '../../components/TopBar'
import EmptyState from '../../components/EmptyState'
import { passengerRequests as initialRequests } from '../../data/mock'
import { initials } from '../../utils/format'
import { ListChecks } from 'lucide-react'
import BottomNav from '../../components/BottomNav'
import { driverNavItems } from '../../utils/navItems'

const TABS = ['Pending', 'Accepted', 'Rejected']

export default function PassengerRequests() {
  const [requests, setRequests] = useState(initialRequests.map((r) => ({ ...r })))
  const [tab, setTab] = useState('Pending')

  const respond = useCallback((id, decision) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: decision } : r)))
  }, [])

  const filtered = useMemo(() => requests.filter((r) => r.status === tab.toLowerCase()), [requests, tab])
  const counts = useMemo(() => ({
    Pending: requests.filter((r) => r.status === 'pending').length,
    Accepted: requests.filter((r) => r.status === 'accepted').length,
    Rejected: requests.filter((r) => r.status === 'rejected').length,
  }), [requests])

  return (
    <div className="phone-shell">
      <TopBar title="Passenger Requests" />
      <div className="px-5 pt-3 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${tab === t ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-300'}`}>
            {t} ({counts[t]})
          </button>
        ))}
      </div>

      <div className="screen-scroll px-5 pt-3 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState icon={ListChecks} title={`No ${tab.toLowerCase()} requests`} description="Requests will show up here." />
        ) : (
          filtered.map((r) => (
            <div key={r.id} className="card p-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xs font-semibold text-brand-700 dark:text-brand-300 flex-shrink-0">{initials(r.passenger)}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink-900 dark:text-ink-50 text-sm">{r.passenger}</p>
                  <p className="text-xs text-ink-400">{r.rideRoute}</p>
                  <p className="text-xs text-ink-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {r.seats} Seat{r.seats > 1 ? 's' : ''} · Pickup: {r.pickupPoint}</p>
                </div>
              </div>
              {tab === 'Pending' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => respond(r.id, 'accepted')} className="flex-1 btn-primary py-2 text-sm"><Check className="w-4 h-4" /> Accept</button>
                  <button onClick={() => respond(r.id, 'rejected')} className="flex-1 btn-secondary py-2 text-sm"><X className="w-4 h-4" /> Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <BottomNav items={driverNavItems} />
    </div>
  )
}
