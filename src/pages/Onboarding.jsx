import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car, Users, ArrowLeft } from 'lucide-react'
import Button from '../components/Button'

export default function Onboarding() {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)

  function handleNext() {
    if (!role) return
    navigate('/login', { state: { role } })
  }

  return (
    <div className="phone-shell">
      <div className="screen-scroll px-6 pt-10 pb-8">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-1.5 -ml-1.5 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 mb-8">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="font-display font-semibold text-2xl text-ink-900 dark:text-ink-50">Get Started</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Choose your role to continue</p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => setRole('driver')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-colors ${role === 'driver' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-ink-200 dark:border-ink-700'}`}
          >
            <span className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0"><Car className="w-6 h-6" /></span>
            <div>
              <p className="font-display font-semibold text-ink-900 dark:text-ink-50">I'm a Driver</p>
              <p className="text-xs text-ink-500 dark:text-ink-400">Offer a ride & earn</p>
            </div>
          </button>

          <button
            onClick={() => setRole('passenger')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-colors ${role === 'passenger' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-ink-200 dark:border-ink-700'}`}
          >
            <span className="w-12 h-12 rounded-2xl bg-ink-800 text-white flex items-center justify-center flex-shrink-0"><Users className="w-6 h-6" /></span>
            <div>
              <p className="font-display font-semibold text-ink-900 dark:text-ink-50">I'm a Passenger</p>
              <p className="text-xs text-ink-500 dark:text-ink-400">Find a ride & travel</p>
            </div>
          </button>
        </div>

        <Button className="w-full mt-10" disabled={!role} onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
