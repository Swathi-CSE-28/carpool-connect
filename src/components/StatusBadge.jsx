const STYLES = {
  confirmed: 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
  upcoming: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  active: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  completed: 'bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-300',
  cancelled: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}
export default function StatusBadge({ status, label }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STYLES[status] || STYLES.pending}`}>{label || status}</span>
}
