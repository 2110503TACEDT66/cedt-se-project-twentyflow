"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

  const [item, setItem] = useState<Array<[string, number]>>([]);
  const session = useSession();
  const currentUser = session.data?.user;

  useEffect(() => {
    if (currentUser) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/revenue/yearly`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${currentUser.token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setItem(data.data.yearlyRevenue);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          setItem([]);
        });
    }
  }, [currentUser]);

  var dataset = new Array();
  for (let i = 0; i < item?.length; i++)
    dataset.push({ YearlyRevenue: item[i][1], month: item[i][0] });

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
