'use client'

import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function RoomCard({room, coworking , available }: {room: Room , coworking: Coworking, available: boolean}) {
    const router = useRouter()
    

    
    
    return (
        <div>
            {
                available ?
                <div onClick={()=>{ router.push(`/coworkings/${coworking.id}/booking/${room._id}`)}} 
                    className=" cursor-pointer w-20 h-28 flex justify-center items-center bg-custom-purple p-5 m-2 rounded-lg">
                    <FontAwesomeIcon icon={faCircleCheck}  className="text-white w-12 h-12"/> :
                </div> :
                <div className="w-20 h-28 flex justify-center items-center bg-red-600 p-5 m-2 rounded-lg group relative">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-white w-12 h-12" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Unavailable this time
                    </div>
                </div>
            }
            <div className=" text-center font-bold">
                {room.roomNumber}
            </div>
        </div>
    )
}