import { useMemo, useState } from 'react'
import { MENU_CATEGORIES } from '../../data/menu.js'
import { formatINR } from '../../utils/format.js'
import { IconSearch } from '../Icons.jsx'

function TagBadge({ tag }) {
  if (tag === 'must') return <span className="badge badge-must">Must Try</span>
  if (tag === 'addon') return <span className="badge badge-addon">Add-on</span>
  if (tag === 'custom') return <span className="badge badge-custom">✨ Custom</span>
  return null
}

export default function MenuTab({
  menu,
  cart,
  selectedTable,
  onGoTables,
  onAdd,
  onQty,
}) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const qtyOf = (id) => cart.find((i) => i.id === id)?.qty || 0

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const cats = category === 'All' ? MENU_CATEGORIES : [category]
    const result = {}
    for (const cat of cats) {
      const items = (menu[cat] || []).filter((item) =>
        q ? item.name.toLowerCase().includes(q) : true,
      )
      if (items.length) result[cat] = items
    }
    return result
  }, [menu, category, query])

  if (!selectedTable) {
    return (
      <div className="guard-card glass">
        <h2>Select a table first</h2>
        <p className="muted">The menu stays locked until a table is on the ticket.</p>
        <button type="button" className="btn btn-gradient" onClick={onGoTables}>
          Go to tables
        </button>
      </div>
    )
  }

  return (
    <div className="menu-layout">
      <aside className="category-rail glass">
        <button
          type="button"
          className={`cat-btn ${category === 'All' ? 'active' : ''}`}
          onClick={() => setCategory('All')}
        >
          All
        </button>
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`cat-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </aside>

      <div className="menu-main">
        <div className="menu-toolbar">
          <div className="search-wrap">
            <IconSearch />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kimchi, soju, rolls..."
              aria-label="Search menu"
            />
          </div>
          <span className="table-chip">Table {String(selectedTable).padStart(2, '0')}</span>
        </div>

        {Object.keys(filtered).length === 0 ? (
          <div className="empty-state">
            <p>No matches.</p>
            <span>Try another vibe word.</span>
          </div>
        ) : (
          Object.entries(filtered).map(([cat, items]) => (
            <section key={cat} className="menu-section">
              <h3>{cat}</h3>
              <div className="item-grid">
                {items.map((item) => {
                  const qty = qtyOf(item.id)
                  return (
                    <article key={item.id} className="glass menu-card">
                      <div className="menu-card-top">
                        <TagBadge tag={item.tag} />
                        <span className="menu-price">{formatINR(item.price)}</span>
                      </div>
                      <h4>{item.name}</h4>
                      {qty === 0 ? (
                        <button type="button" className="btn btn-add" onClick={() => onAdd(item)}>
                          Add
                        </button>
                      ) : (
                        <div className="qty-ctrl">
                          <button type="button" onClick={() => onQty(item.id, -1)} aria-label="Decrease">
                            −
                          </button>
                          <span>{qty}</span>
                          <button type="button" onClick={() => onQty(item.id, 1)} aria-label="Increase">
                            +
                          </button>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
