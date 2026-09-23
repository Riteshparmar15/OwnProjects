import { STATUS_LABEL } from '../../data/constants.js'
import { formatINR } from '../../utils/format.js'

export default function TablesTab({ tables, orders, selectedTable, onSelect }) {
  const orderById = Object.fromEntries(orders.map((o) => [o.id, o]))

  return (
    <div>
      <div className="tab-intro">
        <h2>Pick a table</h2>
        <p className="muted">Tap a table to start or add to a ticket</p>
      </div>
      <div className="table-grid">
        {tables.map((table) => {
          const order = table.currentOrderId ? orderById[table.currentOrderId] : null
          const selected = selectedTable === table.id
          return (
            <button
              key={table.id}
              type="button"
              className={`table-card clickable ${table.status} ${selected ? 'selected' : ''}`}
              onClick={() => onSelect(table.id)}
            >
              <div className="table-card-top">
                <strong>T{String(table.id).padStart(2, '0')}</strong>
                <span className={`status-pill ${table.status}`}>
                  {STATUS_LABEL[table.status]}
                </span>
              </div>
              <p className="table-meta">{table.waiter || 'Unassigned'}</p>
              <p className="table-total">{order ? formatINR(order.total) : '—'}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
