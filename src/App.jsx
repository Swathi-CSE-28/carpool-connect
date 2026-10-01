import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Register from './pages/Register'

import DriverDashboard from './pages/driver/DriverDashboard'
import CreateRide from './pages/driver/CreateRide'
import ManageRides from './pages/driver/ManageRides'
import PassengerRequests from './pages/driver/PassengerRequests'
import RecurringRide from './pages/driver/RecurringRide'
import SmartPickup from './pages/driver/SmartPickup'

import PassengerDashboard from './pages/passenger/PassengerDashboard'
import FindRide from './pages/passenger/FindRide'
import SearchResults from './pages/passenger/SearchResults'
import RideDetails from './pages/passenger/RideDetails'
import MyBookings from './pages/passenger/MyBookings'
import RidePin from './pages/passenger/RidePin'

import LiveTracking from './pages/shared/LiveTracking'
import SOSEmergency from './pages/shared/SOSEmergency'
import Messages from './pages/shared/Messages'
import Settings from './pages/shared/Settings'
import Profile from './pages/shared/Profile'

import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/driver/dashboard" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
      <Route path="/driver/create-ride" element={<ProtectedRoute allowedRoles={['driver']}><CreateRide /></ProtectedRoute>} />
      <Route path="/driver/rides" element={<ProtectedRoute allowedRoles={['driver']}><ManageRides /></ProtectedRoute>} />
      <Route path="/driver/requests" element={<ProtectedRoute allowedRoles={['driver']}><PassengerRequests /></ProtectedRoute>} />
      <Route path="/driver/recurring" element={<ProtectedRoute allowedRoles={['driver']}><RecurringRide /></ProtectedRoute>} />
      <Route path="/driver/pickup" element={<ProtectedRoute allowedRoles={['driver']}><SmartPickup /></ProtectedRoute>} />

      <Route path="/passenger/dashboard" element={<ProtectedRoute allowedRoles={['passenger']}><PassengerDashboard /></ProtectedRoute>} />
      <Route path="/passenger/find" element={<ProtectedRoute allowedRoles={['passenger']}><FindRide /></ProtectedRoute>} />
      <Route path="/passenger/results" element={<ProtectedRoute allowedRoles={['passenger']}><SearchResults /></ProtectedRoute>} />
      <Route path="/passenger/ride/:id" element={<ProtectedRoute allowedRoles={['passenger']}><RideDetails /></ProtectedRoute>} />
      <Route path="/passenger/bookings" element={<ProtectedRoute allowedRoles={['passenger']}><MyBookings /></ProtectedRoute>} />
      <Route path="/passenger/pin/:bookingId" element={<ProtectedRoute allowedRoles={['passenger']}><RidePin /></ProtectedRoute>} />

      <Route path="/tracking/:bookingId" element={<ProtectedRoute><LiveTracking /></ProtectedRoute>} />
      <Route path="/sos" element={<ProtectedRoute><SOSEmergency /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

      <Route path="*" element={<Splash />} />
    </Routes>
  )
}
