import { processSteps } from '../data/content'
import { Reveal, useInView } from '../hooks/useInView'

export default function RecruitmentProcess() {
  const { ref, isVisible } = useInView({ threshold: 0.2 })

  return (
    <section id="process" className="section-pad" aria-labelledby="process-title">
      <div className="container-pro">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Recruitment Process</p>
          <h2 id="process-title" className="heading-lg mt-3">
            From requirement to retail-ready talent
          </h2>
          <p className="body-lg mt-4">
            A clear, structured path from understanding the brief to coordinating interviews and
            joining — designed around how retail teams actually hire.
          </p>
        </Reveal>

        <div ref={ref} className="mt-12 relative">
          <div
            className="hidden lg:block absolute top-[34px] left-[6%] right-[6%] h-[2px] bg-line overflow-hidden"
            aria-hidden
          >
            <div
              className={`h-full bg-teal-600 origin-left transition-transform duration-1000 ease-out ${
                isVisible ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>

          <ol className="grid gap-5 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.step} className="relative">
                <Reveal delay={Math.min(i + 1, 4)} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-soft lg:pt-6">
                    <div className="flex lg:flex-col items-start gap-4 lg:gap-0">
                      <span
                        className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 font-extrabold text-sm transition-colors duration-500 ${
                          isVisible
                            ? 'border-teal-600 bg-teal-600 text-white'
                            : 'border-line bg-white text-navy-900'
                        }`}
                      >
                        {step.step}
                      </span>
                      <div className="lg:mt-5">
                        <h3 className="text-lg font-extrabold text-navy-900 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
                {i < processSteps.length - 1 && (
                  <div
                    className="lg:hidden absolute left-[1.4rem] top-[4.2rem] bottom-[-1.25rem] w-[2px] bg-line"
                    aria-hidden
                  >
                    <div
                      className={`w-full bg-teal-600 origin-top transition-transform duration-700 delay-150 ${
                        isVisible ? 'scale-y-100' : 'scale-y-0'
                      }`}
                      style={{ height: '100%' }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
