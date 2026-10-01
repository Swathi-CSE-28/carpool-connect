import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { findUserByEmail, users } from '../data/mock'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cpc-user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('cpc-user', JSON.stringify(user))
  }, [user])

  const login = useCallback((email, password, expectedRole) => {
    return new Promise((resolve, reject) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        const found = findUserByEmail(email)
        if (!found || found.password !== password) {
          reject(new Error('Invalid email or password.'))
          return
        }
        if (expectedRole && found.role !== expectedRole) {
          reject(new Error(`This account is registered as a ${found.role}, not a ${expectedRole}.`))
          return
        }
        const { password: _pw, ...safe } = found
        setUser(safe)
        resolve(safe)
      }, 500)
    })
  }, [])

  const register = useCallback((values) => {
    return new Promise((resolve, reject) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        if (findUserByEmail(values.email)) {
          reject(new Error('An account with this email already exists.'))
          return
        }
        const newUser = {
          id: `u${users.length + 1}`,
          name: values.name,
          email: values.email,
          phone: values.phone,
          role: values.role,
          rating: 0,
          completedTrips: 0,
          emailVerified: false,
          phoneVerified: false,
          vehicle: values.role === 'driver' ? { make: values.vehicleMake || '', model: values.vehicleModel || '', color: '', plate: values.vehiclePlate || '' } : undefined,
        }
        users.push({ ...newUser, password: values.password })
        setUser(newUser)
        resolve(newUser)
      }, 600)
    })
  }, [])

  const logout = useCallback(() => setUser(null), [])
  const updateUser = useCallback((updates) => setUser((prev) => ({ ...prev, ...updates })), [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
