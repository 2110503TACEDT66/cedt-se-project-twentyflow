"use client"

import DateReserve from "@/components/DateReseve"
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import UpdateReservation from "@/libs/UpdateReservation";

export default function CoworkingEdit({ coworking}: { coworking: Coworking}) {
    


    const session = useSession()
    const currentUser = session.data?.user
    const [datetime, setDate] = useState<Dayjs|null>(null)
    const [time, setTime] = useState<string>("")

    const urlParams = useSearchParams()
    const aid = urlParams.get('id')
    const router = useRouter();
    
    const onsubmit = () => {

        if(datetime && currentUser && aid){
            const year = new Date(datetime.toISOString()).getFullYear()
            const month = new Date(datetime.toISOString()).getMonth()
            const day = new Date(datetime.toISOString()).getDate()
            if(time.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/) && time.length === 5){
                const hour = parseInt(time.split(":")[0])
                const minute = parseInt(time.split(":")[1]) 
                const newDate = new Date(year,month,day,hour,minute)
                UpdateReservation(newDate.toISOString(), currentUser.token, aid)
                router.push("/history")
            }
            else{
                alert("Invalid time format" )
            }
        }
    }
    return (
        <div className=" w-10/12 space-y-10 h-full p-10 bg-white rounded-md flex flex-col">
        <div className=" flex flex-col space-y-3">
            <h1 className=" font-bold text-xl">
                Name
            </h1>
            <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
                {coworking.name}
            </h1>
        </div>
        <div className=" flex flex-row w-full space-x-10">
            <div className=" flex flex-col space-y-3 w-1/2">
                <h1 className=" font-bold text-xl">
                    Date-Time
                </h1>
                <DateReserve onChangeDate={(value : Dayjs)=>setDate(value)} />
            </div>
            <div className=" flex flex-col space-y-3 w-1/2">
                <h1 className=" font-bold text-xl">
                    Time
                </h1>
                <input onChange={(e )=>setTime(e.target.value)} placeholder="04:30" className=" text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none px-5 border-gray-300 h-full rounded-md" type="text" />
            </div>

        </div>
        <button className= "bg-main-100 text-white py-3 rounded-md font-semibold"
        onClick={onsubmit}>
            UPDATE
        </button>
    </div>
    )
}