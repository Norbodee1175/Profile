import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { faCircleCheck, faCircleXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/Register.css'
import axios from '../api/Axios';

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,25}$/;
const GID_REGEX = /^[0-9]{1,10}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9-_.]{1,100}@seagate\.com$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/;
const ROLES_REGEX = /^(?=.*[A-Z]).{4,20}$/;
const REGISTER_URL = '/register';

export const Register = () => {

    const navigate = useNavigate();
    const locaton = useLocation();
    const from = locaton.state?.from?.pathname || "/AdminProfile";

    const userRef = useRef();
    const errRef = useRef();

    const [gid, setGid] = useState('');
    const [validGid, setValidGid] = useState(false);
    const [gidFocus, setGidFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [roles, setRoles] = useState('');
    const [validRoles, setValidRoles] = useState(false);
    const [rolesFocus, setRolesFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = GID_REGEX.test(gid);
        setValidGid(result);
    }, [gid])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidMatch(pwd === matchPwd);
        setValidPwd(result);
    }, [pwd, matchPwd])

    useEffect(() => {
        const result = ROLES_REGEX.test(roles);
        setValidRoles(result);
    }, [roles])

    useEffect(() => {
        setErrMsg('');
    }, [gid, email, pwd, roles, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prevent JS hack
        const v1 = GID_REGEX.test(gid);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);
        const v4 = ROLES_REGEX.test(roles);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ gid, email, pwd, roles }), 
            {
                headers: { 'content-type' : 'application/json' },
                // withCredentials: true
            }
        );
        setSuccess(true);
        navigate(from, { replace:true });
        //clear input
        } catch (err) {
            if (!err?.response) {
                console.log(err)
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('GID Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <section className='register'>
                <div className='centerregister'>
                    <Link to = '/AdminProfile' className='closebtn'>Close</Link>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="regis">
                            {/* Username */}
                            {/* <label htmlFor='username'>
                                Username:&nbsp;
                                {validName ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                {validName || !user ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                            </label><br/>
                            <input
                                type='text'
                                id='username'
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "flase" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}  
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                5 to 25 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p> */}
                            {/* GID */}
                            <label htmlFor='gid'>
                                GID:&nbsp;
                                {validGid ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                {validGid || !gid ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                            </label><br/>
                            <input
                                type='number'
                                id='gid'
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setGid(e.target.value)}
                                required
                                aria-invalid={validGid ? "flase" : "true"}
                                aria-describedby="gidnote"
                                onFocus={() => setGidFocus(true)}
                                onBlur={() => setGidFocus(false)}  
                            />
                            <p id="gidnote" className={gidFocus && gid && !validGid ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                1 to 10 characters.<br />
                                Must be numbers<br />
                            </p>
                            {/* Email */}
                            <label htmlFor='email'>
                                Email(@seagate.com):&nbsp;
                                {validEmail ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                {validEmail || !email ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                            </label><br/>
                            <input
                                type='email'
                                id='email'
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "flase" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}  
                            />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                Must be @seagate.com<br />
                                Letters, numbers, underscores, hyphens, full stop allowed.
                            </p>
                            {/* Password */}
                            <label htmlFor='password'>
                                Password:&nbsp;
                                {validPwd ? <FontAwesomeIcon icon={faCircleCheck} /> : null}
                                {validPwd || !pwd ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                            </label><br/>
                            <input
                                type='password'
                                id='password'
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "flase" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}  
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                8 to 25 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                            {/* Comfirm Password */}
                            <label htmlFor='confirm_pwd'>
                                Comfirm Password:&nbsp;
                                {validMatch && matchPwd ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                {validMatch || !matchPwd ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                            </label><br/>
                            <input
                                type='password'
                                id='confirm_pwd'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "flase" : "true"}
                                aria-describedby="comfirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}  
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                Must match the first password input field.
                            </p>
                            {/* Roles */}
                            <label htmlFor="roles">
                                User Profile:&nbsp;
                                {validRoles ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                {validRoles || !roles ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                            </label><br/>
                            <select
                            id='roles'
                            onChange={(e) => setRoles(e.target.value)}
                            required
                            aria-invalid={validRoles ? "flase" : "true"}
                            aria-describedby="rolesnote"
                            onFocus={() => setRolesFocus(true)}
                            onBlur={() => setRolesFocus(false)}>
                                <option disabled selected value> -- select an option -- </option>
                                <option value="Admin">Admin</option>
                                <option value="Production Lead">Production Lead</option>
                                <option value="Process Lead">Process Lead</option>
                                <option value="Production Operator">Production Operator</option>
                                <option value="Process Operator">Process Operator</option>
                            </select>
                            <p id="rolesnote" className={rolesFocus && !validRoles ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                Please select a Role.
                            </p>
                        </div>
                        {/* Button */}
                        <button className='registerbtn' disabled={!validGid ||!validEmail || !validPwd || !validRoles || !validMatch ? true : false}>Sign Up</button>
                    </form>
                </div>
            </section>
        </>
    )
}