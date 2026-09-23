import { ORDER_STATUS, STATUS } from '../../data/constants.js'
import { formatINR } from '../../utils/format.js'

export default function ReviewTab({ orders, tables, onEdit, onBill, onCancel }) {
  const active = [...orders]
    .filter((o) => o.status === ORDER_STATUS.ACTIVE)
    .sort((a, b) => b.createdAt - a.createdAt)

  const tableOf = (order) => tables.find((t) => t.id === order.tableNo)

  if (active.length === 0) {
    return (
      <div className="empty-state">
        <p>No active tickets.</p>
        <span>Confirmed orders will land here for edit, bill, or cancel.</span>
      </div>
    )
  }

  return (
    <div>
      <div className="tab-intro">
        <h2>Active tickets</h2>
        <p className="muted">{active.length} live on the floor</p>
      </div>
      <div className="review-list">
        {active.map((order) => {
          const table = tableOf(order)
          const billed = table?.status === STATUS.BILLED
          return (
            <article key={order.id} className="glass review-card">
              <div className="order-id-line">
                <strong>{order.id}</strong>
                <span className={`status-pill ${billed ? 'billed' : 'occupied'}`}>
                  {billed ? 'Billed' : 'Active'}
                </span>
              </div>
              <p className="muted">
                Table {order.tableNo} · {order.waiter} · {order.time}
              </p>
              <ul className="review-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.name} ×{item.qty}
                    </span>
                    <span>{formatINR(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="review-footer">
                <strong>{formatINR(order.total)}</strong>
                <div className="row-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => onEdit(order.id)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => onBill(order.id)}>
                    Complete bill
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => onCancel(order.id)}>
                    Cancel
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
