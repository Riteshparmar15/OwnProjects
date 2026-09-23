import { formatDateTime } from './format.js'

function emptyOrderRow() {
  return {
    'Order ID': '—',
    'Table No': '—',
    Waiter: '—',
    'Item Name': 'No orders yet',
    'Unit Price': 0,
    Quantity: 0,
    'Item Total': 0,
    'Order Total': 0,
    Status: '—',
    'Order Time': '—',
  }
}

export async function exportOrdersToExcel(orders) {
  const XLSX = await import('xlsx')
  const detailRows =
    orders.length === 0
      ? [emptyOrderRow()]
      : orders.flatMap((order) =>
          order.items.map((item) => ({
            'Order ID': order.id,
            'Table No': order.tableNo,
            Waiter: order.waiter,
            'Item Name': item.name,
            'Unit Price': item.price,
            Quantity: item.qty,
            'Item Total': item.price * item.qty,
            'Order Total': order.total,
            Status: order.status,
            'Order Time': order.time,
          })),
        )

  const completed = orders.filter((o) => o.status === 'completed')
  const active = orders.filter((o) => o.status === 'active')
  const cancelled = orders.filter((o) => o.status === 'cancelled')
  const revenue = completed.reduce((sum, o) => sum + o.total, 0)
  const avgTicket = completed.length ? Math.round(revenue / completed.length) : 0
  const itemsSold = completed.reduce(
    (sum, o) => sum + o.items.reduce((n, i) => n + i.qty, 0),
    0,
  )

  const waiterMap = new Map()
  const tableMap = new Map()
  const itemMap = new Map()

  for (const order of completed) {
    waiterMap.set(order.waiter, (waiterMap.get(order.waiter) || 0) + order.total)
    tableMap.set(order.tableNo, (tableMap.get(order.tableNo) || 0) + order.total)
    for (const item of order.items) {
      const prev = itemMap.get(item.name) || { qty: 0, sales: 0 }
      prev.qty += item.qty
      prev.sales += item.price * item.qty
      itemMap.set(item.name, prev)
    }
  }

  const topItems = [...itemMap.entries()]
    .sort((a, b) => b[1].qty - a[1].qty)
    .slice(0, 8)

  const summaryRows = [
    { Metric: 'Generated At', Value: formatDateTime(Date.now()) },
    { Metric: 'Total Orders', Value: orders.length },
    { Metric: 'Active Orders', Value: active.length },
    { Metric: 'Completed Orders', Value: completed.length },
    { Metric: 'Cancelled Orders', Value: cancelled.length },
    { Metric: 'Gross Revenue (Completed)', Value: revenue },
    { Metric: 'Average Ticket Size', Value: avgTicket },
    { Metric: 'Items Sold (Completed)', Value: itemsSold },
    { Metric: '', Value: '' },
    { Metric: 'Revenue by Waiter', Value: '' },
    ...(waiterMap.size
      ? [...waiterMap.entries()].map(([name, total]) => ({
          Metric: `  ${name}`,
          Value: total,
        }))
      : [{ Metric: '  —', Value: 0 }]),
    { Metric: '', Value: '' },
    { Metric: 'Revenue by Table', Value: '' },
    ...(tableMap.size
      ? [...tableMap.entries()]
          .sort((a, b) => a[0] - b[0])
          .map(([table, total]) => ({
            Metric: `  Table ${table}`,
            Value: total,
          }))
      : [{ Metric: '  —', Value: 0 }]),
    { Metric: '', Value: '' },
    { Metric: 'Top Selling Items', Value: '' },
    ...(topItems.length
      ? topItems.map(([name, data]) => ({
          Metric: `  ${name}`,
          Value: `${data.qty} sold / ₹${data.sales}`,
        }))
      : [{ Metric: '  —', Value: 'No completed sales' }]),
  ]

  const wb = XLSX.utils.book_new()
  const ordersSheet = XLSX.utils.json_to_sheet(detailRows)
  ordersSheet['!cols'] = [
    { wch: 12 },
    { wch: 10 },
    { wch: 12 },
    { wch: 28 },
    { wch: 12 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 14 },
  ]

  const summarySheet = XLSX.utils.json_to_sheet(summaryRows)
  summarySheet['!cols'] = [{ wch: 36 }, { wch: 28 }]

  XLSX.utils.book_append_sheet(wb, ordersSheet, 'Orders')
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary')

  const stamp = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(wb, `Zaigon-Orders-${stamp}.xlsx`)
}
