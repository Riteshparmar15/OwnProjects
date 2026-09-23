export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

export function formatTime(timestamp = Date.now()) {
  return new Date(timestamp).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDateTime(timestamp = Date.now()) {
  return new Date(timestamp).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function padOrderId(seq) {
  return `ZG-${String(seq).padStart(3, '0')}`
}

export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export function orderItemTotal(item) {
  return item.price * item.qty
}
