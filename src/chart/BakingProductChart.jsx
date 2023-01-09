import axios from '../api/Axios';
import { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';

function BakingProductChart() {

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
        const Baking = response.data.Baking.map((a) => a.BAKEPRODUCT)
        // const baking = Baking.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), [])
        // const baking = []
        // Baking.forEach(function (x) { baking[x] = (baking[x] || 0) + 1 })
        const Bakingg = [...new Set(Baking)]
        // const baking = Bakingg.map(value => [value, Baking.filter(str => str === value).length])
        const BakingProduct = Bakingg.map(value => value)
        const CountProduct = Bakingg.map(value => Baking.filter(str => str === value).length)
        setData({
                labels: BakingProduct.map((a) => a),
                datasets: [
                {
                    label: 'Product Baking',
                    data: CountProduct.map((a) => a),
                    borderColor: [
                        'rgba(255, 206, 86, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                    ],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                    ],
                },
            ]
        })
        })
    }, [])

    const options = {
        scale: {
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

export default BakingProductChart;