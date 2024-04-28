import Link from "next/link";
import Swal from "sweetalert2";



export default function CoworkingCard( {coworking} : {coworking : Coworking}){

    return(
        <div className="flex flex-col justify-between bg-gray-200 rounded-md px-3 py-3 lg:flex-row">
            <div className=" flex flex-col space-y-3">
                <div className="flex flex-col items-left lg:space-x-3 lg:flex-row">
                    <div className="flex">
                        <h1 className="font-bold text-xl flex flex-col justify-center">
                            Name: 
                        </h1>
                        <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                            {coworking.name}
                        </h1>
                    </div>

                    <div className="flex">
                        <h1 className="font-bold text-xl flex flex-col justify-center">
                            Price: 
                        </h1>
                        <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                            {coworking.price_hourly} THB / Hour
                        </h1>
                    </div>
                </div>
                <div className=" flex flex-col  items-left lg:space-x-3 lg:flex-row">
                    <div className="flex">
                        <h1 className=" font-bold text-xl flex flex-col justify-center">
                            Tel: 
                        </h1>
                        <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                            {coworking.tel}
                        </h1>
                    </div>

                    <div className="flex">
                        <h1 className=" font-bold text-xl flex flex-col justify-center">
                            Open: 
                        </h1>
                        <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                            {coworking.opentime}
                        </h1>
                    </div>

                    <div className="flex">
                        <h1 className=" font-bold text-xl flex flex-col justify-center">
                            Close: 
                        </h1>
                        <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                            {coworking.closetime}
                        </h1>
                    </div>
                </div>
                <div className=" flex flex-col  items-left lg:space-x-3 lg:flex-row">
                    <div className="flex">
                        <h1 className=" font-bold text-xl flex flex-col justify-center">
                            Address: 
                        </h1>
                        <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                            {coworking.address} {coworking.district} {coworking.province} {coworking.postalcode}
                        </h1>
                    </div>
                </div>
            </div>
            <Link href={`/coworkings/${coworking.id}`} className=" bg-main-100 my-5 w-full lg:w-2/12 text-white text-xl px-3 py-4 flex justify-center items-center font-bold rounded-md">
                SELECT
            </Link>
        </div>
    )
}