import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Customers() {
  
  return (
    <div className='w-[100%] absolute ml-3'>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }]}
        series={[{ data: [4, 3, 5, 4, 5 ,3 ,2], label : 'New',color:'#7D5CB5' }, { data: [1, 6, 3, 1, 5 ,4 ,5], label : 'Returning',color:'#D5C4F1' }]}
        height={170}
      />
    </div>
  );
}