"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Customers() {
  const [New, setNew] = useState<Array<[string, number]>>([]);
  const [Return, setReturn] = useState<Array<[string, number]>>([]);
  const session = useSession();
  const currentUser = session.data?.user;

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/customer/newReturn`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setNew(data.data.New);
          setReturn(data.data.Return);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          setNew([]);
          setReturn([]);
        });
    }
  }, [currentUser]);

  const data1 = New.slice(0, 7).map((item) => item[1]);
  const data2 = Return.slice(0, 7).map((item) => item[1]);

  return (
    <div className="w-[100%] absolute ml-3">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          },
        ]}
        series={[
          { data: data1, label: "New", color: "#7D5CB5" },
          { data: data2, label: "Returning", color: "#D5C4F1" },
        ]}
        height={170}
      />
    </div>
  );
}
