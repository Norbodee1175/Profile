import uniqid from 'uniqid'
import GitHub from '../../../image/Github/Github.png'
import Launch from '../../../image/Github/Launch.png'
import './ProjectContainer.css'

const ProjectContainer = ({ project }) => (
    <div className='project'>
        <h3>{project.name}</h3>

        <p className='project__description'>{project.description}</p>
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