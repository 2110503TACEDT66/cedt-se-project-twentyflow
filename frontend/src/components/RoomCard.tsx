'use client'

import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { Dayjs } from "dayjs"

export default function RoomCard({room, coworking , available , data , time , date  }: {room: Room , coworking: Coworking, available: boolean , data : any , time : Dayjs | null, date : Dayjs | null}) {
    const router = useRouter()

    console.log(room.roomNumber)
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].startTime)
    }
    
    
    return (
        <div>
            {
                available ?
                <div onClick={()=>{ router.push(`/coworkings/${coworking.id}/booking/${room._id}`)}} 
                    className=" cursor-pointer w-20 h-28 flex justify-center items-center bg-custom-purple p-5 m-2 rounded-lg">
                    <FontAwesomeIcon icon={faCircleCheck}  className="text-white w-12 h-12"/> :
                </div> :
                <div className="w-20 h-28 flex justify-center items-center bg-[#D5C4F1] p-5 m-2 rounded-lg group relative">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-white w-12 h-12" />
                    <div className="absolute bottom-full -right-36  bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <h1>
                            Number : {room.roomNumber}
                        </h1> 
                        <h1>
                            Status : Busy
                        </h1>
                        <h1>
                            Period : {data[0].startTime} - {data[0].endTime}
                        </h1>
                        
                    </div>
                </div>
            }
            <div className=" text-center font-bold">
                {room.roomNumber}
            </div>
        </div>
    )
}