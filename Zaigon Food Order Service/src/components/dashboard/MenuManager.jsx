import { useMemo, useState } from 'react'
import { MENU_CATEGORIES } from '../../data/menu.js'
import { formatINR } from '../../utils/format.js'
import { IconClose } from '../Icons.jsx'

export default function MenuManager({ menu, onAdd, onDelete, onClose }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(MENU_CATEGORIES[0])

  const customItems = useMemo(() => {
    return MENU_CATEGORIES.flatMap((cat) =>
      (menu[cat] || [])
        .filter((item) => item.tag === 'custom')
        .map((item) => ({ ...item, category: cat })),
    )
  }, [menu])

  const submit = (event) => {
    event.preventDefault()
    const trimmed = name.trim()
    const amount = Number(price)
    if (!trimmed || !Number.isFinite(amount) || amount <= 0) return
    onAdd({ name: trimmed, price: Math.round(amount), category })
    setName('')
    setPrice('')
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="glass modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-manager-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-head">
          <div>
            <h2 id="menu-manager-title">Manage menu</h2>
            <p className="muted">Drop custom specials live onto the floor menu</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>

        <form className="menu-form" onSubmit={submit}>
          <label>
            Item name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Truffle tteokbokki"
              required
            />
          </label>
          <label>
            Price (₹)
            <input
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="299"
              required
            />
          </label>
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {MENU_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-gradient">
            Add item
          </button>
        </form>

        <div className="custom-list">
          <h3>Custom items</h3>
          {customItems.length === 0 ? (
            <p className="muted">Nothing custom yet — add a tonight-only special.</p>
          ) : (
            customItems.map((item) => (
              <div key={item.id} className="custom-row">
                <div>
                  <strong>{item.name}</strong>
                  <p className="muted">
                    {item.category} · {formatINR(item.price)} · ✨ Custom
                  </p>
                </div>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(item.category, item.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
