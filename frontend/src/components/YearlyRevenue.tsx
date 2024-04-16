import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const dataset = [
  {
    YearlyRevenue: 8000,
    month: "Jan",
  },
  {
    YearlyRevenue: 50000,
    month: "Fev",
  },
  {
    YearlyRevenue: 12000,
    month: "Mar",
  },
  {
    YearlyRevenue: 17000,
    month: "Apr",
  },
  {
    YearlyRevenue: 30000,
    month: "May",
  },
  {
    YearlyRevenue: 5000,
    month: "June",
  },
  {
    YearlyRevenue: 40000,
    month: "July",
  },
  {
    YearlyRevenue: 35000,
    month: "Aug",
  },
  {
    YearlyRevenue: 23500,
    month: "Sept",
  },
  {
    YearlyRevenue: 3000,
    month: "Oct",
  },
  {
    YearlyRevenue: 39000,
    month: "Nov",
  },
  {
    YearlyRevenue: 40000,
    month: "Dec",
  },
];

const valueFormatter = (value: number | null) => `${value} Bath`;

const chartSetting = {
  series: [{ dataKey: "YearlyRevenue", valueFormatter }],
  height: 190,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
  colors: ["#7D5CB5"],
};

export default function YearlyRevenue() {
  const [tickPlacement, setTickPlacement] = React.useState<
    "start" | "end" | "middle" | "extremities"
  >("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState<
    "middle" | "tick"
  >("middle");

  return (
    <div className="w-[100%] ml-6">
      <div>
        <BarChart
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              tickPlacement,
              tickLabelPlacement,
            },
          ]}
          {...chartSetting}
        />
      </div>
    </div>
  );
}
