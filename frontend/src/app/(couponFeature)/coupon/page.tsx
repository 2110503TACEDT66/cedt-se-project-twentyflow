import MyPointsCard from "@/components/MyPointsCard"
import CouponCatalog from "@/components/CouponCatalog"

export default function Page() {
    return (
        <main className=" p-7 min-h-[90vh] bg-main-100">
            <MyPointsCard/>
            <CouponCatalog/>
        </main>
    )
}