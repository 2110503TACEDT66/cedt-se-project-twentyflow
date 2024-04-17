"use client";

import React from "react";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = () => {
  const session = useSession();
  const currentUser = session.data?.user;
  const [item, setItem] = useState<Array<[string, number]>>([]);

  useEffect(() => {
    if (currentUser) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/revenue/weekly`, {
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
          setItem(data.data.weeklyRevenue);
          console.log(data.data.weeklyRevenue);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          setItem([]);
        });
    }
  }, [currentUser]);

  var dataset = new Array();
  for (let i = 0; i < item?.length; i++) dataset.push(item[i][1]);

  return (
    <div className="mt-[-30px] ml-10 absolute w-[88%]">
      <LineChart
        xAxis={[{ scaleType: "band", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }]}
        series={[
          {
        data: dataset,
        color: "#7D5CB5",
        showMark: true,
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        height={180}
      />
    </div>
  );
};

export default MyComponent;
