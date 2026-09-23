import { STATUS_LABEL } from '../../data/constants.js'
import { formatINR } from '../../utils/format.js'

export default function FloorPlan({ tables, orders }) {
  const orderById = Object.fromEntries(orders.map((o) => [o.id, o]))

  return (
    <section className="glass panel">
      <div className="panel-head">
        <div>
          <h2>Floor plan</h2>
          <p className="muted">12 tables · live status</p>
        </div>
        <div className="legend">
          <span><i className="dot free" /> Free</span>
          <span><i className="dot occupied" /> Occupied</span>
          <span><i className="dot billed" /> Billed</span>
        </div>
      </div>
      <div className="table-grid">
        {tables.map((table) => {
          const order = table.currentOrderId ? orderById[table.currentOrderId] : null
          return (
            <article key={table.id} className={`table-card ${table.status}`}>
              <div className="table-card-top">
                <strong>T{String(table.id).padStart(2, '0')}</strong>
                <span className={`status-pill ${table.status}`}>
                  {STATUS_LABEL[table.status]}
                </span>
              </div>
              <p className="table-meta">{table.waiter || 'No waiter'}</p>
              <p className="table-total">
                {order ? formatINR(order.total) : '—'}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
