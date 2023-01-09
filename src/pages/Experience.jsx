import ProjectLarge from '../github/components/Projects/ProjectsLarge'
import Projects from '../github/components/Projects/Projects'
import ScrollToTop from '../github/components/ScrollToTop/ScrollToTop'
import Contact from '../github/components/Contact/Contact'
import Footer from '../github/components/Footer/Footer'
import { NavBar } from '../components/NavBar'
import '../github/github.css'

export const Experience = () => {

  const Theme = localStorage.getItem('Theme')

  return (
    <div id='top' className={`${Theme} app`}>
      <NavBar/>
      <main>
        <ProjectLarge/>
        <Projects/>
        <Contact/>
      </main>

      <ScrollToTop/>
      <Footer/>
    </div>
  )
}