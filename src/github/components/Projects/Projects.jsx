import uniqid from 'uniqid'
import { projects } from '../../portfolio'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import './Projects.css'
import ReactPlayer from 'react-player'
import Sony from '../../../image/Projects/Sony.png'
import Maze from '../../../image/Projects/Maze.mp4'
import Dogs from '../../../image/Projects/Dogs.jpg'
import Turtlebot from '../../../image/Projects/Turtlebot.mp4'
import ChatRAI from '../../../image/Projects/ChatRAI.mp4'

const Projects = () => {
    if (!projects.length) return null

    return (
        <section id='projects' className='section projects'>
        <h2 className='section__title'>Mini Projects</h2>

        <div className='projects__grid'>
            {projects.map((project) => (
            <ProjectContainer key={uniqid()} project={project}/>
            ))}
        </div>
        
        <div className='imgnvdo'>
            <div>Sony Hand Detection</div>
            <img src={Sony} width='650px' className='imgnvideo'/>
            <div>Basic Unity Maze</div>
            <ReactPlayer url={Maze} width='650px' controls = {true} className='imgnvideo'/>
            <div>Turtlebot Navigation</div>
            <ReactPlayer url={Turtlebot} width='650px' controls = {true} className='imgnvideo'/>
            <div>Detect Dog Breeds</div>
            <img src={Dogs} width='650px' className='imgnvideo'/>
            <div>Chat bot RAI</div>
            <ReactPlayer url={ChatRAI} width='650px' controls = {true} className='imgnvideo'/>
        </div>

        </section>
    )
}

export default Projects