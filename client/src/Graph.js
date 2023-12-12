import React from 'react';
import Bar from 'react-plotly.js';

const LineChart = ({ data }) => {
  const plotData = [
    {
      type: 'line',
      y: data,
    },
  ];

  const plotLayout = {
    width: data.length * 10, // Adjust the width of the chart
    height: 400, // Set the desired height of the chart
  };

  return (
    <Bar
      data={plotData}
      layout={plotLayout}
      config={{ responsive: true }}
    />
  );
};

export default LineChart;
