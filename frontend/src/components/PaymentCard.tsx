"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentCard({ reservationId }: { reservationId: string }) {

    const router = useRouter();
    const session = useSession()
    const currentUser = session.data?.user
    const [currentReservation, setCurrentReservation] = useState<Reservation>()
    // console.log(reservationId)
    console.log(currentReservation?.endTime)

    useEffect(() => {

        if(currentUser){
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${reservationId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization":`Bearer ${currentUser.token}`
                },
            }).then((res) => res.json())
            .then((data) => {
              setCurrentReservation(data.data)
              console.log(data.data)
            })

        }
        
      }, [])

    const hour = currentReservation ? Math.ceil((new Date(currentReservation.endTime).getTime() - new Date(currentReservation?.startTime).getTime())/( 1000*60*60) ): 'Cannot compute hour'
    const coWorkingName = currentReservation?.coWorking.name
    const userName = currentUser?.name
    
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
                        {coWorkingName}
                    </h1>
                </div>

                <div className="flex flex-row w-full space-x-7">
                    <div className=" flex flex-col w-1/5 space-y-3">
                            <h1 className=" font-bold text-xl">
                                Hour
                            </h1>
                            <div className=" flex flex-row w-full space-x-7">
                                <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                                    {hour}
                                </h1>
                            </div>
                    </div>

                    <div className=" flex flex-col w-1/4 space-y-3">
                            <h1 className=" font-bold text-xl">
                                Price
                            </h1>
                            <div className=" flex flex-row w-full space-x-7">
                                <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                                cannot pull price per hour data from database
                                </h1>
                            </div>
                    </div>

                    <div className=" flex flex-col w-1/3 space-y-3">
                            <h1 className=" font-bold text-xl">
                                User
                            </h1>
                            <div className=" flex flex-row w-full space-x-7">
                                <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                                    {userName}
                                </h1>
                            </div>
                            
                    </div>

                </div>

                <div className="">
                    <p className="m-0">***The total cost is calculated by multiplying the hourly rate by the number of hours.</p>
                    <button className= "bg-main-100 text-white text-[20px] py-3 rounded-md font-semibold w-full"
                    onClick={onsubmit}>
                        Confirm Your Payment
                    </button>

                </div>
            
        </div>

        </div>
        
        
    )
}
