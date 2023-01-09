import axios from '../api/Axios';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'
import { faCircleCheck, faCircleXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavBar } from '../components/NavBar';
import '../css/AdminProfile.css'
import Popup from '../hooks/usePopup';
import Table from '../hooks/useTable';

const EMAIL_REGEX = /^[a-zA-Z0-9-_.]{1,100}@seagate\.com$/;
const ROLES_REGEX = /^(?=.*[A-Z]).{4,20}$/;

export const AdminProfile = () => {

    const Userurl = "/user";

    const [data, setData] = useState([{id:'', USERGID:'', EMAIL:'', PASSWORD:'', USERPROFILE:''}])

    const [buttonPopup, setButtonPopup] = useState(false)
    const [editPopup, setEditPopup] = useState([{id:'', USERGID:'', EMAIL:'', PASSWORD:'', USERPROFILE:''}])

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
            aggregate: 'min',
        },
        {
            Header: "GID",
            accessor: "USERGID",
            // aggregate: 'average',
            // Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
        },
        {
            Header: "Email",
            accessor: "EMAIL",
        },
        {
            Header: "User Profile",
            accessor: "USERPROFILE",
            // aggregate: 'sum',
            // Aggregated: ({ value }) => `${value} (sum)`,
        },
        {
            Header: 'Edit',
            accessor: 'edit',
            Aggregated: " ",
            Cell: row => (
                <div>
                   <button className='editbtn' onClick={e=> {setButtonPopup(true), setEditPopup(row.row.original)}}>Edit</button>
                </div>
            ),
        },
        {
            Header: 'Delete',
            accessor: 'delete',
            Aggregated: " ",
            Cell: row => (
            <div>
               <button className='deletebtn' onClick={e=> handleDelete(row.row.original)}>Delete</button>
            </div>
            // Aggregated: row => (
            // <div>
            //    <button className='deletebtn' onClick={e=> handleDelete(row.row.groupByVal)}>Delete</button>
            // </div>
            ),
        },
    ]);

    useEffect(() => {
        axios.get(Userurl).then((response) => {
        setData(response.data)
        })
    }, [])

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [roles, setRoles] = useState('');
    const [validRoles, setValidRoles] = useState(false);
    const [rolesFocus, setRolesFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = ROLES_REGEX.test(roles);
        setValidRoles(result);
    }, [roles])

    useEffect(() => {
        setErrMsg('');
    }, [email, roles])

    const handleEdit = async (e) => {
        e.preventDefault();
        // Prevent JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = ROLES_REGEX.test(roles);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.put(`/edituser/${editPopup.id}/`, JSON.stringify({ email, roles }), 
            {
                headers: { 'content-type' : 'application/json' },
                // withCredentials: true
            }
        );
        setSuccess(true);
        setButtonPopup(false)
        setData(response.data)
        setEmail('')
        setRoles('')
        if (editPopup.USERGID == getGID) {
            localStorage.clear();
            window.location.reload();
        }
        //clear input
        } catch (err) {
            if (!err?.response) {
                console.log(err)
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Change Input Failed')
            }
            errRef.current.focus();
        }
    }

    const getGID = localStorage.getItem('GID')

    const handleDelete = (userrow) => {
        axios.delete(`/deleteuser/${userrow.id}/`)
        .then((response)=>{
            console.log(response);
            const user = data.filter((value, i) => {
                if (userrow.USERGID == getGID) {
                    localStorage.clear();
                    window.location.reload();
                }
                return value.id !== userrow.id;
            })
            setData(user);
        })
    }

    const handleClear = (e) => {
        setEmail('')
        setRoles('')
    }

    return (
        <>
            <NavBar/>
            <div className='bodyadmin'>
                <div className='headadmin'>User Information</div><br/>
                <Link to = 'Register' className='adduserbtn'>Add User</Link>
                <Table columns={columns} data={data}/>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} cleardata={handleClear}>
                    <section className='register'>
                        <div className='centerregister'>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                            <h1>Edit Profile</h1>
                            <form onSubmit={handleEdit}>
                                <div className='regis'>
                                    {/* Username */}
                                    <label htmlFor='gid'>
                                        GID:&nbsp;
                                    </label><br/>
                                    <input type="text" value={editPopup.USERGID} disabled/>
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
                                <button className='registerbtn' disabled={!validEmail || !validRoles ? true : false}>Submit</button>
                            </form>
                        </div>
                    </section>
                </Popup>
            </div>
        </>
    )
}