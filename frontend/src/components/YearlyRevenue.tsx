import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ClassNames } from '@emotion/react';


const dataset = [
  {
    YearlyRevenue: 21,
    month: 'Jan',
  },
  {
    YearlyRevenue: 28,
    month: 'Fev',
  },
  {
    YearlyRevenue: 41,
    month: 'Mar',
  },
  {
    YearlyRevenue: 73,
    month: 'Apr',
  },
  {
    YearlyRevenue: 99,
    month: 'May',
  },
  {
    YearlyRevenue: 144,
    month: 'June',
  },
  {
    YearlyRevenue: 319,
    month: 'July',
  },
  {
    YearlyRevenue: 249,
    month: 'Aug',
  },
  {
    YearlyRevenue: 131,
    month: 'Sept',
  },
  {
    YearlyRevenue: 55,
    month: 'Oct',
  },
  {
    YearlyRevenue: 48,
    month: 'Nov',
  },
  {
    YearlyRevenue: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value: number | null) => `${value} Bath`;

const chartSetting = {
  series: [{ dataKey: 'YearlyRevenue', label: 'Yearly Revenue', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function YearlyRevenue() {
  const [tickPlacement, setTickPlacement] = React.useState<
    'start' | 'end' | 'middle' | 'extremities'
  >('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState<
    'middle' | 'tick'
  >('middle');

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement },
        ]}
        {...chartSetting}
      />
    </div>
  );
}