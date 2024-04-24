'use client'

import DateReserve from "./DateReseve"
import TimeReserve from "./TimeReserve"
import { useState } from "react";
import { Dayjs } from "dayjs";
import RoomCard from "./RoomCard";

export default function CoworkingAvailable(){
    const [date, setDate] = useState<Dayjs | null>(null);
    const [time,setTime] = useState<Dayjs | null>(null);
    return(
        <div className="flex flex-col justify-round bg-white rounded-2xl px-8 pt-8 pb-7 w-full space-y-4 h-[75vh]">
            <div className="w-full flex flex-row justify-between">
            <div className="bg-custom-grey flex flex-row justify-round space-x-10 w-[85%] px-7 pr-7 pt-5 pb-5 rounded-lg">
                <div className="w-[50%] bg-white">
                <DateReserve onChangeDate={()=>setDate(date)}/>
                </div>
                <div className="w-[45%] bg-white">
                <TimeReserve onChangeTime={()=>setTime(time)}/>
                </div>
            </div>
            
            <button className="bg-custom-purple text-white font-semibold text-2xl px-5 py-2 rounded-lg w-[13%]">Search</button>
            
            </div>
            <div>
                <RoomCard />
            </div>
        </div>
    )
}