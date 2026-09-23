import Header from './components/Header'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import About from './components/About'
import Differentiators from './components/Differentiators'
import RecruitmentProcess from './components/RecruitmentProcess'
import Services from './components/Services'
import RetailRoles from './components/RetailRoles'
import StaffingUseCases from './components/StaffingUseCases'
import CandidateScreening from './components/CandidateScreening'
import CandidateCTA from './components/CandidateCTA'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CandidateForm from './components/CandidateForm'
import Footer from './components/Footer'
import SeoSchema from './components/SeoSchema'

export default function App() {
  return (
    <>
      <SeoSchema />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-card"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Differentiators />
        <RecruitmentProcess />
        <Services />
        <RetailRoles />
        <StaffingUseCases />
        <CandidateScreening />
        <CandidateCTA />
        <Testimonials />
        <FAQ />
        <CandidateForm />
      </main>
      <Footer />
    </>
  )
}
