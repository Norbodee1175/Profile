import axios from '../api/Axios';
import { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';

function LineChart() {

    const ECM_URL = "/dashboard";

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'ECM RH TEST',
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
            {
                label: 'ECM RH RETEST',
                data: [],
                borderColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
            }
        ]
    })

    useEffect(() => {
        axios.get(ECM_URL).then((response) => {
        setData({
            labels: response.data.map((a) => a.BAKELOTNAME),
            datasets: [
                {
                    label: 'ECM RH TEST',
                    data: response.data.map((a) => a.RHVALUE),
                    borderColor: [
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                    ],
                },
                {
                    label: 'ECM RH RETEST',
                    data: response.data.map((a) => a.RHREVALUE),
                    borderColor: [
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                    ],
                }
            ]
        })
        })
    }, [])

    return <Line data={data} />;
}

export default LineChart;