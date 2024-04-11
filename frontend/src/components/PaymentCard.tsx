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

    const [user, setUser] = useState<User|null>(null)

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
        //navigate to sripe payment

    }
    return (
        <div className="flex w-screen flex-col  items-center bg-main-100 min-h-[90vh] p-7">
            <h1 className=" text-5xl py-10 font-semibold text-white">
                PAYMENT
            </h1>
            
            <div className=" w-10/12 space-y-10 h-full p-10 bg-white rounded-md flex flex-col">
            
                <div className=" flex flex-col space-y-3">
                    <h1 className=" font-bold text-xl">
                        Name
                    </h1>
                    <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
                        {coworking.name}
                    </h1>
                </div>

                <div className="flex flex-row w-full space-x-7">
                    <div className=" flex flex-col w-1/5 space-y-3">
                            <h1 className=" font-bold text-xl">
                                Hour
                            </h1>
                            <div className=" flex flex-row w-full space-x-7">
                                <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                                    25
                                </h1>
                            </div>
                    </div>

                    <div className=" flex flex-col w-1/4 space-y-3">
                            <h1 className=" font-bold text-xl">
                                Price
                            </h1>
                            <div className=" flex flex-row w-full space-x-7">
                                <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                                    1000 Baht
                                </h1>
                            </div>
                    </div>

                    <div className=" flex flex-col w-1/3 space-y-3">
                            <h1 className=" font-bold text-xl">
                                Username
                            </h1>
                            <div className=" flex flex-row w-full space-x-7">
                                <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                                    username
                                </h1>
                            </div>
                            
                    </div>

                </div>

                <div className="">
                    <p className="m-0">*The total cost is calculated by multiplying the hourly rate by the number of hours.</p>
                    <button className= "bg-main-100 text-white text-[20px] py-3 rounded-md font-semibold w-full"
                    onClick={onsubmit}>
                        Confirm Your Payment
                    </button>

                </div>
            
        </div>

        </div>
        
        
    )
}
