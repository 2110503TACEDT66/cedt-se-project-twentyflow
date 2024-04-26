'use client'

import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import TimeReserve from "./TimeReserve"
import DateReserve from "./DateReseve"
import RoomCard from "./RoomCard";
import { useSession } from "next-auth/react";
import 'dayjs/plugin/isBetween';
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";


export default function CoworkingAvailable( { coworkingDetail } : {coworkingDetail: Coworking}){
    const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
    const [time,setTime] = useState<Dayjs | null>(dayjs(new Date()));
    const session = useSession();
    const token = session.data?.user.token || "";
    const [ lag, setLag ] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    let available : boolean[]= [];
    for (let i = 0; i < coworkingDetail.rooms.length; i++) {
        available.push(true);
    }
    const [isRoomAvailable, setIsRoomAvailable] = useState(available);
    function timeToDate(tdate : string) {
        let tempTime = tdate.split(":");
        let dt = new Date();
        dt.setDate(date?.date() || 0);
        dt.setMonth(date?.month() || 0);
        dt.setFullYear(date?.year() || 0);
        dt.setHours(parseInt(tempTime[0]));
        dt.setMinutes(parseInt(tempTime[1]));
        dt.setSeconds(0);
        return dt;
      }
    function compareTime(time1: Dayjs | null, time2: Dayjs | null){
        if (time1 && time2) {
            const time1Hour = time1.hour();
            const time1Minute = time1.minute();
            const time2Hour = time2.hour();
            const time2Minute = time2.minute();

            if (time1Hour < time2Hour) {
                return true;
            } else if (time1Hour > time2Hour) {
                return false;
            } else {
                if (time1Minute < time2Minute) {
                    return true;
                } else if (time1Minute > time2Minute) {
                    return false;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    useEffect(() => {
        setFirstLoad(false);
        const reservationTime = dayjs(date?.format("YYYY-MM-DD") + " " + time?.format("HH:mm"));
        if (coworkingDetail && coworkingDetail.rooms) {
            for (let i = 0; i < coworkingDetail.rooms.length; i++) {
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${coworkingDetail.rooms[i]._id}/appointments`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
                )
                    .then((res) => res.json())
                    .then((data) => {
                       
                        const datata:any = data.data.appointments.filter((appointment:any) => {
                            return dayjs(new Date(appointment.date)).isSame(reservationTime, 'day');
                        });
                        console.log("###########")
                        console.log(i)
                        console.log(datata);
                        console.log("###########")
                        // console.log(data.data.roomNumber);
                        // console.log(data.data.appointments.length);
                        for (let j = 0; j < datata.length; j++) {
                            const startToDate = dayjs(timeToDate(datata[j].startTime));
                            const endToDate = dayjs(timeToDate(datata[j].endTime));
                            const startTime = dayjs(startToDate.format("YYYY-MM-DD") + " " + startToDate.format("HH:mm"))
                            const endTime = dayjs(endToDate.format("YYYY-MM-DD") + " " + endToDate.format("HH:mm"))
                            // console.log(reservationTime)
                            // console.log(startTime, endTime);
                            if (reservationTime.isSame(dayjs(new Date(datata[j].date)).format("YYYY-MM-DD"), 'day')  ) {
                                if (reservationTime.isAfter(startTime) && reservationTime.isBefore(endTime)) {
                                    available[data.data.roomNumber - 1] = false;

                                    setIsRoomAvailable(available);
                                    break;
                                }
                        }

                    }
                });
            }
        }

    }, [ lag]);


    //console.log(token )
    const  handleSearch  = () => {
        //console.log(date?.format("YYYY-MM-DD"), time?.format("HH:mm"));
        if (compareTime(time, dayjs(timeToDate(coworkingDetail.opentime))) || compareTime(dayjs(timeToDate(coworkingDetail.closetime)), time)){
            Swal.fire({
                title: "Search Failed",
                text: "Time must be between coworking open and close time",
                icon: "error",
              });
            return;
        }else{
            setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            setLag(!lag);
            setFirstLoad(false);
            for (let i = 0; i < coworkingDetail.rooms.length; i++) {
                available[i] = true;
            }
            setIsRoomAvailable(available);
        }
    }

    return(
        <div className="flex flex-col justify-round bg-white rounded-2xl px-8 pt-8 pb-7 w-full space-y-4 h-[90vh]">
             <div className="w-full flex flex-row justify-between">
                <div className="bg-custom-grey flex flex-row justify-round space-x-10 w-[85%] px-7 pr-7 pt-5 pb-5 rounded-lg">
                    <div className="w-[50%] bg-white">
                        <DateReserve disable={false} onChangeDate={(value: Dayjs) => setDate(value)} value={date} />
                    </div>
                    <div className="w-[45%] bg-white">
                        <TimeReserve disable={false} onChangeTime={(value: Dayjs) => setTime(value)} value={time} />
                    </div>
                </div>
                <button className="bg-custom-purple text-white font-semibold text-2xl items-center rounded-lg w-[13%]" onClick={handleSearch}>Search</button>
            </div>
            
            
            {
                firstLoad ? (
                    <div className="flex justify-center items-center h-full w-full">
                        <CircularProgress color="secondary" />
                    </div>
                ) :
                (
                    <>
                   
                        <div className={isLoading ? "flex justify-center items-center h-full w-full" : "grid grid-cols-4 gap-20 pt-20"}>
                            {isLoading ? (<CircularProgress color="secondary" />) :
                                (coworkingDetail.rooms.sort((a, b) => a.roomNumber - b.roomNumber)).map((room, index) => {
                                    return (
                                        <div className="flex justify-center items-center" key={room._id}>
                                            <RoomCard coworking={coworkingDetail} room={room} available={isRoomAvailable[index]} />
                                        </div>
                                    );
                                }
                                )}
                        </div>
                            
                    </>
                )
            }

        </div>
    )
}