"use client";

import DateReserve from "@/components/DateReseve";
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import addAppt from "@/libs/addAppt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GetpriceId from "@/libs/getPriceId";
import Swal from "sweetalert2";
import TimeReserve from "./TimeReserve";

export default function ReservationCard({
  coworking,
  room
}: {
  coworking: Coworking,
  room : Room

}) {
  const router = useRouter();

  //mockdata 

  const [date, setDate] = useState<Dayjs | null>(null);
  const [time1, setTime1] = useState<Dayjs | null>(null);
  const [time2, setTime2] = useState<Dayjs | null>(null);
  const [add, setAdd] = useState<string>("");

  const { data: session, status } = useSession();
  const [data, setData] = useState<Reservation[]>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        
      });
  }, []);

  const onsubmit = async () => {
    if ( date && time1 && time2 ){
      const startHour = parseInt(time1?.format('HH:mm').split(':')[0]);
      const endHour = parseInt(time2?.format('HH:mm').split(':')[0]);
      const startMinute = parseInt(time1?.format('HH:mm').split(':')[1]);
      const endMinute = parseInt(time2?.format('HH:mm').split(':')[1]);
      const cowokingStartHour = parseInt(coworking.opentime.split(':')[0]);
      const cowokingEndHour = parseInt(coworking.closetime.split(':')[0]);
      const cowokingStartMinute = parseInt(coworking.opentime.split(':')[1]);
      const cowokingEndMinute = parseInt(coworking.closetime.split(':')[1]);
      if (session?.user.role === "user"){
        if (data && data.length <= 2){

          // check condition time overlap 
          if (startHour > endHour || (startHour == endHour && startMinute >= endMinute)){
            Swal.fire({
              title: "Reservation Failed",
              text: "Start time must be before end time",
              icon: "error",
            });
            return;
          }else if (startHour < cowokingStartHour || (startHour == cowokingStartHour && startMinute < cowokingStartMinute)){
            Swal.fire({
              title: "Reservation Failed",
              text: "Start time must be after coworking open time",
              icon: "error",
            });
            return;
          }
          else if (endHour > cowokingEndHour || (endHour == cowokingEndHour && endMinute > cowokingEndMinute)){
            Swal.fire({
              title: "Reservation Failed",
              text: "End time must be before coworking close time",
              icon: "error",
            });
            return;
          }
          else{
            const priceId = await GetpriceId(
              coworking.name,
              coworking.price_hourly,
              time1?.format('HH:mm'),
              time2?.format('HH:mm'),
              session.user.token
            );
            addAppt(
              time1.format('HH:mm'),
              time2.format('HH:mm'),
              session.user._id,
              coworking.id,
              session.user.token,
              priceId,
              room._id,
              dayjs(date?.format('YYYY-MM-DD')).toDate().toISOString(),
              add
            )
            Swal.fire({
              title: "Reservation Successful",
              icon: "success",
            }).then((result)=>{
              if(result.isConfirmed){
                router.push("/booking");
              }
            });
          }
        }
        else{
          Swal.fire({
            title: "Reservation Failed",
            text: "You can only reserve 3 times",
            icon: "error",
          });
        }
      }
    }
    else{
      Swal.fire({
        title: "Reservation Failed",
        text: "Please fill in all the required fields",
        icon: "error",
      });
    }

  };

  return (
    <div className=" w-10/12 space-y-10 h-full p-10 bg-white rounded-md flex flex-col">
      <div className=" flex flex-row w-full space-x-5">
        <div className="flex flex-col space-y-3 w-5/6" >
          <h1 className=" font-bold text-xl">Name</h1>
          <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
            {coworking.name}
          </h1>
        </div>
        <div className="flex flex-col space-y-3 w-1/6 " >
          <h1 className=" font-bold text-xl">Room</h1>
          <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
            {room.roomNumber}
          </h1>
        </div>
      </div>
      <div className=" flex flex-col w-full space-y-3">
        <h1 className=" font-bold text-xl">Date</h1>
        <div className=" flex flex-row space-y-3 w-full">
          <DateReserve value={null} onChangeDate={(value: Dayjs) => setDate(value)} />
        </div>
      </div>
      <div className=" flex flex-row w-full space-x-5">
        <div className="flex flex-col space-y-3 w-1/2 " >
          <h1 className=" font-bold text-xl">Start</h1>
          <TimeReserve value={null} onChangeTime={(value : Dayjs) => setTime1(value)}/>
        </div>
        <div className="flex flex-col space-y-3 w-1/2 " >
          <h1 className=" font-bold text-xl">End</h1>
          <TimeReserve value={null} onChangeTime={(value : Dayjs) => setTime2(value)}/>
        </div>
      </div>
      <div className=" flex flex-col w-full space-y-3">
        <h1 className=" font-bold text-xl">Additional requirement</h1>
        <div className=" flex flex-row space-y-3 w-full">
          <textarea onChange={(e : any ) => setAdd(e.target.value)} className=" w-full h-40 border-2 p-3 rounded-md border-gray-300" />
        </div>
      </div>
      <button
        className="bg-main-100 text-white py-3 rounded-md font-semibold"
        onClick={onsubmit}
      >
        RESERVE
      </button>
    </div>
  );
}
