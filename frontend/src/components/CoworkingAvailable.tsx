'use client'

import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import TimeReserve from "./TimeReserve"
import DateReserve from "./DateReseve"
import RoomCard from "./RoomCard";
import getAllAppt from "@/libs/getAllAppt";
import { useSession } from "next-auth/react";


export default function CoworkingAvailable( { coworkingDetail} : {coworkingDetail: Coworking}){
    const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
    const [time,setTime] = useState<Dayjs | null>(dayjs(new Date()));
    const session = useSession();
    const token = session.data?.user.token || "";
    const [appt, setAppt] = useState(null);

    useEffect(() => {
        (async () => {
            const appointments = await getAllAppt(token, coworkingDetail.id);
            console.log(appointments);
            setAppt(appointments);
        })();
    }, [token, coworkingDetail.id]);


    console.log(token )
    const  handleSearch  = async () => {
        console.log(date?.format("YYYY-MM-DD"), time?.format("HH:mm"));
        console.log(appt);
    }
    return(
        <div className="flex flex-col justify-round bg-white rounded-2xl px-8 pt-8 pb-7 w-full space-y-4 h-[90vh]">
            <div className="w-full flex flex-row justify-between">
            <div className="bg-custom-grey flex flex-row justify-round space-x-10 w-[85%] px-7 pr-7 pt-5 pb-5 rounded-lg">
                <div className="w-[50%] bg-white">
                    <DateReserve disable={false} onChangeDate={(value: Dayjs) => setDate(value)} value={date}/>
                </div>
                <div className="w-[45%] bg-white">
                    <TimeReserve disable={false} onChangeTime={(value: Dayjs) => setTime(value)} value={time}/>
                </div>
            </div>
            
            <button className="bg-custom-purple text-white font-semibold text-2xl px-5 py-2 rounded-lg w-[13%]" onClick={handleSearch}>Search</button>
            
            </div>
            <div className=" grid grid-cols-4 gap-20 pt-20">

            {
                (coworkingDetail.rooms.sort((a,b) => a.roomNumber - b.roomNumber)).map((room) => {
                    return(
                        <div className="flex justify-center items-center" key={room._id}>
                            <RoomCard coworking={coworkingDetail} room={room}/>
                        </div>
                    )
                })
            }
            </div>

        </div>
    )
}