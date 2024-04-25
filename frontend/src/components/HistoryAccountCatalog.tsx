"use client"

import { useState, useEffect } from 'react';
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';
import getHistory from '@/libs/getHistory';
import HistoryAccount from './HistoryAccount';
import CircularProgress from '@mui/material/CircularProgress';


export default function HistoryAccountCatalog(){
    const [user, setUser] = useState();
    const {data: session} = useSession();
    const[history,setHistory] = useState<History[]>([]);
    const [isLoading, setLoading] = useState(true);
    const token = session?.user?.token as string;

    useEffect(() => {
        getUserProfile(token).then(userData => {
            setUser(userData);
        });
        getHistory(token).then(historyData => {
            setHistory(historyData.data);
            setLoading(false);
        });
    
    }, []);

    return(
       <div className=' flex flex-col space-y-5'>
              {
                isLoading ? (
                    <div className=" flex justify-center items-center py-20">
                        <CircularProgress  color="secondary" />
                    </div>
                ) :
                (       
                    history.length > 0 ? (
                        history.map((history) => (
                          <HistoryAccount key={history._id} historyId={history._id} historyName={history.coWorking.name} historyPrice={history.price}/>
                        ))
                   ) : (
                      <div className=' flex justify-center items-center'>
                          <h1 className=' text-xl font-semibold'>
                              No History
                          </h1>
                      </div>
                   )
                )
              }
       </div>
    )
}