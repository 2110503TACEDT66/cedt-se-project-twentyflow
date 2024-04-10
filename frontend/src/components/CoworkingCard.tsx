import Link from "next/link";



export default function CoworkingCard( {coworking} : {coworking : Coworking}){
    return(
        <div className=" flex flex-row justify-between bg-gray-200 rounded-md px-3 py-3">
            <div className=" flex flex-col space-y-3">
                <div className=" flex flex-row items-center space-x-3">
                    <h1 className=" font-bold text-xl">
                        Name : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {coworking.name}
                    </h1>
                </div>
                <div className=" flex flex-row  items-center space-x-3">
                    <h1 className=" font-bold text-xl">
                        Tel : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {coworking.tel}
                    </h1>
                    <h1 className=" font-bold text-xl">
                        Open : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {coworking.opentime} {}
                    </h1>
                    <h1 className=" font-bold text-xl">
                        Close : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {coworking.closetime}
                    </h1>
                </div>
                <div className=" flex flex-row  items-center space-x-3">
                    <h1 className=" font-bold text-xl">
                        Address : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {coworking.address} {coworking.district} {coworking.province} {coworking.postalcode}
                    </h1>
                </div>
            </div>
            <Link href={`/coworkings/${coworking.id}`} className=" bg-main-100 my-5 w-2/12 text-white flex justify-center items-center font-bold rounded-md">
                SELECT
            </Link>
        </div>
    )
}