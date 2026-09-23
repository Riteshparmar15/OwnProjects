import { useMemo, useState } from 'react'
import { createTables, ORDER_STATUS, STATUS, WAITERS } from './data/constants.js'
import { INITIAL_MENU } from './data/menu.js'
import { cartTotal, formatTime, padOrderId } from './utils/format.js'
import { exportOrdersToExcel } from './utils/exportExcel.js'
import Dashboard from './components/dashboard/Dashboard.jsx'
import MenuManager from './components/dashboard/MenuManager.jsx'
import WaiterView from './components/waiter/WaiterView.jsx'
import ToastStack from './components/ToastStack.jsx'

function mergeItems(existing, incoming) {
  const map = new Map()
  for (const item of existing) map.set(item.id, { ...item })
  for (const item of incoming) {
    const prev = map.get(item.id)
    map.set(item.id, prev ? { ...prev, qty: prev.qty + item.qty } : { ...item })
  }
  return [...map.values()]
}

export default function App() {
  const [view, setView] = useState('dashboard')
  const [tables, setTables] = useState(createTables)
  const [orders, setOrders] = useState([])
  const [menu, setMenu] = useState(INITIAL_MENU)
  const [waiter, setWaiter] = useState(WAITERS[0])
  const [selectedTable, setSelectedTable] = useState(null)
  const [cart, setCart] = useState([])
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [waiterTab, setWaiterTab] = useState('tables')
  const [showMenuManager, setShowMenuManager] = useState(false)
  const [toasts, setToasts] = useState([])
  const [orderSeq, setOrderSeq] = useState(1)

  const pushToast = (message, type = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setToasts((list) => [...list, { id, message, type }])
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id))
    }, 3200)
  }

  const dismissToast = (id) => setToasts((list) => list.filter((t) => t.id !== id))

  const stats = useMemo(() => {
    const active = orders.filter((o) => o.status === ORDER_STATUS.ACTIVE).length
    const completed = orders.filter((o) => o.status === ORDER_STATUS.COMPLETED)
    const occupied = tables.filter((t) => t.status !== STATUS.FREE).length
    return {
      active,
      completed: completed.length,
      occupied,
      revenue: completed.reduce((sum, o) => sum + o.total, 0),
    }
  }, [orders, tables])

  const patchTable = (tableId, patch) => {
    setTables((list) => list.map((t) => (t.id === tableId ? { ...t, ...patch } : t)))
  }

  const selectTable = (tableId) => {
    if (selectedTable !== tableId) {
      setCart([])
      setEditingOrderId(null)
    }
    setSelectedTable(tableId)
    setWaiterTab('menu')
    pushToast(`Table ${String(tableId).padStart(2, '0')} selected`, 'info')
  }

  const addToCart = (item) => {
    if (!selectedTable) {
      pushToast('Select a table first', 'error')
      return
    }
    setCart((list) => {
      const found = list.find((i) => i.id === item.id)
      if (found) {
        return list.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...list, { id: item.id, name: item.name, price: item.price, qty: 1 }]
    })
  }

  const changeQty = (itemId, delta) => {
    setCart((list) =>
      list
        .map((i) => (i.id === itemId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    )
  }

  const removeFromCart = (itemId) => {
    setCart((list) => list.filter((i) => i.id !== itemId))
  }

  const confirmOrder = () => {
    if (!selectedTable) {
      pushToast('Select a table first', 'error')
      return
    }
    if (cart.length === 0) {
      pushToast('Cart is empty', 'error')
      return
    }

    const table = tables.find((t) => t.id === selectedTable)
    const total = cartTotal(cart)
    const snapshot = cart.map((i) => ({ ...i }))

    if (editingOrderId) {
      setOrders((list) =>
        list.map((o) =>
          o.id === editingOrderId ? { ...o, items: snapshot, total, waiter } : o,
        ),
      )
      patchTable(selectedTable, {
        status: table.status === STATUS.FREE ? STATUS.OCCUPIED : table.status,
        waiter,
        currentOrderId: editingOrderId,
      })
      setEditingOrderId(null)
      setCart([])
      setWaiterTab('review')
      pushToast(`Order ${editingOrderId} updated`)
      return
    }

    if (table.currentOrderId) {
      setOrders((list) =>
        list.map((o) => {
          if (o.id !== table.currentOrderId) return o
          const items = mergeItems(o.items, snapshot)
          return { ...o, items, total: cartTotal(items), waiter }
        }),
      )
      patchTable(selectedTable, { waiter })
      setCart([])
      setWaiterTab('review')
      pushToast(`Items added to ${table.currentOrderId}`)
      return
    }

    const id = padOrderId(orderSeq)
    const createdAt = Date.now()
    const order = {
      id,
      tableNo: selectedTable,
      waiter,
      items: snapshot,
      total,
      status: ORDER_STATUS.ACTIVE,
      createdAt,
      time: formatTime(createdAt),
    }
    setOrderSeq((n) => n + 1)
    setOrders((list) => [order, ...list])
    patchTable(selectedTable, {
      status: STATUS.OCCUPIED,
      waiter,
      currentOrderId: id,
    })
    setCart([])
    setWaiterTab('review')
    pushToast(`Order ${id} confirmed · Table occupied`)
  }

  const billOrder = (orderId, settle = false) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order || order.status !== ORDER_STATUS.ACTIVE) return
    const table = tables.find((t) => t.id === order.tableNo)

    if (settle || table?.status === STATUS.BILLED) {
      setOrders((list) =>
        list.map((o) => (o.id === orderId ? { ...o, status: ORDER_STATUS.COMPLETED } : o)),
      )
      patchTable(order.tableNo, { status: STATUS.FREE, waiter: null, currentOrderId: null })
      if (editingOrderId === orderId) {
        setEditingOrderId(null)
        setCart([])
      }
      pushToast(`Bill completed · Table ${order.tableNo} is free`)
      return
    }

    patchTable(order.tableNo, { status: STATUS.BILLED })
    pushToast(`Bill sent to Table ${order.tableNo}`, 'info')
  }

  const cancelOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order || order.status !== ORDER_STATUS.ACTIVE) return
    setOrders((list) =>
      list.map((o) => (o.id === orderId ? { ...o, status: ORDER_STATUS.CANCELLED } : o)),
    )
    patchTable(order.tableNo, { status: STATUS.FREE, waiter: null, currentOrderId: null })
    if (editingOrderId === orderId) {
      setEditingOrderId(null)
      setCart([])
    }
    pushToast(`Order ${orderId} cancelled · Table ${order.tableNo} is free`, 'info')
  }

  const editOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order || order.status !== ORDER_STATUS.ACTIVE) return
    setSelectedTable(order.tableNo)
    setWaiter(order.waiter || waiter)
    setCart(order.items.map((i) => ({ ...i })))
    setEditingOrderId(orderId)
    setView('waiter')
    setWaiterTab('cart')
    pushToast(`Editing ${orderId} in cart`, 'info')
  }

  const addCustomItem = ({ name, price, category }) => {
    const item = {
      id: `custom-${Date.now()}`,
      name,
      price,
      tag: 'custom',
    }
    setMenu((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), item],
    }))
    pushToast(`${name} added to ${category}`)
  }

  const deleteCustomItem = (category, id) => {
    setMenu((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((item) => item.id !== id),
    }))
    setCart((list) => list.filter((item) => item.id !== id))
    pushToast('Custom item removed', 'info')
  }

  const exportOrders = async () => {
    try {
      await exportOrdersToExcel(orders)
      pushToast('Excel exported')
    } catch {
      pushToast('Export failed', 'error')
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">Z</span>
          <div>
            <strong>Zaigon</strong>
            <p>Korean & Asian kitchen</p>
          </div>
        </div>
        <div className="view-toggle" role="tablist" aria-label="App view">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'dashboard'}
            className={view === 'dashboard' ? 'active' : ''}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'waiter'}
            className={view === 'waiter' ? 'active' : ''}
            onClick={() => setView('waiter')}
          >
            Waiter
          </button>
        </div>
      </header>

      <main className="app-main">
        {view === 'dashboard' ? (
          <Dashboard
            stats={stats}
            tables={tables}
            orders={orders}
            onBill={(id) => billOrder(id, false)}
            onCancel={cancelOrder}
            onManageMenu={() => setShowMenuManager(true)}
            onExport={exportOrders}
          />
        ) : (
          <WaiterView
            waiter={waiter}
            onWaiterChange={setWaiter}
            tab={waiterTab}
            onTab={setWaiterTab}
            tables={tables}
            orders={orders}
            menu={menu}
            cart={cart}
            selectedTable={selectedTable}
            editingOrderId={editingOrderId}
            onSelectTable={selectTable}
            onAdd={addToCart}
            onQty={changeQty}
            onRemove={removeFromCart}
            onConfirm={confirmOrder}
            onEdit={editOrder}
            onBill={(id) => billOrder(id, true)}
            onCancel={cancelOrder}
          />
        )}
      </main>

      {showMenuManager && (
        <MenuManager
          menu={menu}
          onAdd={addCustomItem}
          onDelete={deleteCustomItem}
          onClose={() => setShowMenuManager(false)}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
