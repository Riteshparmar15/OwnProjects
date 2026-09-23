export const WAITERS = ['Rahul', 'Priya', 'Arjun', 'Sneha', 'Vikram']

export const TABLE_COUNT = 12

export const STATUS = {
  FREE: 'free',
  OCCUPIED: 'occupied',
  BILLED: 'billed',
}

export const ORDER_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export function createTables() {
  return Array.from({ length: TABLE_COUNT }, (_, i) => ({
    id: i + 1,
    status: STATUS.FREE,
    waiter: null,
    currentOrderId: null,
  }))
}

export const STATUS_LABEL = {
  free: 'Free',
  occupied: 'Occupied',
  billed: 'Billed',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
}
