import { useRef, useState, useEffect } from 'react';
import { faCircleCheck, faCircleXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Login.css'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,25}$/;

export const Login = () => {

    const navigate = useNavigate();
    const locaton = useLocation();
    const from = locaton.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState('');
    const [usernameFocus, setUsernameFocus] = useState('');

    const [roles, setRoles] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [themeName, setThemeName] = useState('light');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        setErrMsg('');
    }, [username, roles])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(LOGIN_URL,
    //             JSON.stringify({ gid, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 // withCredentials: true
    //             }
    //         );
    //         const ID = response?.data?.id;
    //         const GID = response?.data?.GID;
    //         const Password = response?.data?.Password;
    //         const Roles = response?.data?.UserProfile;
    //         setAuth({ GID, Password, Roles });
    //         setGid('');
    //         setPwd('');
    //         navigate(from, { replace:true });
    //         localStorage.setItem('ID', ID)
    //         localStorage.setItem('GID', GID)
    //         localStorage.setItem('Password', Password)
    //         localStorage.setItem('Roles', Roles)
            
    //     } catch (err) {
    //         console.log(err)
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 400) {
    //             setErrMsg('Missing GID or Password');
    //         } else if (err.response?.status === 401) {
    //             setErrMsg('GID Incorrect');
    //         } else if (err.response?.status === 402) {
    //             setErrMsg('Password Incorrect');
    //         } else {
    //             setErrMsg('Login Failed');
    //         }
    //         errRef.current.focus();
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Username = username
        const Roles = roles
        const Theme = themeName
        setUsername('');
        setRoles('');
        navigate(from, { replace:true });
        localStorage.setItem('Username', Username)
        localStorage.setItem('Roles', Roles)
        localStorage.setItem('Theme', Theme)
    }

    return (
        <section className='login'>
            <div className='centerlogin'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    {/* <label htmlFor="username">
                        Username:
                    </label><br/>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    /> */}
                    <label htmlFor='username'>
                        Username:&nbsp;
                        {validUsername ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                        {validUsername || !username ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                    </label><br/>
                    <input
                        type='text'
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        aria-invalid={validUsername ? "flase" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}  
                    />
                    <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        5 to 25 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    {/* Roles */}
                    <label htmlFor="roles">
                        Roles:
                    </label><br/>
                    <select
                    id='roles'
                    onChange={(e) => setRoles(e.target.value)}
                    required>
                        <option disabled selected value> -- select an option -- </option>
                        <option value="Emperors">Emperors</option>
                        <option value="Warlords">Warlords</option>
                        <option value="Rookies">Rookies</option>
                    </select>
                    <br/><br/>
                    {/* Button */}
                    <button className='loginbtn' disabled={!validUsername || !roles ? true : false}>Sign In</button>
                </form>
            </div>
        </section>
    )
}