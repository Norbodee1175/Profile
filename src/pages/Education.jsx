import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import '../css/MasterData.css'
import School from '../image/Education/School.png'
import University from '../image/Education/University.png'
import College from '../image/Education/College.png'
import Secondary from '../image/Education/Secondary.png'
import Popup from '../hooks/usePopup';

export const Education = () => {

    const [schoolPopup, setSchoolPopup] = useState(false)
    const [universityPopup, setUniversityPopup] = useState(false)

    return (
        <>
            <NavBar/>
            <div className='masterdata'>
                <div className='headmasterdata'>My Education Information</div><br/>
                <div>
                    <div className='education1' onClick={(e) => {setSchoolPopup(true)}}>
                        2013 - 2019 <br/>
                        <img src={School} width='100px'/>
                    </div>
                    <div className='education2' onClick={(e) => {setUniversityPopup(true)}}>
                        2019 - Present <br/>
                        <img src={College} width='100px'/>
                    </div>
                </div><br/><br/>

                <Popup trigger={schoolPopup} setTrigger={setSchoolPopup}>
                    <section className='register'>
                        <div className='centerregister'>
                            <h1>2013 - 2019</h1>
                            <div className='body'>
                                <img src={Secondary} width='110px'></img><br/><br/>
                                Assumption College<br/><br/>
                                GPA: cannot remember
                            </div>
                        </div>
                    </section>
                </Popup>

                <Popup trigger={universityPopup} setTrigger={setUniversityPopup}>
                    <section className='register'>
                        <div className='centerregister'>
                            <h1>2019 - Present</h1>
                            <div className='body'>
                                <img src={University} width='110px'></img><br/><br/>
                                Studying in the Faculty of Engineering, Robotics & AI Engineering at King Mongkut’s Institute of Technology Ladkrabang<br/><br/>
                                GPA: 3.30
                            </div>
                        </div>
                    </section>
                </Popup>
                <div className='headmasterdata1'>My Language Skills</div><br/>
                <div className='bodymasterdata'>
                    <div>
                        Proficiency in Thai - Native language<br/><br/>
                        Proficiency in English - IELTS 5.5
                    </div>
                </div>
            </div>
        </>
    )
}