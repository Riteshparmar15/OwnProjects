/** Job listings — API-ready shape for future backend integration */
export const jobs = []

export const categoryLabels = {
  'in-store': 'In-Store',
  management: 'Field Management',
  corporate: 'Corporate Retail',
}

export const employmentTypes = ['Permanent', 'Temporary', 'Seasonal', 'Executive Search']

export function getJobById(id) {
  return jobs.find((job) => job.id === id)
}

export function filterJobs({ query = '', category = '', location = '', experience = '', employmentType = '' } = {}) {
  const q = query.trim().toLowerCase()
  return jobs.filter((job) => {
    const matchesQuery =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.summary.toLowerCase().includes(q)
    const matchesCategory = !category || job.category === category
    const matchesLocation = !location || job.location === location
    const matchesExperience = !experience || job.experience === experience
    const matchesType = !employmentType || job.employmentType === employmentType
    return matchesQuery && matchesCategory && matchesLocation && matchesExperience && matchesType
  })
}

export function getJobFilterOptions() {
  return {
    categories: Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
    locations: [...new Set(jobs.map((job) => job.location))],
    experiences: [...new Set(jobs.map((job) => job.experience))],
    employmentTypes: [...new Set(jobs.map((job) => job.employmentType))],
  }
}
