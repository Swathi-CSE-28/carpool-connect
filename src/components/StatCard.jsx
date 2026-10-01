export default function StatCard({ label, value, color = 'brand' }) {
  const colorMap = {
    brand: 'bg-brand-600 text-white',
    dark: 'bg-ink-800 text-white',
    amber: 'bg-amber-500 text-white',
    slate: 'bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-50',
  }
  return (
    <div className={`rounded-2xl p-4 ${colorMap[color]}`}>
      <p className="text-2xl font-display font-semibold">{value}</p>
      <p className="text-xs opacity-80 mt-1">{label}</p>
    </div>
  )
}
