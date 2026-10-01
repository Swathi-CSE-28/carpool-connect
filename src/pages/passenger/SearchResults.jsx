import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SlidersHorizontal, Star, MapPin } from 'lucide-react'
import TopBar from '../../components/TopBar'
import EmptyState from '../../components/EmptyState'
import { rides } from '../../data/mock'
import { formatTime, formatCurrency, initials } from '../../utils/format'

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchValues = location.state || {}
  const [sortBy, setSortBy] = useState('departure')

  // useMemo avoids recomputing sorted/filtered results on unrelated re-renders.
  const results = useMemo(() => {
    let list = rides.filter((r) => r.status === 'upcoming' && (!searchValues.to || r.to.toLowerCase().includes(String(searchValues.to).toLowerCase())))
    if (list.length === 0) list = rides.filter((r) => r.status === 'upcoming')
    const sorted = [...list]
    if (sortBy === 'price') sorted.sort((a, b) => a.price - b.price)
    else if (sortBy === 'rating') sorted.sort((a, b) => b.driverRating - a.driverRating)
    else sorted.sort((a, b) => a.time.localeCompare(b.time))
    return sorted
  }, [searchValues.to, sortBy])

  return (
    <div className="phone-shell">
      <TopBar
        title="Search Results"
        subtitle={`${results.length} Rides Found`}
        right={
          <button
            onClick={() => setSortBy(sortBy === 'departure' ? 'price' : sortBy === 'price' ? 'rating' : 'departure')}
            className="flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort
          </button>
        }
      />
      <div className="screen-scroll px-5 pt-3 space-y-3">
        {results.length === 0 ? (
          <EmptyState icon={MapPin} title="No rides found" description="Try a different date, time or destination." />
        ) : (
          results.map((r) => (
            <button key={r.id} onClick={() => navigate(`/passenger/ride/${r.id}`)} className="card p-4 w-full text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xs font-semibold text-brand-700 dark:text-brand-300">{initials(r.driverName)}</span>
                  <div>
                    <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{r.driverName}</p>
                    <p className="text-xs text-ink-400">{r.from} → {r.to}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-ink-500"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {r.driverRating}</span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-100 dark:border-ink-800 text-xs">
                <span className="text-ink-500 dark:text-ink-400">{formatTime(r.time)} · {r.availableSeats} Seats · {formatCurrency(r.price)}</span>
                <span className="text-brand-600 dark:text-brand-400 font-semibold">View</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
