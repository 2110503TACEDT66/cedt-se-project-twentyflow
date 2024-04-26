'use client'

import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function RoomCard({room, coworking , available , startPeriod , endPeriod }: {room: Room , coworking: Coworking, available: boolean, startPeriod: string, endPeriod: string}) {
    const router = useRouter()
    

    
    
    return (
        <div>
            {
                available ?
                <div className="w-20 h-28 flex justify-center items-center bg-main-100 p-5 m-2 rounded-lg group relative">
                <FontAwesomeIcon icon={faCircleCheck} className="text-white w-12 h-12" />
                <div className="absolute bottom-10 left-full translate-x-4 bg-white shadow-xl p-5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-44">
                    <p>Room Number : {room.roomNumber}</p>
                    <p>status : available</p>
                    <p>next period : </p>
                    <p>{startPeriod} - {endPeriod}</p>
                    <button onClick={()=>{ router.push(`/coworkings/${coworking.id}/booking/${room._id}`)}} className="bg-main-100 rounded-lg px-5 py-2 text-white">Reserve</button>
                </div>
                </div> :
                <div className="w-20 h-28 flex justify-center items-center bg-[#D5C4F1] p-5 m-2 rounded-lg group relative">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-white w-12 h-12" />
                    <div className="absolute bottom-10 left-full translate-x-4 bg-white shadow-xl p-5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-44">
                        <p>Room Number : {room.roomNumber}</p>
                        <p>status : busy</p>
                        <p>period : </p>
                        <p>{startPeriod} - {endPeriod}</p>
                    </div>
                </div>
            }
            <div className=" text-center font-bold">
                {room.roomNumber}
            </div>
        </div>
    )
}