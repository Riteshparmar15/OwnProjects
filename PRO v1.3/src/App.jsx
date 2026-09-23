import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import IntroSplash from './components/IntroSplash'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import LuxuryEcosystem from './components/LuxuryEcosystem'
import About from './components/About'
import PromoBanner from './components/PromoBanner'
import Capabilities from './components/Capabilities'
import OpsSection from './components/OpsSection'
import Comparison from './components/Comparison'
import Roles from './components/Roles'
import Proof from './components/Proof'
import FAQ from './components/FAQ'
import Closing from './components/Closing'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  return (
    <div className="min-h-screen bg-cream text-ink">
      <IntroSplash onComplete={handleIntroComplete} />
      <Navbar visible={introDone} />
      <main>
        <Hero />
        <TrustBar />
        <LuxuryEcosystem />
        <About />
        <PromoBanner />
        <Capabilities />
        <OpsSection />
        <Comparison />
        <Roles />
        <Proof />
        <FAQ />
        <Closing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
