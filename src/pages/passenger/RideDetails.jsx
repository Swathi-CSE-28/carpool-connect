import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import { rides } from '../../data/mock'
import { formatDate, formatTime, formatCurrency, initials } from '../../utils/format'
import RequestSeat from './RequestSeat'

export default function RideDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ride = useMemo(() => rides.find((r) => r.id === id), [id])
  const [requestOpen, setRequestOpen] = useState(false)

  if (!ride) {
    return (
      <div className="phone-shell">
        <TopBar title="Ride Details" />
        <EmptyState title="Ride not found" description="This ride may have been removed." />
      </div>
    )
  }

  return (
    <div className="phone-shell">
      <TopBar title="Ride Details" />
      <div className="screen-scroll px-5 pt-4 space-y-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center font-semibold text-brand-700 dark:text-brand-300">{initials(ride.driverName)}</span>
            <div>
              <p className="font-display font-semibold text-ink-900 dark:text-ink-50">{ride.driverName}</p>
              <p className="text-xs text-ink-400 flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {ride.driverRating} · {ride.vehicle}</p>
            </div>
          </div>
          <p className="text-sm font-medium text-ink-900 dark:text-ink-50 mt-3">{ride.from} → {ride.to}</p>
          <p className="text-xs text-ink-400 mt-1">{formatDate(ride.date)} · {formatTime(ride.time)}</p>
        </div>

        <div className="card h-32 relative overflow-hidden">
          <svg viewBox="0 0 300 130" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M15 100 C 90 20, 170 120, 285 30" stroke="#16a672" strokeWidth="3" strokeDasharray="2 8" fill="none" />
          </svg>
          <span className="absolute left-3 bottom-3 chip"><MapPin className="w-3.5 h-3.5" /> {ride.from}</span>
          <span className="absolute right-3 top-3 chip"><MapPin className="w-3.5 h-3.5" /> {ride.to}</span>
        </div>

        <div className="card p-4">
          <p className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-3">Pickup Points</p>
          <ol className="space-y-2">
            {ride.pickupPoints.map((p, i) => (
              <li key={p} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-800 dark:text-ink-100"><MapPin className="w-4 h-4 text-brand-500" /> {p}</span>
                <span className="text-xs text-ink-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatTime(ride.time)}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-ink-400">Seats Left</p>
            <p className="font-semibold text-brand-600">{ride.availableSeats} Seats Left</p>
          </div>
          <p className="font-display font-semibold text-lg text-ink-900 dark:text-ink-50">{formatCurrency(ride.price)}<span className="text-xs font-normal text-ink-400"> /seat</span></p>
        </div>

        <div className="flex gap-3 pb-4">
          <Button className="flex-1" onClick={() => setRequestOpen(true)}>Request Seat</Button>
          <Button variant="secondary" className="flex-1" icon={MessageCircle} onClick={() => navigate('/messages')}>Message</Button>
        </div>
      </div>

      <RequestSeat ride={ride} open={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  )
}
