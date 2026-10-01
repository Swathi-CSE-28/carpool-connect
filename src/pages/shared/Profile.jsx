import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Mail, Phone, ShieldCheck, Settings as SettingsIcon, LogOut, Car, Save } from 'lucide-react'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import BottomNav from '../../components/BottomNav'
import { passengerNavItems, driverNavItems } from '../../utils/navItems'
import { useAuth } from '../../hooks/useAuth'
import { initials } from '../../utils/format'

export default function Profile() {
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const navItems = user?.role === 'driver' ? driverNavItems : passengerNavItems
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [errors, setErrors] = useState({})

  function handleChange(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSave(e) {
    e.preventDefault()
    const errs = {}
    if (!values.name.trim()) errs.name = 'Full name is required.'
    if (!/^[0-9]{10}$/.test(values.phone)) errs.phone = 'Enter a valid 10-digit number.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    updateUser(values)
    setEditing(false)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="phone-shell">
      <TopBar title="Profile" right={<button onClick={() => navigate('/settings')} aria-label="Settings" className="p-2 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800"><SettingsIcon className="w-5 h-5" /></button>} />
      <div className="screen-scroll px-5 pt-4 space-y-4">
        <div className="card p-5 flex items-center gap-4">
          <span className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center font-display font-semibold text-xl text-brand-700 dark:text-brand-300">{initials(user.name)}</span>
          <div>
            <p className="font-display font-semibold text-ink-900 dark:text-ink-50">{user.name}</p>
            <p className="text-xs text-ink-400 capitalize">{user.role}</p>
            <p className="text-xs text-ink-500 dark:text-ink-400 flex items-center gap-1 mt-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {user.rating || 'New'}</p>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">Details</p>
            {!editing && <button onClick={() => setEditing(true)} className="text-xs font-semibold text-brand-600 dark:text-brand-400">Edit</button>}
          </div>
          {editing ? (
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label htmlFor="name" className="label">Name</label>
                <input id="name" className="input" value={values.name} onChange={(e) => handleChange('name', e.target.value)} />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="label">Phone</label>
                <input id="phone" className="input" value={values.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
              <div className="flex gap-2">
                <Button type="submit" icon={Save} className="flex-1">Save</Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><Mail className="w-4 h-4" /> {user.email}</p>
              <p className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><Phone className="w-4 h-4" /> {user.phone}</p>
              <p className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><ShieldCheck className={`w-4 h-4 ${user.emailVerified ? 'text-brand-500' : 'text-ink-300'}`} /> {user.emailVerified ? 'Email verified' : 'Not verified'}</p>
            </div>
          )}
        </div>

        {user.role === 'driver' && user.vehicle && (
          <div className="card p-4">
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50 mb-2 flex items-center gap-2"><Car className="w-4 h-4" /> Vehicle</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{user.vehicle.make} {user.vehicle.model} · {user.vehicle.plate}</p>
          </div>
        )}

        <Button variant="secondary" className="w-full !text-red-600" icon={LogOut} onClick={handleLogout}>Log out</Button>
      </div>
      <BottomNav items={navItems} />
    </div>
  )
}
