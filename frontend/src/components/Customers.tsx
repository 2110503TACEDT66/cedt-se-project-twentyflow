import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Customers() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }]}
      series={[{ data: [4, 3, 5, 4, 5 ,3 ,2], label : 'New' }, { data: [1, 6, 3, 1, 5 ,4 ,5], label : 'Returning' }]}
      width={500}
      height={300}
    />
  );
}