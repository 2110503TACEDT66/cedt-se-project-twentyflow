import HistoryPointCard from "./HistoryPointsCard";
import MyPointsCard from "./MyPointsCard";

export default function PointCatalog() {
    return (
        <div className="flex flex-row space-x-20">
            <MyPointsCard/>
            <HistoryPointCard/>
        </div>
    )
}