import { useState, useEffect, useMemo } from 'react';
import { NavBar } from '../components/NavBar';
import '../css/MasterData.css'
import PaginationTable from '../hooks/usePaginationTable';
import Name from '../image/Social/Name.png'
import Mobile from '../image/Social/Mobile.png'
import Email from '../image/Social/Email.png'
import Line from '../image/Social/Line.png'
import Facebook from '../image/Social/Facebook.png'
import Instagram from '../image/Social/Instagram.png'
import LinkedIn from '../image/Social/LinkedIn.png'

export const Personal = () => {

    const [data, setData] = useState([{id: 1, Logo: Name, Title: 'Name', Detail: 'Norabodee Chok-amnuaydej'}, {id: 2, Logo: Mobile, Title: 'Mobile', Detail: '087-329-6606'}, {id: 3, Logo: Email, Title: 'Email', Detail: 'win2544@windowslive.com'}, {id: 4, Logo: Line, Title: 'Line', Detail: 'Win2544'}, {id: 5, Logo: Facebook, Title: 'Facebook', Detail: 'Win Norabodee'}, {id: 6, Logo: Instagram, Title: 'Instagram', Detail: 'win.nbdz'}, {id: 7, Logo: LinkedIn, Title: 'LinkedIn', Detail: 'www.linkedin.com/in/win-norabodee'}])

    const columns = useMemo(() => [
        {
            Header: "id",
            accessor: "id",
        },
        {
            Header: "Logo",
            accessor: "Logo",
            Cell: row => (
                <img
                  src={row.row.original.Logo}
                  width={30}
                  alt='Logo'
                />
              )
        },
        {
            Header: "Title",
            accessor: "Title",
        },
        {
            Header: "Detail",
            accessor: "Detail",
        },
        // {
        //     Header: 'Delete',
        //     accessor: 'delete',
        //     Cell: row => (
        //     <div>
        //        <button className='deletebtn' onClick={e=> handleDelete(row.row.original.id)}>Delete</button>
        //     </div>
        //     ),
        // },
    ]);

    // const handleDelete = (id) => {
    //     axios.delete(`/deletepart/${id}/`)
    //     .then((response)=>{
    //         console.log(response);
    //         const part = data.filter((value, i) => {
    //             return value.id !== id;
    //         })
    //         setData(part);
    //     })
    // }

    return (
        <>
            <NavBar/>
            <div className='masterdata'>
                <div className='headmasterdata'>My Personal Information</div><br/>
                <PaginationTable columns={columns} data={data}/>
            </div>
        </>
    )
}