'use client'
import StatCard from "./StatCard";
import ChartBar from "./ChartBar";
import YearlyRevenue from "./YearlyRevenue";
import { useState } from "react";
import { Calendar } from "./index"; // Updated import statement
import WeeklyRevenue from "./WeeklyRevenue";
import Customers from "./Customers"; // Fixed casing of import statement

export default function Dashboard() {
    const [date, setDate] = useState<any>(new Date());
    const [selectRange, setSelectRange] = useState<boolean>(false);
    return (
        <div>
            <StatCard/>
            <YearlyRevenue/>
            <Calendar date={date} setDate={setDate} selectRange={selectRange} setSelectRange={setSelectRange} />
            <WeeklyRevenue/>
            <Customers/>
        </div>
    )
}