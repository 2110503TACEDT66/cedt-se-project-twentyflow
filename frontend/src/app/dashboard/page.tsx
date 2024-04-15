import {
  faPerson,
  faPeopleLine,
  faChildReaching,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FinancialData from "@/components/FinancialData";

const bullColor = "green";
const bearColor = "red";

export default function DashBoard() {
  return (
    <main className="p-7 min-h-[90vh] bg-main-100">
      <div className="flex flex-col gap-8">
        {/* Detail section */}
        <div className="w-full h-[150px] flex flex-row gap-8">
          <FinancialData
            amount="10,000"
            description="+11% today"
            label="Total Customers"
            icon={faPerson}
            textColor={bullColor}
          ></FinancialData>
          <FinancialData
            amount="10,000"
            description="+11% today"
            label="Total Customers"
            icon={faPeopleLine}
            textColor={bullColor}
          ></FinancialData>
          <FinancialData
            amount="10,000"
            description="+11% today"
            label="Total Customers"
            icon={faChildReaching}
            textColor={bullColor}
          ></FinancialData>
          <FinancialData
            amount="10,000"
            description="-11% today"
            label="Total Customers"
            icon={faMoneyBill1Wave}
            textColor={bearColor}
          ></FinancialData>
        </div>
        {/* yearly revanue and calendar */}
        <div className="w-full h-[200px] flex flex-row gap-8">
          <div className="bg-white rounded-md h-full flex-grow w-[49vw]"></div>
          <div className="bg-white rounded-md h-full flex-grow relative">
            <div className="absolute inset-0 bg-white rounded-md overflow-hidden shadow-md">
              <Calendar className="w-full h-full " locale="en-US" />
            </div>
          </div>
        </div>
        {/* week and customers */}
        <div className="w-full h-[180px] flex flex-row gap-8">
          <div className="bg-white rounded-md h-full flex-grow"></div>
          <div className="bg-white rounded-md h-full flex-grow"></div>
        </div>
      </div>
    </main>
  );
}