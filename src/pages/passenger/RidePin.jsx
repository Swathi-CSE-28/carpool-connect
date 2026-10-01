import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Car, Phone, MapPin } from 'lucide-react'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import { bookings } from '../../data/mock'
import { formatDate, formatTime } from '../../utils/format'

export default function RidePin() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const booking = bookings.find((b) => b.id === bookingId) || bookings[0]

  return (
    <div className="phone-shell">
      <TopBar title="Ride Verification PIN" />
      <div className="screen-scroll px-5 pt-4 space-y-4">
        <div className="rounded-2xl bg-brand-600 text-white p-6 text-center">
          <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
          <p className="font-medium text-sm">Ride Confirmed!</p>
          <p className="text-xs text-brand-100 mt-0.5">Your verification PIN</p>
          <div className="flex justify-center gap-2 mt-4">
            {booking.pin.split('').map((d, i) => (
              <span key={i} className="w-11 h-12 rounded-xl bg-white/15 flex items-center justify-center text-xl font-display font-semibold">{d}</span>
            ))}
          </div>
          <p className="text-[11px] text-brand-100 mt-4">Share this PIN with your driver until the ride starts</p>
        </div>

        <div className="card p-4 space-y-2 text-sm">
          <p className="font-medium text-ink-900 dark:text-ink-50 mb-1">Ride Details</p>
          <div className="flex justify-between text-ink-500 dark:text-ink-400"><span>Driver</span><span className="text-ink-900 dark:text-ink-50 font-medium">{booking.driverName}</span></div>
          <div className="flex justify-between text-ink-500 dark:text-ink-400"><span>Time</span><span className="text-ink-900 dark:text-ink-50 font-medium">{formatDate(booking.date)}, {formatTime(booking.time)}</span></div>
          <div className="flex justify-between text-ink-500 dark:text-ink-400"><span>From</span><span className="text-ink-900 dark:text-ink-50 font-medium">{booking.from}</span></div>
          <div className="flex justify-between text-ink-500 dark:text-ink-400"><span>To</span><span className="text-ink-900 dark:text-ink-50 font-medium">{booking.to}</span></div>
        </div>

        <div className="flex gap-3 pb-4">
          <Button variant="secondary" className="flex-1" icon={Phone}>Call driver</Button>
          <Button className="flex-1" icon={MapPin} onClick={() => navigate(`/tracking/${booking.id}`)}>Track ride</Button>
        </div>
      </div>
    </div>
  )
}
