import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios";

function Chart() {
    const [age, setAge] = useState([0, 0, 0, 0, 0, 0])
    const [smile, setSmile] = useState([0, 0])
    const apiURL = 'REPLACE ME'

    async function getCharts(type) {
        const chartURL = `${apiURL}/charts`

        const chartResult = await fetch(chartURL,
            {
                method: "POST",
                data: type
            })
        const detectionData = await chartResult.json()
        switch(type) {
        case 'age':
            setAge({
                labels: ['0-19', '20-39', '40-49', '50-69', '70-89', '90+'],
                datasets: [{
                    data: detectionData.data,
                    label: '# per Age Range',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            })
            break
        case 'smile':
            setSmile({
                labels: ['Smiles', 'No Smiles'],
                datasets: [{
                    data: detectionData.data,
                    label: '# of Smiles',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            })
            break
        default:
            break
    }

    useEffect(() => {
        getCharts('age')
        getCharts('smile')
    }, [])
    
    return (
            <div style={{width: '100%', display: 'flex', paddingTop: 50}}>
                <span style={{width: '100%'}}>
                    <Bar
                      data={age}
                    />
                </span>
                <span style={{width: '100%'}}>
                    <Bar
                      data={smile}
                    />
                </span>
            </div>
        )
}

export default Chart;
