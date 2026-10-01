import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Phone, ShieldAlert, Car } from 'lucide-react'
import TopBar from '../../components/TopBar'
import { bookings } from '../../data/mock'
import { initials } from '../../utils/format'

export default function LiveTracking() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const booking = bookings.find((b) => b.id === bookingId) || bookings[0]
  const [progress, setProgress] = useState(15)

  // Simulates the vehicle marker advancing toward the pickup point; a real
  // integration would replace this with live GPS coordinates over Socket.IO.
  useEffect(() => {
    const interval = setInterval(() => setProgress((p) => Math.min(95, p + 8)), 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="phone-shell">
      <TopBar title="Live Ride" subtitle="Tracking in progress" right={<span className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">Live</span>} />
      <div className="flex-1 relative bg-ink-100 dark:bg-ink-800 overflow-hidden" style={{ minHeight: 260 }}>
        <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M20 220 C 120 80, 260 240, 380 40" stroke="#16a672" strokeWidth="3" strokeDasharray="2 8" fill="none" />
          <circle cx={20 + progress * 3.6} cy={220 - progress * 1.9} r="7" fill="#16a672" />
        </svg>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="card p-4 flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center font-semibold text-brand-700 dark:text-brand-300">{initials(booking.driverName)}</span>
          <div className="flex-1">
            <p className="font-medium text-ink-900 dark:text-ink-50 text-sm">{booking.driverName}</p>
            <p className="text-xs text-ink-400 flex items-center gap-1"><Car className="w-3.5 h-3.5" /> Swift Dzire · TN 72 AB 4521</p>
          </div>
          <button aria-label="Call driver" className="p-2 rounded-full bg-brand-600 text-white"><Phone className="w-4 h-4" /></button>
        </div>
        <button onClick={() => navigate('/sos')} className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white py-3 text-sm font-semibold">
          <ShieldAlert className="w-4 h-4" /> Emergency SOS
        </button>
      </div>
    </div>
  )
}
