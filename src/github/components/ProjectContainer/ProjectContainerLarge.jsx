import uniqid from 'uniqid'
import GitHub from '../../../image/Github/Github.png'
import Launch from '../../../image/Github/Launch.png'
import Flow from '../../../image/Flow.png'
import './ProjectContainer.css'

const ProjectContainerLarge = ({ project }) => (
    <div className='project'>
        <h3>{project.name}</h3>

        <p className='project__descriptionlarge'>{project.description}</p>
        {project.name == 'Project Intern at Seagate' ? <img src={Flow} width='700px'/>: null}
        {project.stack && (
        <ul className='project__stacklarge'>
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

export default ProjectContainerLarge