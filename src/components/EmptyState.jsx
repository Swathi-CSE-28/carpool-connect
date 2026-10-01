export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-12 px-6">
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-500" />
        </div>
      )}
      <p className="font-display font-semibold text-ink-900 dark:text-ink-50">{title}</p>
      {description && <p className="text-sm text-ink-500 dark:text-ink-400 max-w-xs">{description}</p>}
      {action}
    </div>
  )
}
