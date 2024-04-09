"use client"

import DateReserve from "@/components/DateReseve"
import { Dayjs } from "dayjs";
import addAppt from "@/libs/addAppt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReservationCard({ coworking }: { coworking: Coworking }) {
    



    const router = useRouter();
  


    const [datetime1, setDate1] = useState<Dayjs|null>(null)
    const [time1, setTime1] = useState<string>("")
    const [datetime2, setDate2] = useState<Dayjs|null>(null)
    const [time2, setTime2] = useState<string>("")

    const { data: session, status } = useSession()
    const [data,setData] = useState<Reservation[]>()

    useEffect(() => {


        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${session?.user.token}`
            },
        }).then((res) => res.json())
        .then((data) => {
          setData(data.data)

        })
      }, [])
    
    const onsubmit = () => {
        
        if(datetime1 && session && time1 && datetime2 && time2){
            if(session.user.role === "user"){
                if(!data || data.length <= 2){
                    const year = new Date(datetime1.toISOString()).getFullYear()
                    const month = new Date(datetime1.toISOString()).getMonth()
                    const day = new Date(datetime1.toISOString()).getDate()
                    const year2 = new Date(datetime2.toISOString()).getFullYear()
                    const month2 = new Date(datetime2.toISOString()).getMonth()
                    const day2 = new Date(datetime2.toISOString()).getDate()
                    if(time1.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/) && time1.length === 5 && time2.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/) && time2.length === 5){
                        const hour = parseInt(time1.split(":")[0])
                        const minute = parseInt(time1.split(":")[1]) 
                        const hour2 = parseInt(time2.split(":")[0])
                        const minute2 = parseInt(time2.split(":")[1]) 
                        const newDate = new Date(year,month,day,hour,minute)
                        const newDate2 = new Date(year2,month2,day2,hour2,minute2)
                        if(newDate.getTime() < newDate2.getTime()){
                            addAppt(newDate.toISOString(), newDate2.toISOString(),session.user._id, coworking.id,session.user.token)
                            router.push("/history")
                        }
                        else{
                            alert("Start time must be less than end time")
                        }
                    }
                    else{
                        alert("Invalid time format")
                    }

                }
                else{
                    alert("You have more than 3 reservations")
                    router.push("/")
                }
            }
            else{
                const year = new Date(datetime1.toISOString()).getFullYear()
                    const month = new Date(datetime1.toISOString()).getMonth()
                    const day = new Date(datetime1.toISOString()).getDate()
                    const year2 = new Date(datetime2.toISOString()).getFullYear()
                    const month2 = new Date(datetime2.toISOString()).getMonth()
                    const day2 = new Date(datetime2.toISOString()).getDate()
                    if(time1.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/) && time1.length === 5 && time2.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/) && time2.length === 5){
                        const hour = parseInt(time1.split(":")[0])
                        const minute = parseInt(time1.split(":")[1]) 
                        const hour2 = parseInt(time2.split(":")[0])
                        const minute2 = parseInt(time2.split(":")[1]) 
                        const newDate = new Date(year,month,day,hour,minute)
                        const newDate2 = new Date(year2,month2,day2,hour2,minute2)
                        if(newDate.getTime() < newDate2.getTime()){
                            addAppt(newDate.toISOString(), newDate2.toISOString(),session.user._id, coworking.id,session.user.token)
                            router.push("/history")
                        }
                        else{
                            alert("Start time must be less than end time")
                        }
                    }
                    else{
                        alert("Invalid time format")
                    }

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
                <div className=" flex flex-col w-full space-y-3">
                        <h1 className=" font-bold text-xl">
                            StartTime
                        </h1>
                        <div className=" flex flex-row w-full space-x-7">
                            <div className=" flex flex-row space-y-3 w-1/2"> 
                                <DateReserve onChangeDate={(value : Dayjs)=>setDate1(value)} />
                            </div>
                            <div className=" flex flex-col space-y-3 w-1/2">
                                <input onChange={(e )=>setTime1(e.target.value)} placeholder="04:30" className=" text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none px-5 border-gray-300 h-full rounded-md" type="text" />
                            </div>
                        </div>
                </div>
                <div className=" flex flex-col w-full space-y-3">
                        <h1 className=" font-bold text-xl">
                            EndTime
                        </h1>
                        <div className=" flex flex-row w-full space-x-7">
                            <div className=" flex flex-row space-y-3 w-1/2"> 
                                <DateReserve onChangeDate={(value : Dayjs)=>setDate2(value)} />
                            </div>
                            <div className=" flex flex-col space-y-3 w-1/2">
                                <input onChange={(e )=>setTime2(e.target.value)} placeholder="04:30" className=" text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none px-5 border-gray-300 h-full rounded-md" type="text" />
                            </div>
                        </div>
                </div>
                <button className= "bg-main-100 text-white py-3 rounded-md font-semibold"
                onClick={onsubmit}>
                    RESERVE
                </button>
            </div>
    )
}
