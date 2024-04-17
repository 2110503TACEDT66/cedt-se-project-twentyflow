import MyPointsCard from "@/components/MyPointsCard"
import CouponCatalog from "@/components/CouponCatalog"
import HistoryPointCard from "@/components/HistoryPointsCard"
import PointCatalog from "@/components/PointCatalog"

export default function Page() {
    return (
        <main className=" p-7 min-h-[90vh] bg-main-100">
            <PointCatalog/>
            <CouponCatalog/>
        </main>
    )
}