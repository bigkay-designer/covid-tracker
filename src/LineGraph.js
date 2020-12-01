import React, {useEffect,useState} from 'react'
import numeral from 'numeral'
import { Line } from 'react-chartjs-2'
import './App.css'


function LineGraph({casesType="cases"}) {

    const options = {
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0,
            }
        },
        maintainAspectRatio: false,

        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral (tooltipItem.value).format("+0,0")
                }
            }
        },

        scales: {
            xAxes: [{
                type: 'time',
                time : {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll'
                },
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0a')
                    }
                }

            }]
        }

    }

    const buildChartData = (data, casesType="cases") => {
        const chartData = []
        let lastDataPoint;

        for(let date in data[casesType]){
            if(lastDataPoint){
                const newDataPoint = {
                    x:date,
                    y:data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        }

        return chartData
    }
    

    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () =>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(data => {
                const chartData = buildChartData(data, casesType)
                setData(chartData)
            })
        }
        fetchData()
    },[casesType])

    return (
        <div className="lineGraph-container">
            {data?.length > 0 && (
                <Line 
                options = {options}
                  data = {
                      {
                          datasets: [{
                              data: data,
                              backgroundColor: 'rgba(204, 16, 52, 0.5)',
                              borderColor: '#cc1034'
                          }]
                      }
                  }
    
                />

            )}
        </div>
    )
}

export default LineGraph
