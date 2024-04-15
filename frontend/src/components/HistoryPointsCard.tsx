'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import HistoryPointSubCard from "./HistoryPointSubCard";
import CircularProgress from "@mui/material/CircularProgress";


export default function HistoryPointCard() {

    const[pointHistory, setPointHistory] = useState<Reward[]>([])
    const { data: session } = useSession();    
    const token = session?.user?.token as string;    
    const [user, setUser] = useState<User|null>(null);
    const[isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reward`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization":`Bearer ${session?.user.token}`
            },
        })
        .then(response => response.json())
        .then(data =>  {setPointHistory(data.data); setLoading(false);})

        
    },[])

    return (
        <div className="w-[53%]">
            <h1 className=" font-bold text-2xl text-white px-[60px]">Point History</h1>
            <div className='w-full h-[300px] overflow-y-scroll scrollbar-none rounded-lg shadow-lg bg-white space-y-5 flex flex-col p-10 m-[20px] mx-[60px]'>
                {
                    isLoading ? (
                        <div className=" flex justify-center items-center py-20">
                            <CircularProgress  color="secondary" />
                        </div>
                    ) :
                    (
                        pointHistory.map((point, index) => (
                            <HistoryPointSubCard key={index} name={point.rewardName} point={point.rewardPoint}/>
                        ))

                    )
                }
            </div>
        </div>
    )
}