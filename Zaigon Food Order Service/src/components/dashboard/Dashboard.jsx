import StatCards from './StatCards.jsx'
import FloorPlan from './FloorPlan.jsx'
import OrderHistory from './OrderHistory.jsx'
import { IconExport } from '../Icons.jsx'

export default function Dashboard({
  stats,
  tables,
  orders,
  onBill,
  onCancel,
  onManageMenu,
  onExport,
}) {
  return (
    <div className="dashboard">
      <div className="dashboard-toolbar">
        <div>
          <p className="eyebrow">Owner / Manager</p>
          <h1>Service pulse</h1>
        </div>
        <div className="toolbar-actions">
          <button type="button" className="btn btn-ghost" onClick={onManageMenu}>
            Manage menu
          </button>
          <button type="button" className="btn btn-gradient" onClick={onExport}>
            <IconExport /> Export Excel
          </button>
        </div>
      </div>
      <StatCards stats={stats} />
      <FloorPlan tables={tables} orders={orders} />
      <OrderHistory orders={orders} tables={tables} onBill={onBill} onCancel={onCancel} />
    </div>
  )
}
