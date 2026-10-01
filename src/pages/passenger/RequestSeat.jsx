import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import Button from '../../components/Button'

export default function RequestSeat({ ride, open, onClose }) {
  const navigate = useNavigate()
  const [seats, setSeats] = useState(1)
  const [pickup, setPickup] = useState(ride.pickupPoints[0])
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onClose()
      navigate('/passenger/bookings')
    }, 700)
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div className="absolute inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="relative w-full max-w-[430px] bg-white dark:bg-ink-900 rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display font-semibold text-lg text-ink-900 dark:text-ink-50">Request a Seat</p>
              <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="seats" className="label">Seats Required</label>
                <select id="seats" className="input" value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
                  {Array.from({ length: ride.availableSeats || 1 }).map((_, i) => <option key={i} value={i + 1}>{i + 1} Seat{i > 0 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="pickup" className="label">Pickup Point</label>
                <select id="pickup" className="input" value={pickup} onChange={(e) => setPickup(e.target.value)}>
                  {ride.pickupPoints.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="note" className="label">Message (Optional)</label>
                <textarea id="note" rows={2} className="input" placeholder="Please confirm my request." value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <Button type="submit" loading={loading} className="w-full">Send Request</Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
