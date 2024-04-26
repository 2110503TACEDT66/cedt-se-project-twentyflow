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
import UpdateReservation from "@/libs/UpdateReservation";
import CircularProgress from "@mui/material/CircularProgress";

export default function ReservationCard({
  coworking,
  appointment
}: {
  coworking: Coworking,
  appointment: Reservation
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  function timeToDate(date : string) {
    let tempTime = date.split(":");
    let dt = new Date();
    dt.setHours(parseInt(tempTime[0]));
    dt.setMinutes(parseInt(tempTime[1]));
    dt.setSeconds(0);
    return dt;
  }
  
  const [date, setDate] = useState<Dayjs | null>(dayjs(appointment.date));
  const [time1, setTime1] = useState<Dayjs | null>(dayjs(timeToDate(appointment.startTime)));
  const [time2, setTime2] = useState<Dayjs | null>(dayjs(timeToDate(appointment.endTime)));
  const [add, setAdd] = useState<string>(appointment.additional);
  if (!session) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress />
      </div>
    
    );
  }
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
          // check condition time overlap 
        if (startHour > endHour || (startHour == endHour && startMinute >= endMinute)){
          Swal.fire({
            title: "Edit Failed",
            text: "Start time must be before end time",
            icon: "error",
          });
          return;
        }else if (startHour < cowokingStartHour || (startHour == cowokingStartHour && startMinute < cowokingStartMinute)){
          Swal.fire({
            title: "Edit Failed",
            text: "Start time must be after coworking open time",
            icon: "error",
          });
          return;
        }
        else if (endHour > cowokingEndHour || (endHour == cowokingEndHour && endMinute > cowokingEndMinute)){
          Swal.fire({
            title: "Edit Failed",
            text: "End time must be before coworking close time",
            icon: "error",
          });
          return;
        }
        else{
          UpdateReservation(
            session.user.token,
            appointment._id,
            add
          );
          
          Swal.fire({
            title: "Edit Successful",
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
        title: "Edit Failed",
        text: "Please fill in all the required fields",
        icon: "error",
      });
    }

  };

  return (
    <div className=" w-10/12 space-y-10 h-full p-10 my-8 bg-white rounded-md flex flex-col">
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
            2
          </h1>
        </div>
      </div>
      <div className=" flex flex-col w-full space-y-3">
        <h1 className=" font-bold text-xl">Date</h1>
        <div className=" flex flex-row space-y-3 w-full">
          <DateReserve disable={true} value={dayjs(new Date(appointment.date))} onChangeDate={(value: Dayjs) => setDate(value)} />
        </div>
      </div>
      <div className=" flex flex-row w-full space-x-5">
        <div className="flex flex-col space-y-3 w-1/2 " >
          <h1 className=" font-bold text-xl">Start</h1>
          <TimeReserve disable={true} value={dayjs(timeToDate(appointment.startTime))} onChangeTime={(value : Dayjs) => setTime1(value)}/>
        </div>
        <div className="flex flex-col space-y-3 w-1/2 " >
          <h1 className=" font-bold text-xl">End</h1>
          <TimeReserve disable={true} value={dayjs(timeToDate(appointment.endTime))} onChangeTime={(value : Dayjs) => setTime2(value)}/>
        </div>
      </div>
      <div className=" flex flex-col w-full space-y-3">
        <h1 className=" font-bold text-xl">Additional requirement</h1>
        <div className=" flex flex-row space-y-3 w-full">
          <textarea value={add} onChange={(e : any ) => setAdd(e.target.value)} className=" w-full h-40 border-2 p-3 rounded-md border-gray-300" />
        </div>
      </div>
      <button
        className="bg-main-100 text-white py-3 rounded-md font-semibold"
        onClick={onsubmit}
      >
        SAVE
      </button>
    </div>
  );
}
