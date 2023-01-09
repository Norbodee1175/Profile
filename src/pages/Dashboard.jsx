import axios from '../api/Axios';
import { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import '../css/Dashboard.css'
import BakingProductChart from '../chart/BakingProductChart';
import BakingOvenChart from '../chart/BakingOvenChart';
import RhProductChart from '../chart/RhProductChart';
import RhOvenChart from '../chart/RhOvenChart';
import VmiProductChart from '../chart/VmiProductChart';
import VmiFixtureChart from '../chart/VmiFixtureChart';
import RhResultChart from '../chart/RhResultChart';
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';

export const Dashboard = () => {

    const ECM_URL = "/dashboard";

    const [data, setData] = useState([{id:'', BAKEPRODUCT:'', BAKESHIFT:'', BAKEOVNNUM:'', BAKELOTNAME:'', BAKELOTNUM:'', BAKECOMPONENT:'', BAKEPARTNUM:'', BAKEVENDOR:'', BAKEQTY:'', BAKESTDATETIME:'', BAKESTGID:'', BAKEENDDATETIME:'', BAKEENDGID:'', RHNUM:'', RHSTDATETIME:'', RHENDDATETIME:'', RHVALUE:'', RHTEMP:'', RHRESULT:'', RHSTGID:'', RHENDGID:'', RHRENUM:'', RHRESTDATETIME:'', RHREENDDATETIME:'', RHREVALUE:'', RHRETEMP:'', RHRERESULT:'', RHRESTGID:'', RHREENDGID:'', DVMISTDATETIME:'', DVMIENDDATETIME:'', DVMIFIXNUM:'', DVMILOADQTY:'', DVMIPASSQTY:'', DVMIYIELD:'', DVMIMISALIGNEDQTY:'', DVMILIFTEDQTY:'', DVMIOTHERQTY:'', DVMIREMARK:'', DVMIDONUTPN:'', DVMIDONUTVENDOR:'', DVMIRESULT:'', DVMISTGID:'', DVMIENDGID:'', DISPFLOW:''}])

    useEffect(() => {
        axios.get(ECM_URL).then((response) => {
        setData(response.data)
    })
}, [])

    return (
        <>
            <NavBar/>
            <div className='dashboard'>
                <div className='dashboardhead'>Dashboard</div><br/><br/>
                <div className='dashboardbar1'>
                    <div>Baking Product</div>
                    <BakingProductChart/><br/><br/>
                    <div>Baking Oven</div>
                    <BakingOvenChart/><br/><br/>
                </div>
                <div className='dashboardbar2'>
                    <div>Donut Filter VMI Result by Product last 2 weeks</div>
                    <VmiProductChart/><br/><br/>
                    <div>Donut Filter VMI Result by Fixture last 2 weeks</div>
                    <VmiFixtureChart/><br/><br/>
                </div>
                <div className='dashboardbar3'>
                    <div>RH Result By Product last 2 weeks</div>
                    <RhProductChart/><br/><br/>
                    <div>RH Result By Oven last 2 weeks</div>
                    <RhOvenChart/><br/><br/>
                </div>
            </div>
        </>
    )
}