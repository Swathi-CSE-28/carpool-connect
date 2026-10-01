import { useNavigate } from 'react-router-dom'
import { Users, MapPin, Clock } from 'lucide-react'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'

export default function SmartPickup() {
  const navigate = useNavigate()

  return (
    <div className="phone-shell">
      <TopBar title="Smart Pickup Point" subtitle="Bookedrn" />
      <div className="screen-scroll px-5 pt-4 space-y-4">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center"><Users className="w-5 h-5" /></span>
            <div>
              <p className="text-xs text-ink-400">Suggested Pickup Point</p>
              <p className="font-display font-semibold text-ink-900 dark:text-ink-50">Main Bus Stand</p>
            </div>
          </div>
          <p className="text-sm text-ink-500 dark:text-ink-400 flex items-center gap-1.5"><Users className="w-4 h-4" /> 3 passengers nearby</p>
          <p className="text-sm text-ink-500 dark:text-ink-400 flex items-center gap-1.5 mt-1"><MapPin className="w-4 h-4" /> 1.2 km from you</p>
          <p className="text-sm text-ink-500 dark:text-ink-400 flex items-center gap-1.5 mt-1"><Clock className="w-4 h-4" /> Est. walking time: 6 min</p>
        </div>

        <Button className="w-full" onClick={() => navigate(-1)}>Accept Pickup Point</Button>
        <Button variant="secondary" className="w-full" onClick={() => navigate(-1)}>Choose Different Point</Button>
      </div>
    </div>
  )
}
