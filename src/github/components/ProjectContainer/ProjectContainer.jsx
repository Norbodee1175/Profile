import uniqid from 'uniqid'
import GitHub from '../../../image/Github/Github.png'
import Launch from '../../../image/Github/Launch.png'
import './ProjectContainer.css'
// import ReactPlayer from 'react-player'
// import Sony from '../../../image/Projects/Sony.png'
// import Dogs from '../../../image/Projects/Dogs.jpg'
// import Turtlebot from '../../../image/Projects/Turtlebot.mp4'
// import ChatRAI from '../../../image/Projects/ChatRAI.mp4'

const ProjectContainer = ({ project }) => (
    <div className='project'>
        <h3>{project.name}</h3>

        <p className='project__description'>{project.description}</p>
        {/* {project.name == 'Project 2' ? <img src={Sony} width='200px'/>: null}
        {project.name == 'Project 4' ? <ReactPlayer url={Turtlebot} width='200px' controls = {true}/>: null}
        {project.name == 'Project 5' ? <img src={Dogs} width='200px'/>: null}
        {project.name == 'Project 6' ? <ReactPlayer url={ChatRAI} width='200px' controls = {true}/>: null} */}
        {project.stack && (
        <ul className='project__stack'>
            {project.stack.map((item) => (
            <li key={uniqid()} className='project__stack-item'>
                {item}
            </li>
            ))}
        </ul>
        )}

        {project.sourceCode && (
        <a
            href={project.sourceCode}
            aria-label='source code'
            className='link link--icon'
        >
            <img src={GitHub} width='25px'/>
        </a>
        )}

        {project.livePreview && (
        <a
            href={project.livePreview}
            aria-label='live preview'
            className='link link--icon'
        >
            <img src={Launch} width='25px'/>
        </a>
        )}
    </div>
)

export default ProjectContainer