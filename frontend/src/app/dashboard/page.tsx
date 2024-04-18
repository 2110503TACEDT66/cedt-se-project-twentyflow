"use client";
import {
  faPerson,
  faPeopleLine,
  faChildReaching,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "@/components/Calendar";
import "react-calendar/dist/Calendar.css";
import FinancialData from "@/components/FinancialData";
import YearlyRevenue from "@/components/YearlyRevenue";
import WeeklyRevenue from "@/components/WeeklyRevenue";
import Customers from "@/components/Customers";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const bullColor = "green";
const bearColor = "red";

export default function DashBoard() {
  const session = useSession();
  const currentUser = session.data?.user;
  const [totalCustomers, settotalCustomers] = useState<number>();
  const [totalRevenue, settotalRevenue] = useState<number>();
  const [customerMonth, setcustomerMonth] = useState<number>();
  const [activeCustomer, setactiveCustome] = useState<number>();
  const [trendActive, settrendActive] = useState<number>();
  const [trendUser, settrendUser] = useState<number>();
  const [trendMonth, settrendMonth] = useState<number>();
  const [revenueTrend, setRevenueTrend] = useState<number>();

  useEffect(() => {
    if (currentUser) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`, {
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
          settotalCustomers(data.data.totalUsers);
          settotalRevenue(data.data.totalPrice);
        })
        .catch((error) => {
          console.error("Error fetching total customers and revenue:", error);
          settotalCustomers(0);
          settotalRevenue(0);
        });

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/customer`, {
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
          setcustomerMonth(data.data.totalThisMonthCustomer);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          setcustomerMonth(0);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/customer/active`,
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
          setactiveCustome(data.data.count);
          settrendActive(data.data.trends);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          setactiveCustome(0);
        });

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/customer/daily`, {
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
          settrendUser(data.data.trends);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          settrendUser(0);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/customer/monthly`,
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
          settrendMonth(data.trends);
        })
        .catch((error) => {
          console.error("Error fetching customer this month:", error);
          settrendMonth(0);
        });
      
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/revenue/trend`,
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
            setRevenueTrend(data.trends);
          })
          .catch((error) => {
            console.error("Error fetching customer this month:", error);
            setRevenueTrend(0);
          });
    }
  }, [currentUser]);

  return (
    <main className="p-7 min-h-[90vh] bg-main-100">
      <div className="flex flex-col gap-8">
        {/* Detail section */}
        <div className="w-full h-[150px] flex flex-row gap-8">
          <FinancialData
            amount={String(totalCustomers)}
            description={trendUser + "% today"}
            label="Total Customers"
            icon={faPerson}
            textColor={bullColor}
          ></FinancialData>
          <FinancialData
            amount={String(customerMonth)}
            description={trendMonth + "% today"}
            label="Customers This Month"
            icon={faPeopleLine}
            textColor={bullColor}
          ></FinancialData>
          <FinancialData
            amount={String(activeCustomer)}
            description={trendActive + "% today"}
            label="Active Customers"
            icon={faChildReaching}
            textColor={bullColor}
          ></FinancialData>
          <FinancialData
            amount={String(totalRevenue)}
            description={revenueTrend + "% today"}
            label="Total Revenue"
            icon={faMoneyBill1Wave}
            textColor={bearColor}
          ></FinancialData>
        </div>
        {/* yearly revanue and calendar */}
        <div className="w-full h-[336px]  flex flex-row gap-8">
          <div className="bg-white justify-center rounded-md h-full flex flex-col flex-grow  relative">
            <p className="mt-2 ml-5 text-main-100 font-bold">Yearly Revenue</p>
            <YearlyRevenue />
          </div>
          <div className="bg-white rounded-md h-full flex-grow relative">
            {/* <div className="absolute flex justify-center inset-0 bg-white h-full rounded-md overflow-hidden shadow-md">
              <Calendar className="w-full h-full " locale="en-US" />
            </div> */}
            <Calendar />
          </div>
        </div>
        {/* week and customers */}
        <div className="w-full h-[180px] flex flex-row gap-8">
          <div className="bg-white rounded-md h-full flex-grow relative">
            <p className="mt-2 ml-5 text-main-100 font-bold">Weekly Revenue</p>
            <WeeklyRevenue />
          </div>
          <div className="bg-white rounded-md h-full flex-grow relative">
            <p className="mt-2 ml-5 text-main-100 font-bold relative">
              Customers
            </p>
            <Customers />
          </div>
        </div>
      </div>
    </main>
  );
}
