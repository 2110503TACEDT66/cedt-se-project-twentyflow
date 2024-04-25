'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DeleteReservation from "@/libs/DeleteReservation";
import { faGear, faPenToSquare, faTrash, faX, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";


export default function HistoryCard( {reservation} : {reservation : Reservation}){
    const session = useSession()
    const currentUser = session.data?.user
    const rid = reservation._id

    const [isOpen, setIsOpen] = useState<boolean>(false);
    // console.log(reservation.endTime)
    
    
    const handleDeleteButton = () => {
        if(currentUser && rid){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    DeleteReservation(currentUser.token, rid)
                }
              })
            
            
        }
    }

    const tranClass = isOpen ? "absolute" : "hidden";

    return(
        <div className=" flex flex-row justify-between h-full bg-gray-200 rounded-md px-3 py-3">
            <div className=" flex flex-col space-y-3 h-full">
                <div className=" flex flex-row items-center space-x-3">
                    <h1 className=" font-bold text-xl">
                        CoWorking : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {reservation.coWorking.name}
                    </h1>
                </div>
                <div className=" flex flex-row  items-center space-x-6">
                    <h1 className=" font-bold text-xl">
                        User : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {reservation.user.name}
                    </h1>
                </div>
                <div className=" flex flex-row  items-center space-x-6">
                    <h1 className=" font-bold text-xl">
                        Start : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {new Date(reservation.startTime).toLocaleTimeString("th-TH")} {new Date(reservation.startTime).toLocaleDateString("th-TH")} 
                    </h1>
                    <h1 className=" font-bold text-xl">
                        End : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {new Date(reservation.endTime).toLocaleTimeString("th-TH")} {new Date(reservation.endTime).toLocaleDateString("th-TH")} 
                    </h1>
                    <h1 className=" font-bold text-xl">
                        Hour : 
                    </h1>
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl">
                        {Math.ceil((new Date(reservation.endTime).getTime() - new Date(reservation.startTime).getTime())/( 1000*60*60) ) }   
                    </h1>
                </div>

            </div>


            {/* <div className="flex flex-col w-2/12 h-full space-y-5 justify-center">
                <Link href={`/coworkings/${reservation.coWorking.id}/edit?id=${reservation._id}`} className=" h-20 bg-amber-500 flex justify-center items-center text-white font-semibold rounded-md">
                    Edit
                </Link>
                <button onClick={onsubmit} className=" h-20 bg-red-600 text-white font-semibold rounded-md">
                    Delete
                </button>
            </div> */}
            <div className="flex flex-col justify-between w-2/12 relative">
                <div className="flex justify-end">
                    <button className="bg-main-100 p-3 rounded-lg mr-[30px]" onClick={() => {setIsOpen(!isOpen)}}>
                        {
                            isOpen ?  <FontAwesomeIcon icon={faXmark} className="text-white fa-2x"/> 
                            : <FontAwesomeIcon icon={faGear} className="text-white fa-2x"/> 
                        }
                        
                    </button>
                </div>

                <div className={`${tranClass} top-[58px] w-full pr-[30px] h-[130px]`}>
                    <div className="flex flex-col h-full bg-white rounded-lg">
                        <Link href={`/coworkings/${reservation.coWorking.id}/edit?id=${reservation._id}`} className="text-black h-1/2 w-full items-center flex flex-row justify-start rounded-lg hover:bg-slate-300">
                            
                            <FontAwesomeIcon icon={faPenToSquare} className="fa-2x mx-5"/>
                            <h1 className="font-semibold text-xl">Edit</h1>
                            
                        </Link>

                        <button onClick={handleDeleteButton} className="text-black h-1/2 w-full items-center flex flex-row justify-start rounded-lg hover:bg-slate-300">
                            
                            <FontAwesomeIcon icon={faTrash} className="fa-2x mx-5"/>
                            <h1 className="font-semibold text-xl">Delete</h1>
                            
                        </button>
                    </div>
                    

                </div>

                <div className="flex justify-end">
                    <Link href={`/payment/${rid}`} className=" h-[52px] bg-main-100 flex justify-center items-center text-white font-semibold rounded-lg mr-[30px] w-3/5">
                        Pay
                    </Link>
                </div>
            </div>

            
            
        </div>
    )
}