import { formatINR } from '../../utils/format.js'

const STATS = [
  { key: 'active', label: 'Active Orders', hint: 'Live tickets' },
  { key: 'revenue', label: 'Revenue', hint: 'Completed bills', money: true },
  { key: 'occupied', label: 'Occupied Tables', hint: 'On the floor' },
  { key: 'completed', label: 'Completed', hint: 'Closed tonight' },
]

export default function StatCards({ stats }) {
  return (
    <section className="stat-grid">
      {STATS.map((item) => (
        <article key={item.key} className="glass stat-card">
          <p className="stat-label">{item.label}</p>
          <p className="stat-value">
            {item.money ? formatINR(stats[item.key]) : stats[item.key]}
          </p>
          <p className="stat-hint">{item.hint}</p>
        </article>
      ))}
    </section>
  )
}
