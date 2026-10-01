import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, MapPin } from 'lucide-react'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import { sosAlerts } from '../../data/mock'

export default function SOSEmergency() {
  const navigate = useNavigate()
  const [triggered, setTriggered] = useState(false)
  const alert = sosAlerts[0]

  return (
    <div className="phone-shell">
      <TopBar title="Emergency SOS" />
      <div className="screen-scroll px-5 pt-4 space-y-4">
        <div className="rounded-2xl bg-red-600 text-white p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-semibold">Are you sure you want to trigger SOS?</p>
          </div>
          <p className="text-xs text-red-100 mt-2">Your current location will be shared with admin and emergency contacts.</p>
        </div>

        <div className="card p-4 space-y-1 text-sm">
          <p className="text-ink-500 dark:text-ink-400 text-xs">Current Location</p>
          <p className="font-medium text-ink-900 dark:text-ink-50 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-500" /> 8.7139° N, 77.7567° E</p>
          <p className="text-ink-400 text-xs">Tirunelveli, Tamil Nadu</p>
          <p className="text-ink-400 text-xs mt-2">Ride ID: {alert.id}</p>
        </div>

        {triggered ? (
          <div className="card p-4 text-center bg-brand-50 dark:bg-brand-900/20 border-brand-200">
            <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">SOS alert sent. Help is on the way.</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => navigate(-1)}>Cancel</Button>
            <Button className="flex-1 !bg-red-600 hover:!bg-red-700" onClick={() => setTriggered(true)}>Trigger SOS</Button>
          </div>
        )}
      </div>
    </div>
  )
}
