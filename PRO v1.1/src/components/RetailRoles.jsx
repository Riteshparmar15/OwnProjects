import { useState } from 'react'
import { images, retailRoles } from '../data/content'
import { ResponsiveImage } from './ResponsiveImage'
import { Reveal } from '../hooks/useInView'

export default function RetailRoles() {
  const [active, setActive] = useState(0)
  const role = retailRoles[active]

  return (
    <section id="retail-roles" className="section-pad" aria-labelledby="roles-title">
      <div className="container-pro">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Retail Roles</p>
          <h2 id="roles-title" className="heading-lg mt-3">
            The full retail ecosystem, covered.
          </h2>
          <p className="body-lg mt-4">
            Categories ProStaff recruits for — not live vacancies. From the floor to field
            leadership and corporate retail functions.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Retail role categories">
          {retailRoles.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`role-panel-${item.id}`}
              id={`role-tab-${item.id}`}
              onClick={() => setActive(i)}
              className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-bold transition-all border ${
                active === i
                  ? 'bg-navy-900 text-white border-navy-900 shadow-soft'
                  : 'bg-white text-navy-900 border-line hover:border-navy-900/40'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <Reveal key={role.id} className="mt-8">
          <div
            role="tabpanel"
            id={`role-panel-${role.id}`}
            aria-labelledby={`role-tab-${role.id}`}
            className="grid gap-6 lg:grid-cols-2 items-stretch overflow-hidden rounded-[22px] border border-line bg-white shadow-soft"
          >
            <div className="aspect-[5/4] lg:aspect-auto lg:min-h-[380px]">
              <ResponsiveImage
                baseSrc={images.roles[active].src}
                alt={images.roles[active].alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-teal-600">
                {role.subtitle}
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-navy-900 tracking-tight">
                {role.title}
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {role.examples.map((example) => (
                  <li
                    key={example}
                    className="rounded-xl border border-line bg-surface px-4 py-3.5 text-sm font-semibold text-navy-900"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
