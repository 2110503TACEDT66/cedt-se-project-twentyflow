import { color } from 'framer-motion';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = () => {
  const chartOptions = {
    // Define your chart options here
    chart: {
      type: 'line',
    },
    series: [
      {
        name: 'Revenue',
        data: [30, 40, 35, 50, 49, 60, 70],
      },
    ],
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    colors: ['#7D5CB5'],
  };

  return (
    <div className=' ml-10 absolute w-[88%]'>
      <ReactApexChart
        options={{ ...chartOptions, chart: { type: 'line' } }}
        series={chartOptions.series}
        type="line"
        height={150}
      />
    </div>
  );
};

export default MyComponent;