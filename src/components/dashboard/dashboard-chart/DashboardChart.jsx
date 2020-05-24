/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';

const DashboardChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData([{
      date: '10th May 2020',
      workingEmployees: 55,
      absentEmployees: 4
    }, {
      date: '11th May 2020',
      workingEmployees: 59,
      absentEmployees: 4
    }, {
      date: '12th May 2020',
      workingEmployees: 55,
      absentEmployees: 9
    }, {
      date: '13th May 2020',
      workingEmployees: 45,
      absentEmployees: 8
    }, {
      date: '14th May 2020',
      workingEmployees: 45,
      absentEmployees: 10
    }, {
      date: '15th May 2020',
      workingEmployees: 55,
      absentEmployees: 16
    }, {
      date: '16th May 2020',
      workingEmployees: 65,
      absentEmployees: 6
    }, {
      date: '17th May 2020',
      workingEmployees: 65,
      absentEmployees: 6
    }, {
      date: '18 May 2020',
      workingEmployees: 56,
      absentEmployees: 7
    }, {
      date: '19th May 2020',
      workingEmployees: 67,
      absentEmployees: 3
    }, {
      date: '20th May 2020',
      workingEmployees: 65,
      absentEmployees: 6
    }, {
      date: '21st May 2020',
      workingEmployees: 65,
      absentEmployees: 6
    }, {
      date: '22nd May 2020',
      workingEmployees: 65,
      absentEmployees: 6
    }, {
      date: '23rd May 2020',
      workingEmployees: 55,
      absentEmployees: 6
    }, {
      date: '24th May 2020',
      workingEmployees: 45,
      absentEmployees: 6
    }]);
  }, []);

  useEffect(() => {
    if (chartData && chartData.length) {
      // Initialize chart
      const ctx = document.getElementById('myChart').getContext('2d');
      // eslint-disable-next-line no-unused-vars
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.map((val) => val.date),
          datasets: [{
            label: 'Working Employees',
            barPercentage: 0.6,
            backgroundColor: 'rgb(149, 168, 201)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgb(244, 129, 142)',
            data: chartData.map((val) => val.workingEmployees)
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{ display: false }],
            yAxes: [{
              display: false,
              ticks: { beginAtZero: true }
            }]
          },
          maintainAspectRatio: false,
          tooltips: {
            custom: (tooltip) => {
              if (!tooltip) return;
              tooltip.displayColors = false;
            },
            callbacks: {
              label: (tooltipItem) => `Working Emp: ${chartData[tooltipItem.index].workingEmployees} Absent Emp: ${chartData[tooltipItem.index].absentEmployees}`
            }
          }
        }
      });
    }
  }, [chartData]);

  return (
    <canvas id="myChart" />
  );
};

export default DashboardChart;
