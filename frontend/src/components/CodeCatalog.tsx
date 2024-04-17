"use client"

import { useState, useEffect } from 'react';
import Code from "./Code"
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import getCoupons from '@/libs/getCopons';
import CircularProgress from '@mui/material/CircularProgress';


interface Coupon {
    couponName: string;
    couponCode: string;
    // add other properties as needed
}
interface UserData {
    coupons: Coupon[];
    // add other properties as needed
}

interface User {
    data: UserData;
    // add other properties as needed
}

export default function CodeCatalog(){
    const [user, setUser] = useState<User>({ data: { coupons: [] } });
    const {data: session} = useSession();
    const[coupon, setCoupon] = useState<Coupon[]>([]);
    const[isLoading, setLoading] = useState<boolean>(true);
    const token = session?.user?.token as string;

    useEffect(() => {
        getUserProfile(token).then(userData => {
            setUser(userData);
        });
        getCoupons(token).then(couponData => {
            setCoupon(couponData.data);
            setLoading(false);
        });
    }, []);

    return(
        <div className=" flex flex-col space-y-5 p-[50px] ">
            {
                isLoading ? 
                <div className=" flex justify-center items-center py-20">
                    <CircularProgress  color="secondary" />
                </div>
                :
                (coupon.length > 0 ? (
                    coupon.map((coupon) => (
                        <Code key={coupon.couponCode} couponName={coupon.couponName} couponCode={coupon.couponCode}/>
                    ))
                ) : (
                    (
                        <div className=' flex justify-center items-center'>
                            <h1 className=' text-xl font-semibold'>
                                No Coupon
                            </h1>
                        </div>
                     )
                ))
            }
            
        </div>
    )
}