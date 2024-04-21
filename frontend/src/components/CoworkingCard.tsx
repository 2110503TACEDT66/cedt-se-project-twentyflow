import Link from "next/link";
import Swal from "sweetalert2";



export default function CoworkingCard( {coworking} : {coworking : Coworking}){
    const handleSelectClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevents the default link navigation
        // Trigger the Swal alert
        Swal.fire({
            title: 'Select Coworking Space?',
            text: `You are about to select ${coworking.name}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, select it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed selection, navigate to the coworking space
                window.location.href = `/coworkings/${coworking.id}`;
            }
        });
    };
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
                    <h1 className=" font-bold text-xl">
                        Price : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {coworking.price_hourly} THB / Hour
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
            <Link href={`/coworkings/${coworking.id}`} className=" bg-main-100 my-5 w-2/12 text-white flex justify-center items-center font-bold rounded-md"
            onClick={handleSelectClick}>
                SELECT
            </Link>
        </div>
    )
}