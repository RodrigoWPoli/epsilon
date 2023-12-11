import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraphComponent = ({ data }) => {
  // Assuming data is an array of -1, 0, and 1 values
  const chartData = {
    labels: data.map((_, index) => `Data ${index + 1}`),
    datasets: [
      {
        label: 'Graph Data',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        min: -1,
        max: 1,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default GraphComponent;
