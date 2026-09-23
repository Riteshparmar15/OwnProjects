import Seo from '../components/Seo'
import ResumeForm from '../components/ResumeForm'

export default function SubmitResumePage() {
  return (
    <div className="page">
      <Seo
        title="Submit Resume"
        description="Submit your resume to ProStafff Solution for retail roles across in-store, field management, and corporate functions."
      />

      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Candidates</span>
          <h1>Submit your resume.</h1>
          <p>
            Share your profile for current and upcoming retail opportunities. We review every
            submission against role fit, experience, and location preferences.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <ResumeForm />
        </div>
      </section>
    </div>
  )
}
