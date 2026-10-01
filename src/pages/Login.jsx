import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Car, Users, ArrowLeft, Mail, Lock } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading } = useAuth()
  const [role, setRole] = useState(location.state?.role || 'driver')
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  function handleChange(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setFormError('')
  }

  function validate() {
    const errs = {}
    if (!values.email.trim()) errs.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Enter a valid email.'
    if (!values.password) errs.password = 'Password is required.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    try {
      const user = await login(values.email, values.password, role)
      navigate(`/${user.role}/dashboard`, { replace: true })
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <div className="phone-shell">
      <div className="screen-scroll px-6 pt-10 pb-8">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-1.5 -ml-1.5 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="font-display font-semibold text-2xl text-ink-900 dark:text-ink-50">Welcome Back!</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Login to your account</p>

        <div className="mt-6 grid grid-cols-2 gap-2 bg-ink-100 dark:bg-ink-800 rounded-xl p-1">
          <button onClick={() => setRole('driver')} className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${role === 'driver' ? 'bg-white dark:bg-ink-900 shadow-soft text-brand-700 dark:text-brand-400' : 'text-ink-500'}`}>
            <Car className="w-4 h-4" /> Driver
          </button>
          <button onClick={() => setRole('passenger')} className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${role === 'passenger' ? 'bg-white dark:bg-ink-900 shadow-soft text-brand-700 dark:text-brand-400' : 'text-ink-500'}`}>
            <Users className="w-4 h-4" /> Passenger
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input id="email" type="email" className="input pl-10" value={values.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="label">Password</label>
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400">Forgot Password?</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input id="password" type="password" className="input pl-10" value={values.password} onChange={(e) => handleChange('password', e.target.value)} />
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          {formError && <p className="error-text">{formError}</p>}

          <Button type="submit" loading={loading} className="w-full">Login</Button>
        </form>

        <p className="text-[11px] text-center text-ink-400 mt-6 bg-ink-50 dark:bg-ink-800 rounded-lg p-3">
          Demo: <b>arun@example.com</b> (driver) · <b>priya@example.com</b> (passenger) · <b>divya@example.com</b> (admin) — password: <b>password</b>
        </p>

        <p className="text-sm text-center text-ink-500 dark:text-ink-400 mt-6">
          Don't have an account? <Link to="/register" state={{ role }} className="text-brand-600 dark:text-brand-400 font-medium">Register</Link>
        </p>
      </div>
    </div>
  )
}
