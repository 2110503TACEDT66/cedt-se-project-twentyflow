'use client'

import { useRouter } from "next/navigation"

export default function RoomCard({room, coworking}: {room: Room , coworking: Coworking}) {
    const router = useRouter()
    return (
        <div>
            <div className="w-20 h-28 bg-custom-purple p-5 m-2 rounded-lg">
                <button onClick={()=>{
                    router.push(`/coworkings/${coworking.id}/booking/${room._id}`)
                }}>
                    OK
                </button>
            </div>
            <div className=" text-center font-bold">
                {room.roomNumber}
            </div>
        </div>
    )
}