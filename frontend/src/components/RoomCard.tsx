'use client'

import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export default function RoomCard({room, coworking}: {room: Room , coworking: Coworking}) {
    const router = useRouter()
    return (
        <div>
            <div onClick={()=>{
                    router.push(`/coworkings/${coworking.id}/booking/${room._id}`)
                }} className=" cursor-pointer w-20 h-28 flex justify-center items-center bg-custom-purple p-5 m-2 rounded-lg">
                <FontAwesomeIcon icon={faCircleCheck}  className="text-white w-12 h-12"/>
            </div>
            <div className=" text-center font-bold">
                {room.roomNumber}
            </div>
        </div>
    )
}