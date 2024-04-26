'use client'

import CoWorkingEdit from "@/components/CoworkingEdit";
import getCoworking from "@/libs/getCoworking";
import getReservation from "@/libs/getReservation";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useSearchParams  } from 'next/navigation'
import { useEffect, useState } from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const session = useSession()
  const [coworking,setCoworking] = useState<Coworking>()
  const [appointment,setAppointment] = useState<Reservation>()

  if( !session?.data?.user || !id ) return null

  useEffect(() => {
    getCoworking(params.id).then((res) => {
      setCoworking(res.data)
    })
    getReservation(session?.data?.user.token,id).then((res) => {
      setAppointment(res.data)
    })
  },[])

  if (!coworking || !appointment) {
    return (
      <div className=" w-full flex justify-center items-center mt-40">
        <CircularProgress  />
      </div>
    )

  }


  
  console.log()
  console
  return (
    <main className=" min-h-[120vh]  flex justify-center items-center bg-main-100">
      <CoWorkingEdit appointment={appointment} coworking={coworking} />
    </main>
  );
}
