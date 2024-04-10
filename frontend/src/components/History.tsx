"use client"

import HistoryCatalog from "./HistoryCatalog"
import { useEffect,useState } from "react"
import { useSession } from "next-auth/react"


export default function History() {
    const { data: session, status } = useSession()
    const [data,setData] = useState<Reservation[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${session?.user?.token}`
            },
        }).then((res) => res.json())
        .then((data) => {
          setLoading(false)
          setData(data.data)

        })
      },[data])
    return (

        <div className=" w-full min-h-[82vh] bg-white rounded-md">
            <HistoryCatalog isLoading={isLoading} reservation={ data}/>
        </div>
    )
}