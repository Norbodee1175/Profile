import React, { useEffect, useState } from 'react'
import ArrowUpward from '../../../image/Github/Arrow up.png'
import './ScrollToTop.css'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () =>
        window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false)

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return isVisible ? (
        <div className='scroll-top'>
        <a href='#top'>
            <img src={ArrowUpward} width='25px' fontSize='large'/>
        </a>
        </div>
    ) : null
}

export default ScrollToTop