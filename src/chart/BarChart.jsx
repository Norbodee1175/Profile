import axios from '../api/Axios';
import { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';

function BarChart() {

    const ECM_URL = "/dashboardbake";

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
        setData({
                labels: ["Baking", "Empty"],
                datasets: [
                {
                    label: 'Oven',
                    data: [response.data.Baking.length, response.data.Oven.length-response.data.Baking.length],
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
            ticks: {
                precision: 0
            }
        }
    }

    return <Bar data={data} options={options} />;
}

export default BarChart;