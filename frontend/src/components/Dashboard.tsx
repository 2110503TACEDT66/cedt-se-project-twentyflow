import StatCard from "./StatCard";
import ChartBar from "./ChartBar";
import ChartBarCalendar from "./ChartBarCalendar";

export default function Dashboard() {
    return (
        <div>
            <StatCard/>
            <ChartBarCalendar/>
            <ChartBar/>
        </div>
    )
}