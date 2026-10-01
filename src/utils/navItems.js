import { Home, Search, CalendarCheck, User, Car, ListChecks } from 'lucide-react'

export const passengerNavItems = [
  { to: '/passenger/dashboard', label: 'Home', icon: Home, end: true },
  { to: '/passenger/find', label: 'Find', icon: Search },
  { to: '/passenger/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/profile', label: 'Profile', icon: User },
]

export const driverNavItems = [
  { to: '/driver/dashboard', label: 'Home', icon: Home, end: true },
  { to: '/driver/rides', label: 'Rides', icon: Car },
  { to: '/driver/requests', label: 'Requests', icon: ListChecks },
  { to: '/profile', label: 'Profile', icon: User },
]
