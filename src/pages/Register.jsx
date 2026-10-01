import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, Lock, Car, Users } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button'

const initialValues = { name: '', email: '', phone: '', password: '', confirmPassword: '', vehicleMake: '', vehiclePlate: '' }

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, loading } = useAuth()
  const [role, setRole] = useState(location.state?.role || 'driver')
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [step, setStep] = useState(1)
  const totalSteps = role === 'driver' ? 3 : 2

  function handleChange(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validateStep() {
    const errs = {}
    if (step === 1) {
      if (!values.name.trim()) errs.name = 'Full name is required.'
      if (!values.email.trim()) errs.email = 'Email is required.'
      else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Enter a valid email.'
      if (!values.phone.trim()) errs.phone = 'Phone number is required.'
      else if (!/^[0-9]{10}$/.test(values.phone)) errs.phone = 'Enter a valid 10-digit number.'
    }
    if (step === 2) {
      if (!values.password) errs.password = 'Password is required.'
      else if (values.password.length < 6) errs.password = 'At least 6 characters.'
      if (values.confirmPassword !== values.password) errs.confirmPassword = 'Passwords do not match.'
    }
    if (step === 3 && role === 'driver') {
      if (!values.vehicleMake.trim()) errs.vehicleMake = 'Vehicle model is required.'
      if (!values.vehiclePlate.trim()) errs.vehiclePlate = 'Plate number is required.'
    }
    return errs
  }

  async function handleNext(e) {
    e.preventDefault()
    const errs = validateStep()
    setErrors(errs)
    if (Object.keys(errs).length) return
    if (step < totalSteps) {
      setStep(step + 1)
      return
    }
    try {
      const user = await register({ ...values, role })
      navigate(`/${user.role}/dashboard`, { replace: true })
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <div className="phone-shell">
      <div className="screen-scroll px-6 pt-10 pb-8">
        <button onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))} aria-label="Back" className="p-1.5 -ml-1.5 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between">
          <h1 className="font-display font-semibold text-2xl text-ink-900 dark:text-ink-50">Create {role === 'driver' ? 'Driver' : 'Passenger'} Account</h1>
        </div>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Join as a {role}</p>

        <div className="flex items-center gap-2 mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-brand-600' : 'bg-ink-100 dark:bg-ink-800'}`} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 bg-ink-100 dark:bg-ink-800 rounded-xl p-1 mt-4">
          <button type="button" onClick={() => { setRole('driver'); setStep(1) }} className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${role === 'driver' ? 'bg-white dark:bg-ink-900 shadow-soft text-brand-700 dark:text-brand-400' : 'text-ink-500'}`}>
            <Car className="w-4 h-4" /> Driver
          </button>
          <button type="button" onClick={() => { setRole('passenger'); setStep(1) }} className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${role === 'passenger' ? 'bg-white dark:bg-ink-900 shadow-soft text-brand-700 dark:text-brand-400' : 'text-ink-500'}`}>
            <Users className="w-4 h-4" /> Passenger
          </button>
        </div>

        <form onSubmit={handleNext} className="mt-6 space-y-4" noValidate>
          {step === 1 && (
            <>
              <div>
                <label htmlFor="name" className="label">Full Name</label>
                <div className="relative"><User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="name" className="input pl-10" value={values.name} onChange={(e) => handleChange('name', e.target.value)} /></div>
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="label">Email</label>
                <div className="relative"><Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="email" type="email" className="input pl-10" value={values.email} onChange={(e) => handleChange('email', e.target.value)} /></div>
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="label">Phone</label>
                <div className="relative"><Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="phone" className="input pl-10" value={values.phone} onChange={(e) => handleChange('phone', e.target.value)} /></div>
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="password" className="label">Password</label>
                <div className="relative"><Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="password" type="password" className="input pl-10" value={values.password} onChange={(e) => handleChange('password', e.target.value)} /></div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                <div className="relative"><Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input id="confirmPassword" type="password" className="input pl-10" value={values.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} /></div>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          {step === 3 && role === 'driver' && (
            <>
              <div>
                <label htmlFor="vehicleMake" className="label">Vehicle model</label>
                <input id="vehicleMake" placeholder="e.g. Swift Dzire" className="input" value={values.vehicleMake} onChange={(e) => handleChange('vehicleMake', e.target.value)} />
                {errors.vehicleMake && <p className="error-text">{errors.vehicleMake}</p>}
              </div>
              <div>
                <label htmlFor="vehiclePlate" className="label">Plate number</label>
                <input id="vehiclePlate" placeholder="e.g. TN 72 AB 4521" className="input" value={values.vehiclePlate} onChange={(e) => handleChange('vehiclePlate', e.target.value)} />
                {errors.vehiclePlate && <p className="error-text">{errors.vehiclePlate}</p>}
              </div>
            </>
          )}

          {formError && <p className="error-text">{formError}</p>}

          <Button type="submit" loading={loading} className="w-full">{step < totalSteps ? 'Next' : 'Create account'}</Button>
        </form>

        <p className="text-sm text-center text-ink-500 dark:text-ink-400 mt-6">
          Already have an account? <Link to="/login" state={{ role }} className="text-brand-600 dark:text-brand-400 font-medium">Login</Link>
        </p>
      </div>
    </div>
  )
}
