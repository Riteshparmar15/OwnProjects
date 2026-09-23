import { useMemo, useState } from 'react'
import { getJobFilterOptions } from '../data/jobs'

const empty = {
  query: '',
  category: '',
  location: '',
  experience: '',
  employmentType: '',
}

export default function JobFilters({ value, onChange }) {
  const options = useMemo(() => getJobFilterOptions(), [])
  const [local, setLocal] = useState(value || empty)

  const update = (key, nextValue) => {
    const next = { ...local, [key]: nextValue }
    setLocal(next)
    onChange?.(next)
  }

  return (
    <form
      className="filters"
      onSubmit={(e) => {
        e.preventDefault()
        onChange?.(local)
      }}
    >
      <div className="field">
        <label htmlFor="job-search">Search</label>
        <input
          id="job-search"
          type="search"
          placeholder="Role, city, or keyword"
          value={local.query}
          onChange={(e) => update('query', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="job-category">Category</label>
        <select
          id="job-category"
          value={local.category}
          onChange={(e) => update('category', e.target.value)}
        >
          <option value="">All categories</option>
          {options.categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="job-location">Location</label>
        <select
          id="job-location"
          value={local.location}
          onChange={(e) => update('location', e.target.value)}
        >
          <option value="">All locations</option>
          {options.locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="job-experience">Experience</label>
        <select
          id="job-experience"
          value={local.experience}
          onChange={(e) => update('experience', e.target.value)}
        >
          <option value="">Any experience</option>
          {options.experiences.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="job-type">Employment Type</label>
        <select
          id="job-type"
          value={local.employmentType}
          onChange={(e) => update('employmentType', e.target.value)}
        >
          <option value="">All types</option>
          {options.employmentTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
