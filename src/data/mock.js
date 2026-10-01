export const users = [
  { id: 'p1', name: 'Priya Raman', email: 'priya@example.com', password: 'password', phone: '9876501234', role: 'passenger', rating: 4.7, completedTrips: 58, emailVerified: true, phoneVerified: false },
  { id: 'd1', name: 'Arun Kumar', email: 'arun@example.com', password: 'password', phone: '9876543210', role: 'driver', rating: 4.8, completedTrips: 214, emailVerified: true, phoneVerified: true, vehicle: { make: 'Swift', model: 'Dzire', color: 'White', plate: 'TN 72 AB 4521' } },
  { id: 'a1', name: 'Divya Lakshmi', email: 'divya@example.com', password: 'password', phone: '9123456780', role: 'admin', rating: 5, completedTrips: 0, emailVerified: true, phoneVerified: true },
]

export function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export const rides = [
  { id: 'r1', driverId: 'd1', driverName: 'Arun Kumar', driverRating: 4.8, vehicle: 'Swift Dzire', from: 'Tirunelveli', to: 'Kovilpatti', date: '2026-09-25', time: '08:00', price: 120, totalSeats: 4, availableSeats: 3, pickupPoints: ['New Bus Stand', 'Palayankottai'], status: 'upcoming' },
  { id: 'r2', driverId: 'd1', driverName: 'Arun Kumar', driverRating: 4.8, vehicle: 'Swift Dzire', from: 'Tirunelveli', to: 'Sankarankoil', date: '2026-09-24', time: '18:00', price: 100, totalSeats: 4, availableSeats: 0, pickupPoints: ['New Bus Stand'], status: 'active' },
  { id: 'r3', driverId: 'd2', driverName: 'Ramesh Iyer', driverRating: 4.6, vehicle: 'Innova', from: 'Tirunelveli', to: 'Kovilpatti', date: '2026-09-25', time: '08:30', price: 110, totalSeats: 6, availableSeats: 2, pickupPoints: ['New Bus Stand', 'Toll Gate'], status: 'upcoming' },
  { id: 'r4', driverId: 'd3', driverName: 'Madhavan S.', driverRating: 4.3, vehicle: 'Etios', from: 'Tirunelveli', to: 'Kovilpatti', date: '2026-09-25', time: '09:00', price: 130, totalSeats: 4, availableSeats: 4, pickupPoints: ['New Bus Stand'], status: 'upcoming' },
  { id: 'r5', driverId: 'd1', driverName: 'Arun Kumar', driverRating: 4.8, vehicle: 'Swift Dzire', from: 'Tirunelveli', to: 'Madurai', date: '2026-05-20', time: '07:30', price: 160, totalSeats: 4, availableSeats: 0, pickupPoints: ['New Bus Stand'], status: 'completed' },
  { id: 'r6', driverId: 'd1', driverName: 'Arun Kumar', driverRating: 4.8, vehicle: 'Swift Dzire', from: 'Tirunelveli', to: 'Nagercoil', date: '2026-05-18', time: '09:00', price: 160, totalSeats: 4, availableSeats: 4, pickupPoints: ['New Bus Stand'], status: 'cancelled' },
]

export const bookings = [
  { id: 'b1', rideId: 'r1', passengerId: 'p1', driverName: 'Arun Kumar', from: 'Tirunelveli', to: 'Kovilpatti', date: '2026-05-25', time: '08:00', seats: 3, price: 120, pickupPoint: 'New Bus Stand', status: 'confirmed', pin: '4827' },
  { id: 'b2', rideId: 'r3', passengerId: 'p1', driverName: 'Ramesh Iyer', from: 'Tirunelveli', to: 'Sankarankoil', date: '2026-05-24', time: '06:30', seats: 1, price: 100, pickupPoint: 'New Bus Stand', status: 'confirmed', pin: '1093' },
]

export const passengerRequests = [
  { id: 'req1', passenger: 'Karthik B.', rideRoute: 'Tirunelveli → Kovilpatti', seats: 2, pickupPoint: 'Bus Stand', status: 'pending' },
  { id: 'req2', passenger: 'Priya R.', rideRoute: 'Tirunelveli → Kovilpatti', seats: 1, pickupPoint: 'New Bus Stand', status: 'pending' },
  { id: 'req3', passenger: 'Vignesh K.', rideRoute: 'Tirunelveli → Palayankottai', seats: 1, pickupPoint: 'Palayankottai', status: 'pending' },
]

export const messages = [
  { id: 'm1', from: 'Arun Kumar', text: "Hi Priya, I am on the way to the pickup point.", time: '08:05 AM', mine: false },
  { id: 'm2', from: 'me', text: 'Okay, I will be there in 2 mins.', time: '08:06 AM', mine: true },
  { id: 'm3', from: 'Arun Kumar', text: 'Great, see you soon!', time: '08:06 AM', mine: false },
]

export const notifications = [
  { id: 'n1', message: 'Your ride request was accepted.', read: false, type: 'success', time: '5m ago' },
  { id: 'n2', message: 'Driver has started the trip.', read: false, type: 'info', time: '40m ago' },
  { id: 'n3', message: 'Your trip starts in 30 minutes.', read: true, type: 'info', time: '5h ago' },
]

export const adminStats = { totalUsers: 120, drivers: 45, passengers: 75, activeRides: 32, totalBookings: 150, sosAlerts: 5 }

export const sosAlerts = [
  { id: 'RIDE_20240525_001', route: 'Tirunelveli', time: '08:06 AM' },
]
