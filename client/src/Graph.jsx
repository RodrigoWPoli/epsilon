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
    width: data.length * 10, 
    height: 400, 
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
