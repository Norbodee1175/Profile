import axios from '../api/Axios';
import { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Chart as ChartJS, defaults } from 'chart.js';

function RhResultChart() {

    const ECM_URL = "/dashboardrh";

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                borderColor: [
                    'rgba(255, 206, 86, 0.2)',
                    // 'rgba(255, 99, 132, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                ],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                ],
            },
        ]
    })

    useEffect(() => {
        axios.get(ECM_URL).then((response) => {
        const RhPass = response.data.Pass.map((a) => a)
        const RhReject = response.data.Reject.map((a) => a)

        const RhpassPercent = ((RhPass.length)/(RhPass.length + RhReject.length))*100
        const RhrejectPercent = ((RhReject.length)/(RhPass.length + RhReject.length))*100
        
        setData({
                labels: ["Pass", "Reject"],
                datasets: [
                {
                    label: 'RH Result',
                    // data: [RhPass.length, RhReject.length],
                    data: [RhpassPercent, RhrejectPercent],
                    borderColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                },
            ]
        })
        })
    }, [])

    const options = {
        scale: {
            max: 100,
            min: 0,
            ticks: {
                precision: 0,
            }
        },
    }

    return <Bar data={data} options={options} />;
}

export default RhResultChart;