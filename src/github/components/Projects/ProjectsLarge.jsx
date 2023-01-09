import uniqid from 'uniqid'
import { project } from '../../portfolio'
import ProjectContainerLarge from '../ProjectContainer/ProjectContainerLarge'
import './Projects.css'
import Bright from '../../../image/Github/Bright Mode.png'
import Sunny from '../../../image/Github/Sunny Mode.png'
import Night from '../../../image/Github/Night Mode.png'

const ProjectLarge = () => {

    const Theme = localStorage.getItem('Theme')

    const handleBright = (e) => {
        localStorage.setItem('Theme', 'dark')
        window.location.reload()
    }

    const handleNight = (e) => {
        localStorage.setItem('Theme', 'light')
        window.location.reload()
    }

    if (!project.length) return null

    return (
        <section id='projects' className='section projects'>
        <h2 className='section__title'>
            {Theme == 'light' ? <img className='about__theme' src={Sunny} onClick={handleBright}/>
            : Theme == 'dark' ? <img className='about__theme' src={Night} onClick={handleNight}/>
            : null}&nbsp;
            Project Intern
        </h2>

        <div className='projects__grid'>
            {project.map((project) => (
            <ProjectContainerLarge key={uniqid()} project={project}/>
            ))}
        </div>
        </section>
    )
}

export default ProjectLarge