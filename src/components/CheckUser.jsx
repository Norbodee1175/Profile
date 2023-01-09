import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const CheckUser = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([{Username:'', Roles:''}])

    const getUsername = localStorage.getItem('ID')
    const getRoles = localStorage.getItem('Roles')

    useEffect(() => {
        if (!getUsername && !getRoles) {
            localStorage.clear();
            navigate('/Login');
        } 
    }, [])
}