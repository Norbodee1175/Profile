import About from '../github/components/About/About'
import Skills from '../github/components/Skills/Skills'
import ScrollToTop from '../github/components/ScrollToTop/ScrollToTop'
import Contact from '../github/components/Contact/Contact'
import Footer from '../github/components/Footer/Footer'
import { NavBar } from '../components/NavBar'
import '../github/github.css'

export const Profile = () => {

  const Theme = localStorage.getItem('Theme')

  return (
    <div id='top' className={`${Theme} app`}>
      <NavBar/>
      <main>
        <About/>
        <Skills/>
        <Contact/>
      </main>

      <ScrollToTop/>
      <Footer/>
    </div>
  )
}