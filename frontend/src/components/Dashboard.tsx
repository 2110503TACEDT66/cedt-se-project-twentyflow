import { useSession } from "next-auth/react";
import CustomerDashboard from "./CustomerDashboard";

export default function Dashboard() {

    return(
        <div className="flex flex-col bg-white">
            <CustomerDashboard />
        </div>
    )
}