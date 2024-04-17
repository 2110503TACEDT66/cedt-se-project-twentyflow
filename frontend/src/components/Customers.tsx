"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Customers() {
  const [item, setItem] = useState<Array<[string, number]>>([]);
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
          setItem(data.data.customer);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          setItem([]);
        });
    }
  }, [currentUser]);

  return (
    <div className="w-[100%] absolute ml-3">
      {item.length > 0 ? (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["New", "Return"],
            },
          ]}
          series={[{ data: [item[0][1], item[1][1]], color: "#7D5CB5" }]}
          height={170}
          grid={{
            vertical: true,
            horizontal: true,
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
