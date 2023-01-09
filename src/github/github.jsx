import { useContext } from 'react'
import { ThemeContext } from './contexts/theme'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import { NavBar } from '../components/NavBar'
import './Github.css'

const Github = () => {
  // const [{ themeName }] = useContext(ThemeContext)

  return (
    // <div id='top' className={`${themeName} app`}>
    <div id='top' className={`light app`}>
      <NavBar/>
      <main>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default Github