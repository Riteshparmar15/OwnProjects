import { useMemo, useState } from 'react'
import { ORDER_STATUS, STATUS } from '../../data/constants.js'
import { formatINR } from '../../utils/format.js'

const TABS = [
  { id: 'all', label: 'All' },
  { id: ORDER_STATUS.ACTIVE, label: 'Active' },
  { id: ORDER_STATUS.COMPLETED, label: 'Completed' },
  { id: ORDER_STATUS.CANCELLED, label: 'Cancelled' },
]

export default function OrderHistory({ orders, tables, onBill, onCancel }) {
  const [tab, setTab] = useState('all')

  const filtered = useMemo(() => {
    const list = tab === 'all' ? orders : orders.filter((o) => o.status === tab)
    return [...list].sort((a, b) => b.createdAt - a.createdAt)
  }, [orders, tab])

  const tableStatus = (order) => {
    const table = tables.find((t) => t.id === order.tableNo)
    return table?.status
  }

  return (
    <section className="glass panel">
      <div className="panel-head">
        <div>
          <h2>Order history</h2>
          <p className="muted">{orders.length} tickets in memory</p>
        </div>
      </div>

      <div className="filter-tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`pill-tab ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No orders in this lane yet.</p>
          <span>Switch to Waiter view to drop the first ticket.</span>
        </div>
      ) : (
        <div className="order-list">
          {filtered.map((order) => {
            const tStatus = tableStatus(order)
            const canAct = order.status === ORDER_STATUS.ACTIVE
            const billLabel = tStatus === STATUS.BILLED ? 'Complete' : 'Bill'
            return (
              <article key={order.id} className="order-row">
                <div className="order-row-main">
                  <div className="order-id-line">
                    <strong>{order.id}</strong>
                    <span className={`status-pill ${order.status}`}>{order.status}</span>
                    {tStatus === STATUS.BILLED && canAct && (
                      <span className="status-pill billed">billed</span>
                    )}
                  </div>
                  <p className="muted">
                    Table {order.tableNo} · {order.waiter} · {order.time}
                  </p>
                  <p className="order-items-preview">
                    {order.items.map((i) => `${i.name} ×${i.qty}`).join(' · ')}
                  </p>
                </div>
                <div className="order-row-side">
                  <strong className="order-total">{formatINR(order.total)}</strong>
                  {canAct && (
                    <div className="row-actions">
                      <button type="button" className="btn btn-ghost" onClick={() => onBill(order.id)}>
                        {billLabel}
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => onCancel(order.id)}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
