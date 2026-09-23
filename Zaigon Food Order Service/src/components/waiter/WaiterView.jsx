import { WAITERS } from '../../data/constants.js'
import { IconCart, IconMenu, IconReview, IconTable } from '../Icons.jsx'
import TablesTab from './TablesTab.jsx'
import MenuTab from './MenuTab.jsx'
import CartTab from './CartTab.jsx'
import ReviewTab from './ReviewTab.jsx'

const TABS = [
  { id: 'tables', label: 'Tables', Icon: IconTable },
  { id: 'menu', label: 'Menu', Icon: IconMenu },
  { id: 'cart', label: 'Cart', Icon: IconCart },
  { id: 'review', label: 'Review', Icon: IconReview },
]

export default function WaiterView({
  waiter,
  onWaiterChange,
  tab,
  onTab,
  tables,
  orders,
  menu,
  cart,
  selectedTable,
  editingOrderId,
  onSelectTable,
  onAdd,
  onQty,
  onRemove,
  onConfirm,
  onEdit,
  onBill,
  onCancel,
}) {
  const cartCount = cart.reduce((n, i) => n + i.qty, 0)
  const activeCount = orders.filter((o) => o.status === 'active').length

  return (
    <div className="waiter-view">
      <nav className="waiter-nav glass">
        <div className="waiter-nav-tabs">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`nav-tab ${tab === id ? 'active' : ''}`}
              onClick={() => onTab(id)}
            >
              <Icon />
              {label}
              {id === 'cart' && cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
              {id === 'review' && activeCount > 0 && <span className="nav-badge">{activeCount}</span>}
            </button>
          ))}
        </div>
        <label className="waiter-select">
          Waiter
          <select value={waiter} onChange={(e) => onWaiterChange(e.target.value)}>
            {WAITERS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </nav>

      <div className="waiter-body">
        {tab === 'tables' && (
          <TablesTab
            tables={tables}
            orders={orders}
            selectedTable={selectedTable}
            onSelect={onSelectTable}
          />
        )}
        {tab === 'menu' && (
          <MenuTab
            menu={menu}
            cart={cart}
            selectedTable={selectedTable}
            onGoTables={() => onTab('tables')}
            onAdd={onAdd}
            onQty={onQty}
          />
        )}
        {tab === 'cart' && (
          <CartTab
            cart={cart}
            selectedTable={selectedTable}
            waiter={waiter}
            editingOrderId={editingOrderId}
            onQty={onQty}
            onRemove={onRemove}
            onConfirm={onConfirm}
            onGoMenu={() => onTab('menu')}
          />
        )}
        {tab === 'review' && (
          <ReviewTab
            orders={orders}
            tables={tables}
            onEdit={onEdit}
            onBill={onBill}
            onCancel={onCancel}
          />
        )}
      </div>
    </div>
  )
}
