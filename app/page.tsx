import Nav from './components/Nav'
import Hero from './components/Hero'
import Challenge from './components/Challenge'
import HowItWorks from './components/HowItWorks'
import Deliver from './components/Deliver'
import Industries from './components/Industries'
import Metrics from './components/Metrics'
import About from './components/About'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function Home() {
  return (
    <main style={{ background: '#FFFFFF', color: '#0F172A', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Challenge />
      <HowItWorks />
      <Deliver />
      <Industries />
      <Metrics />
      <About />
      <FAQ />
      <CTASection />
      <Footer />
      <ChatWidget />
    </main>
  )
}
