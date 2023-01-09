import axios from '../api/Axios';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar';
import '../css/MasterData.css'
import Table from '../hooks/useTable';

export const DonutFilter = () => {

    const Donuturl = "/donut";

    const [data, setData] = useState([{id:'', DONFIXNUM:''}])

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Donut Filter Install Fixture No.",
            accessor: "DONFIXNUM",
        },
        {
            Header: 'Delete',
            accessor: 'delete',
            Cell: row => (
            <div>
               <button className='deletebtn' onClick={e=> handleDelete(row.row.original.id)}>Delete</button>
            </div>
            ),
        },
    ]);

    useEffect(() => {
        axios.get(Donuturl).then((response) => {
        setData(response.data)
        })
    }, [])

    const handleDelete = (id) => {
        axios.delete(`/deletedonut/${id}/`)
        .then((response)=>{
            console.log(response);
            const donut = data.filter((value, i) => {
                return value.id !== id;
            })
            setData(donut);
        })
    }

    return (
        <>
            <NavBar/>
            <div className='masterdata'>
                <div className='headmasterdata'>Donut Filter Install Fixture</div><br/>
                <Link to = 'AddDonutFilter' className='addinputbtn'>Add Donut Filter</Link>
                <Table columns={columns} data={data}/>
            </div>
        </>
    )
}