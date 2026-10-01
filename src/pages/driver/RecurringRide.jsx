import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function RecurringRide() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ from: '', to: '', time: '', seats: 3, price: '' })
  const [days, setDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  const [loading, setLoading] = useState(false)

  function toggleDay(day) {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  function handleChange(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/driver/rides') }, 700)
  }

  return (
    <div className="phone-shell">
      <TopBar title="Create Recurring Ride" />
      <div className="screen-scroll px-5 pt-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="from" className="label">From</label>
            <input id="from" placeholder="College" className="input" value={values.from} onChange={(e) => handleChange('from', e.target.value)} />
          </div>
          <div>
            <label htmlFor="to" className="label">To</label>
            <input id="to" placeholder="Home" className="input" value={values.to} onChange={(e) => handleChange('to', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="time" className="label">Time</label>
              <input id="time" type="time" className="input" value={values.time} onChange={(e) => handleChange('time', e.target.value)} />
            </div>
            <div>
              <label htmlFor="seats" className="label">Available Seats</label>
              <input id="seats" type="number" className="input" value={values.seats} onChange={(e) => handleChange('seats', e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="price" className="label">Price</label>
            <input id="price" type="number" placeholder="₹100" className="input" value={values.price} onChange={(e) => handleChange('price', e.target.value)} />
          </div>
          <div>
            <p className="label">Repeat On</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {DAYS.map((d) => (
                <button type="button" key={d} onClick={() => toggleDay(d)} className={`flex-shrink-0 w-11 h-11 rounded-full text-xs font-semibold ${days.includes(d) ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" loading={loading} className="w-full">Create Recurring Ride</Button>
        </form>
      </div>
    </div>
  )
}
