import  getCoworking  from "../libs/getCoworking";

export default async function CoworkingDetail( {params}: {params: {id: string}}) {
    const coworkingDetail = await getCoworking(params.id);
    return (
        <div className="flex flex-col justify-round bg-white rounded-2xl px-16 pt-8 pb-7 w-full space-y-4 h-1/4">
            <div>
                <h1 className="font-semibold text-3xl mb-3 ">Name</h1>
                <h1 className="font-semibold text-3xl border-[1px] rounded-lg border-black p-2">{coworkingDetail.data.name}</h1>
            </div>
            <div className="flex flex-row justify-between w-full space-x-20">
                <div className="w-1/4">
                <h1 className="font-semibold text-3xl mb-3 ">Price</h1>
                <h1 className="font-semibold text-3xl border-[1px] rounded-lg border-black p-2">{coworkingDetail.data.price_hourly} THB/Hour</h1>
                </div>
                <div className="w-1/4">
                <h1 className="font-semibold text-3xl mb-3 ">Open</h1>
                <h1 className="font-semibold text-3xl border-[1px] rounded-lg border-black p-2">{coworkingDetail.data.opentime}</h1>
                </div>
                <div className="w-1/4">
                <h1 className="font-semibold text-3xl mb-3 ">Close</h1>
                <h1 className="font-semibold text-3xl border-[1px] rounded-lg border-black p-2">{coworkingDetail.data.closetime}</h1>
                </div>
            </div>
        </div>
    )
}