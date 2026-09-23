import { formatINR } from '../../utils/format.js'

export default function CartTab({
  cart,
  selectedTable,
  waiter,
  editingOrderId,
  onQty,
  onRemove,
  onConfirm,
  onGoMenu,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (!selectedTable) {
    return (
      <div className="guard-card glass">
        <h2>Cart is empty until a table is live</h2>
        <p className="muted">Grab a table, then stack the order.</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="guard-card glass">
        <h2>Nothing in the cart</h2>
        <p className="muted">Table {selectedTable} is waiting for plates.</p>
        <button type="button" className="btn btn-gradient" onClick={onGoMenu}>
          Browse menu
        </button>
      </div>
    )
  }

  return (
    <div className="cart-layout">
      <div className="tab-intro">
        <h2>{editingOrderId ? `Editing ${editingOrderId}` : 'Cart'}</h2>
        <p className="muted">
          Table {selectedTable} · {waiter}
        </p>
      </div>

      <div className="cart-list">
        {cart.map((item) => (
          <article key={item.id} className="glass cart-row">
            <div>
              <strong>{item.name}</strong>
              <p className="muted">
                {formatINR(item.price)} × {item.qty}
              </p>
            </div>
            <div className="cart-row-side">
              <div className="qty-ctrl">
                <button type="button" onClick={() => onQty(item.id, -1)} aria-label="Decrease">
                  −
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => onQty(item.id, 1)} aria-label="Increase">
                  +
                </button>
              </div>
              <strong>{formatINR(item.price * item.qty)}</strong>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="glass cart-footer">
        <div>
          <p className="muted">Grand total</p>
          <p className="stat-value">{formatINR(total)}</p>
        </div>
        <button type="button" className="btn btn-gradient btn-lg" onClick={onConfirm}>
          {editingOrderId ? 'Update order' : 'Confirm order'}
        </button>
      </div>
    </div>
  )
}
