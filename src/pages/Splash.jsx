import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, MapPin } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Splash() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // useEffect drives the auto-advance timer: after the splash animation,
  // route straight into the app if already logged in, otherwise onboarding.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) navigate(`/${user.role}/dashboard`, { replace: true })
      else navigate('/onboarding', { replace: true })
    }, 1600)
    return () => clearTimeout(timer)
  }, [user, navigate])

  return (
    <div className="phone-shell items-center justify-center bg-ink-950">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-3xl bg-brand-600 flex items-center justify-center mb-5"
        >
          <Car className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-display font-semibold text-2xl text-white tracking-wide">
          CARPOOL<br />CONNECT
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-brand-200 text-sm mt-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" /> Share the Ride, Share the Journey
        </motion.p>
      </div>
      <div className="px-10 pb-12">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.4 }} className="h-full bg-brand-500" />
        </div>
      </div>
    </div>
  )
}
