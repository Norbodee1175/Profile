import axios from '../api/Axios';
import { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';

function RhProductChart() {

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
        const Product = response.data.Product.map((a) => a.PRODUCT)
        const Product1 = [...new Set(Product)]
        const RhPass = response.data.Pass.map((a) => a.BAKEPRODUCT)
        const RhPass1 = Product1.map(value => RhPass.includes(value) ? RhPass.filter(str => str === value).length : 0 )
        const RhReject = response.data.Reject.map((a) => a.BAKEPRODUCT)
        const RhReject1 = Product1.map(value => RhReject.includes(value) ? RhReject.filter(str => str === value).length : 0 )

        setData({
                labels: Product1,
                datasets: [
                {
                    label: 'Pass',
                    // data: [RhPass.length, RhReject.length],
                    // data: [RhpassPercent, RhrejectPercent],
                    data: RhPass1,
                    borderColor: [
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                    ],
                },
                {
                    label: 'Reject',
                    data: RhReject1,
                    borderColor: [
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                    ],
                },
            ]
        })
        })
    }, [])

    const options = {
        scale: {
            // max: 100,
            // min: 0,
            ticks: {
                precision: 0,
                font: {
                    size: 8,
                }
            }
        }
    }

    return <Bar data={data} options={options} />;
}

export default RhProductChart;