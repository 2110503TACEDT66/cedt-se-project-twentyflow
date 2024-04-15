import CodeCatalog from "@/components/CodeCatalog"

export default function Page() {
    return(
        <main className=" p-7 min-h-[90vh] bg-main-100">
            <div className=" w-full min-h-[82vh] bg-white rounded-md">
                <h1 className="text-custom-purple font-bold flex justify-center items-center pt-[70px] text-5xl">Coupon</h1>
                <CodeCatalog/>
            </div>
        </main> 
    )
}