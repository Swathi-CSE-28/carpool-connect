import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Navigation, Users, IndianRupee } from 'lucide-react'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'

const initialValues = { from: '', to: '', date: '', time: '', seats: 4, price: '' }

export default function CreateRide() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }, [])

  function validate() {
    const errs = {}
    if (!values.from.trim()) errs.from = 'Source is required.'
    if (!values.to.trim()) errs.to = 'Destination is required.'
    if (!values.date) errs.date = 'Please select a date.'
    if (!values.time) errs.time = 'Please select a time.'
    if (!values.price || Number(values.price) <= 0) errs.price = 'Enter a valid price.'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/driver/rides')
    }, 700)
  }

  return (
    <div className="phone-shell">
      <TopBar title="Create New Ride" />
      <div className="screen-scroll px-5 pt-4 space-y-4">
        <div className="card h-36 flex items-center justify-center text-ink-400 text-sm relative overflow-hidden">
          <svg viewBox="0 0 300 140" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M10 110 C 80 30, 160 130, 290 40" stroke="#16a672" strokeWidth="3" strokeDasharray="2 8" fill="none" />
          </svg>
          <button type="button" className="relative z-10 btn-secondary text-xs px-3 py-1.5"><Navigation className="w-3.5 h-3.5" /> Use Current Location</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="from" className="label">From</label>
            <div className="relative"><MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="from" className="input pl-10" value={values.from} onChange={(e) => handleChange('from', e.target.value)} /></div>
            {errors.from && <p className="error-text">{errors.from}</p>}
          </div>
          <div>
            <label htmlFor="to" className="label">To</label>
            <div className="relative"><MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="to" className="input pl-10" value={values.to} onChange={(e) => handleChange('to', e.target.value)} /></div>
            {errors.to && <p className="error-text">{errors.to}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="date" className="label">Date</label>
              <input id="date" type="date" className="input" value={values.date} onChange={(e) => handleChange('date', e.target.value)} />
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>
            <div>
              <label htmlFor="time" className="label">Time</label>
              <input id="time" type="time" className="input" value={values.time} onChange={(e) => handleChange('time', e.target.value)} />
              {errors.time && <p className="error-text">{errors.time}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="seats" className="label">Available Seats</label>
              <div className="relative"><Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="seats" type="number" min={1} max={8} className="input pl-10" value={values.seats} onChange={(e) => handleChange('seats', e.target.value)} /></div>
            </div>
            <div>
              <label htmlFor="price" className="label">Price Per Seat</label>
              <div className="relative"><IndianRupee className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="price" type="number" min={1} className="input pl-10" value={values.price} onChange={(e) => handleChange('price', e.target.value)} /></div>
              {errors.price && <p className="error-text">{errors.price}</p>}
            </div>
          </div>
          <Button type="submit" loading={loading} className="w-full">Create Ride</Button>
        </form>
      </div>
    </div>
  )
}
