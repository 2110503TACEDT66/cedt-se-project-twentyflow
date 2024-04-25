"use client";

import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function HistoryDetails({historyId} : {historyId : string}) {

    const router = useRouter();
    const session = useSession();
    const currentUser = session.data?.user;
    const userName = currentUser?.name;
    const [coWorkName, setCoWorkName] = useState<string>();
    const [roomNum, setRoomNum] = useState<number>();
    const [dateBooking, setDateBooking] = useState<Dayjs>();
    const [startTime, setStartTime] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    const [additionnal, setAdditional] = useState<string>();
    const [hours, setHours] = useState<number>();
    const [price, setPrice] = useState<number>();

    useEffect(() => {
        if(currentUser) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/history/${historyId}`, {
                cache: "no-store",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${currentUser.token}`,
                },
            })
            .then((res) => res.json())
            .then((data) =>{
                console.log(data);
                setHours(data.hour);
                setPrice(data.price);
            })
        }
    }, []);

    return(
        <div className="flex w-full  scrollbar-none flex-col  items-center bg-main-100 min-h-[90vh] p-7">
            <div className="flex flex-col w-4/5 h-full rounded-lg bg-white space-y-2">
                <div className="flex flex-row px-5">
                    <div className="flex flex-col w-4/5 py-2 px-5">
                        <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                            Name 
                        </h1>
                        <h1 className=" font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                            {userName}
                        </h1>
                    </div>
                    <div className="flex flex-col w-1/5 py-2 px-5">
                        <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                            Room
                        </h1>
                        <h1 className=" font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                            {1}
                        </h1>
                    </div>
                </div>
                <div className="px-9">
                    <h1 className=" font-semibold text-xl py-2 px-5 rounded-md border-gray-300"> 
                        Date
                    </h1>
                    <h1 className="w-full font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                        Date
                    </h1>
                </div>
                <div className="flex flex-row px-5">
                    <div className="flex flex-col w-1/2 py-2 px-5">
                        <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                            Start
                        </h1>
                        <h1 className="w-full font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                            Start
                        </h1>
                    </div>
                    <div className="flex flex-col w-1/2 py-2 px-5">
                        <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                            End
                        </h1>
                        <h1 className="w-full font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                            End
                        </h1>
                    </div>
                </div>
                <div className="px-9">
                    <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                        Additional
                    </h1>
                    <h1 className="w-full h-[15vh] font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                        End
                    </h1>
                </div>
                <div className="flex flex-row space-x-3 pb-5">
                    <div className="px-9 w-1/3">
                        <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                            Hours
                        </h1>
                        <h1 className="w-full font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                            hours
                        </h1>
                    </div>
                    <div className="px-9 w-1/3">
                        <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                            Price
                        </h1>
                        <h1 className="w-full font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                            price
                        </h1>
                    </div>
                    <div className="px-9 w-1/3">
                        <h1 className=" font-semibold text-xl py-4 px-5 rounded-md border-gray-300"> 
                            Username
                        </h1>
                        <h1 className="w-full font-bold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                            {userName}
                        </h1>
                    </div>
                </div>
                <div className="flex justify-center px-9 py-5">
                    <button 
                        className="bg-main-100 text-white text-[20px] py-3 rounded-md font-semibold w-4/5"
                        onClick={(e) => router.push('/account')}>
                        Back
                    </button>                    
                </div>

            </div>
        </div>
    );
}