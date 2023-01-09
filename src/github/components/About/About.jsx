import Bright from '../../../image/Github/Bright Mode.png'
import Sunny from '../../../image/Github/Sunny Mode.png'
import Night from '../../../image/Github/Night Mode.png'
import GitHub from '../../../image/Github/Github.png'
import LinkedIn from '../../../image/Github/LinkedIn.png'
import { about } from '../../portfolio'
import './About.css'

const About = () => {
    const { name, role, description, resume, social } = about

    const Theme = localStorage.getItem('Theme')

    const handleBright = (e) => {
        localStorage.setItem('Theme', 'dark')
        window.location.reload()
    }

    const handleNight = (e) => {
        localStorage.setItem('Theme', 'light')
        window.location.reload()
    }

    return (
        <div className='about center'>
        {name && (
            <>
                <h1>
                    {Theme == 'light' ? <img className='about__theme' src={Sunny} onClick={handleBright}/>
                    : Theme == 'dark' ? <img className='about__theme' src={Night} onClick={handleNight}/>
                    : null}&nbsp;
                    Hi, I am <span className='about__name'>{name}.</span>
                </h1>
            </>
        )}

        {role && <h2 className='about__role'>{role}.</h2>}
        <p className='about__desc'>{description && description}</p>

        <div className='about__contact center'>
            {resume && (
            <a href={resume}>
                <span type='button' className='btn btn--outline'>
                Resume
                </span>
            </a>
            )}

            {social && (
            <>
                {social.github && (
                <a
                    href={social.github}
                    aria-label='github'
                    className='link link--icon'
                >
                    <img src={GitHub} width='25px'/>
                </a>
                )}

                {social.linkedin && (
                <a
                    href={social.linkedin}
                    aria-label='linkedin'
                    className='link link--icon'
                >
                    <img src={LinkedIn} width='25px'/>
                </a>
                )}
            </>
            )}
        </div>
        </div>
    )
}

export default About